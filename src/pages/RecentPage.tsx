import Login from "../components/Login";
import RecentFile from "../components/RecentFile";
import SideBar from "../components/Sidebar";

const RecentPage = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="mt-25 ml-5 mr-5 grow ">
          <div className="mb-4 text-4xl font-semibold">최근 작업 내역</div>
          <div>
            <RecentFile
              title="졸업프로젝트 1주차 학습 내용 정리"
              expireDate="24.12.31"
              createAt="2024.12.01"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentPage;
