"use client"
import React, { useEffect, useState } from "react"
const RenderPostRefs = (
	PostRefs: React.ReactElement | React.ReactElement[] | undefined
) => {
	if (PostRefs == undefined) {
		return null
	} else if (Array.isArray(PostRefs)) {
		return PostRefs.map((Ref) => Ref)
	} else {
		return PostRefs
	}
}

const RandomPostNumberDisplay: React.FC = () => {
	const [num, setNum] = useState(100000000)
	useEffect(() => {
		setNum(Math.floor(Math.random() * 100000000))
	}, [])

	return (
		<span className="text-black font-sans text-sm inline-block mr-2">{`No.${num}`}</span>
	)
}

const DateTimeDisplay: React.FC = () => {
	const [currentDateTime, setCurrentDatetime] = useState(
		"mm/dd/yy(wd)hr:min:sec"
	)
	useEffect(() => {
		const now = new Date()
		const day = now.getDate().toString().padStart(2, "0")
		const month = (now.getMonth() + 1).toString().padStart(2, "0") // getMonth() returns 0-11
		const year = now.getFullYear().toString().substring(2)
		const weekday = now.toLocaleString("en-US", { weekday: "short" })
		const hours = now.getHours().toString().padStart(2, "0")
		const minutes = now.getMinutes().toString().padStart(2, "0")
		const seconds = now.getSeconds().toString().padStart(2, "0")

		setCurrentDatetime(
			`${month}/${day}/${year}(${weekday})${hours}:${minutes}:${seconds}`
		)
	}, [])

	return (
		<span className="text-black inline-block mr-2 font-sans text-sm">
			{currentDateTime}
		</span>
	)
}

const PostInfo: React.FC<{
	postRefs?: React.ReactElement | React.ReactElement[]
}> = ({ postRefs }) => {
	return (
		<div className="flex flex-wrap items-center">
			<input type="checkbox" className="mr-2" />
			<span className="inline-block mr-2">
				<span className="font-bold text-nameBlockGreen inline-block">
					Anonymous
				</span>
			</span>
			<DateTimeDisplay />
			<RandomPostNumberDisplay />
			<span className="text-black font-sans text-sm inline-block">▶</span>
			{RenderPostRefs(postRefs)}
		</div>
	)
}

const PostContentTile: React.FC<{
	text: string
	BigPostRef?: React.ReactElement | React.ReactElement[]
	SmallPostRef?: React.ReactElement | React.ReactElement[]
}> = ({ text, BigPostRef, SmallPostRef }) => {
	const renderText = (text: string): JSX.Element[] => {
		const cleanedText = text.replace(/>>/g, ">").replace(/\\n/g, "\n")

		return cleanedText.split("\n").map((line, index) => {
			console.log(line)

			if (line.startsWith(">")) {
				return (
					<div key={index} className="text-greentextGreen">
						{line}
					</div>
				)
			} else if (line === "") {
				return (
					<div key={index} className="empty-line">
						<br />
					</div>
				)
			} else {
				return <div key={index}>{line}</div>
			}
		})
	}
	return (
		<div className="bg-postBackgroundBlue border-postBorderBlue border border-customBorder table max-w-md p-0.5 pb-4 mr-1 ml-1">
			<PostInfo postRefs={SmallPostRef} />
			<div className="ml-8 m-4">
				<div className="text-gray-800 mb-8">{renderText(text)}</div>
				{RenderPostRefs(BigPostRef)}
			</div>
		</div>
	)
}

const Post: React.FC<{
	text: string
	BigPostRef?: React.ReactElement | React.ReactElement[]
	SmallPostRef?: React.ReactElement | React.ReactElement[]
}> = ({ text, BigPostRef, SmallPostRef }) => {
	return (
		<div className="flex justify-center items-center m-2">
			<div>
				<div className="inline-block text-sideArrowLightBlue float-left mt-0.5 mr-0.5 ml-0.5">
					{">>"}
				</div>
				<PostContentTile
					text={text}
					BigPostRef={BigPostRef}
					SmallPostRef={SmallPostRef}
				/>
			</div>
		</div>
	)
}

export { PostContentTile, Post }
