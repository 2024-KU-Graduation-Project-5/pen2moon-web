import mainLogo from "../assets/logo.svg";

const LoginPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={mainLogo}></img>
        <div className=" flex flex-col w-full max-w-lg bg-red items-center mt-10">
          <input
            className="w-full border border-gray-500 rounded-md p-2"
            type="text"
            placeholder="이메일을 입력해주세요"
          ></input>
          <input
            className="w-full border border-gray-500 mt-3 rounded-md p-2"
            type="text"
            placeholder="패스워드를 입력해주세요"
          ></input>
          <button className="w-full text-white bg-black mt-3 rounded-md p-2">
            Sign In
          </button>
          <div className="w-full mt-3 text-start">
            <div className="">회원가입</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
