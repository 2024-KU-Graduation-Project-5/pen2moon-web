import example from "../assets/example.png";
import LargePDFIcon from "../assets/pdf_large.svg";
import EditIcon from "../assets/edit.svg";
import DeleteIcon from "../assets/delete.svg";
const RecentFile = ({
  title,
  expireDate,
  createAt,
}: {
  title: string;
  expireDate: string;
  createAt: string;
}) => {
  return (
    <div className="flex rounded-xl border border-gray-300 p-3">
      <div>
        <img src={LargePDFIcon} />
      </div>
      <div className="flex flex-col grow-1 ml-7">
        <div className="text-2xl">{title}</div>
        <div className="mt-4">만료일</div>
        <div>~ {expireDate}</div>
      </div>
      <div className="flex flex-row items-center gap-3">
        <div className="mr-12 text-2xl">{createAt}</div>
        <div>
          <img src={EditIcon} />
        </div>
        <div>
          <img src={DeleteIcon} />
        </div>
      </div>
    </div>
  );
};

export default RecentFile;
