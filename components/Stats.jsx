import React from "react";
import delivered from "../assets/icon Delivered.png";
import Cancelled from "../assets/orderCancelled.png";
import revenue from "../assets/totalrevenue.png";
import ordered from "../assets/Icon_Order.png";
import Card from "./Card";

const data = [
  { img: require("../assets/icon Delivered.png"), desc: "Delivered", percentage: "20",count:375 },
  { img: Cancelled, desc: "Cancelled", percentage: "20",count:20 },
  { img: revenue, desc: "Revenue", percentage: "20",count:'$5000' },
  { img: ordered, desc: "Ordered", percentage: "20" ,count:400},
];
const Stats = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1  gap-4">
        {data.map((d) => (
          <Card
            key={d.icon}
            desc={d.desc}
            img={d.img}
            count={d.count}
            percentage={d.percentage}
          />
        ))}
      </div>
    </div>
  );
};

export default Stats;
