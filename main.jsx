    import React from "react";
    import ReactDOM from "react-dom/client";
    import App from "./App.jsx";  // komponen utama
    import "./index.css";         // css global (opsional)

    ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    );
