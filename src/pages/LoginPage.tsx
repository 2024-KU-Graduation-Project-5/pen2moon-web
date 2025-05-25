import { useNavigate } from "react-router-dom";
import mainLogo from "../assets/logo.svg";

const LoginPage = () => {
  const navigator = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={mainLogo}></img>
        <div className=" flex flex-col w-full max-w-lg bg-red items-center mt-10">
          {/* <input
            className="w-full border border-gray-500 rounded-md p-2"
            type="text"
            placeholder="이메일을 입력해주세요"
          ></input>
          <input
            className="w-full border border-gray-500 mt-3 rounded-md p-2"
            type="text"
            placeholder="패스워드를 입력해주세요"
          ></input> */}
          {/* <button className="w-full text-black bg-white mt-3 rounded-md p-2 ">
            Sign In
          </button> */}

          <a
            href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=481051508755-286nb8nf6e07132r7mpg5o3tt5elj681.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A80%2Fapi%2Flogin%2Foauth%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&service=lso&o2v=1&flowName=GeneralOAuthFlow"
            className="w-full flex items-center justify-center gap-2 text-black bg-white border border-gray-300 mt-3 rounded-md p-2 cursor-pointer"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Sign In
          </a>
          {/* <div className="w-full mt-3 text-start">
            <div className="">회원가입</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
