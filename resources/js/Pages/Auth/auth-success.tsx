import { useEffect } from "react";

const AuthSuccess = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/login";
    }
  }, []);

  return <div className="p-10 text-center">Login berhasil...</div>;
};

export default AuthSuccess;
