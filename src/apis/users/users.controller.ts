import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
} from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('social')
    @ApiOperation({
        summary: '소셜 유저 생성 API',
        description: '소셜 유저를 생성한다.',
    })
    @ApiResponse({
        status: 201,
        description: '소셜 유저를 생성한다.',
        type: User,
    })
    createUser(
        @Body() createUserDto: CreateUserDto //
    ): Promise<User> {
        return this.usersService.create(createUserDto)
    }

    @Delete('/user/:userId')
    @ApiOperation({
        summary: '유저 탈퇴',
    })
    @ApiResponse({
        status: 200,
        description: '탈퇴 성공.',
        type: Boolean,
    })
    async deleteUser(
        @Param('userId', ParseUUIDPipe) userId: string
    ): Promise<boolean> {
        return await this.usersService.delete({ userId })
    }

    @Get('/user/:email')
    @ApiOperation({
        summary: '유저 조회',
    })
    @ApiResponse({
        status: 201,
        description: '조회 성공.',
        type: User,
    })
    @ApiResponse({
        status: 422,
        description: '조회 실패',
        type: Error,
    })
    async fetchUser(@Param('email') email: string): Promise<User> {
        return await this.usersService.findOneByEmail({ email })
    }
}
