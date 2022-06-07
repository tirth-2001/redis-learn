import express from 'express'
import axios from 'axios'
import { createClient } from 'redis'
import { rootHandler, helloHandler } from './handlers'

const redisClient = createClient()

const app = express()
const port = process.env.PORT || 8080
const DEFAULT_EXPIRATION = 3600

app.get('/', rootHandler)
app.get('/hello/:name', helloHandler)

app.get('/photos', async (req, res) => {
	const albumId = req.query.albumId
	const response = await redisClient.get('photos')
	if (response) {
		return res.json(JSON.parse(response))
	} else {
		const { data } = await axios.get(
			`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
		)
		redisClient.setEx('photos', DEFAULT_EXPIRATION, JSON.stringify(data))
		res.json(data)
	}
})

app.get('/photos/:id', async (req, res) => {
	const { id } = req.params
	const { data } = await axios.get(
		`https://jsonplaceholder.typicode.com/photos/${id}`
	)
	res.json(data)
})

app.listen(port, () => {
	return console.log(`Server is listening on ${port}`)
})
