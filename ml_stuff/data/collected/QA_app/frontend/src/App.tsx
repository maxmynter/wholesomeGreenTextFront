import React, { useState, useEffect, useRef } from "react"
import Sidebar from "./components/Sidebar"
import { fetchData, updateData, BASE_URL } from "./api" // Import your API utility functions

function App() {
	const [selected, setSelected] = useState(null)
	const [data, setData] = useState({})
	const [image, setImage] = useState("")
	const [editableText, setEditableText] = useState("")

	const unprocessedRef = useRef(null)
	const editableRef = useRef(null)

	useEffect(() => {
		fetchData().then((data) => setData(data))
	}, [])

	const onSelectEntry = (key: string) => {
		const selectedEntry = data[key]
		setSelected(selectedEntry)
		setImage(`${BASE_URL}/images/${selectedEntry.filename}`)
		setEditableText(selectedEntry.verified || selectedEntry.truncated)
	}

	const syncScroll = (source, target) => {
		if (target && source) {
			target.current.scrollTop = source.current.scrollTop
		}
	}

	const handleSubmit = async () => {
		if (selected) {
			const updatedData = {
				...selected,
				verified: editableText
			}

			try {
				const response = await updateData(updatedData)
				console.log("Update response:", response)
				// Update the data state with the new data
				setData((prevData) => ({
					...prevData,
					[selected.filename]: updatedData,
				}))
			} catch (error) {
				console.error("Error updating data:", error)
			}
		}
	}

	return (
		<div style={{ display: "flex", height: "100vh" }}>
			<Sidebar data={data} onSelectEntry={onSelectEntry} />
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{selected && (
					<>
						<div style={{ marginBottom: "20px" }}>
							<img
								src={image}
								style={{
									width: "500px",
									height: "500px",
									objectFit: "contain",
								}}
								alt={`Image for ${selected.filename}`}
								onError={() => console.warn("Image not found:", image)}
							/>
						</div>
						<button onClick={handleSubmit} style={{ margin: "10px" }}>
							Submit
						</button>
						<div style={{ display: "flex" }}>
							<textarea
								ref={unprocessedRef}
								value={selected.truncated}
								readOnly
								style={{
									width: "500px",
									height: "500px",
									marginRight: "10px",
									backgroundColor: "#A73922",
								}}
								onScroll={() => syncScroll(unprocessedRef, editableRef)}
							/>
							<textarea
								ref={editableRef}
								value={editableText}
								onChange={(event) => setEditableText(event.target.value)}
								style={{ width: "500px", height: "500px" }}
								onScroll={() => syncScroll(editableRef, unprocessedRef)}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default App
