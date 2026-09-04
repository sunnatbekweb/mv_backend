import { ObjectId } from 'mongodb'
import { getDatabase } from '../config/database.js'

export async function getAllMovies({ limit = 20 } = {}) {
	const db = getDatabase()
	return db.collection('movies').find({}).limit(limit).toArray()
}

export async function getMovieById(id) {
	const db = getDatabase()
	return db.collection('movies').findOne({ _id: new ObjectId(id) })
}

export async function createMovie(movieData) {
	const db = getDatabase()
	const result = await db.collection('movies').insertOne(movieData)
	return { _id: result.insertedId, ...movieData }
}

export async function updateMovie(id, updates) {
	const db = getDatabase()
	return db
		.collection('movies')
		.updateOne({ _id: new ObjectId(id) }, { $set: updates })
}

export async function deleteMovie(id) {
	const db = getDatabase()
	return db.collection('movies').deleteOne({ _id: new ObjectId(id) })
}
