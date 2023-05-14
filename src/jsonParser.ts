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

  async createPersons(personList: any) {
    try {
      const persons = personList;
      for (let i = 0; i < persons.length; i++) {
        let personKinopoiskId = Number(persons[i].kinopoiskId);
        let photoLink = persons[i].photoLink;
        let name = persons[i].name;
        let enName = persons[i].enName;
        await personsController.create({
          personKinopoiskId,
          photoLink,
          name,
          enName
        });
        const professionPersonIds = [];
        if (persons[i].professions != null) {
          const professionList = persons[i].professions;
          for (let j = 0; j < professionList.length; j++) {
            professionPersonIds.push(professionList[j]);
            let profession = professionList[j];
            await professionsController.create({
              profession, 
            });
          }
        }
        await personsController.updateProfession(
          personKinopoiskId,
          professionPersonIds,
        );  
      }
    } catch (e) {
        console.log('The person already exists', 3001);
    }
  }


//   async createProfessions(personList: any) {
//     try {
//       const persons = personList;
//       for (let i = 0; i < persons.length; i++) {
//         if (persons[i].professions != null) {
//           const professionList = persons[i].professions;
//           for (let j = 0; j < professionList.length; j++) {
//             professionPersonIds.push(professionList[j].profession);
//             let profession = professionList[j].profession;
//             await professionsController.create({
//               profession, 
//             });
//           }
//         }
//       }
//     } catch (e) {
//       console.log('The profession already exists', 3002);
//     }
//   }
}
