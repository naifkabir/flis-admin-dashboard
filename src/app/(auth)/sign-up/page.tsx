// "use client";

// import { useState, FormEvent } from "react";
// import { FaUser, FaLock, FaEye, FaEyeSlash, FaUnlockAlt } from "react-icons/fa";
// import { MdAlternateEmail } from "react-icons/md";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import React from "react";
// import Image from "next/image";
// import { SignUpFormApi } from "@/lib/actions/adminAuth.action";
// import { SignUpData } from "@/types/types";
// import { Toaster, toast } from "sonner";

// export default function SignUp() {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState<boolean>(false);
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword((prev) => !prev);
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const lengthRegex = /^.{8,}$/;
//     const upperCaseRegex = /[A-Z]/;
//     const lowerCaseRegex = /[a-z]/;
//     const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     // Validation for empty fields
//     if (
//       name === "" ||
//       email === "" ||
//       password === "" ||
//       confirmPassword === ""
//     ) {
//       toast.warning("All fields are required!", {
//         position: "top-center",
//       });
//       return;
//     }

//     if (!lengthRegex.test(password)) {
//       toast.warning("Password must be at least 8 characters long.", {
//         position: "top-center",
//       });
//       return;
//     }

//     if (!upperCaseRegex.test(password)) {
//       toast.warning("Password must contain at least one uppercase letter.", {
//         position: "top-center",
//       });
//       return;
//     }

//     if (!lowerCaseRegex.test(password)) {
//       toast.warning("Password must contain at least one lowercase letter.", {
//         position: "top-center",
//       });
//       return;
//     }

//     if (!specialCharacterRegex.test(password)) {
//       toast.warning("Password must contain at least one special character.", {
//         position: "top-center",
//       });
//       return;
//     }

//     if (password.length <= 5) {
//       toast.warning(
//         "Almost there! Just make sure your password is longer than 5 characters for better security.",
//         {
//           position: "top-center",
//         }
//       );
//       return;
//     }

//     // Validate email format
//     if (!emailRegex.test(email)) {
//       toast.warning(
//         "That doesn't seem to be a valid email address. Make sure it includes '@' and a domain name.",
//         {
//           position: "top-center",
//         }
//       );
//       return;
//     }

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       toast.error(
//         "Hold on! The passwords don’t match. Double-check them and try again!",
//         {
//           position: "top-center",
//         }
//       );
//       return;
//     }

//     // Include confirmPassword in the data object
//     const data: SignUpData = { name, email, password, role: "admin" };

//     setLoading(true);
//     const result = await SignUpFormApi(data);

//     setLoading(false);

//     if (result.statusCode === 200) {
//       toast.success("Sign up Successful!");

//       // Reset form fields
//       setName("");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");

//       router.push("/");
//     } else if (result.error) {
//       toast.error(result.error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 relative">
//       <div className="flex w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg">
//         {/* Left Column */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Create Account
//           </h1>
//           <p className="text-gray-500 mb-8">
//             Join us to unlock new opportunities!
//           </p>

//           {/* Sign_up Form */}
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {/* Name Input */}
//             <div className="relative">
//               <label className="sr-only">Name</label>
//               <div className="absolute left-3 top-4 text-lg text-gray-500">
//                 <FaUser />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//               />
//             </div>

//             {/* Email Input */}
//             <div className="relative">
//               <label className="sr-only">Email</label>
//               <div className="absolute left-3 top-4 text-lg text-gray-500">
//                 <MdAlternateEmail />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//               />
//             </div>

//             {/* Password Input */}
//             <div className="relative">
//               <label className="sr-only">Password</label>
//               <div className="absolute left-3 top-4 text-lg text-gray-500">
//                 <FaLock />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute right-3 top-4 text-lg text-gray-500">
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             {/* Confirm Password Input */}
//             <div className="relative">
//               <label className="sr-only">Confirm Password</label>
//               <div className="absolute left-3 top-4 text-lg text-gray-500">
//                 <FaUnlockAlt />
//               </div>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
//               />
//               <button
//                 type="button"
//                 onClick={toggleConfirmPasswordVisibility}
//                 className="absolute right-3 top-4 text-lg text-gray-500">
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             {/* Sign_up Button */}
//             <div>
//               <button
//                 type="submit"
//                 disabled={loading} // Disable button when loading
//                 className={`w-full py-3 tracking-wider rounded-full transition duration-300 ${
//                   loading
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-black text-white hover:bg-gray-800"
//                 }`}>
//                 {loading ? (
//                   <span className="flex justify-center items-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24">
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12c0-4.418 3.582-8 8-8 1.75 0 3.375.5 4.748 1.355l-1.304 1.304C13.697 6.032 12.0 6 12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c0 0 .697-.032 1.444-.659l1.304 1.304C15.375 21.5 13.75 22 12 22c-4.418 0-8-3.582-8-8z"></path>
//                     </svg>
//                     Loading...
//                   </span>
//                 ) : (
//                   "Sign Up"
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Login Link */}
//           <p className="text-center text-sm text-gray-700 mt-6">
//             Already a member?{" "}
//             <Link href="/" className="text-green-600 hover:underline">
//               Login now
//             </Link>
//           </p>
//         </div>

