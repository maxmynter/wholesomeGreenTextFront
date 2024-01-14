"use client" // See https://stackoverflow.com/questions/74965849/youre-importing-a-component-that-needs-usestate-it-only-works-in-a-client-comp
import React, { useState } from "react"
import { PostContentTile } from "./post"

const BasePostRef: React.FC<{
	onClick?: React.MouseEventHandler
	onHover?: React.FC
	className: string
	text: string
}> = ({ onClick, onHover, text, className }) => {
	return (
		<div className={`${className} cursor-pointer underline`} onClick={onClick}>
			{">>"}
			{text}
		</div>
	)
}

const SmallPostRef: React.FC<{
	text: string
	title: string
}> = ({ text, title }) => {
	const [isHovered, setIsHovered] = useState(false)
	return (
		<div
			className="relative flex items-center"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<BasePostRef
				className={`text-xs inline pl-1.5 ${
					isHovered ? "text-postRed" : "text-smallPostRefBlue"
				} `}
				text={title}
				onClick={() => setIsHovered(!isHovered)}
			/>
			{isHovered && (
				<div className="absolute  top-full left-0 right-0 mx-auto  max-w-full">
					<PostContentTile text={text} />
				</div>
			)}
		</div>
	)
}

const BigPostRef: React.FC<{
	onClick?: React.MouseEventHandler<HTMLDivElement>
	text: string
}> = ({ onClick, text }) => {
	return (
		<BasePostRef
			className="text-postRed  hover:text-smallPostRefBlue"
			text={text}
			onClick={onClick}
		/>
	)
}

export { SmallPostRef, BigPostRef }
