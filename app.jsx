    import React, { useState } from "react";
    import "./model.css";

    
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

    const btnClass = (extra = "") =>
        `p-4 rounded-xl text-lg font-semibold shadow-md active:scale-95 transition ${extra}`;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg">
            {/* Display */}
            <div className="bg-black text-right p-4 rounded-lg mb-4">
            <div className="text-gray-400 text-sm">{previousInput}</div>
            <div className="text-white text-3xl font-bold">{currentInput}</div>
            <div className="flex justify-between text-gray-400 text-sm mt-1">
                {memory !== 0 && <span>Memory: {memory}</span>}
                <span
                className="cursor-pointer hover:text-white"
                onClick={() => setIsRadians(!isRadians)}
                >
                {isRadians ? "RAD" : "DEG"}
                </span>
            </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-3">
            {/* Angka */}
            {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((n) => (
                <button
                key={n}
                onClick={() => updateInput(n.toString())}
                className={btnClass("bg-gray-700 text-white hover:bg-gray-600")}
                >
                {n}
                </button>
            ))}
            <button
                onClick={addDecimal}
                className={btnClass("bg-gray-700 text-white hover:bg-gray-600")}
            >
                .
            </button>

            {/* Operasi */}
            <button
                onClick={() => chooseOperation("add")}
                className={btnClass("bg-blue-600 text-white hover:bg-blue-500")}
            >
                +
            </button>
            <button
                onClick={() => chooseOperation("subtract")}
                className={btnClass("bg-blue-600 text-white hover:bg-blue-500")}
            >
                -
            </button>
            <button
                onClick={() => chooseOperation("multiply")}
                className={btnClass("bg-blue-600 text-white hover:bg-blue-500")}
            >
                ×
            </button>
            <button
                onClick={() => chooseOperation("divide")}
                className={btnClass("bg-blue-600 text-white hover:bg-blue-500")}
            >
                ÷
            </button>
            <button
                onClick={() => chooseOperation("power")}
                className={btnClass("bg-blue-600 text-white hover:bg-blue-500")}
            >
                ^
            </button>
            <button
                onClick={() => chooseOperation("mod")}
                className={btnClass("bg-blue-600 text-white hover:bg-blue-500")}
            >
                %
            </button>

            {/* Fungsi */}
            <button
                onClick={toggleSign}
                className={btnClass("bg-purple-600 text-white hover:bg-purple-500")}
            >
                +/-
            </button>
            <button
                onClick={clearAll}
                className={btnClass("bg-red-600 text-white hover:bg-red-500")}
            >
                C
            </button>
            <button
                onClick={compute}
                className={btnClass("bg-green-600 text-white hover:bg-green-500 col-span-2")}
            >
                =
            </button>

            {/* Scientific */}
            <button
                onClick={() => scientificFunction("sqrt")}
                className={btnClass("bg-yellow-600 text-white hover:bg-yellow-500")}
            >
                √
            </button>
            <button
                onClick={() => scientificFunction("square")}
                className={btnClass("bg-yellow-600 text-white hover:bg-yellow-500")}
            >
                x²
            </button>
            <button
                onClick={() => scientificFunction("sin")}
                className={btnClass("bg-yellow-600 text-white hover:bg-yellow-500")}
            >
                sin
            </button>
            <button
                onClick={() => scientificFunction("cos")}
                className={btnClass("bg-yellow-600 text-white hover:bg-yellow-500")}
            >
                cos
            </button>
            <button
                onClick={() => scientificFunction("tan")}
                className={btnClass("bg-yellow-600 text-white hover:bg-yellow-500")}
            >
                tan
            </button>

            {/* Memory */}
            <button
                onClick={() => memoryFunction("mc")}
                className={btnClass("bg-pink-600 text-white hover:bg-pink-500")}
            >
                MC
            </button>
            <button
                onClick={() => memoryFunction("mr")}
                className={btnClass("bg-pink-600 text-white hover:bg-pink-500")}
            >
                MR
            </button>
            <button
                onClick={() => memoryFunction("m+")}
                className={btnClass("bg-pink-600 text-white hover:bg-pink-500")}
            >
                M+
            </button>
            <button
                onClick={() => memoryFunction("m-")}
                className={btnClass("bg-pink-600 text-white hover:bg-pink-500")}
            >
                M-
            </button>
            <button
                onClick={() => memoryFunction("ms")}
                className={btnClass("bg-pink-600 text-white hover:bg-pink-500")}
            >
                MS
            </button>
            <button
                onClick={() => memoryFunction("m~")}
                className={btnClass("bg-pink-600 text-white hover:bg-pink-500")}
            >
                M±
            </button>
            </div>
        </div>
        </div>
    );
    }
