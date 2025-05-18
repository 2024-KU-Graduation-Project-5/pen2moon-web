const Spinner = () => {
  return (
    <div className="bg-white">
      <div
        className="w-48 h-48 border-24 border-green-500 border-t-transparent rounded-full"
        style={{
          animation: "spin 2s linear infinite",
        }}
      ></div>
    </div>
  );
};

export default Spinner;
