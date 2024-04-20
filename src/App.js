import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [lowercaseBoolean, setLowercaseBoolean] = useState(false);
  const [uppercaseBoolean, setUpperCaseBoolean] = useState(false);
  const [numberBoolean, setNumberBoolean] = useState(false);
  const [symbolBoolean, setSymbolBoolean] = useState(false);

  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const spacialChar = "~!@#$%^&*()_?";

  const lengthRef = useRef(null);

  const generate = () => {
    let length = lengthRef.current.value;
    let password = "";

    while (
      password.length < length &&
      (lowercaseBoolean || uppercaseBoolean || numberBoolean || symbolBoolean)
    ) {
      if (lowercaseBoolean && password.length < length) {
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
      }
      if (uppercaseBoolean && password.length < length) {
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
      }
      if (numberBoolean && password.length < length) {
        password += numbers[Math.floor(Math.random() * numbers.length)];
      }
      if (symbolBoolean && password.length < length) {
        password += spacialChar[Math.floor(Math.random() * spacialChar.length)];
      }
    }
    if (password === "") {
      toast("please select one of the checkboxes");
    }
    setGeneratedPassword(password);
  };

  const copy = () => {
    toast("Copied Successfully");
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <input
        type="text"
        value={generatedPassword}
        readOnly
        placeholder="Generated Password"
      />
      <input
        type="number"
        defaultValue={6}
        placeholder="Length"
        ref={lengthRef}
      ></input>
      <button onClick={generate}>Generate</button>
      <CopyToClipboard text={generatedPassword}>
        <button disabled={generatedPassword === ""} onClick={copy}>
          Copy
        </button>
      </CopyToClipboard>

      <ToastContainer />
      <div className="checkBoxesContainer">
        <input
          type="checkbox"
          id="lowercase"
          onChange={() => setLowercaseBoolean(!lowercaseBoolean)}
        />
        <label for="lowercase">Add Lower Case Letters</label>
        <br />
        <input
          type="checkbox"
          id="uppercase"
          onChange={() => setUpperCaseBoolean(!uppercaseBoolean)}
        />
        <label for="uppercase">Add Upper Case Letters</label>
        <br />
        <input
          type="checkbox"
          id="numbers"
          onChange={() => setNumberBoolean(!numberBoolean)}
        />
        <label for="numbers"> Add Numbers</label>
        <br />
        <input
          type="checkbox"
          id="symbol"
          onChange={() => setSymbolBoolean(!symbolBoolean)}
        />
        <label for="symbol"> Add Special Character</label>
        <br />
      </div>
    </div>
  );
}

export default App;
