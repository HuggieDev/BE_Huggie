import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('social')
    createUser(
        @Body() createUserDto: CreateUserDto //
    ): Promise<User> {
        return this.usersService.create(createUserDto)
    }
}
