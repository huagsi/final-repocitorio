import { ProveedorApplication } from "../application/ProveedorApplication";
import { Proveedor } from "../dto/Proveedor";
import { ProveedorRepository } from "../repository/ProveedorRepository";

const express = require('express')
const proveedoresRouter = express.Router()

//OBTENER LISTADO DE USUARIOS
proveedoresRouter.get('/proveedores', (request, response) => {
    const userApp = new ProveedorApplication(new ProveedorRepository());
    userApp.getAll().then(result => {
        response.status(201);
        response.send(result)
    })
})

//CREAR USUARIOS
proveedoresRouter.post('/proveedores', (request, response) => {
    const userApp = new ProveedorApplication(new ProveedorRepository());
    const { nombre, direccion, telefono } = request.body;
    userApp.save(new Proveedor(0, nombre, direccion, telefono)).then(result => {
        response.status(201);
        response.send(result);
    });

})

//EDITAR UN USUARIO modifique***
proveedoresRouter.put('/proveedores/:id', (request, response) => {
    const userApp = new ProveedorApplication(new ProveedorRepository());
    const { nombre, direccion, telefono } = request.body;
    userApp.update(new Proveedor(0, nombre, direccion, telefono), request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})
/*
//modifique2***
//OBTENER DETALLES DE LOS USUARIOS
proveedoresRouter.get('/proveedores/:id', (request, response) => {
    const userApp = new ProveedorApplication(new ProveedorRepository());
    userApp.getById(request.params.id).then(result => {
        response._status(201);
        response.send(result);
    });
})*/

export { proveedoresRouter };