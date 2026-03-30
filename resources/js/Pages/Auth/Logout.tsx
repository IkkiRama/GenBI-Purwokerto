import api from "@/lib/api";
import { useDispatch } from "react-redux";
import { logout } from "@/Store/authSlice";

const dispatch = useDispatch();

const handleLogout = async () => {
  await api.post("/api/logout");
  dispatch(logout());
};
