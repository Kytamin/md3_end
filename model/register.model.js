
const mysql = require('mysql')
const BaseModel = require('./base');
class Register {
  async create (nameUser,city,restroom,wc,price,description){
    const sql=`insert into  homestay(name,city,numRestRoom,numWCroom,price,description) value ('${nameUser}','${city}',${restroom},${wc},${price},'${description}')`
    return BaseModel.querySql(sql)
  }
}
module.exports = new Register()