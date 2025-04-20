import { useState } from "react";
import SideBar from "../components/Sidebar";
import UploadFile from "../components/UploadFile";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const uploadFile = () => {
    //TODO : FILE UPLOAD
    setIsLoading(true);
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
            <button className="mt-12 text-white text-center text-[28px] rounded-[24px] bg-[#FF5959] pt-1 pb-1 pl-20 pr-20">
              취소하기
            </button>
          </div>
        </>
      ) : (
        <>
          <SideBar />
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
