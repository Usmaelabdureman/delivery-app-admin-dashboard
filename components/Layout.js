import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "@/components/Logo";
import { FcGoogle } from "react-icons/fc";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-slate-800 min-h-screen flex items-center justify-center">
      <div className="grid grid-rows-3  gap-4  justify-center items-center">
        <div className="row-span-3 ">          
        <h1 className="text-3xl font-bold text-white mb-4">Welcome to Delivery App Admin Dashboard</h1>
        </div>
        <div className="row-span-2 "> 
        <h2 className="text-xl m-3 ml-3 text-teal-500">Please login to Access the dashboard!</h2>
        </div>
        <div className="row-span-2 ">        
        <div className="flex items-center ml-6">
          <button
            onClick={() => signIn("google")}
            className="bg-teal-400 flex items-center text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300"
          >
            <FcGoogle className="mt-1 text-2xl" /> 
            <span className="ml-3">Sign In with Google</span>
          </button>
        </div></div>
      </div>
      <div className="text-center">
      </div>
    </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen">
      <div className="md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex-grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
