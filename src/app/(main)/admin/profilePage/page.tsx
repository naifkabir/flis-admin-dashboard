"use client";

import { Button } from "@/components/ui/button";
import {
  GetCurrentAdminApi,
  ChangePasswordApi,
} from "@/lib/actions/adminAuth.action";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Type
interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
    createdAt: string;
  } | null>(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [,] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const passwordSchema = z
    .object({
      oldPassword: z
        .string()
        .min(8, "Old password must be at least 8 characters long."),
      newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters long."),
      confirmPassword: z
        .string()
        .min(8, "Confirm password must be at least 8 characters long."),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "New password and confirm password do not match.",
      path: ["confirmPassword"], // This will set the error on the confirmPassword field
    });

  // Use React Hook Form with Zod
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Toggle the visibility of the old password input field
   * @returns {void}
   */
  /******  e73d7870-1b04-442f-a9fc-08529c035317  *******/ const toggleOldPasswordVisibility =
    () => {
      setShowOldPassword((prev) => !prev);
    };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Fetch current user details
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await GetCurrentAdminApi();
      setUser(currentUser);
    };

    fetchCurrentUser();
  }, []);

  // Handle password change
  const handleChangePassword = async () => {
    // Validate confirm password
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    setLoading(true);
    const response: ChangePasswordResponse = await ChangePasswordApi(
      oldPassword,
      newPassword
    );
    setLoading(false);

    if (response.success) {
      toast.success(response.message);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    } else {
      toast.error(response.message); // Error
    }
  };

  return (
    <div className="bg-dark-300 flex flex-col md:flex-row gap-8 max-h-screen">
      <div className="border-b-2 md:border-r-2 md:border-b-0 flex justify-center md:flex-col gap-6 md:w-64 w-full h-full md:py-10">
        {/* Profile */}
        <div
          className={cn(
            "flex items-center gap-3 cursor-pointer transition duration-300 rounded-md px-4 py-2",
            active === 0
              ? "bg-blue-100 text-blue-600 font-semibold underline underline-offset-4"
              : "hover:bg-gray-100 text-gray-600 hover:font-semibold hover:text-blue-600"
          )}
          onClick={() => setActive(0)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path d="M10 10a4 4 0 110-8 4 4 0 010 8zm0 2a7 7 0 00-7 7h2a5 5 0 1110 0h2a7 7 0 00-7-7z" />
          </svg>
          <p className="hidden md:block">Profile</p>
        </div>

        {/* Settings */}
        <div
          className={cn(
            "flex items-center gap-3 cursor-pointer transition duration-300 rounded-md px-4 py-2",
            active === 1
              ? "bg-blue-100 text-blue-600 font-semibold underline underline-offset-4"
              : "hover:bg-gray-100 text-gray-600 hover:font-semibold hover:text-blue-600"
          )}
          onClick={() => setActive(1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 01.993.883L11 3v.086a7.003 7.003 0 014.417 4.418h.086a1 1 0 01.117 1.993L15.5 10h-.086a7.003 7.003 0 01-4.418 4.417v.086a1 1 0 01-1.993.117L9 15.5v-.086a7.003 7.003 0 01-4.418-4.417h-.086a1 1 0 01-.117-1.993L4.5 9h.086A7.003 7.003 0 019 4.5V4a1 1 0 011-1zm0 5a3 3 0 100 6 3 3 0 000-6z"
              clipRule="evenodd"
            />
          </svg>
          <p className="hidden md:block">Settings</p>
        </div>

        {/* Help */}
        <div
          className={cn(
            "flex items-center gap-3 cursor-pointer transition duration-300 rounded-md px-4 py-2",
            active === 2
              ? "bg-blue-100 text-blue-600 font-semibold underline underline-offset-4"
              : "hover:bg-gray-100 text-gray-600 hover:font-semibold hover:text-blue-600"
          )}
          onClick={() => setActive(2)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10A8 8 0 11.587 6.544a1 1 0 111.829-.814 6 6 0 101.238 6.986A1 1 0 015.466 12.6a4 4 0 11.793-4.534 1 1 0 01.865-.5H9a1 1 0 011 1v1a1 1 0 01-.117.458l-2 4A1 1 0 017 15v1a1 1 0 102 0v-1a1 1 0 01.117-.458l2-4A1 1 0 0111 10V9a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 102 0v-1a3 3 0 00-3-3h-2a3 3 0 00-3 3v1a1 1 0 001 1v3a1 1 0 102 0v-3a3 3 0 00-.293-1.293l1.162-.842a8 8 0 018.122 7.778z"
              clipRule="evenodd"
            />
          </svg>
          <p className="hidden md:block">Help</p>
        </div>
      </div>

      {/* Profile Section */}
      {active === 0 && user && (
        <div className="w-full flex flex-col justify-between mx-auto p-6 my-auto">
          <div className="flex gap-6 items-center">
            <Image
              src="/assets/profile/flis_profile.jpg"
              alt="profile"
              width={100}
              height={100}
              className="rounded-full w-20 h-20 object-cover object-center border-2 border-gray-800"
            />
            <div className="flex flex-col md:flex-row gap-4">
              <Button>Change Picture</Button>
              <Button variant="destructive" className="shad-danger-btn">
                Delete Picture
              </Button>
            </div>
          </div>
          <div className="flex-1 mt-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="input flex flex-col w-full static mb-4">
                  <label
                    htmlFor="name"
                    className="text-red-600 text-xs font-semibold relative top-2 ml-[7px] px-[6px] rounded bg-[#f8f7f4] w-fit">
                    Profile Name
                  </label>
                  <input
                    type="text"
                    value={user.name} // Set user name
                    readOnly
                    className="px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold tracking-widest overflow-scroll cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <div className="input flex flex-col w-full static mb-4">
                  <label
                    htmlFor="email"
                    className="text-red-600 text-xs font-semibold relative top-2 ml-[7px] px-[6px] rounded bg-[#f8f7f4] w-fit">
                    E-mail
                  </label>
                  <input
                    type="text"
                    value={user.email} // Set user email
                    readOnly
                    className="px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold tracking-widest overflow-scroll cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="">
              <div>
                <div className="input flex flex-col w-full static mb-4">
                  <label
                    htmlFor="role"
                    className="text-red-600 text-xs font-semibold relative top-2 ml-[7px] px-[6px] rounded bg-[#f8f7f4] w-fit">
                    User Role
                  </label>
                  <input
                    type="text"
                    value={user.role} // Set user role
                    readOnly
                    className="px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold tracking-widest overflow-scroll cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="">
              <div>
                <div className="input flex flex-col w-full static mb-4">
                  <label
                    htmlFor="j_date"
                    className="text-red-600 text-xs font-semibold relative top-2 ml-[7px] px-[6px] rounded bg-[#f8f7f4] w-fit">
                    Joining Date
                  </label>
                  <input
                    type="text"
                    value={new Date(user.createdAt).toLocaleDateString()}
                    readOnly
                    className="px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-semibold tracking-widest overflow-scroll cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password */}
      {active === 1 && (
        <div className="flex flex-col justify-center w-[60%] m-auto p-6">
          <h1 className="text-2xl font-semibold underline underline-offset-4 text-center text-gray-800">
            Change Password
          </h1>
          <div className="flex flex-col gap-4 border mt-6 w-full p-6 rounded-lg">
            {/* Old Password Input */}
            <div className="grid grid-cols-3 items-center">
              <h3>
                Old Password <span className="text-red-700">*</span> :
              </h3>
              <div className="input flex flex-col w-full mb-4 col-span-2 relative">
                <input
                  placeholder="Write your old password here..."
                  type={showOldPassword ? "text" : "password"}
                  id="old-password"
                  {...register("oldPassword")}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className={`border-2 px-[10px] text-black py-[10px] rounded-[5px] w-full focus:outline-none placeholder:text-black/50 font-semibold font-sans text-[14px] overflow-scroll bg-transparent`}
                />
                <button
                  type="button"
                  onClick={toggleOldPasswordVisibility}
                  className="absolute right-3 top-[14px] text-lg text-gray-500">
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.oldPassword && (
                  <span className="text-red-600 text-sm">
                    {errors.oldPassword?.message as string}
                  </span>
                )}
              </div>
            </div>

            {/* New Password Input */}
            <div className="grid grid-cols-3 items-center">
              <h3>
                New Password <span className="text-red-700">*</span> :
              </h3>
              <div className="input flex flex-col w-full mb-4 col-span-2 relative">
                <input
                  placeholder="Write your new password here..."
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  {...register("newPassword")}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className={`border-2 px-[10px] text-black py-[10px] rounded-[5px] w-full focus:outline-none placeholder:text-black/50 font-semibold font-sans text-[14px] overflow-scroll bg-transparent`}
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="absolute right-3 top-[14px] text-lg text-gray-500">
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.newPassword && (
                  <span className="text-red-600 text-sm">
                    {errors.newPassword?.message as string}
                  </span>
                )}
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="grid grid-cols-3 items-center">
              <h3>
                Confirm New Password <span className="text-red-700">*</span> :
              </h3>
              <div className="input flex flex-col w-full mb-4 col-span-2 relative">
                <input
                  placeholder="Confirm your new password..."
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  {...register("confirmPassword")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`border-2 px-[10px] text-black py-[10px] rounded-[5px] w-full focus:outline-none placeholder:text-black/50 font-semibold font-sans text-[14px] overflow-scroll bg-transparent`}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-[14px] text-lg text-gray-500">
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.confirmPassword && (
                  <span className="text-red-600 text-sm">
                    {errors.confirmPassword?.message as string}
                  </span>
                )}
              </div>
            </div>

            {passwordError && (
              <div className="text-red-600 text-sm mt-2">{passwordError}</div>
            )}

            <div className="grid justify-end">
              {/* Change Password Button */}
              <Button
                className="mt-4 px-5 w-fit bg-green-600 text-white rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleChangePassword}
                disabled={loading} // Disable button while loading
              >
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
                  "Change Password"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support */}
      {active === 2 && (
        <div className="w-full flex justify-center overflow-hidden overflow-y-auto text-black">
          <div className="p-6 flex flex-col gap-8 my-auto mx-auto  rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold underline underline-offset-4">
              Help & Support
            </h1>

            <p className="">
              At Supranostik, we handle all software-related queries, providing
              tailored solutions to meet your specific needs. Whether it&apos;s
              troubleshooting, software customization (Web, Mobiile & Desktop
              applications), or anything in between, we&apos;re here to help..
            </p>

            {/* Contact Info Section */}
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-medium ">Contact Information:</h2>
                <p className="">
                  Here&apos;s how you can get in touch with us.
                </p>
              </div>

              <div>
                <h3 className="text-md font-semibold text-orange-600">
                  Supranostik
                </h3>
                <p className="">
                  <span className="font-medium">Email: </span>
                  contact@supranostik.tech
                </p>
                <p className="">
                  <span className="font-medium">Phone: </span>+91 7797063266
                </p>
              </div>
            </div>

            {/* Footer Message */}
            <div className="text-center text-sm">
              <p>
                © <strong>Supranostik</strong>, 2024
              </p>
            </div>
          </div>
        </div>
      )}
      <Toaster richColors />
    </div>
  );
};

export default ProfilePage;
