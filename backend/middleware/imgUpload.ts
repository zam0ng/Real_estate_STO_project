import multer,{FileFilterCallback} from "multer";
import path from 'path';
import { Request } from "express";

type FileNameCallback = (error: Error | null, filename: string) => void

export const Upload = multer({
    
    storage : multer.diskStorage({
        destination : "imgs/estate/",
        filename :(req : Request,file : Express.Multer.File, done : FileNameCallback) =>{

            const ext = path.extname(file.originalname);

            const filename = path.basename(file.originalname,ext) +"_" + Date.now() + ext;

            done(null,filename);
        }
    }),
    limits : {fileSize:5 * 1024 * 1024},
});