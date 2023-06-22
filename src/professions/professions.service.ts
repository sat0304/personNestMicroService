import { Injectable } from '@nestjs/common';
import { Profession } from './professions.model';
import { CreateProfessionDto } from './dto/createProfessionDto';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from '../persons/persons.model';
import { Op } from 'sequelize';

@Injectable()
export class ProfessionsService {
    constructor(@InjectModel(Profession) private professionRepo: typeof Profession) {}

    async createProfession(dto: CreateProfessionDto) {
        const Profession = await this.professionRepo.create(dto);
        return Profession;
    }

    async getProfessionByName( profession: any ) {
        const professionName = await this.professionRepo.findOne({where: { profession }});
        return professionName;
    }

    async getAllProfessions() {
        const professions = await this.professionRepo.findAll();
        // const Professions = await this.ProfessionRepo.findAll({include: { all: true}});
        return professions;
    }

    async getPersonProfessions( personKinopoiskId: number ) {
        const professions = await this.professionRepo.findAll(
            {include: { 
                model: Person, 
                as: 'persons',
                where: {
                    personKinopoiskId: {
                    [Op.eq]: personKinopoiskId
                    }
                }
            }
        });
        return professions;
    }
}
