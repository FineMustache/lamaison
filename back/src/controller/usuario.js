const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const Email = require('./email')

const create = async (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
        if (err == null) {
            bcrypt.hash(req.body.senha, salt, async function (errCrypto, hash) {
                if (errCrypto == null) {
                    req.body.senha = hash
                    const usuario = await prisma.usuario.create({
                        data: req.body
                    })
                    let data = {"uid": usuario.id}
                    jwt.sign(data, process.env.KEY, function(err2, token) {
                        if(err2 == null){
                            Email.send(0, usuario.email, token)
                            res.status(200).json({...usuario, token}).end()
                        } else {
                            res.status(500).json(err2).end()
                        }
                    })
                    
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
        .catch((err) => { return { "erro": "Email não cadastrado", "validacao": false } })

    if (usuario.erro == null) {
        
            bcrypt.compare(req.body.senha, usuario.senha).then((value) => {
                if (value) {
                    let data = { "userid": usuario.id}
                    jwt.sign(data, process.env.KEY, { expiresIn: '1h' }, function (err2, token) {
                        if (err2 == null) {
                            if (usuario.verificado) {
                                res.status(200).json({ "userid": usuario.id, "token": token, "nome": usuario.nome, "email": usuario.email, "validacao": true }).end()
                            } else {
                                res.status(400).json({"erro": "Usuário não verificado", "validacao": false})
                            }
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

const verify = async (req, res) => {
    const usuario = await prisma.usuario.update({
        where: {
            id: Number(req.uid)
        },
        data: {
            verificado: true
        }
    })

    res.status(200).json({'validado': true}).end()
}

const teste = async (req, res) => {
    const usuario = await prisma.usuario.findMany()
    const categoria = await prisma.categoria.findMany()
    const produto = await prisma.produto.findMany()
    const produto_cat = await prisma.produto_categoria.findMany()
    const compra = await prisma.compra.findMany()
    const compra_prod = await prisma.compra_produto.findMany()
    const desejo = await prisma.desejo.findMany()
    
    const data = {
      usuario, categoria, produto, produto_cat, compra, compra_prod, desejo
    }
    
    res.json(data).end()
}

module.exports = {
    create,
    login,
    verify,
    teste
}