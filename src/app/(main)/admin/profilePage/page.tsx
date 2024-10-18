import Image from "next/image";
import Link from "next/link";

const ProfilePage = () => {
  // Sample user data
  const user = {
    name: "Kid's Name",
    role: "Junior Explorer",
    about: "Adventurous and loves exploring nature!",
    email: "child@example.com",
    phone: "123-456-7890",
    photo: "", // Placeholder image
    coverPhoto: "/assets/cover/cover-img1.jpg", // Placeholder cover photo
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-white">
          Welcome to Your Profile!
        </h1>
        <p className="text-lg text-gray-400">
          Let’s see what you have been up to!
        </p>
      </header>

      <div className="mb-6 w-full">
        <Image
          src={user.coverPhoto}
          alt="Cover Photo"
          layout="responsive"
          width={300}
          height={300}
          className="rounded-lg object-cover h-20"
        />
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
        <img
          src={user.photo}
          alt="Profile Picture"
          className="rounded-full border-4 border-gray-600 mb-4"
        />
        <h2 className="text-2xl font-bold text-white">{user.name}</h2>
        <p className="text-lg text-gray-300">Role: {user.role}</p>
        <p className="text-center mt-4 text-gray-400">
          About: <span className="italic">{user.about}</span>
        </p>

        <div className="mt-6 space-x-4">
          <Link href="/edit-profile">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300">
              Edit Profile
            </button>
          </Link>
          <Link href="/logout">
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300">
              Log Out
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6 w-full">
        <h3 className="text-xl font-semibold text-white mb-4">
          Contact Information
        </h3>
        <ul className="list-disc list-inside text-gray-400">
          <li>
            Email: <span className="font-medium">{user.email}</span>
          </li>
          <li>
            Phone: <span className="font-medium">{user.phone}</span>
          </li>
        </ul>
      </div>

      <footer className="mt-auto text-center p-4">
        <Link href="/">
          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300">
            Back to Home
          </button>
        </Link>
        <p className="text-gray-500 mt-4">&copy; 2024 Kids Website</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
