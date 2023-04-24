import {
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import {
    ApiBody,
    ApiConsumes,
    ApiOkResponse,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger'
import { FilesUploadDto } from './dto/filesUpload.dto'
import { FilesService } from './files.service'

@Controller('file')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiOperation({
        summary: 'field key는 "files", 갯수 제한 10개',
    })
    @ApiBody({
        description: 'key는 files, 배열에 파일 담기, 총 10개 제한',
        type: FilesUploadDto,
    })
    @ApiResponse({
        status: 201,
        description: '파일이 저장된 주소가 담긴 배열',
        isArray: true,
        schema: {
            type: 'array',
            items: {
                type: 'string',
                example:
                    'https://huggie.s3.ap-northeast-2.amazonaws.com/2023-04-20/a2cc3d26-0a10-4d11-9b1b-89103283c3d0/origin/f449ca2b-1508-408d-a337-b3a613fe749b',
            },
        },
    })
    @UseInterceptors(FilesInterceptor('files', 10))
    async uploadFiles(
        @UploadedFiles()
        files: Array<Express.Multer.File>
    ): Promise<String[]> {
        return await this.filesService.uploadImages(files)
    }
}
