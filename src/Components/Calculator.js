import React, { useState } from "react";
import "../Styles/Calculator.css";

const Calculator = ({ closeModal }) => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleEvaluate = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="calculator-modal">
      <div className="calculator">
        <button className="close-modal-btn" onClick={closeModal}>
          X
        </button>
        <input
          type="text"
          value={input}
          className="display"
          readOnly
          placeholder="0"
        />
        <div className="buttons">
  <button onClick={() => handleClear()} className="btn">
    C
  </button>
  <button onClick={() => handleClick("%")} className="btn">
    %
  </button>
  <button onClick={() => handleClick(".")} className="btn">
    .
  </button>
  <button onClick={() => handleClick("/")} className="btn">
    /
  </button>
  <button onClick={() => handleClick("7")} className="btn">
    7
  </button>
  <button onClick={() => handleClick("8")} className="btn">
    8
  </button>
  <button onClick={() => handleClick("9")} className="btn">
    9
  </button>
  <button onClick={() => handleClick("*")} className="btn">
    *
  </button>
  <button onClick={() => handleClick("4")} className="btn">
    4
  </button>
  <button onClick={() => handleClick("5")} className="btn">
    5
  </button>
  <button onClick={() => handleClick("6")} className="btn">
    6
  </button>
  <button onClick={() => handleClick("-")} className="btn">
    -
  </button>
  <button onClick={() => handleClick("1")} className="btn">
    1
  </button>
  <button onClick={() => handleClick("2")} className="btn">
    2
  </button>
  <button onClick={() => handleClick("3")} className="btn">
    3
  </button>
  <button onClick={() => handleClick("+")} className="btn">
    +
  </button>
  <button onClick={() => handleClick("0")} className="btn">
    0
  </button>
  <button onClick={handleEvaluate} className="btn equal">
    =
  </button>
</div>

      </div>
    </div>
  );
};

export default Calculator;
