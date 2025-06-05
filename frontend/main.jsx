import React from "react";
import ReactDOM from "react-dom/client";
import App from "/app";

import { backend } from 'declarations/backend';

const actor = backend;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App actor={actor} />
  </React.StrictMode>
);
