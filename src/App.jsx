import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*'`~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setCopied(false);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900  to-slate-700 text-white px-4">
      {/* Copy Toast Notification */}
      {copied && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-800 text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-500">
          Password copied to clipboard!
        </div>
      )}

      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Password Generator
        </h2>
        
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={password}
            className="w-full py-3 px-4 bg-gray-700/50 rounded-lg outline-none ring-2 ring-blue-400/30 focus:ring-blue-400/50 transition-all text-white placeholder-gray-400"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg active:scale-95 transition-all duration-200 font-semibold"
          >
            {copied ? '✓' : 'Copy'}
          </button>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-300">Length: {length}</label>
              <span className="text-blue-400 font-bold">{length}</span>
            </div>
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <label className="text-sm text-gray-300">Include Numbers</label>
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="w-5 h-5 cursor-pointer accent-blue-500 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <label className="text-sm text-gray-300">Include Special Characters</label>
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="w-5 h-5 cursor-pointer accent-blue-500 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;