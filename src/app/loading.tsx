import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex-center absolute left-1/2 top-1/2 translate-x-1/2 translate-y-1/2 size-full h-screen gap-3 text-gray-800">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={40}
        height={3240}
        className="animate-spin"
      />
    </div>
  );
}
