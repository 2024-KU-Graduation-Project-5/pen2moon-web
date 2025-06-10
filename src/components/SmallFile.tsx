import pdfIcon from "../assets/pdf.svg";

const SmallFile = ({ title, id }: { title: string; id: number }) => {
  const onFileClick = () => {
    window.location.href = `/edit/${id}`;
  };
  return (
    <div
      className="flex text-black break-words truncate cursor-pointer"
      onClick={onFileClick}
    >
      <img className="mr-1 mb-1" src={pdfIcon} />
      {title}
    </div>
  );
};

export default SmallFile;
