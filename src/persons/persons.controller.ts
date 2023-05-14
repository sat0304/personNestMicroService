import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/createPersonDto';

@Controller('persons')
export class PersonsController {
        
    constructor( private personService: PersonsService) {}

    // @Post()
    // async create(@Body() dto: CreatePersonDto, nameProfession: string) {
    //     return await this.personService.createPerson(dto, nameProfession);
    // }

    @Post()
    async create(@Body() dto: CreatePersonDto) {
        return await this.personService.createPerson(dto);
    }

    @Get('/:personKinopoiskId')
    async getByKinopoiskId(@Param('personKinopoiskIdd') personKinopoiskId: number  ) {
        return await this.personService.getPersonByKinopoiskId(personKinopoiskId);
    }

    @Get()
    async getAllPersons() {
        return await this.personService.getAllPersons();
    }

    @Patch('/:personKinopoiskId')
    async updateProfession(
        @Param('personKinopoiskId') personKinopoiskId: number,
        professions: string[]) {
      return await this.personService.updateProfessionOfPerson(
        personKinopoiskId, 
        professions);
    }
}