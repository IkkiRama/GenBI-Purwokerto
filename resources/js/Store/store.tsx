import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});

// subscribe ke perubahan state
store.subscribe(() => {
  const state = store.getState();
  const isDark = state.theme.isDark;

  // simpan ke localStorage
  localStorage.setItem("theme", JSON.stringify(isDark));

  // langsung apply ke html (biar instant)
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
