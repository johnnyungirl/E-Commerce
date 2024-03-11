const amqplib=require(`amqplib`)
const URL=`amqp://localhost`
async function ConsumerOrderMessage(){
    const connection=await amqplib.connect(URL)
    const channel=await connection.createChannel()
    const queueName="ordered-queue-message"
    await channel.assertQueue(queueName,{durable:true})
    channel.prefetch(1)
    await channel.consume(queueName,msg=>{
        const message=msg.content.toString()
        setTimeout(() => {
            console.log(`Processd`,message)
            channel.ack(msg)
        }, Math.random()*1000);
    })
}
ConsumerOrderMessage().catch(err=>{console.error(err)})