import { Channel, ConsumeMessage } from "amqplib";
import MessageHandler from "../messageHandler";

export default class Consumer {
    constructor( private channel: Channel, private rpcQueueName: string ){}

    async consumeMessages(){
        console.log('Ready to consume messages....Again');
        this.channel.consume(
            this.rpcQueueName,
            async (message: ConsumeMessage) => {
            const {correlationId, replyTo} = message.properties;
            // const operation = message.properties.headers.function;
            // console.log(message.properties.headers.function);
            if (!correlationId || !replyTo) {
                console.log('Missing some properties ...');
            } else {
                console.log('Properties are...correlationId', correlationId);
                console.log('Properties are...replyTo', replyTo);
            }

            await MessageHandler.handle(
                JSON.parse(message.content.toString()).operation,
                JSON.parse(message.content.toString()),
                correlationId,
                replyTo,)
        },
        {
            noAck: true,
        }
        );
    }
}
