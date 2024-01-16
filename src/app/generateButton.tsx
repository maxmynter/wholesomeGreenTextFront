"use client"
import { BigPostRef } from "./postRefs"
import { supabase } from "./supabaseClient"
import { v4 as uuidv4 } from "uuid"
import { generatedGreentexts, model } from "./types"
import { startToken } from "./home"

const generateGreentext = async (model: model) => {
	const response = await fetch(`${model.requestURL}`, {
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}`,
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({
			inputs: startToken,
			parameters: {
				top_k: 15,
				temperature: 1.2,
				max_new_tokens: 45,
				return_full_text: false,
				do_sample: true,
				num_return_sequences: 1,
			},
			options: { use_cache: false },
		}),
	})
	const result = await response.json()
	return result
}

const GenerateButton: React.FC<{
	greentexts: generatedGreentexts[]
	setGreentextsArray: (newArray: generatedGreentexts[]) => void
	model: model
}> = ({ greentexts, setGreentextsArray, model }) => {
	const handleGenerate = async () => {
		const result = await generateGreentext(model)
		const content: string = result[0].generated_text

		const generationId = uuidv4()
		await supabase
			.from("greentexts")
			.insert([{ content: content, generation_id: generationId, model: model.name }])

		setGreentextsArray(
			[{ generationId: generationId, text: content, model: model }].concat(
				greentexts
			)
		)
	}
	return <BigPostRef text="Generate" onClick={handleGenerate} />
}

export default GenerateButton
