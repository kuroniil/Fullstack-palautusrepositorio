import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import notificationTypeReducer from "./reducers/notificationTypeReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    notificationType: notificationTypeReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
