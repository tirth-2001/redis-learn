import express from 'express'
import axios from 'axios'
// import { createClient } from 'redis'
import { rootHandler, helloHandler } from './handlers'

// const redisClient = createClient()

// redisClient.connect()

console.log('Starting server...')

const app = express()
const port = process.env.PORT || 8080

app.get('/', rootHandler)
app.get('/hello/:name', helloHandler)

// app.get('/photos', async (req, res) => {
// 	const response = await redisClient.get('photos')
// 	const photos = response ? JSON.parse(response) : null

// 	if (!!photos.length) {
// 		console.log('Found in cache', photos)

// 		return res.json(JSON.parse(response))
// 	} else {
// 		const { data } = await axios.get(
// 			`https://jsonplaceholder.typicode.com/photos`
// 		)
// 		await redisClient.set('photos', JSON.stringify(data))
// 		res.json(data)
// 	}
// })

app.get('/photos/:id', async (req, res) => {
	const { id } = req.params
	const { data } = await axios.get(
		`https://jsonplaceholder.typicode.com/photos/${id}`
	)
	res.json(data)
})

// function getOrSetCache(key: string, getter: () => void) {
// 	return new Promise((resolve, reject) => {
// 		redisClient.get(key, async (err: any, response: string) => {
// 			if (err) {
// 				reject(err)
// 			} else if (response) {
// 				resolve(JSON.parse(response))
// 			} else {
// 				const freshData = await getter()
// 				redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
// 				resolve(freshData)
// 			}
// 		})
// 	})
// }

app.listen(port, () => {
	return console.log(`Server is listening on ${port}`)
})
