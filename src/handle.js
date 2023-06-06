const fs = require("fs");
const qs = require("qs");
const register = require('../model/register.model.js')
const handles={}

handles.register= async (req,res)=>{
try{
    if(req.method==='GET'){
        let data= await handles.readFileData('./view/addhomestay.html')
        res.writeHead(200);
        res.write(data);
        res.end()
    }else{
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        res.on('end',async ()=>{
            let infoUser = qs.parse(data)
            console.log(infoUser)
            let {name,city,restroom,wc,price,description} = infoUser
            await register.create(name,city,restroom,wc,price,description)
            res.writeHead(301, {location: 'listhomestay'})
            res.end()
        })
    }
}
catch (err){
    console.log(err.message)
}
}
handles.notfound= async (req,res)=>{
    let data= await handles.readFileData('./view/notfound.html')
    res.writeHead(200);
    res.write(data);
    res.end()
}
handles.listHomestay=async (req,res)=>{
    try{
        let data= await handles.readFileData('./view/listhomestay.html')
        res.writeHead(200);
        res.write(data);
        res.end()
    }catch (err){
        console.log(err.message)
    }
}
handles.readFileData = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8',(err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
}

module.exports = handles