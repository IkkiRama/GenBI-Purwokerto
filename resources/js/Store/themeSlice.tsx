import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme");

    // kalau null → default false
    if (saved === null) return false;

    // handle legacy value "light" / "dark"
    if (saved === "dark") return true;
    if (saved === "light") return false;

    // kalau boolean JSON
    try {
      return JSON.parse(saved);
    } catch {
      return false;
    }
  }
  return false;
};

const initialState = {
  isDark: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("theme", JSON.stringify(state.isDark));
    },
    setTheme: (state, action) => {
      state.isDark = action.payload;
      localStorage.setItem("theme", JSON.stringify(state.isDark));
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
