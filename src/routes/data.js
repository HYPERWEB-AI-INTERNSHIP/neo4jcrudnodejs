import { Router } from "express";
import dataModel from '../models/data'
const data = Router()


data.get('/', async (req,res)=>{
    const result = await dataModel.findAll()
    res.json(result)
})
data.get('/:id', async (req,res)=>{
    const result = await dataModel.findById(req.params.id)
    res.json(result)
})
data.post('/', async (req,res)=>{
    const result = await dataModel.create(req.body)
    res.json(result)
})
data.put('/:id', async (req,res)=>{
    const result = await dataModel.findByIdAndUpdate(req.params.id, req.body)
    res.json(result)
})
data.delete('/:id', async (req,res)=>{
    const result = await dataModel.findByIdAndDelete(req.params.id)
    res.json(result)
})

export default data