import { Post } from "./post"
import { SmallPostRef } from "./postRefs"
import GenerateButton from "./generateButton"

const HomePage = () => {
	return (
		<div className="flex min-h-screen min-w-screen flex-col items-center justify-between p-24">
			<Post
				SmallPostRef={[
					<SmallPostRef
						key="1"
						title="why"
						text="Lorem ipsum doloret sit amet..."
					/>,
					<SmallPostRef
						key="2"
						title="who"
						text="Lorem ipsum doloret sit amet..."
					/>,
					<SmallPostRef
						key="3"
						title="model"
						text="Lorem ipsum doloret sit amet..."
					/>,
					<SmallPostRef
						key="4"
						title="dataset"
						text="More coming. But look here: https://huggingface.co/datasets/maxmyn/wholesome_greentext_110k/blob/main/README.md"
					/>,
				]}
				BigPostRef={<GenerateButton />}
				text="Site still under construction. Will be done by Sunday :) "
			/>
		</div>
	)
}

export default HomePage
