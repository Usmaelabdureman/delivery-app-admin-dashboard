import Layout from "@/components/Layout";
import {useSession} from "next-auth/react";


export default function Home() {
  const {data: session} = useSession();
  return <Layout>
    
   
    <div className="text-blue-900 flex ">
      <div className="w-3/4">
      <h1>Navbar</h1>
      </div>
    
      
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden ml-2 w-1/3">
        <img src={session?.user?.image} alt="profile Image" className="w-6 h-6"/>
        <span className="px-2">
          {session?.user?.name}
        </span>
      </div>

    </div>
    <h2 className="mt-5 ml-4 text-3xl">
       Hello, <b>{session?.user?.name}</b>   Welcome, to Delivery Admin Dashboard
      </h2>
  </Layout>
  
}
