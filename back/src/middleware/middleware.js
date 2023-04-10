const { json } = require('express')
const jwt = require('jsonwebtoken')


const verificar = (req, res) => {
    const token = req.headers.authorization

    jwt.verify(token, process.env.KEY, (err, data) => {
        console.log(data);
        if (err != null) res.status(401).json({...err, "validar": false}).end()
        else{
            console.log(data["userid"]);
            console.log(req.body.id);
            if(data["userid"] == req.body.id){
                res.status(200).json({"validar": true}).end()
            }
            else{
                res.status(401).json({"validar": false}).end()
            }
        }
        
    })
}

module.exports = {
    verificar
}