import rabbitClient from "./rabbitMQ/client"

export default class MessageHandler{
    static async handle(
        routingKey: string,
        data: any,
        correlationId: string,
        replyTo: string,
    ) {
        let response = {};

        const {nameOfRoutingKey} = data;

        console.log('the name of routingKey is ', routingKey);

        switch (routingKey) {
            case 'postPerson': response = `post person data ${nameOfRoutingKey}`;
            break;
            case 'getPersons': response = `get person action ${nameOfRoutingKey}`;
            break;
            default: response = 0;
            break;
        }

        await rabbitClient.produce(response, correlationId, replyTo)

    }
}