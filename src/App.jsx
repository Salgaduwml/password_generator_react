/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full bg-slate-800 max-w-lg p-6 border border-[rgba(255,255,255,0.2)] rounded-md">
        <h1 className="text-white font-semibold text-3xl">
          Password Generator
        </h1>
        <div className="mt-10 flex items-stretch overflow-hidden rounded-md">
          <input
            type="text"
            className="w-full p-2 outline-none text-black"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-600 px-3 h-auto text-white"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 mt-6">
          <div className="flex items-center text-white gap-4">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label htmlFor="label">Length: {length}</label>
          </div>
          <div className="flex items-center text-white gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              id="number"
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center text-white gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              id="character"
            />
            <label htmlFor="character">Characters</label>
          </div>
        </div>
        <p className="text-sm mt-10 text-center text-gray-400">
          Made with ❤️ by Malinda Lakshan
          <br />
          www.malindalakshan.com
        </p>
      </div>
    </div>
  );
}

export default App;
