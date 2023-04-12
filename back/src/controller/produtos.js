const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const multer = require('multer');

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
                            nome: true
                        }
                    }
                }
            }

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
    remove
}
