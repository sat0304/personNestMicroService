import { Module } from '@nestjs/common';
import { PersonsModule } from './persons/persons.module';
import { ProfessionsModule } from './professions/professions.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './persons/persons.model';
import { Profession } from './professions/professions.model';
import { ConfigModule } from '@nestjs/config';
import { ProfessionPerson } from './persons/professionPerson.model';

@Module({
  imports: [
  ConfigModule.forRoot({
    envFilePath: '.env'
  }),
  SequelizeModule.forRoot({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [
           Profession,
           Person,
           ProfessionPerson
          ],
  autoLoadModels: true,
}),
  ProfessionsModule,
  PersonsModule
],
  controllers: [],
  providers: [],

})
export class AppModule {}
