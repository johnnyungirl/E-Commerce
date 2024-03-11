const amqplib=require(`amqplib`)
const URL=`amqp://localhost`
const msg=`Create new Product`
const producer=async ({msg})=>{
    try{
        const conn=await amqplib.connect(URL)
        if(!conn){
            console.log(`[ERROR] Connect to RabbitMQ Error`)
        }
        const channel=await conn.createChannel()
        const queueName=`test`
        await channel.assertQueue(queueName,{durable:true})
        channel.sendToQueue(queueName,Buffer.from(msg))
        console.log(`[SEND] ${queueName}: ${msg}`)
            
    }catch(error){
        console.error(`Error while sending to queue `,error)
        throw error
    }
}
producer({msg})