import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiOperation } from '@nestjs/swagger'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({
        summary: 'health check',
    })
    @ApiResponse({
        status: 200,
        description: 'Hello World! 응답',
        type: String,
    })
    getHello(): string {
        return this.appService.getHello()
    }
}
