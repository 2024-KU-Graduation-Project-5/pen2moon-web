import pdfIcon from "../assets/pdf.svg";

const SmallFile = ({ title }: { title: string }) => {
  return (
    <div className="flex text-black">
      <img className="mr-1 mb-1" src={pdfIcon} />
      {title}
    </div>
  );
};

export default SmallFile;
