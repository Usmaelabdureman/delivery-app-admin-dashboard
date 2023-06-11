
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";
import UserProfile from "@/components/userProfile";
// import { useSession } from "next-auth/react";

// export default function Home() {
//   const { data: session } = useSession();
//   return (
//     <Layout>
//       <div className="text-blue-900 flex ">
//         <div className="w-3/4">
//           <Navbar />
//         </div>
//         <UserProfile />
//       </div>
//       <h2 className="mt-5 ml-4 text-3xl">
//         Hello, <b>{session?.user?.name}</b> Welcome, to Delivery Admin Dashboard
//       </h2>
//       <Stats />
//     </Layout>
//   );
// }


import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { getSession, useSession, signOut } from "next-auth/react"

export default function Home() {

  const { data: session } = useSession()

  function handleSignOut(){
    signOut()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

     
      <Layout>
      <div className="text-blue-900 flex ">
        <div className="w-3/4">
          <Navbar />
        </div>
        <UserProfile />
      </div>
      <h2 className="mt-5 ml-4 text-3xl">
        Hello, <b>{session?.user?.name}</b> Welcome, to Delivery Admin Dashboard
        {session ? User({ session, handleSignOut }) : Guest()}
      </h2>
      <Stats />
    </Layout>
    </div>
  )
}

// Guest
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Guest Homepage</h3>

          <div className='flex justify-center'>
            <Link href={'/login'}><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</a></Link>
          </div>
      </main>
  )
}

// Authorize User
function User({ session, handleSignOut }){
  return(
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>

          <div className='details'>
            <h5>{session.user.name}</h5>
            <h5>{session.user.email}</h5>
          </div>

          <div className="flex justify-center">
            <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50'>Sign Out</button>
          </div>

          <div className='flex justify-center'>
            <Link href={'/profile'}><span className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</span></Link>
          </div>
      </main>
  )
}


export async function getServerSideProps({ req }){
  const session = await getSession({ req })

  if(!session){
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}