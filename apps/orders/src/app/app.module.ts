import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://the-usual-user:eZEhRix4zW8miCmU@cluster0.rw3w5cl.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'ordering-app'
      }
    ),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
