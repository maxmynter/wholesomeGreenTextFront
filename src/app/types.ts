export type quality = "Yes" | "No"

export type generatedGreentexts = {
	text: string
	model: model
	isGood?: quality
	generationId: string
}
export interface model {
	name: string
	requestURL: string
}

export interface models {
	[key: string]: model
}
