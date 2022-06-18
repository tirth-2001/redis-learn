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
const redis_1 = require("redis");
const handlers_1 = require("./handlers");
const redisClient = (0, redis_1.createClient)();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const DEFAULT_EXPIRATION = 3600;
app.get('/', handlers_1.rootHandler);
app.get('/hello/:name', handlers_1.helloHandler);
app.get('/photos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const albumId = req.query.albumId;
    const response = yield redisClient.get(`photos?albumId=${albumId}`);
    if (response) {
        return res.json(JSON.parse(response));
    }
    else {
        const { data } = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        redisClient.setEx(`photos?albumId=${albumId}`, DEFAULT_EXPIRATION, JSON.stringify(data));
        res.json(data);
    }
}));
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
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map