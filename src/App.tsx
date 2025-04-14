import { useState } from "react";
import mainLogo from "./assets/logo.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img src={mainLogo}></img>
        <div className="flex flex-col max-w-lg bg-red items-center">
          <input className="grow" type="text"></input>
          <input className="grow" type="text"></input>
          <button>ddfaf</button>
          <div>
            <div>회원가입</div>
          </div>
        </div>
      </div>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
