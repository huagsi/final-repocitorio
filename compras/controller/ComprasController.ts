import { CompraApplication } from "../application/CompraApplication";
import { Compra } from "../dto/Compra";
import { CompraRepository } from "../repository/CompraRepository";

const express = require('express')
const comprasRouter = express.Router()

//OBTENER LISTADO DE USUARIOS
comprasRouter.get('/compras', (request, response) => {
    const userApp = new CompraApplication(new CompraRepository());
    userApp.getAll().then(result => {
        response.status(201);
        response.send(result)
    })
})

//CREAR USUARIOS
comprasRouter.post('/compras', (request, response) => {
    const userApp = new CompraApplication(new CompraRepository());
    const { cantidad, costo, fecha } = request.body;
    userApp.save(new Compra(0, cantidad, costo, new Date(fecha))).then(result => {
        response.status(201);
        response.send(result);
    });

})

//EDITAR UN USUARIO modifique***
comprasRouter.put('/compras/:id', (request, response) => {
    const userApp = new CompraApplication(new CompraRepository());
    const { cantidad, costo, fecha } = request.body;
    userApp.update(new Compra(0, cantidad, costo, new Date(fecha)), request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})
/*
//modifique2***
//OBTENER DETALLES DE LOS USUARIOS
comprasRouter.get('/compras/:id', (request, response) => {
    const userApp = new CompraApplication(new CompraRepository());
    userApp.getById(request.params.id).then(result => {
        response._status(201);
        response.send(result);
    });
})*/

export { comprasRouter };