const amqplib=require(`amqplib`)
const URL=`amqp://localhost`
async function ConsumerOrderMessage(){
    const connection=await amqplib.connect(URL)
    const channel=await connection.createChannel()
    const queueName="ordered-queue-message"
    await channel.assertQueue(queueName,{durable:true})
    for (let i = 0; i < 10; i++) {
        const message=`ordered-queue-message:::${i}`
        console.log(`message:${message}`)
        await channel.sendToQueue(queueName,Buffer.from(message),{persistent:true})
    }
    setTimeout(() => {
        connection.close()
    }, 1000);
}
ConsumerOrderMessage().catch(err=>{console.error(err)})