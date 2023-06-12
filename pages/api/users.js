import {mongooseConnect} from "@/lib/mongoose";
import Users from "@/models/User";


export default async function handler(req,res) {
  await mongooseConnect();
  res.json(await Users.find());
}