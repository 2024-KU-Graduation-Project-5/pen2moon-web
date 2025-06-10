import logo from "../assets/logo.svg";
import convertIcon from "../assets/convert.svg";
import SmallFile from "./SmallFile";
import dotsIcon from "../assets/dots.svg";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { useState } from "react";
import { MyDocument } from "../apis/ocr";
import { useNavigate } from "react-router-dom";

const SideBar = ({ fileList }: { fileList: MyDocument[] }) => {
  const [collapsed, setCollapsed] = useState(false);
  const onDotsClick = () => {
    window.location.href = "/recent";
  };
  const onLogoClick = () => {
    window.location.href = "/";
  };
  return (
    <>
      <div
        className={`h-screen bg-gray-50 transition-all duration-300 ease-in-out ${
          collapsed ? "w-8" : "w-60"
        }`}
      >
        <div className="relative h-full">
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-black"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <CircleChevronRight size={20} />
            ) : (
              <CircleChevronLeft size={20} />
            )}
          </button>

          <div
            className={`pl-7 pt-7 cursor-pointer ${collapsed ? "hidden" : ""}`}
            onClick={onLogoClick}
          >
            <img className="w-40" src={logo} />
          </div>

          {!collapsed && (
            <div
              className="flex mt-12 pl-7 items-center cursor-pointer"
              onClick={onLogoClick}
            >
              <img className="mr-2" src={convertIcon} />새 PDF 변환하기
            </div>
          )}
          {!collapsed && (
            <div className="mt-6 text-gray-400 pl-7">
              <div className="flex items-center">
                <div className="mb-1 mr-1">최근 작업내역</div>

                <img
                  className="ml-auto mr-4 cursor-pointer"
                  src={dotsIcon}
                  onClick={onDotsClick}
                />
              </div>
              {fileList &&
                fileList.map((value, index) => (
                  <SmallFile key={value.id} title={value.title} id={value.id} />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
