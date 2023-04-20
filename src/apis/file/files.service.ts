import { Injectable } from '@nestjs/common'
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
        const pendingFiles = files.map(
            async (file) =>
                await this.s3
                    .upload({
                        Bucket: process.env.AWS_BUCKET_NAME,
                        ACL: 'public-read',
                        Key: `${getToday()}/${uuidv4()}/origin/${uuidv4()}`,
                        Body: file.buffer,
                        ContentType: file.mimetype,
                    })
                    .promise()
        )

        return (await Promise.all(pendingFiles)).map((e) => e.Location)
    }

    // TODO: delete
}
