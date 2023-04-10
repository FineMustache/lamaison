const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    const categoria = await prisma.categoria.createMany({
        data: info
    })

    res.status(200).json(categoria).end()
}

const read = async (req, res) => {
    const categoria = await prisma.categoria.findMany()

    res.status(200).json(categoria).end()
}

const update = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const categoria = await prisma.categoria.update({
        where: {
            id: id
        },
        data: req.body
    })

    res.status(200).json(categoria).end()
}

const remove = async (req, res) => {
    const categoria = await prisma.categoria.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(categoria).end()
}

module.exports = {
    create,
    read,
    update,
    remove
}