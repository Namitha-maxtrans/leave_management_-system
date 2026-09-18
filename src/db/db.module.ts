// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//     imports:[TypeOrmModule.forRoot({
//              type:"mysql",
//              host:"localhost",
//              port:3306,
//              username:"root",
//              password:"Nami@123",
//             database:"company2",
//             autoLoadEntities:true,
//             synchronize:true
              
             
//     })]
// })
// export class DbModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
      ],

      inject: [
        ConfigService,
      ],

      useFactory: (
        configService: ConfigService,
      ) => ({
        type: 'mysql',

        host: configService.get<string>(
          'DB_HOST',
        ),

        port: Number(
          configService.get<string>(
            'DB_PORT',
          ),
        ),

        username: configService.get<string>(
          'DB_USERNAME',
        ),

        password: configService.get<string>(
          'DB_PASSWORD',
        ),

        database: configService.get<string>(
          'DB_NAME',
        ),

        autoLoadEntities: true,

        synchronize: true,
      }),
    }),
  ],
})
export class DbModule {}
