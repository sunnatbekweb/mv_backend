import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri)

let database

const connectToDatabase = async () => {
	try {
		await client.connect()
		database = client.db(process.env.DB_NAME || 'sample_mflix')
		console.log('Connected to the database:', database.databaseName)

		return database
	} catch (error) {
		console.error('Error connecting to the database:', error)
	}
}

const getDatabase = () => {
	if (!database) {
		throw new Error(
			'Database connection has not been established. Call connectToDatabase first.'
		)
	}
	return database
}

export { client, connectToDatabase, getDatabase }
