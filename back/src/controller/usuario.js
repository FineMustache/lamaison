const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

const create = async (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
        if (err == null) {
            bcrypt.hash(req.body.senha, salt, async function (errCrypto, hash) {
                if (errCrypto == null) {
                    req.body.senha = hash
                    const usuario = await prisma.usuario.create({
                        data: req.body
                    })
                    res.status(200).json(usuario).end()
                } else {
                    console.log(errCrypto)
                    res.status(500).json(errCrypto).end()
                }
            });
        } else {
            res.status(500).json(err).end()
        }
    })
}
const login = async (req, res) => {
    const usuario = await prisma.usuario.findFirstOrThrow({
        where: {
            email: req.body.email
        }
    }).then((value) => { return (value) })
        .catch((err) => { return { "erro": "Usuário Incorreto", "validacao": false } })

    if (usuario.erro == null) {
        bcrypt.compare(req.body.senha, usuario.senha).then((value) => {
            if (value) {
                let data = { "userid": usuario.id}
                jwt.sign(data, process.env.KEY, { expiresIn: '10m' }, function (err2, token) {
                    if (err2 == null) {

                        res.status(200).json({ "userid": usuario.id, "token": token, "nome": usuario.nome, "validacao": true }).end()
                    } else {
                        res.status(500).json(err2).end()
                    }

                })
            } else {
                res.status(201).json({ "erro": "Senha incorreta", "validacao": false }).end()
            }
        })
    } else {
        res.status(404).json(usuario).end()
    }


}

module.exports = {
    create,
    login,
}