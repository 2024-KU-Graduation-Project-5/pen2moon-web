import { useEffect, useState } from "react";
import Login from "../components/Login";
import RecentFile from "../components/RecentFile";
import SideBar from "../components/Sidebar";
import { MyDocument, getMyDocuments } from "../apis/ocr";

const RecentPage = () => {
  const [docs, setDocs] = useState<MyDocument[]>();
  useEffect(() => {
    getMyDocuments().then((res) => {
      setDocs(res);
    });
  }, []);
  return (
    <>
      <div className="flex">
        <SideBar fileList={docs!} />
        <div className="mt-25 ml-5 mr-5 grow ">
          <div className="mb-4 text-4xl font-semibold">최근 작업 내역</div>

          <div>
            {docs?.map((data) => {
              const createdDate = data.date.split("T")[0];
              const date = new Date(createdDate);
              date.setFullYear(date.getFullYear() + 1);
              const expireDate = date.toISOString().split("T")[0];
              return (
                <RecentFile
                  title={data.title}
                  expireDate={expireDate}
                  createAt={data.date.split("T")[0]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentPage;
