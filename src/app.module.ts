import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ 
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`]
    }), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
            type:'postgres',
            autoLoadEntities: true,  
            synchronize: true,
            url: configService.get('DB_URL'),
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
        }
      }
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
