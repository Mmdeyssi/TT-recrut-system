import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.jsx";
import { Provider } from "react-redux"; // ✅ Import Redux Provider
import { store } from "./redux/store"; // ✅ Import your Redux store
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import React from "react";

let persistor = persistStore(store);
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
