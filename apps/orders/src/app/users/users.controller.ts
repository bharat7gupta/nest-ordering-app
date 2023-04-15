import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./schema/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<User> {
        return this.usersService.getUserById(userId);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto.email, createUserDto.age);
    }

    @Patch(':userId')
    updateUser(@Param('userId') userId, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateUser(userId, updateUserDto);
    }
}
