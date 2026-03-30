export default function AuthSuccess() {
  // 🔥 langsung eksekusi tanpa useEffect
  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");

  console.log("TOKEN:", token);

  if (token) {
    localStorage.setItem("token", token);

    // 🔥 redirect HARD (bukan inertia)
    window.location.replace("/dashboard");
  } else {
    window.location.replace("/login");
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-500">Logging you in...</p>
    </div>
  );
}
