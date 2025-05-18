import { MAX_FILE_SIZE } from "../utils/constants";
import UploadIcon from "../assets/upload.svg";

const UploadFile = ({ onFileUpload }: { onFileUpload: () => void }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white shadow-[0px_1px_4.5px_2px_rgba(0,0,0,0.25)] p-9 mb-15">
      <img className="mb-6" src={UploadIcon} width={"60px"} height={"60px"} />
      <div className="mb-6 text-[#454545] text-l">
        최대 용량 : {MAX_FILE_SIZE} MB
      </div>
      <button
        className="rounded-[24px] bg-[#1E1E1E] pl-7 pr-7 pt-3 pb-3 text-white text-l"
        onClick={onFileUpload}
      >
        파일 선택
      </button>
    </div>
  );
};

export default UploadFile;
