import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import UploadFile from "../components/UploadFile";
import Spinner from "../components/Spinner";
import { MyDocument, getMyDocuments, getTestLogin, postOCR } from "../apis/ocr";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [myDocs, setMyDocs] = useState<MyDocument[]>();
  useEffect(() => {
    getMyDocuments().then((res) => {
      setMyDocs(res);
    });
  }, []);
  const uploadFile = () => {
    //TODO : FILE UPLOAD
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf";

    fileInput.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const f = target.files[0];
        // 여기에 파일을 처리하는 로직 추가
        postOCR(f).then((data) => {
          // console.log(data);
          // PDF 하나만 올리죠 일단 TODO : 여러 개 올리기
          const result = data.parsedPdfList[0].objectList
            .map((item) => item.content.text)
            .join(" ");
          //TODO : 하드콛딩
          window.location.href = `/edit/2`;
          setIsLoading(false);
        });
        // console.log("업로드된 PDF 파일:", f);
        setIsLoading(true);
      }
    };
    fileInput.click(); // 파일 선택 창 열기
  };
  const handleCancelClick = () => {
    setIsLoading(false);
  };
  return (
    <div className="flex">
      {isLoading ? (
        <>
          <div className="flex flex-col justify-center items-center text-center min-h-screen min-w-screen pb-20">
            <p className="text-5xl mb-4 font-semibold">
              변환이 진행 중입니다...
            </p>
            <p className="text-xl mb-6">잠시만 기다려주세요</p>
            <Spinner />
            <button
              className="mt-12 text-white text-center text-[28px] rounded-[24px] bg-[#FF5959] pt-1 pb-1 pl-20 pr-20"
              onClick={handleCancelClick}
            >
              취소하기
            </button>
          </div>
        </>
      ) : (
        <>
          <SideBar fileList={myDocs!} />
          <div className="flex flex-col items-center justify-center flex-1 min-h-screen text-center ml-34 mr-34">
            <div className="text-5xl font-semibold mb-15 leading-tight">
              PDF 파일 또는 이미지 파일을
              <br /> 업로드해주세요
            </div>
            <UploadFile onFileUpload={uploadFile} />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
