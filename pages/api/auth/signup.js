
// import Users from '@/models/User';
// import { hash } from 'bcryptjs';
// import { mongooseConnect } from '@/lib/mongoose';

// export default async function handler(req, res){
//     mongooseConnect().catch(error => res.json({ error: "Connection Failed...!"}))
//     // only post method is accepted
//     if(req.method === 'POST'){
//         if(!req.body) return res.status(404).json({ error: "Don't have form data...!"});
//         const { firstName,lastName,username, email, password } = req.body;
//         // check duplicate users
//         const checkexisting = await Users.findOne({ email });
//         if(checkexisting) return res.status(422).json({ message: "User Already Exists...!"});

//         // hash password
//         Users.create({firstName,lastName, username, email, password : await hash(password, 12)}, function(err, data){
//             if(err) return res.status(404).json({ err });
//             res.status(201).json({ status : true, user: data})
//         })

//     } else{
//         res.status(500).json({ message: "HTTP method not valid only POST Accepted"})
//     }

// }

import Users from '@/models/User';
import { hash } from 'bcryptjs';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
  try {
    await mongooseConnect();
  } catch (error) {
    return res.json({ error: "Connection Failed...!" });
  }

  // Only POST method is accepted
  if (req.method === 'POST') {
    if (!req.body) {
      return res.status(404).json({ error: "Don't have form data...!" });
    }

    const { firstName, lastName, username, email, password } = req.body;

    try {
      // Check for duplicate users
      const checkexisting = await Users.findOne({ email });
      if (checkexisting) {
        return res.status(422).json({ message: "User Already Exists...!" });
      }

      // Hash password
      const hashedPassword = await hash(password, 12);
      const newUser = new Users({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword
      });

      const savedUser = await newUser.save();

      res.status(201).json({ status: true, user: savedUser });
    } catch (error) {
      return res.status(404).json({ error });
    }
  } else {
    res.status(500).json({ message: "HTTP method not valid, only POST is accepted" });
  }
}
