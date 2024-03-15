const express = require('express');
const router = express.Router();
const Libro = require("../models/Libro");
const { requiredScopes } = require("express-oauth2-jwt-bearer");

router.get('/',requiredScopes('read:libros'), async (req,res)=>{
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({error: "Error al intentar traer un libro" });
    }
});

router.get('/:id',requiredScopes('read:libros'), async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }
        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: "Error al intentar buscar el libro por ID" });
    }
});

router.post('/',requiredScopes('write:libros'), async (req,res)=>{
   
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({error: "Error al intentar agregar un libro" });
    }
});

router.put('/:id',requiredScopes('write:libros'), async (req,res)=>{
    try {
        await Libro.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
        })
        res.json("Libro modificado exitosamente");
    } catch (error) {
        res.status(500).json({error: "Error al intentar actualizar el libro "});
    }
});

router.delete('/:id',requiredScopes('write:libros'), async (req,res) => {
   try {
    await Libro.findByIdAndDelete(req.params.id);
    res.json("Libro eliminado");
   } catch (error) {
    res.status(500).json({error: "Error al intentar eliminar el libro "});
   }
});


module.exports = router;
