import {mongooseConnect} from "@/lib/mongoose";
import Users from "@/models/User";
import { isAdminRequest } from "./auth/[...nextauth]";


export default async function handler(req,res) {
  await isAdminRequest();
  await mongooseConnect();
  res.json(await Users.find());
}