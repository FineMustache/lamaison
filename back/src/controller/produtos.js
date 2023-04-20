const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        var datetimestamp = Date.now();
        cb(null, file.originalname.split('.')[0] + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
const parser = multer({ storage });
const create = async (req, res) => {
    parser.fields([{ name: 'img' }, { name: 'textura' }, { name: 'modelo' }, { name: 'mtl' }])(req, res, async err => {
        if (err)
            res.status(500).json({ error: 1, payload: err }).end();
        else {
            if (req.files.modelo == undefined) {
                req.files.modelo = [{filename: null}]
                req.files.mtl = [{filename: null}]
                req.files.textura = [{filename: null}]
            }
            const produto = await prisma.produto.create({
                data: {
                    nome: req.body.nome,
                    valor: Number(req.body.valor),
                    descricao: req.body.descricao,
                    imagem: req.files.img[0].filename,
                    modelo: req.files.modelo[0].filename,
                    mtl: req.files.mtl[0].filename,
                    textura: req.files.textura[0].filename,
                    superficie: req.body.superficie,
                    desconto: Number(req.body.desconto),
                    medidas: req.body.medidas

                }
            })

            res.status(200).json(produto).end()
        }
    });
}

const read = async (req, res) => {
    
    const produto = await prisma.produto.findMany({
        include: {
            categorias: {
                select: {
                    categoria: {
                        select: {
                            nome: true,
                            id: true
                        }
                    }
                }
            }
        }
    })

    res.status(200).json(produto).end()
}

const read15 = async (req, res) => {
    const page = req.params.page
    const options = req.query
    var filter = {}
    var sort = {}
    if (options.minPrec !== undefined) {
        filter = {
            AND: [
                {
                    valor: {
                        gte: Number(options.minPrec)
                    }
                },
                {
                    valor: {
                        lte: Number(options.maxPrec)
                    }
                }
            ]
        }
    }


    if (options.sortPrec !== undefined) {
        sort = {
            valor: String(options.sortPrec)
        }
    }

    if (options.desconto === "true") {
        console.log(Boolean(options.desconto))
        filter = {...filter,
            desconto: {
                gt: 0
            }
        }
    }

    const produto = await prisma.produto.findMany({
        select: {
            id: true,
            nome: true,
            valor: true,
            descricao: true,
            imagem: true,
            modelo: true,
            mtl: true,
            textura: true,
            superficie: true,
            desconto: true,
            medidas: true,
            categorias: {
                select: {
                    categoria: {
                        select: {
                            nome: true,
                            id: true
                        }
                    }
                }
            }
        },
        skip: (page * 15 - 15),
        take: 15,
        where: filter,
        orderBy: sort
    })

    const count = await prisma.produto.count({
        where: filter,
    })

    res.status(200).json({produtos: produto, count}).end()
}

const readHl = async (req, res) => {
    const produto = await prisma.produto.findMany({
        select: {
            id: true,
            nome: true,
            valor: true,
            descricao: true,
            imagem: true,
            modelo: true,
            mtl: true,
            textura: true,
            superficie: true,
            desconto: true,
            medidas: true,
            categorias: {
                select: {
                    categoria: {
                        select: {
                            nome: true,
                            id: true
                        }
                    }
                }
            }
        },
        where: {
            desconto: {
                gt: 0
            }
        },
        orderBy: {
            desconto: 'desc'
        }
    })

    res.status(200).json(produto).end()
}

const readCount = async (req, res) => {
    const count = await prisma.produto.count()

    res.status(200).json({"count": count}).end()
}

const readOne = async (req, res) => {
    const page = req.params.page
    const produto = await prisma.produto.findFirst({
        select: {
            id: true,
            nome: true,
            valor: true,
            descricao: true,
            imagem: true,
            modelo: true,
            mtl: true,
            textura: true,
            superficie: true,
            desconto: true,
            medidas: true,
            categorias: {
                select: {
                    categoria: {
                        select: {
                            nome: true,
                            id: true
                        }
                    }
                }
            }
        },
        where: {
            id: Number(req.params.id)
        }
    })

    res.status(200).json(produto).end()
}

const update = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const produto = await prisma.produto.update({
        where: {
            id: id
        },
        data: req.body
    })

    res.status(200).json(produto).end()
}

const remove = async (req, res) => {
    const produto = await prisma.produto.delete({
        where: {
            id: Number(req.body.id)
        }
    })
    res.status(200).json(produto).end()
}

module.exports = {
    read,
    create,
    update,
    remove,
    read15,
    readHl,
    readOne,
    readCount
}
