const express = require('express');
const router = express.Router();

const produto = require("./controller/produtosController");

router.post("/produtoI", produto.create);
router.get("/produtoRead", produto.read) 

module.exports = router;