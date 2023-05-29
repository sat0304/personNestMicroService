import { ProfessionsController } from "./professions/professions.controller";
import { Profession } from "./professions/professions.model";
import { ProfessionsService } from "./professions/professions.service";
import { PersonsController } from "./persons/persons.controller";
import { Person } from "./persons/persons.model";
import { PersonsService } from "./persons/persons.service";

const professionsService = new ProfessionsService(Profession);
const professionsController = new ProfessionsController(professionsService);

const personsService = new PersonsService(
  Person, 
  professionsService);
const personsController = new PersonsController(personsService);


export class PersonList {

  professionsList = new Set();

  async createPersons(personList: any) {
    try {
      const persons = personList.persons;
      for (let i = 0; i < persons.length; i++) {
        let personKinopoiskId = Number(persons[i].kinopoiskId);
        let photoLink = persons[i].photoLink;
        let name = persons[i].name;
        let nameEng = persons[i].enName;
        await personsController.create({
          personKinopoiskId,
          photoLink,
          name,
          nameEng
        });
        const professions = persons[i].professions;
        for (let j = 0; j < professions.length; j++) {
          const profession = professions[j];
          if ( !this.professionsList.has(profession)) {
            this.professionsList.add(profession);
            await professionsController.create({
              profession
            });
            await personsController.updateProfession(
              personKinopoiskId,
              profession
            );
          } else {
            await personsController.updateProfession(
              personKinopoiskId,
              profession
            );
          }
        }
      }
    } catch (e) {
        console.log('The person already exists', 3001);
    }
  }
}
