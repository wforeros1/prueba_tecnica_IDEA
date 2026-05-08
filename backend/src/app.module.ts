import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [HttpModule, CountriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
