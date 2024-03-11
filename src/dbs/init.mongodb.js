'use strict'
const { default: mongoose } = require("mongoose")
require('dotenv').config()
const {db:{host,port,name}}=require('../configs/configs.mongodb')
console.log(host)
const connectString=`mongodb://${host}:${port}/${name}`;
class Database {

    static connect(type='mongodb'){
        if(1===1){
            mongoose.set('debug',true),
            mongoose.set('debug',{color:true})
        }
        mongoose.connect(connectString).then(_=>{console.log(connectString)})
        .catch(err=>console.log(`Error Connect!`))
    }
    
    static getInstance(){
        if(!Database.instance){
            Database.instance=new Database()
            Database.connect('mongodb')
        }   
        console.log(Database.instance)
        return Database.instance
    }
}   

const instanceMongoDb=Database.getInstance()
module.exports=instanceMongoDb