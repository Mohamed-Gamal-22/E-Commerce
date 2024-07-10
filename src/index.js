import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
