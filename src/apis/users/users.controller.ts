import { Body, Controller, Post } from '@nestjs/common'
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
}
