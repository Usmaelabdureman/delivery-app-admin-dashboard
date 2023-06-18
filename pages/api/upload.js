// import multiparty from 'multiparty';
// import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
// import fs from 'fs';
// import mime from 'mime-types';
// import {mongooseConnect} from "@/lib/mongoose";
// import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
// const bucketName = 'dawid-next-ecommerce';

// export default async function handle(req,res) {
//   await mongooseConnect();
//   await isAdminRequest(req,res);

//   const form = new multiparty.Form();
//   const {fields,files} = await new Promise((resolve,reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({fields,files});
//     });
//   });
//   console.log('length:', files.file.length);
//   const client = new S3Client({
//     region: 'us-east-1',
//     credentials: {
//       accessKeyId: process.env.S3_ACCESS_KEY,
//       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//     },
//   });
//   const links = [];
//   for (const file of files.file) {
//     const ext = file.originalFilename.split('.').pop();
//     const newFilename = Date.now() + '.' + ext;
//     await client.send(new PutObjectCommand({
//       Bucket: bucketName,
//       Key: newFilename,
//       Body: fs.readFileSync(file.path),
//       ACL: 'public-read',
//       ContentType: mime.lookup(file.path),
//     }));
//     const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
//     links.push(link);
//   }
//   return res.json({links});
// }

// export const config = {
//   api: {bodyParser: false},
// };

// import multiparty from 'multiparty';
// import { BlobServiceClient } from '@azure/storage-blob';
// import fs from 'fs';
// import mime from 'mime-types'; 
// import {mongooseConnect} from "@/lib/mongoose";
// import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

// const containerName = 'deliveryappimagecontainer';

// export default async function handle(req,res) {
//   await mongooseConnect();  
//   await isAdminRequest(req,res);

//   const form = new multiparty.Form();  
//   const {fields,files} = await new Promise((resolve,reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({fields,files});
//     });
//   });

//   const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
//   const containerClient = blobServiceClient.getContainerClient(containerName);

//   const links = [];  
//   for (const file of files.file) {
//     const ext = file.originalFilename.split('.').pop();
//     const blobName = `${Date.now()}.${ext}`;
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//     const data = fs.readFileSync(file.path);
//     const contentType = mime.lookup(file.path);
//     await blockBlobClient.upload(data, data.length, { blobHTTPHeaders: { blobContentType: contentType } });
//     const link = `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/${containerName}/${blobName}`;
//     links.push(link);
//   }
//   return res.json({links});
// }

// export const config = {
//   api: {bodyParser: false},
// };

// this uses cloudinary
import multiparty from 'multiparty';
import cloudinary from 'cloudinary';
import { mongooseConnect } from '@/lib/mongoose';
import { isAdminRequest } from '@/pages/api/auth/[...nextauth]';

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const links = [];
  for (const file of files.file) {
    const result = await cloudinary.v2.uploader.upload(file.path);
    const link = result.secure_url;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
