"use client"
import { BigPostRef } from "./postRefs"

const generateGreentext = async () => {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/maxmyn/tiny-wholesome-greentexts",
		{
			headers: {
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}`,
			},
			method: "POST",
			body: JSON.stringify({ inputs: ">" }),
		}
	)
	const result = await response.json()
	console.log(JSON.stringify(result))
	return result
}

const GenerateButton: React.FC<{
	setGreentextsArray: (newArray: string[]) => void
}> = ({ setGreentextsArray }) => {
	const handleGenerate = async () => {
		const first = await generateGreentext()
		const second = await generateGreentext()
		setGreentextsArray([first[0].generated_text, second[0].generated_text])
	}
	return <BigPostRef text="Generate" onClick={handleGenerate} />
}

export default GenerateButton
