import { s3 } from "../../utils/s3";



export default async (req, res) => {
    const {prefix, currentFile} = JSON.parse(req.body);

    let files: Array<string> = [];
    
    /* Obtener todos los archivos del bucket */
    const getfiles = await s3.listObjectsV2({
        Bucket: process.env.BUCKET_NAME!,
        Prefix: prefix
    }).promise();

    getfiles.Contents?.forEach(element => {
        files.push(element.Key!)
    });
     
    /* Filtrar todos los elementos que no sean igual al elemento actual*/
    const getfilesToDelete = files.filter((file) => {
        return file === currentFile
    })
     
    const filesToDelete = getfilesToDelete.map(file => {
        return {
            Key: file
        }
    });
 
    const deleteFile = await s3.deleteObjects({
        Bucket: process.env.BUCKET_NAME!,
        Delete: {
            Objects: filesToDelete
        }
    }).promise();
    
    res.statusCode = 200;
    res.json({deleteFile})
}


