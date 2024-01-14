"use client"
import { BigPostRef } from "./postRefs"
import { supabase } from "./supabaseClient"
import { v4 as uuidv4 } from "uuid"
import { generatedGreentextPair } from "./types"

const generateGreentext = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_INFERENCE_URL}`, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}`,
		},
		method: "POST",
		body: JSON.stringify({ inputs: ">" }),
	})
	const result = await response.json()
		return result
}

const GenerateButton: React.FC<{
	setGreentextsArray: (newArray: generatedGreentextPair[]) => void
}> = ({ setGreentextsArray }) => {
	const handleGenerate = async () => {
		const first = await generateGreentext()
		const first_gtx: string = first[0].generated_text
		const second = await generateGreentext()
		const second_gtx: string = second[0].generated_text

		const batchId = uuidv4()
		await supabase.from("greentexts").insert([
			{ content: first_gtx, batch_id: batchId },
			{ content: second_gtx, batch_id: batchId },
		])

		setGreentextsArray([
			{ batch: batchId, text: first_gtx },
			{ batch: batchId, text: second_gtx },
		])
	}
	return <BigPostRef text="Generate" onClick={handleGenerate} />
}

export default GenerateButton
