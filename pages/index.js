import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/userProfile";
import { useSession } from "next-auth/react";
const data = [
  {
    icon: "icon",
    desc: "desc",
  },
  {
    icon: "icon",
    desc: "desc1",
  },
  {
    icon: "icon",
    desc: "desc2",
  },
];
export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex ">
        <div className="w-3/4">
          <Navbar />
        </div>
        <UserProfile />
      </div>
      <h2 className="mt-5 ml-4 text-3xl">
        Hello, <b>{session?.user?.name}</b> Welcome, to Delivery Admin Dashboard
      </h2>
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        {data.map((d) => (
          <Card
            key={d.icon}
            desc={d.desc}
            icon={d.icon}
            percentage={d.percentage}
          />
        ))}
      </div>
    </Layout>
  );
}
