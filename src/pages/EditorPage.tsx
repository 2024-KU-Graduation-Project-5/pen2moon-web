import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import diff_match_patch from "diff-match-patch";
import MdEditor from "@uiw/react-md-editor";
import MarkdownIt from "markdown-it";
import { Stage, Layer, Image as KonvaImage, Rect } from "react-konva";
import previewImg from "../assets/preview.png";
import { MyDocument, getMyDocument, getMyDocuments } from "../apis/ocr";
import { useParams } from "react-router-dom";
import pageMock from "../assets/page.png";

const EditorPage = () => {
  const [content, setContent] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const { id } = useParams();

  const [docs, setDocs] = useState<MyDocument[]>();
  const [sock, setSock] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:80/api/ws/edit");
    // WebSocket 연결 상태 표시
    socket.addEventListener("open", () => {
      setStatus("🟢 WebSocket 연결 완료");
      console.log("🟢 WebSocket 연결 완료");
    });

    socket.addEventListener("close", () => {
      setStatus("🔴 WebSocket 연결 종료됨");
      console.log("🔴 WebSocket 연결 종료됨");
    });

    socket.addEventListener("error", () => {
      setStatus("⚠️ WebSocket 오류 발생");
      console.log("⚠️ WebSocket 오류 발생");
    });
    setSock(socket);

    getMyDocuments().then((res) => {
      setDocs(res);
    });
    getMyDocument(Number(id)).then((res) => {
      setContent(res.documentContentList[page - 1].content);
      const img = new window.Image();
      img.src = res.documentContentList[page - 1].originalImageUrl;
      img.onload = () => {
        setImage(img);
      };
    });
  }, []);

  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const dmp = new diff_match_patch();
  const documentId = 2;
  let prevText = "";

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  if (sock !== null) {
    // // 📥 서버에서 오는 메시지 처리 (resync 대응 추가)
    sock.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);

      // 서버가 resync 요청한 경우
      if (msg.type === "resync" && msg.documentId === documentId) {
        const text = content;
        const resyncMessage = {
          documentId: documentId,
          operation: "resync",
          page: page,
          start: 0,
          end: text.length,
          text: text,
        };
        if (sock.readyState === WebSocket.OPEN) {
          sock.send(JSON.stringify(resyncMessage));
          console.log("📤 [RESYNC] 전체 문서 전송:", resyncMessage);
        }
      }
    });
  }

  // 🔁 사용자 입력 → diff 계산 후 insert/delete 전송
  let debounceTimer: number;
  const isSelected = true;
  const onEditorChange = (newContent?: string) => {
    if (newContent === undefined) {
      return;
    }
    setContent(newContent);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const currText = content;
      const diffs = dmp.diff_main(prevText, currText);
      dmp.diff_cleanupEfficiency(diffs);

      let index = 0;
      for (let i = 0; i < diffs.length; i++) {
        const [op, text] = diffs[i];
        if (!text) continue;

        let message = null;
        if (op === 0) {
          index += text.length;
        } else if (op === -1) {
          message = {
            documentId: documentId,
            operation: "delete",
            page: page,
            start: index,
            end: index + text.length,
            text: text,
          };
        } else if (op === 1) {
          message = {
            documentId: documentId,
            operation: "insert",
            page: page,
            start: index,
            end: index + text.length,
            text: text,
          };
          index += text.length;
        }
        console.log(sock, message);
        if (sock !== null && message && sock.readyState === WebSocket.OPEN) {
          sock.send(JSON.stringify(message));
          console.log(`📤 [${message.operation.toUpperCase()}] 전송:`, message);
        }
      }
      prevText = currText;
    }, 500);
  };
  return (
    <div className="flex">
      {/* 좌측 사이드바 */}
      <SideBar fileList={docs!} />

      {/* 우측 상단 고정 요소 */}
      <div className="fixed top-10 right-10 p-2 z-50">
        <img src={pageMock} />
      </div>
      {/* 본문 컨텐츠 */}
      <div className="flex flex-1 pt-16">
        {" "}
        {/* ← pt-12: 고정된 높이만큼 여백 추가 */}
        <div className="basis-0 flex-1 p-10">
          <Stage width={580} height={835}>
            <Layer>
              {image && (
                <KonvaImage
                  image={image}
                  scale={{
                    x: 580 / image.width,
                    y: 835 / image.height,
                  }}
                />
              )}
            </Layer>
          </Stage>
        </div>
        <div className="basis-0 flex-1 p-10 cursor-text h-full">
          <MdEditor
            style={{ height: "100%" }}
            height={770}
            preview="edit"
            onChange={onEditorChange}
            value={content}
          />
        </div>
      </div>
    </div>
  );
};
export default EditorPage;
