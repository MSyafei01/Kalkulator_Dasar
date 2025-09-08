import React, { useState } from "react";

export default function Calculator() {
  const [currentInput, setCurrentInput] = useState("0");
  const [previousInput, setPreviousInput] = useState("");
  const [operation, setOperation] = useState(null);
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  const updateInput = (value) => {
    if (currentInput === "0" || shouldReset) {
      setCurrentInput(value);
      setShouldReset(false);
    } else {
      setCurrentInput(currentInput + value);
    }
  };

  const clearAll = () => {
    setCurrentInput("0");
    setPreviousInput("");
    setOperation(null);
    setShouldReset(false);
  };

  const chooseOperation = (op) => {
    if (currentInput === "0") return;
    if (previousInput !== "") compute();
    setOperation(op);
    setPreviousInput(currentInput);
    setShouldReset(true);
  };

  const compute = () => {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    let result;
    switch (operation) {
      case "add":
        result = prev + curr;
        break;
      case "subtract":
        result = prev - curr;
        break;
      case "multiply":
        result = prev * curr;
        break;
      case "divide":
        result = prev / curr;
        break;
      case "power":
        result = Math.pow(prev, curr);
        break;
      case "mod":
        result = prev % curr;
        break;
      default:
        return;
    }

    setCurrentInput(result.toString());
    setOperation(null);
    setPreviousInput("");
  };

  const addDecimal = () => {
    if (shouldReset) {
      setCurrentInput("0.");
      setShouldReset(false);
    } else if (!currentInput.includes(".")) {
      setCurrentInput(currentInput + ".");
    }
  };

  const toggleSign = () => {
    setCurrentInput((parseFloat(currentInput) * -1).toString());
  };

  const memoryFunction = (func) => {
    const current = parseFloat(currentInput);
    switch (func) {
      case "mc":
        setMemory(0);
        break;
      case "mr":
        setCurrentInput(memory.toString());
        break;
      case "m+":
        setMemory(memory + current);
        break;
      case "m-":
        setMemory(memory - current);
        break;
      case "ms":
        setMemory(current);
        break;
      case "m~":
        setMemory(-memory);
        break;
    }
  };

  const scientificFunction = (func) => {
    const curr = parseFloat(currentInput);
    let result;
    switch (func) {
      case "sqrt":
        result = curr < 0 ? "Error" : Math.sqrt(curr);
        break;
      case "square":
        result = Math.pow(curr, 2);
        break;
      case "sin":
        result = isRadians ? Math.sin(curr) : Math.sin(curr * Math.PI / 180);
        break;
      case "cos":
        result = isRadians ? Math.cos(curr) : Math.cos(curr * Math.PI / 180);
        break;
      case "tan":
        result = isRadians ? Math.tan(curr) : Math.tan(curr * Math.PI / 180);
        break;
      default:
        return;
    }
    setCurrentInput(result.toString());
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="history">{previousInput}</div>
        <div className="input">{currentInput}</div>
        <div className="status">
          {memory !== 0 && <span>Memory: {memory}</span>}
          <span onClick={() => setIsRadians(!isRadians)}>
            {isRadians ? "RAD" : "DEG"}
          </span>
        </div>
      </div>

      <div className="buttons">
        {/* Angka */}
        {[...Array(10).keys()].map((n) => (
          <button key={n} onClick={() => updateInput(n.toString())}>
            {n}
          </button>
        ))}
        <button onClick={addDecimal}>.</button>

        {/* Operasi */}
        <button onClick={() => chooseOperation("add")}>+</button>
        <button onClick={() => chooseOperation("subtract")}>-</button>
        <button onClick={() => chooseOperation("multiply")}>×</button>
        <button onClick={() => chooseOperation("divide")}>÷</button>
        <button onClick={() => chooseOperation("power")}>^</button>
        <button onClick={() => chooseOperation("mod")}>%</button>

        {/* Fungsi lain */}
        <button onClick={toggleSign}>+/-</button>
        <button onClick={clearAll}>C</button>
        <button onClick={compute}>=</button>

        {/* Scientific */}
        <button onClick={() => scientificFunction("sqrt")}>√</button>
        <button onClick={() => scientificFunction("square")}>x²</button>
        <button onClick={() => scientificFunction("sin")}>sin</button>
        <button onClick={() => scientificFunction("cos")}>cos</button>
        <button onClick={() => scientificFunction("tan")}>tan</button>

        {/* Memory */}
        <button onClick={() => memoryFunction("mc")}>MC</button>
        <button onClick={() => memoryFunction("mr")}>MR</button>
        <button onClick={() => memoryFunction("m+")}>M+</button>
        <button onClick={() => memoryFunction("m-")}>M-</button>
        <button onClick={() => memoryFunction("ms")}>MS</button>
        <button onClick={() => memoryFunction("m~")}>M±</button>
      </div>
    </div>
  );
}
