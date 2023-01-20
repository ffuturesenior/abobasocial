/*import * as uuid from 'uuid'
import * as path from 'path'
import fs from 'fs'

import dotenv from 'dotenv/config'

//import uuid from 'uuid'

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY


class FileService{
     saveFile(file,path){
        try{
            console.log(file)
            var img = fs.readFileSync(path);
            var encode_img = img.toString('base64');
            var final_img = {
                contentType:req.file.mimetype,
                image:new Buffer(encode_img,'base64')
            };
            const fileName=uuid.v4()+'.jpg'
            //const filePath=path.resolve('static',fileName);
            //file.mv(filePath)
            return fileName
        }catch(e){
            console.log(e)
        }
    }
}
export default new FileService()*/


