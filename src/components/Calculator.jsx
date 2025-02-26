import  { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [currentDisplay, setCurrentDisplay] = useState("");
  const [formula, setFormula] = useState("");

  const handleNumber = (num) => {
    setCurrentDisplay((prev) => {
      if (prev === "0" || prev === "-0") {
        return num === "0" ? prev : num;
      } else {
        return prev + num;
      }
    });
  };

  const handleOperator = (op) => {
    setFormula((prevFormula) => {
      let newFormula = prevFormula;
      if (op === "-" && currentDisplay === "") {
        const lastChar = prevFormula.slice(-1);
        if (["+", "-", "*", "/"].includes(lastChar)) {
          setCurrentDisplay("-");
          return prevFormula;
        }
      }

      if (currentDisplay !== "") {
        newFormula += currentDisplay + op;
        setCurrentDisplay("");
      } else {
        const lastChar = prevFormula.slice(-1);
        if (["+", "-", "*", "/"].includes(lastChar)) {
          newFormula = newFormula.slice(0, -1) + op;
        } else {
          newFormula += op;
        }
      }

      return newFormula;
    });
  };

  const handleDecimal = () => {
    setCurrentDisplay((prev) => (prev.includes(".") ? prev : prev + "."));
  };

  const handleClear = () => {
    setCurrentDisplay("");
    setFormula("");
  };

  const handleEquals = () => {
    try {
      const newFormula = formula + currentDisplay;
      const result = eval(newFormula).toString();
      setCurrentDisplay(result);
      setFormula("");
    } catch (error) {
      setCurrentDisplay(error.message);
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">
        {currentDisplay || "0"}
      </div>
      <div className="buttons">
        <button id="clear" onClick={handleClear}>AC</button>
        <button id="add" onClick={() => handleOperator("+")}>+</button>
        <button id="subtract" onClick={() => handleOperator("-")}>-</button>
        <button id="multiply" onClick={() => handleOperator("")}>*</button>
        <button id="divide" onClick={() => handleOperator("/")}>/</button>
        <button id="equals" onClick={handleEquals}>=</button>
        <button id="decimal" onClick={handleDecimal}>.</button>
        <button id="zero" onClick={() => handleNumber("0")}>0</button>
        <button id="one" onClick={() => handleNumber("1")}>1</button>
        <button id="two" onClick={() => handleNumber("2")}>2</button>
        <button id="three" onClick={() => handleNumber("3")}>3</button>
        <button id="four" onClick={() => handleNumber("4")}>4</button>
        <button id="five" onClick={() => handleNumber("5")}>5</button>
        <button id="six" onClick={() => handleNumber("6")}>6</button>
        <button id="seven" onClick={() => handleNumber("7")}>7</button>
        <button id="eight" onClick={() => handleNumber("8")}>8</button>
        <button id="nine" onClick={() => handleNumber("9")}>9</button>
      </div>
    </div>
  );
};

export default Calculator;