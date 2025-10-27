import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Redirect based on role (from context) - update this to use user.role after login
      navigate("/registrar");  // Example; in real, use: if (user.role === 'JUDGE') navigate('/judge'); etc.
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0E1A24] relative">
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-1/2 h-1/2 text-gray-400" fill="currentColor">
          <path d="M32 4L4 16v4h56v-4L32 4zm-2 12v28h-8V16h8zm12 0v28h-8V16h8zM8 24v20h8V24H8zm40 0v20h8V24h-40zM4 48v4h56v-4H4z" />
        </svg>
      </div>
      <div className="relative w-[420px] shadow-lg rounded-lg bg-[#1C2935] text-white">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <div className="bg-[#0B66CC] h-12 w-12 flex items-center justify-center rounded-md text-white font-bold mr-3 text-lg">
              JIS
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg">Judiciary Information System</h1>
              <p className="text-sm text-gray-400">Secure court case management</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="e.g., registrar.john"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#243545] border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#0B66CC] focus:outline-none text-sm"
            />
            <div>
              <input
                type="password"
                placeholder="●●●●●●●"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#243545] border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#0B66CC] focus:outline-none text-sm"
              />
              <a href="#" className="text-xs text-[#4EA1FF] mt-1 inline-block hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="w-full bg-[#0B66CC] text-white text-sm rounded-md py-2 font-medium">
              Sign In
            </button>
            <button type="button" className="w-full border border-gray-600 text-sm rounded-md py-2 bg-transparent text-white">
              Sign in with SSO
            </button>
            <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded bg-[#243545] border-gray-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:underline">Need an account? Contact Registrar</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}