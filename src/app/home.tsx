"use client"
import { Post } from "./post"
import { SmallPostRef, BigPostRef } from "./postRefs"
import GenerateButton from "./generateButton"
import { useState } from "react"
import { generatedGreentextPair } from "./types"

const HomePage = () => {
	const [generatedGtx, setGeneratedGTX] = useState<generatedGreentextPair[]>([])

	return (
		<div className="flex min-h-screen min-w-screen flex-col items-center  pt-24">
			<Post
				SmallPostRef={[
					<SmallPostRef
						key="1"
						title="why"
						text="Why not?\n\nI wanted to learn about transformer models and LLMs. I am focused on what I can achieve with consumer hardware. Also I am pretty interested in online culture (so much so that I almost started a Ph.D. on it) so I guess I gravitate to this application domain."
					/>,
					<SmallPostRef
						key="2"
						title="who"
						text="Me.: \n\nThat is Max Mynter. Find me on \ntwitter: @maxmynter\nor Linkedin: /in/maxmynter"
					/>,
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
						text="> what are greentexts?\n greentexts are a distinctive storytelling format popularized on the imageboard 4chan. They are typically brief, anecdotal, and often humorous or satirical in nature. The format is characterized by the use of a green-colored 'greater-than' sign at the beginning of each line, a feature of the website's text quoting system. These greentexts usually follow a simple narrative style and are known for their informal, and sometimes crude, language.\n> isn't 4chan bad?\nI tried to get around all the lewd stuff by using (and manually cleaning) 'wholesome' greentexts and obviously did have more control with synthetic generation."
					/>,
				]}
				BigPostRef={<GenerateButton setGreentextsArray={setGeneratedGTX} />}
				text="> be me \n> want to train llms\n> llms to large for consumer hardware\n> train small llms instead\n\n I've trained small (1M- 125M parameter) LLMs to tell stories in an idiosyncratic style.\n Click generate below to see sample output. \n\nIf you then select the better one, you help me to improve the models with RLHF. \n\nSee the links above for further information."
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
