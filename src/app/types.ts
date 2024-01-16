export type generatedGreentexts = {
	text: string
	model: model
	isGood?: number
	generationId: string
}
export interface model {
	name: string
	requestURL: string
}
export type quality = "Yes" | "No"

export interface models {
	[key: string]: model
}
