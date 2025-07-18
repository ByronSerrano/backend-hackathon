import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  async create(createUserDto: CreateUserDto) {
    const { email, username, password, role } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
      role,
      status: true,
    });

    return this.userRepository.save(user);
  }

  async findAll() {
    const users = await this.userRepository.find();

    if (!users || users.length === 0) {
      this.logger.warn('No users found');
      return [];
    }

    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      this.logger.error(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      this.logger.error(`User with email ${email} not found`);
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    if (!user) {
      this.logger.error(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.update(id, updateUserDto);

    const newUser = await this.userRepository.findOne({ where: { id } });

    return newUser;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      this.logger.error(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.update(id, { status: false });

    const message = `User with id: ${id}, removed successfully`;
    this.logger.log(message);

    return {
      message,
      user: await this.userRepository.findOne({ where: { id } }),
    };
  }

  async activateUser(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      this.logger.error(`User with ID ${id} not found`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.update(id, { status: true });

    const message = `User with id: ${id}, activated successfully`;

    return {
      message,
      user: await this.userRepository.findOne({ where: { id } }),
    };
  }
}
