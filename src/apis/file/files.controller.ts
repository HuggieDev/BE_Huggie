import {
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { FilesService } from './files.service'

@Controller('file')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post()
    @ApiOperation({ summary: 'field key는 "files", 갯수 제한 10개' })
    @ApiResponse({})
    @UseInterceptors(FilesInterceptor('files', 10))
    async uploadFiles(
        @UploadedFiles()
        files: Array<Express.Multer.File>
    ) {
        return await this.filesService.uploadImages(files)
    }
}
