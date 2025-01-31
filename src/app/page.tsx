"use client";

import { useState, FormEvent } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import LoginAnimation from "@/components/ui-components/LoginAnimation";
import Link from "next/link";
import { LoginUser } from "@/lib/actions/adminAuth.action";
import { Toaster, toast } from "sonner";

interface LoginResponse {
  message?: string;
  error?: string;
  redirect?: {
    destination: string;
  };
}

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (pass === "" || email === "") {
      toast.warning("Email or Password required!", {
        position: "top-center",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      toast.warning("Provide a valid email", {
        position: "top-center",
      });
      return;
    }

    const data = { email: email, password: pass }; // Data To Be Send To Backend

    setLoading(true);
    const result: LoginResponse = await LoginUser(data); // Call Login Api

    setLoading(false);

    if (result.message) {
      toast.success("Login Successfully, Welcome to FLIS", {
        position: "bottom-center",
      });
      const redirectDestination = result.redirect?.destination || "/";
      router.push(redirectDestination);
    } else if (result.error) {
      toast.error(`Failed to login!! ${result.error}`, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 relative">
      <div className="flex w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg">
        {/* Left Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
          <h1 className="login-main-text text-4xl font-bold text-gray-800 mb-4">
            Welcome back!
          </h1>
          <p className="text-gray-500 mb-8">
            Unlock Your Potential: Every Login Starts a New Journey!
          </p>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="relative">
              <label className="sr-only">Email</label>
              <div className="absolute left-3 top-4 text-lg text-gray-500">
                <FaUser />
              </div>
              <input
                type="text"
                placeholder="Email"
                autoComplete="off"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="sr-only">Password</label>
              <div className="absolute left-3 top-4 text-lg text-gray-500">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                value={pass || ""}
                onChange={(e) => setPass(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-4 text-lg text-gray-500">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right text-sm text-gray-700">
              {/* <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded-lg h-[14px] w-[14px]" // Space between checkbox and label
                  // You can add state management here if necessary
                />
                Remember Me
              </label> */}
              <Link href="#" className="text-gray-700 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 tracking-wider rounded-full transition duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }`}>
                {loading ? (
                  <span className="flex justify-center items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12c0-4.418 3.582-8 8-8 1.75 0 3.375.5 4.748 1.355l-1.304 1.304C13.697 6.032 12.0 6 12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c0 0 .697-.032 1.444-.659l1.304 1.304C15.375 21.5 13.75 22 12 22c-4.418 0-8-3.582-8-8z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="w-full border-gray-300" />
          </div>

          {/* Animation */}
          <div className="flex justify-center items-center">
            <LoginAnimation />
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-700 mt-6">
            Not a member?{" "}
            <Link href="/sign-up" className="text-green-600 hover:underline">
              Register now
            </Link>
          </p>
        </div>

        {/* Right Column: Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-6 bg-gray-100 rounded-lg">
          <div className="text-center">
            <Image
              width={1000}
              height={1000}
              src="/assets/loaders/login-page.svg"
              alt="Illustration"
              className="w-72 mx-auto mb-4 object-cover object-center"
            />
            <p className="text-lg text-gray-700">
              Unlock the door to knowledge and let learning be your guide.{" "}
              <strong>Future Leaders International School</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Logo */}
      <div className="absolute bottom-4 right-4 flex flex-col items-end px-3">
        <Link href="https://appariumnewapp.vercel.app/">
          <span className="ml-2 text-gray-600 text-sm">
            Created and Developed by <strong>Supranostik</strong>, 2024
          </span>
        </Link>
      </div>
      <Toaster richColors />
    </div>
  );
}
