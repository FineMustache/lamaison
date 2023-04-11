const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    const compra = await prisma.compra.createMany({
        data: info
    })

    res.status(200).json(compra).end()
}

const read = async (req, res) => {
    const compra = await prisma.compra.findMany()

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
    update,
    remove
}