//         {/* Right Column: Illustration */}
//         <div className="hidden md:flex w-1/2 items-center justify-center p-6 bg-gray-100 rounded-lg">
//           <div className="text-center">
//             <Image
//               width={1000}
//               height={1000}
//               src="/assets/loaders/sign-up-page.svg"
//               alt="Illustration"
//               className="w-72 mx-auto mb-4 object-cover object-center"
//             />
//             <p className="text-lg text-gray-700">
//               Start your journey with us!
//               <br />
//               <strong>Future Leaders International School</strong>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Footer Logo */}
//       <div className="absolute bottom-4 right-4 flex flex-col items-end px-3">
//         <Link href="#">
//           <Image
//             src="/assets/loaders/logo apparium.png"
//             width={500}
//             height={500}
//             alt="Company Logo"
//             className="w-10 h-10 object-cover object-center rounded-full border p-1 bg-white"
//           />
//         </Link>
//         <span className="ml-2 text-gray-600 text-sm">
//           Created and Developed by <strong>Apparium</strong>, 2024
//         </span>
//       </div>
//       <Toaster richColors />
//     </div>
//   );
// }

"use client";

import { useState, FormEvent } from "react";
import { z } from "zod";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaUnlockAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SignUpFormApi } from "@/lib/actions/adminAuth.action";
import { SignUpData } from "@/types/types";
import { Toaster, toast } from "sonner";

const SignUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = SignUpSchema.safeParse({
      name,
      email,
      password,
      role: "admin",
      confirmPassword,
    });

    if (!validation.success) {
      const newErrors = validation.error.errors.reduce(
        (acc: any, error: any) => {
          acc[error.path[0]] = error.message;
          return acc;
        },
        {}
      );
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    const data: SignUpData = {
      name,
      email,
      password,
      role: "admin",
      confirmPassword,
    };

    setLoading(true);
    const result = await SignUpFormApi(data);

    setLoading(false);

    if (result.statusCode === 201) {
      toast.success("Sign up Successful!", {
        position: "top-center",
      });

      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      router.push("/");
    } else if (result.error) {
      toast.error(result.error, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 relative">
      <div className="flex w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Create Account
          </h1>
          <p className="text-gray-500 mb-8">
            Join us to unlock new opportunities!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="relative">
              <label className="sr-only">Name</label>
              <div className="absolute left-3 top-4 text-lg text-gray-500">
                <FaUser />
              </div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative">
              <label className="sr-only">Email</label>
              <div className="absolute left-3 top-4 text-lg text-gray-500">
                <MdAlternateEmail />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-4 text-lg text-gray-500">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <label className="sr-only">Confirm Password</label>
              <div className="absolute left-3 top-4 text-lg text-gray-500">
                <FaUnlockAlt />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-4 text-lg text-gray-500">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Sign Up Button */}
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
                        d="M4 12c0-4.418 3.582-8 8-8 1.75 0 3.375.5 4.748 1.355l-1.304 1.304C13.697 6.032 12.0 6 12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c0 0 .697-.032 1.444-.062l1.304 1.304C15.375 19.5 13.75 20 12 20c-4.418 0-8-3.582-8-8z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center p-6 bg-gray-100 rounded-lg">
          <div className="text-center">
            <Image
              width={1000}
              height={1000}
              src="/assets/loaders/sign-up-page.svg"
              alt="Illustration"
              className="w-72 mx-auto mb-4 object-cover object-center"
            />
            <p className="text-lg text-gray-700">
              Start your journey with us!
              <br />
              <strong>Future Leaders International School</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col items-end px-3">
        <Link href="#">
          <Image
            src="/assets/loaders/logo apparium.png"
            width={500}
            height={500}
            alt="Company Logo"
            className="w-10 h-10 object-cover object-center rounded-full border p-1 bg-white"
          />
        </Link>
        <span className="ml-2 text-gray-600 text-sm">
          Created and Developed by <strong>Apparium</strong>, 2024
        </span>
      </div>
      <Toaster richColors />
    </div>
  );
}
