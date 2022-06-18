"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
// import { createClient } from 'redis'
const handlers_1 = require("./handlers");
// const redisClient = createClient()
// redisClient.connect()
const app = (0, express_1.default)();
const port = process.env.PORT || 8081;
app.get('/', handlers_1.rootHandler);
app.get('/hello/:name', handlers_1.helloHandler);
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
app.get('/photos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { data } = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
    res.json(data);
}));
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
    return console.log(`Server is running at ${port}`);
});
//# sourceMappingURL=index.js.map