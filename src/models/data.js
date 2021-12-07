import { nanoid } from 'nanoid';

const neo4j = require('neo4j-driver');
require('dotenv').config()
const {
    url,
    db_username,
    db_password,
    database,
} = process.env
const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password));
const session = driver.session({ database });

const findAll = async () =>{
    const result = await session.run(`Match (d:Data) return d`)
    return result.records.map(i=>i.get('d').properties)
}

const findById = async (id) =>{
    const result = await session.run(`MATCH (d:Data {_id : '${id}'} ) return d limit 1`)
    return result.records[0].get('d').properties
}
const create = async (data) =>{
    const unique_id = nanoid(8)
    await session.run(`CREATE (d:Data {_id : '${unique_id}', field1: '${data.FIELD1}', year: '${data.year}', sentence: '${data.sentence}'} ) return d`)
    return await findById(unique_id)
}
const findByIdAndUpdate = async (id, data) =>{
    const result = await session.run(`MATCH (d:Data {_id : '${id}'}) SET d.field1= '${data.FIELD1}', d.year= '${data.year}', d.sentence= '${data.sentence}' return d`)
    return result.records[0].get('d').properties
}
const findByIdAndDelete = async (id) =>{
    await session.run(`MATCH (d:Data {_id : '${id}'}) DELETE d`)
    return await findAll()
}

export default {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete
}