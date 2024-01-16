"use client"
import { BigPostRef } from "./postRefs"
import { supabase } from "./supabaseClient"
import { v4 as uuidv4 } from "uuid"
import { generatedGreentextPair, model } from "./types"
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
	setGreentextsArray: (newArray: generatedGreentextPair[]) => void
	model: model
}> = ({ setGreentextsArray, model }) => {
	const handleGenerate = async () => {
		const first = await generateGreentext(model)
		const first_gtx: string = first[0].generated_text
		const second = await generateGreentext(model)
		const second_gtx: string = second[0].generated_text

		const batchId = uuidv4()
		await supabase.from("greentexts").insert([
			{ content: first_gtx, batch_id: batchId, model: model.name },
			{ content: second_gtx, batch_id: batchId, model: model.name },
		])

		setGreentextsArray([
			{ batch: batchId, text: first_gtx, model: model },
			{ batch: batchId, text: second_gtx, model: model },
		])
	}
	return <BigPostRef text="Generate" onClick={handleGenerate} />
}

export default GenerateButton
