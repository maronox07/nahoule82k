import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      // store admin session in localStorage for demonstration
      localStorage.setItem("adminUser", JSON.stringify(data.admin));
      router.push("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="p-2 bg-stakeGray rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 bg-stakeGray rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-stakeAccent py-2 rounded text-black font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}
