import React from "react";
import delivered from "../assets/icon Delivered.png";
import Cancelled from "../assets/orderCancelled.png";
import revenue from "../assets/totalrevenue.png";
import ordered from "../assets/Icon_Order.png";
import Card from "./Card";
import { AiOutlineArrowDown,AiOutlineArrowUp, } from "react-icons/ai";
import {BsCurrencyDollar} from "react-icons/bs";
import {ImCancelCircle} from "react-icons/im";
const data = [
  { img: require("../assets/icon Delivered.png"), desc: "Delivered", percentage: "20",count:375,icon:<AiOutlineArrowUp/> },
  { img: Cancelled, desc: "Cancelled", percentage: "15",count:20,icon:<ImCancelCircle/> },
  { img: revenue, desc: "Revenue", percentage: "50",count:'$5000' ,icon:<BsCurrencyDollar/>},
  { img: ordered, desc: "Ordered", percentage: "35" ,count:400,icon:<AiOutlineArrowDown/>},
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
            icon={d.icon}
            percentage={d.percentage}
          />
        ))}
      </div>
    </div>
  );
};

export default Stats;
