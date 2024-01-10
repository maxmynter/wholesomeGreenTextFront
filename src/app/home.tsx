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
						text="Lorem ipsum doloret sit amet..."
					/>,
				]}
				BigPostRef={<GenerateButton />}
				text="I am organizing an online tech session with a solution architect from NVIDIA on LLM Inference: Optimizations and On-Prem Sizing. It's a 90 minutes session, intermediate level. First, we will cover the Software Ecosystem: Triton, TensorRT-LLM, and available containers and integrations. Second, we will cover the selection of the deployment configuration and sizing: how to understand, how many GPUs are needed for a specific deployment."
			/>
		</div>
	)
}

export default HomePage
