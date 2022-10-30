import { Request, Response } from 'express'

interface HelloResponse {
	hello: string
}

type HelloBuilder = (name: string) => HelloResponse

const helloBuilder: HelloBuilder = (name) => ({ hello: name })

export const rootHandler = (_req: Request, res: any) => {
	return res.send('API is running fine 3! 🤓')
}

export const helloHandler = (req: Request, res: Response) => {
	const { params } = req
	const { name = 'World' } = params
	const response = helloBuilder(name)

	return res.json(response)
}
