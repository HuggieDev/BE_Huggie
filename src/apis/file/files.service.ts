import { HttpException, Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { getToday } from 'src/commons/util/date.util'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class FilesService {
    private readonly s3

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_SECRET_KEY,
            region: process.env.AWS_S3_REGION,
        })
    }

    async uploadImages(files: Array<Express.Multer.File>) {
        //TODO: 사이즈 제한, 타입제한

        const pendingFiles = []

        //FIXME: 왜 map 돌리면 안되는겨?

        for (let i = 0; i < files.length; i++) {
            const pendingFile = this.s3
                .upload({
                    Bucket: process.env.AWS_BUCKET_NAME,
                    ACL: 'public-read',
                    Key: `${getToday()}/${uuidv4()}/origin/${uuidv4()}`,
                    Body: files[i].buffer,
                    ContentType: files[i].mimetype,
                })
                .promise()
            pendingFiles.push(pendingFile)
        }

        return (await Promise.all(pendingFiles)).map((e) => e.Location)
    }

    // TODO: delete
}
