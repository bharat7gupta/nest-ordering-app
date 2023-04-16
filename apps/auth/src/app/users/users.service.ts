import { Injectable } from "@nestjs/common";
import { uuid } from 'uuidv4';
import { UsersRepository } from "./users.repository";
import { User } from "./schema/user.schema";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUserById(userId: string): Promise<User> {
        return this.usersRepository.findOne({ userId });
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ email });
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(email: string, age: number): Promise<User> {
        return this.usersRepository.create({
            userId: uuid(),
            email,
            age,
            favoriteFoods: []
        });
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto) {
        return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
    }
}