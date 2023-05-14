import rabbitClient from "./rabbitMQ/client";
import { ProfessionsController } from "./professions/professions.controller";
import { Profession } from "./professions/professions.model";
import { ProfessionsService } from "./professions/professions.service";
import { PersonsController } from "./persons/persons.controller";
import { Person } from "./persons/persons.model";
import { PersonsService } from "./persons/persons.service";
import { PersonList } from "./jsonParser";

const personList = new PersonList();

const professionsService = new ProfessionsService(Profession);
const professionsController = new ProfessionsController(professionsService);

const personsService = new PersonsService(
  Person, 
  professionsService);
const personsController = new PersonsController(personsService);


export default class MessageHandler{
  static async handle(
    routingKey: string,
    data: any,
    correlationId: string,
    replyTo: string,
    ) {
      let response = {};

      switch (routingKey) {
        case 'postPerson':
          await personList.createPersons(data);
          response = 'New person is created';
          break;
        case 'getPersons':
          response = await personsController.getAllPersons();
          break;
        case 'getPerson':
          const {personKinopoiskId} = data;
          response = await personsController.getByKinopoiskId(personKinopoiskId);
          break;
          case 'getProfessions':
          response = await professionsController.getAll();
          break;
        case 'getProfession':
          const {profession} = data;
          response = await professionsController.getByName(profession);
          break;
        default: response = 0;
          break;
    }

    await rabbitClient.produce(response, correlationId, replyTo)
    }
}