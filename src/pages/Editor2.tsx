import SideBar from "../components/Sidebar";
import { createReactEditorJS } from "react-editor-js";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import EditorJSList from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { Stage, Layer, Image as KonvaImage, Rect } from "react-konva";
import previewImg from "../assets/preview.png";

const blocks = {
  time: 1635603431943,
  blocks: [
    {
      id: "sheNwCUP5A",
      type: "header",
      data: {
        text: "ttttt",
        level: 2,
      },
    },
    {
      id: "12iM3lqzcm",
      type: "paragraph",
      data: {
        text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
      },
    },
    {
      id: "listBlock",
      type: "list",
      data: {
        items: ["Item 1", "Item 2", "Item 3"],
        style: "unordered",
      },
    },
  ],
};
const EDITOR_JS_TOOLS = {
  header: Header,
  paragraph: Paragraph,
  list: EditorJSList,
  image: ImageTool,
};

const ReactEditorJS = createReactEditorJS();

const EditorPage2 = () => {
  console.log(blocks);
  const ejInstance = useRef(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const initEditor = () => {
    const editor = new EditorJS({
      tools: EDITOR_JS_TOOLS,
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: blocks,
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
      },
    });
  };

  useEffect(() => {
    const editorEl = document.getElementById("editorjs");
    if (editorEl) {
      const onEditorFocus = () => {
        setIsSelected((prev) => !prev);
        console.log(isSelected);
      };

      editorEl.addEventListener("focusin", onEditorFocus);
      editorEl.addEventListener("focusout", onEditorFocus);
      // return () => {
      //   editorEl.removeEventListener("focusin", onEditorFocus);
      //   editorEl.removeEventListener("focusout", onEditorFocus);
      // };
    }

    const img = new window.Image();
    img.src = previewImg;
    img.onload = () => {
      setImage(img);
    };

    if (ejInstance.current === null) {
      initEditor();
    }
    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-1">
        <div className="flex-1 p-10">
          <Stage width={580} height={835}>
            <Layer>
              {image && <KonvaImage image={image} />}
              {isSelected && (
                <Rect
                  x={100}
                  y={60}
                  width={120}
                  height={10}
                  fill="yellow"
                  opacity={0.4}
                  cornerRadius={4}
                />
              )}
            </Layer>
          </Stage>
        </div>
        <div className="flex-1  p-10 cursor-text" id="editorjs" />
      </div>
    </div>
  );
};
export default EditorPage2;
