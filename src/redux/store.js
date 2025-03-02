import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ticketReducer from "./ticketSlice"; 

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
  },
  preloadedState: {
    auth: { user, token, isAuthenticated: !!token },
  },
});

store.subscribe(() => {
  const { user, token } = store.getState().auth;
  localStorage.setItem("token", token || "");
  localStorage.setItem("user", JSON.stringify(user || null));
});

export default store;