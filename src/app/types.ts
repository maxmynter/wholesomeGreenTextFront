export type generatedGreentextPair = {
	text: string
	batch?: string
	model: model
}
export interface model {
	name: string
	requestURL: string
}

export interface models {
	[key: string]: model
}
