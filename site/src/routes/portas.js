var express = require("express");
var router = express.Router();


var portasController = require("../controllers/portasController");


router.get("/coletandoPortas", function (req, res) {
    portasController.coletandoPortas(req, res);
})


module.exports = router;