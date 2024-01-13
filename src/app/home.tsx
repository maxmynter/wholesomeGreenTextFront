"use client"
import { Post } from "./post"
import { SmallPostRef, BigPostRef } from "./postRefs"
import GenerateButton from "./generateButton"
import { useState } from "react"
import { generatedGreentextPair } from "./types"

const HomePage = () => {
	const [generatedGtx, setGeneratedGTX] = useState<generatedGreentextPair[]>([])

	return (
		<div className="flex min-h-screen min-w-screen flex-col items-center  p-24">
			<Post
				SmallPostRef={[
					<SmallPostRef key="1" title="why" text="Why not?" />,
					<SmallPostRef key="2" title="who" text="Me" />,
					<SmallPostRef
						key="3"
						title="model"
						text="TinyStories probably. But I've also worked with GPT-J and GPT Neo. My plan is to get as small as possible while still being coherent in the output."
					/>,
					<SmallPostRef
						key="4"
						title="dataset"
						text="More coming. But look here: https://huggingface.co/datasets/maxmyn/wholesome_greentext_110k/blob/main/README.md"
					/>,
					<SmallPostRef key="5" title="faq" text="more soon." />,
				]}
				BigPostRef={<GenerateButton setGreentextsArray={setGeneratedGTX} />}
				text="Site still under construction. Will be done by Sunday :) Click generate below to generate greentexts. Currently, its always the same bc. Huggingface is hashing results. That will change. Select the better greentext below so I can RLHF this model :) "
			/>
			{generatedGtx.length > 0 && (
				<div className="pl-12">
					{generatedGtx.map((gtx, idx) => (
						<Post
							key={idx}
							text={gtx.text}
							BigPostRef={<BigPostRef text="This greentext is better" />}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default HomePage
