import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private userRepository: Repository<User>
  ) { }
  async create(createUserDto: CreateUserDto): Promise<string> {
    if(createUserDto.Password != createUserDto.confirn_Pass) {
      throw new UnauthorizedException({
        messsage: 'confirm password wrong'
      })
    }
     await this.userRepository.save(createUserDto);
    
    
    return 'success'
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(UserId: number): Promise<User> {
    return this.userRepository.findOne({where: {UserId}});
  }

  update(UserId: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(UserId, updateUserDto);
  }

  async remove(UserId: number): Promise<any> {
    return await this.userRepository.delete(UserId);
     
  }
}
