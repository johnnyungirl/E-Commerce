const amqplib=require(`amqplib`)
const URL=`amqp://localhost`
const runProducer=async()=>{
    try{
        const conn=await amqplib.connect(URL)
        const channel=await conn.createChannel()
        const notificationExchange='notificationEx'
        const notificationQueue=`notificationProcessQueue`
        const notificationExchangeDLX=`notificationExDLX`
        const notificationRoutingKeyDLX=`notificationRoutingKey DLX`
        await channel.assertExchange(notificationExchange,'direct',{duarable:true})
        const resultQueue=await channel.assertQueue(notificationQueue,{
            exclusive:false,
            deadLetterExchange:notificationExchangeDLX,
            deadLetterRoutingKey:notificationRoutingKeyDLX
        })
        await channel.bindQueue(resultQueue.queue,notificationExchange)
        const msg="a new product"
        console.log(msg)
        await channel.sendToQueue(resultQueue.queue,Buffer.from(msg),{expiration:'10000'})
        setTimeout(() => {
            conn.close()
            process.exit(1)
        }, 500);
    
    }catch(err){
        console.error(err)
    }
}
runProducer().then(rs=>console.log(rs)).catch(console.error)
