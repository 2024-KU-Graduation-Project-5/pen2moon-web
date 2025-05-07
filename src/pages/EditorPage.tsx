import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import diff_match_patch from "diff-match-patch";
import MdEditor from "@uiw/react-md-editor";
import MarkdownIt from "markdown-it";

const EditorPage = () => {
  // const socket = new WebSocket("ws://localhost:8081/ws/edit");
  const [content, setContent] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const dmp = new diff_match_patch();
  const documentId = "1";
  const page = 1; // 항상 page 1로 고정
  let prevText = "";

  useEffect(() => {
    console.log(content);
  }, [content]);
  // WebSocket 연결 상태 표시
  // socket.addEventListener("open", () => {
  //   setStatus("🟢 WebSocket 연결 완료");
  // });

  // socket.addEventListener("close", () => {
  //   setStatus("🔴 WebSocket 연결 종료됨");
  // });

  // socket.addEventListener("error", () => {
  //   setStatus("⚠️ WebSocket 오류 발생");
  // });

  // // 📥 서버에서 오는 메시지 처리 (resync 대응 추가)
  // socket.addEventListener("message", (event) => {
  //   const msg = JSON.parse(event.data);

  //   // 서버가 resync 요청한 경우
  //   if (msg.type === "resync" && msg.documentId === documentId) {
  //     const text = content;
  //     const resyncMessage = {
  //       documentId: documentId,
  //       operation: "resync",
  //       page: page,
  //       start: 0,
  //       end: text.length,
  //       text: text,
  //     };
  //     if (socket.readyState === WebSocket.OPEN) {
  //       socket.send(JSON.stringify(resyncMessage));
  //       console.log("📤 [RESYNC] 전체 문서 전송:", resyncMessage);
  //     }
  //   }
  // });

  // 🔁 사용자 입력 → diff 계산 후 insert/delete 전송
  let debounceTimer: number;
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

        // if (message && socket.readyState === WebSocket.OPEN) {
        //   socket.send(JSON.stringify(message));
        //   console.log(`📤 [${message.operation.toUpperCase()}] 전송:`, message);
        // }
      }
      prevText = currText;
    }, 500);
  };
  return (
    <>
      {/* <SideBar /> */}
      <MdEditor
        style={{ height: "500px" }}
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
    </>
  );
};
export default EditorPage;
