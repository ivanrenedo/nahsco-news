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

    let files: Array<string> = [];
    let currentFile = `${prefix}/${file[0].filename}`
    
    const getfiles = await s3.listObjectsV2({
        Bucket: process.env.BUCKET_NAME!,
        Prefix: prefix
    }).promise();
    
    getfiles.Contents?.forEach(element => {
        files.push(element.Key!)
    });
    
    /* Filtrar todos los elementos que no sean igual al elemento actual*/
    const getfilesToDelete = files.filter((file) => {
        return file !== currentFile
    })
    
    const filesToDelete = getfilesToDelete.map(file => {
        return {
            Key: file
        }
    });

    await s3.deleteObjects({
        Bucket: process.env.BUCKET_NAME!,
        Delete: {
            Objects: filesToDelete
        }
    }).promise();

    const signedRequest = await s3.createPresignedPost(getParams(prefix, file[0]));
    
    res.statusCode = 200;
    res.json({signedRequest})
}