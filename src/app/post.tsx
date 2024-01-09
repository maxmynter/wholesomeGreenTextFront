import React from "react"

const RandomNumberDisplay: React.FC = () => {
	const num = Math.floor(Math.random() * 100000000)
	return (
		<span className="text-black font-sans text-sm inline-block mr-2">{`No.${num}`}</span>
	)
}

const DateTimeDisplay: React.FC = () => {
	const now = new Date()
	const day = now.getDate().toString().padStart(2, "0")
	const month = (now.getMonth() + 1).toString().padStart(2, "0") // getMonth() returns 0-11
	const year = now.getFullYear().toString().substring(2)
	const weekday = now.toLocaleString("en-US", { weekday: "short" })
	const hours = now.getHours().toString().padStart(2, "0")
	const minutes = now.getMinutes().toString().padStart(2, "0")
	const seconds = now.getSeconds().toString().padStart(2, "0")

	const currentDateTime = `${month}/${day}/${year}(${weekday})${hours}:${minutes}:${seconds}`

	return (
		<span className="text-black inline-block mr-2 font-sans text-sm">
			{currentDateTime}
		</span>
	)
}

const PostInfo: React.FC = () => {
	return (
		<div className="block">
			<input type="checkbox" className="mr-2" />
			<span className="inline-block mr-2">
				<span className="font-bold text-nameBlockGreen inline-block">
					Anonymous
				</span>
			</span>
			<DateTimeDisplay />
			<RandomNumberDisplay />
			<span className="text-black font-sans text-sm inline-block">▶</span>
		</div>
	)
}

const Post: React.FC = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div>
				<div className="inline-block text-sideArrowLightBlue float-left mt-0.5 mr-0.5 ml-o.5">
					{">>"}
				</div>
				<div className="bg-postBackgroundBlue border-postBorderBlue border-r border-b border-customBorder table p-0.5 max-w-md">
					<PostInfo />
					<p className="text-gray-800 ml-8 mr-2">
						Lorem ipsum dolor sit amet, consectetur adipiscing
					</p>
				</div>
			</div>
		</div>
	)
}

export default Post
