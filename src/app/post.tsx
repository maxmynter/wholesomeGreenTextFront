// components/Post.tsx
import React from "react"
const PostInfo = () => {
	return (
		<span className="inline-block">
			<span className="font-bold text-nameBlockGreen">Anonymous</span>
		</span>
	)
}
const Post = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-postBackgroundBlue border-postBorderBlue border-r border-b border-customBorder table p-0.5 max-w-md rounded shadow-md">
				<PostInfo />
				<p className="text-gray-800">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit...
				</p>
			</div>
		</div>
	)
}

export default Post
