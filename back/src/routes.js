const express = require('express');
const router = express.Router();

const produto = require("./controller/produtosController");
const categoria = require("./controller/categoriaController");
const usuario = require("./controller/usuarioController")

router.post("/produto", produto.create);
router.get("/produto", produto.read);
router.put("/produto", produto.update);
router.delete("/produto", produto.remove);

router.post("/categoria", categoria.create);
router.get("/categoria", categoria.read);
router.put("/categoria", categoria.update);
router.delete("/categoria", categoria.remove);

router.post("/usuario", usuario.create);
router.post("/usuarioLogin", usuario.login);

module.exports = router;