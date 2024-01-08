import Post from "./post"

export default function Home() {
	return (
		<main
			className="flex min-h-screen flex-col items-center justify-between p-24"
			style={{
				background: "linear-gradient(to right, #D1D5EE, #EEF2FF)",
				minHeight: "100vh",
			}}
		>
			<Post />
		</main>
	)
}
