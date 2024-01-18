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
import { modelInfo } from "./texts/model"
import { dataInfo } from "./texts/datasets"
import { techInfo } from "./texts/tech"

export const startToken = "<|4chanGtxStart|>"

const models: model[] = [
	{
		name: "TinyStories 33M, Simple Thanks Genre",
		requestURL: process.env.NEXT_PUBLIC_INFERENCE_URL_TINY_ON_THANK || "",
	},
	{
		name: "TinyStories 33M, Full Dataset",
		requestURL: process.env.NEXT_PUBLIC_INFERENCE_URL_TINY_FULL_DATA || "",
	},
	{
		name: "TinyStories 33M, Sequential",
		requestURL:
			process.env.NEXT_PUBLIC_INFERENCE_URL_SEQUENTIAL_TO_THANKS || "",
	},
	{
		name: "TinyStories 33M, Simple Greentexts",
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
					<SmallPostRef key="3" title="model" text={modelInfo} />,
					<SmallPostRef key="4" title="datasets" text={dataInfo} />,
					<SmallPostRef key="5" title="tech&code" text={techInfo} />,
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
