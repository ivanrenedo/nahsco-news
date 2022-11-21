import { s3 } from '../../utils/s3';


const getParams = (prefix, file) => {
        
    return {
      Bucket: process.env.BUCKET_NAME!,
      Fields: {
        "Content-Type": file.mimeType,
        acl: 'public-read',
        key: `${prefix}/${file.filename}`
      }
    };
};

export default async (req, res) => {
    const {prefix, file} = JSON.parse(req.body);
    console.log({prefix, file})
    const signedRequest = await s3.createPresignedPost(getParams(prefix, file[0]));
    
    res.statusCode = 200;
    res.json({signedRequest})
}