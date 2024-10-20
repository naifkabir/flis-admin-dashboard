"use client";

import { Button } from "@/components/ui/button";
import {
  GetCurrentAdminApi,
  ChangePasswordApi,
} from "@/lib/actions/adminAuth.action"; // Import your ChangePasswordApi
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from "sonner";

// Define the response type for the change password API
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

  const toggleOldPasswordVisibility = () => {
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

    console.log("Old Password: ", oldPassword);
    console.log("New Password: ", newPassword);

    setLoading(true);
    const response: ChangePasswordResponse = await ChangePasswordApi(
      oldPassword,
      newPassword
    );
    setLoading(false);

    if (response.success) {
      toast.success(response.message);

      // Optionally reset fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
    } else {
      toast.error(response.message); // Show error message
    }
  };

  return (
    <div className="bg-dark-300 flex flex-col md:flex-row gap-8 max-h-screen">
      <div className="border-b-2 md:border-r-2 md:border-b-0 flex justify-center md:flex-col gap-6 md:w-64 w-full h-full">
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
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
                    className="border-gray-800 input px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans cursor-not-allowed"
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
                    className="border-gray-800 input px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans cursor-not-allowed"
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
                    className="border-gray-800 input px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans cursor-not-allowed"
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
                    className="border-gray-800 input px-[10px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans cursor-not-allowed"
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
          <h1 className="text-2xl font-bold underline underline-offset-4 text-center text-gray-800">
            Change Password
          </h1>
          <div className="flex flex-col gap-4 border mt-6 w-full p-6 rounded-lg">
            {/* Old Password Input */}
            <div className="grid grid-cols-3 items-center">
              <h3>
                Old Password <span className="text-red-700">*</span> :
              </h3>
              <div className="input flex flex-col w-full mb-4 col-span-2 relative">
                <label
                  htmlFor="old-password"
                  className="text-red-600 text-xs font-semibold relative top-2 ml-[7px] px-[6px] rounded bg-[#f8f7f4] w-fit">
                  Old Password
                </label>
                <input
                  placeholder="Write your old password here..."
                  type={showOldPassword ? "text" : "password"}
                  id="old-password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="border-gray-800 input px-[16px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans"
                />
                <button
                  type="button"
                  onClick={toggleOldPasswordVisibility}
                  className="absolute right-3 top-8 text-lg text-gray-500">
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* New Password Input */}
            <div className="grid grid-cols-3 items-center">
              <h3>
                New Password <span className="text-red-700">*</span> :
              </h3>
              <div className="input flex flex-col w-full mb-4 col-span-2 relative">
                <label
                  htmlFor="new-password"
                  className="text-red-600 text-xs font-semibold relative top-2 ml-[7px] px-[6px] rounded bg-[#f8f7f4] w-fit">
                  New Password
                </label>
                <input
                  placeholder="Write your new password here..."
                  type={showNewPassword ? "text" : "password"}
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="border-gray-800 input px-[16px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans"
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="absolute right-3 top-8 text-lg text-gray-500">
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="grid grid-cols-3 items-center">
              <h3>
                Confirm New Password <span className="text-red-700">*</span> :
              </h3>
              <div className="input flex flex-col w-full mb-4 col-span-2 relative">
                <label
                  htmlFor="confirm-password"
                  className="text-red-600 text-xs font-semibold relative top-2 ml-[7px] px-[6px] rounded bg-[#f8f7f4] w-fit">
                  Confirm New Password
                </label>
                <input
                  placeholder="Confirm your new password..."
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-gray-800 input px-[16px] py-[16px] text-xs bg-[#f8f7f4] border-2 rounded-[5px] w-full focus:outline-none placeholder:text-black/25 font-bold tracking-widest overflow-scroll font-sans"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-8 text-lg text-gray-500">
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
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
              If you need assistance with any academic-related matters, feel
              free to reach out to the appropriate department or the college
              administration. We&apos;re here to help you make the most of your
              engineering education journey.
            </p>

            {/* Contact Info Section */}
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-medium ">Contact Information:</h2>
                <p className="">Here’s how you can get in touch with us:</p>
              </div>

              <div>
                <h3 className="text-md font-semibold text-orange-600">
                  College Administration Office
                </h3>
                <p className="">
                  <span className="font-medium">Address:</span> 123 Engineering
                  hub, Tech City, ST 54321
                </p>
                <p className="">
                  <span className="font-medium">Phone:</span> 1234567890
                </p>
                <p className="">
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:support@college.edu"
                    className="text-blue-500 hover:underline">
                    support@college.edu
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-md font-semibold text-orange-600">
                  Departmental Offices
                </h3>
                <p className="text-white">
                  For department-specific queries (e.g., assignments, faculty,
                  etc.), you can contact your respective department:
                </p>
                <ul className="list-disc pl-6 text-white">
                  <li>
                    <span className="font-medium">Mechanical Engineering:</span>{" "}
                    mech@college.edu
                  </li>
                  <li>
                    <span className="font-medium">
                      Computer Science & Engineering:
                    </span>{" "}
                    cse@college.edu
                  </li>
                  <li>
                    <span className="font-medium">Electrical Engineering:</span>{" "}
                    ee@college.edu
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-md font-semibold text-orange-600">
                  Student Support Services
                </h3>
                <p className="text-white">
                  Need help with mental health, accommodation, or financial aid?
                  Reach out to our student services for support.
                </p>
                <p className="text-white">
                  <span className="font-medium">Phone:</span> (123) 456-7891
                </p>
                <p className="">
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:support@college.edu"
                    className="text-blue-500 hover:underline">
                    studentservices@college.edu
                  </a>
                </p>
              </div>
            </div>

            {/* Footer Message */}
            <div className="text-center text-sm">
              <p>
                We are dedicated to supporting our students in every way
                possible. If you have any questions, don&apos;t hesitate to
                contact us. We&apos;re here to help you succeed!
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
