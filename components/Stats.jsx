import React from "react";
import delivered from "../assets/icon Delivered.png";
import Cancelled from "../assets/orderCancelled.png";
import revenue from "../assets/totalrevenue.png";
import ordered from "../assets/Icon_Order.png";
import Card from "./Card";

const data = [
  { img: delivered, desc: "Delivered", percentage: "20" },
  { img: Cancelled, desc: "Cancelled", percentage: "20" },
  { img: revenue, desc: "Revenue", percentage: "20" },
  { img: ordered, desc: "Ordered", percentage: "20" },
];
const Stats = () => {
  return (
    <div>
      <div className="grid grid-cols-3 grid-flow-col gap-4">
        {data.map((d) => (
          <Card
            key={d.icon}
            desc={d.desc}
            icon={d.icon}
            percentage={d.percentage}
          />
        ))}
      </div>
    </div>
  );
};

export default Stats;
