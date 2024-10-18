import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center text-center gap-4">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/dashboard">Return Home</Link>
    </div>
  );
}
