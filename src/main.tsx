import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { ThemeProvider } from "./theme/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { fontSize: "14px" },
            }}
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
