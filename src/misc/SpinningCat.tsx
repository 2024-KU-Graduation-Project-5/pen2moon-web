const SpinningCat = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center">
        <div className="w-64 h-64 bg-transparent relative">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm41bTRqM2ZibTQybDNjNms5d3p1a3h6ODRpNnZkZW9hN2tkaW9oeCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VbnUQpnihPSIgIXuZv/giphy.gif"
            alt="Spinning Cat"
            className="w-full h-full rounded-full absolute top-0 left-0 animate-spin-slow"
            style={{
              animation: "spin 4s linear infinite", // 3D 효과로 회전 속도 조절
              transformStyle: "preserve-3d", // 3D 공간에서 유지
              animationTimingFunction: "linear",
            }}
          />
        </div>
        <p className="mt-6 text-white text-2xl font-bold animate-pulse">
          OIIA OIIA
        </p>
      </div>
    </div>
  );
};

export default SpinningCat;
