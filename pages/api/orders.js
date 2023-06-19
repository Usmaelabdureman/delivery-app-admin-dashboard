import {mongooseConnect} from "@/lib/mongoose";
import {Order} from "@/models/Order";
import {getServerSession} from "next-auth";
import {authOptions, isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req,res) {
  const {method} = req;
  await mongooseConnect();
  await isAdminRequest(req,res);

  if (method === 'GET') {
    res.json(await Order.find().sort({createdAt:-1}));
  }
  if (method === 'DELETE') {
    const {_id} = req.query;
    await Order.deleteOne({_id});
    res.json('ok');
  }
}