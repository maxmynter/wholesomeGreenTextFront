"use client"
import { Post } from "./post"
import { SmallPostRef, BigPostRef } from "./postRefs"
import GenerateButton from "./generateButton"
import { useEffect, useState } from "react"
import { generatedGreentexts, model, quality } from "./types"
import { supabase } from "./supabaseClient"
import { langdingPageText } from "./texts/landing"
import { v4 as uuidv4 } from "uuid"
import { who } from "./texts/who"

export const startToken = "<|4chanGtxStart|>"

const models: model[] = [
	{
		name: "TinyStories, Simple Thanks Genre",
		requestURL: process.env.NEXT_PUBLIC_INFERENCE_URL_TINY_ON_THANK || "",
	},
	{
		name: "TinyStories, Full Dataset",
		requestURL: process.env.NEXT_PUBLIC_INFERENCE_URL_TINY_FULL_DATA || "",
	},
	{
		name: "TinyStories, Sequential",
		requestURL:
			process.env.NEXT_PUBLIC_INFERENCE_URL_SEQUENTIAL_TO_THANKS || "",
	},
	{
		name: "TinyStories, Simple Greentexts",
		requestURL: process.env.NEXT_PUBLIC_INFERENCE_URL_TINY_ON_EASY || "",
	},
	{
		name: "DistilGPT-2, Full Greentexts",
		requestURL: process.env.NEXT_PUBLIC_INFERENCE_URL_DISTILGPT || "",
	},

	{
		name: "TinyStories-1M, Simple Greentexts",
		requestURL: process.env.NEXT_PUBLIC_INFERENCE_URL_1M_ON_SIMPLE || "",
	},
]

const HomePage = () => {
	const [generatedGtx, setGeneratedGTX] = useState<generatedGreentexts[]>([])

	useEffect(() => {
		const logSession = async () => {
			await supabase.from("sessions").insert([
				{
					session_id: uuidv4(),
					session_start: new Date(),
				},
			])
		}
		logSession()
	}, [])

	const handleSelectQuality = async (
		gtx: generatedGreentexts,
		quality: quality
	) => {
		await supabase
			.from("greentexts")
			.update({ is_good: quality })
			.eq("generation_id", gtx.generationId)

		const updatedGtx = generatedGtx.map((item) => {
			if (item.generationId === gtx.generationId) {
				return { ...item, isGood: quality }
			}
			return item
		})

		setGeneratedGTX(updatedGtx)
	}

	return (
		<div className="flex flex-col items-start p-24">
			<div className="w-full justify-center pb-10">
				<div className="border-b-2 border-dividerColor flex items-center w-full justify-center">
					<span className="text-boardTitleRed font-bold text-2xl pb-2">
						{"/gtx/ - Wholesome Greentexts"}
					</span>
				</div>
			</div>
			<Post
				SmallPostRef={[
					<SmallPostRef key="2" title="who" text={who} />,
					<SmallPostRef
						key="3"
						title="model"
						text="I am working with small to mid sized transformer models that still fit on consumer hardware. You can find models (and data) on Huggingface (huggingface.co/maxmyn)."
					/>,
					<SmallPostRef
						key="4"
						title="datasets"
						text="I've made three different datasets for this project. One is actual greentext scraped from the /r/wholesomegreentexts subreddit. These were mostly screenshots so I used OCR and manual cleaning. To augment this data I used OpenAIs GPT-4 and GPT-3.5 Turbo to generated two datasets of greentexts. One only using simple words and another without those constraints. Find them on huggingface (https://huggingface.co/maxmyn)."
					/>,
					<SmallPostRef
						key="5"
						title="tech"
						text="I've trained the models with PyTorch on Kaggle. Data crawling was done via the Reddit Pushift dataset. Synthetic data generation was done via OpenAI's APIs. Data, models and inference are hosted with huggingface. The frontend was build with Next.Js, TypeScript, Tailwind. I use Supabase to store generations and selection of better performing generations."
					/>,
					<SmallPostRef
						key="6"
						title="faq"
						text="> what are greentexts?\n\ngreentexts are a distinctive storytelling format popularized on the imageboard 4chan. They are typically brief, anecdotal, and often humorous or satirical in nature. The format is characterized by the use of a green-colored 'greater-than' sign at the beginning of each line, a feature of the website's text quoting system. These greentexts usually follow a simple narrative style and are known for their informal, and sometimes crude, language.\n> isn't 4chan bad?\n\nI tried to get around all the lewd stuff by using (and manually cleaning) 'wholesome' greentexts and obviously did have more control with synthetic generation."
					/>,
				]}
				BigPostRef={models.map((mdl, index) => (
					<GenerateButton
						key={index}
						greentexts={generatedGtx}
						setGreentextsArray={setGeneratedGTX}
						model={mdl}
					/>
				))}
				text={langdingPageText}
			/>
			{generatedGtx.length > 0 && (
				<div className="pl-24 flex flex-col items-start">
					{generatedGtx.map((gtx, idx) => (
						<Post
							key={idx}
							text={gtx.text + `\n\nby ${gtx.model.name}`}
							BigPostRef={[
								<BigPostRef
									key="1"
									text={`This is good ${gtx.isGood == "Yes" ? "✅" : ""}`}
									onClick={() => {
										handleSelectQuality(gtx, "Yes")
									}}
								/>,
								<BigPostRef
									key="2"
									text={`This is bad ${gtx.isGood == "No" ? "❌" : ""}`}
									onClick={() => {
										handleSelectQuality(gtx, "No")
									}}
								/>,
							]}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default HomePage
