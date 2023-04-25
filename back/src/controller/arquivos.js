const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const multer = require('multer');
const path = require('path')

const read = (req, res) => {
    const options = {
        root: path.join(__dirname.split('src')[0])
    }
    res.sendFile(`uploads/${req.params.fileName}`, options, function (err) {
        if (err) {
            console.log(err)   
        }
    })
}

module.exports = {
    read
}