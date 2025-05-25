import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import diff_match_patch from "diff-match-patch";
import MdEditor from "@uiw/react-md-editor";
import MarkdownIt from "markdown-it";
import { Stage, Layer, Image as KonvaImage, Rect } from "react-konva";
import previewImg from "../assets/preview.png";
import { MyDocument, getMyDocument, getMyDocuments } from "../apis/ocr";
import { useParams } from "react-router-dom";
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
  const documentId = "1";
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
      {/*TODO : props*/}
      <SideBar fileList={docs!} />
      <div className="flex flex-1">
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
              {/* {isSelected && (
                <Rect
                  x={100}
                  y={60}
                  width={120}
                  height={10}
                  fill="yellow"
                  opacity={0.4}
                  cornerRadius={4}
                />
              )} */}
            </Layer>
          </Stage>
        </div>
        <div className="basis-0 flex-1  p-10 cursor-text h-full">
          <MdEditor
            style={{ height: "100%" }}
            height={770}
            previewOptions={{
              components: {
                // 커스터마이징 옵션
              },
              // 커스텀 렌더링 함수 적용은 안됨 (대신 react-markdown 방식 사용 가능)
            }}
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
