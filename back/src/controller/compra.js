const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const crypto = require('crypto')
const Email = require('../controller/email')

const create = async (req, res) => {
    const info = req.body
    console.log(info)
    
    var valor = 0
    req.body.produtos.forEach(async p => {
        valor += (p.valor - (p.valor * p.desconto / 100)) * p.qtde
    })
  
    const data = {
      valor: parseFloat(valor.toFixed(2)),
      data_entrega: null,
      id_usuario: info.id_usuario,
      pago: true
    }
    
    const compra = await prisma.compra.create({
        data: data
    })    

    req.body.produtos.forEach(async p => {
        await prisma.compra_produto.create({
            data: {
                id_compra: Number(compra.id),
                id_produto: Number(p.id)
            }
        })
        valor += p.valor - (p.valor * p.desconto / 100)
    })
    Email.send(1, info.user.email, info)
    res.status(200).json({...info, success: true}).end()
}

const read = async (req, res) => {
    const compra = await prisma.compra.findMany({
      include: {
        produtos: true
      }
    })

    res.status(200).json(compra).end()
}

const readUser = async (req, res) => {
    const compra = await prisma.compra.findMany({
      include: {
        produtos: {
          include: {
            produto: true
          }
        }
      },
      where: {
        id_usuario: Number(req.params.id)
      },
      orderBy: {
        data_compra: 'desc'
      }
    })

    res.status(200).json(compra).end()
}

const update = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const compra = await prisma.compra.update({
        where: {
            id: id
        },
        data: req.body
    })

    res.status(200).json(compra).end()
}

const remove = async (req, res) => {
    const compra = await prisma.compra.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(compra).end()
}

module.exports = {
    create,
    read,
    readUser,
    update,
    remove
}