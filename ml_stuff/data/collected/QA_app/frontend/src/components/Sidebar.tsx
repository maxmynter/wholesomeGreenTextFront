import React, { useState } from "react"

interface SideBarProps {
	onSelectEntry: (entry: string) => void
	data: { [key: string]: any }
}

const Sidebar: React.FC<SideBarProps> = ({ data, onSelectEntry }) => {
	const [selected, setSelected] = useState<string>("")

	const handleSelectEntry = (key: string) => {
		setSelected(key)
		onSelectEntry(key)
	}

	const sidebarStyle = {
		height: "100vh", // Full viewport height
		overflowY: "auto", // Enable vertical scrolling
		width: "250px", // Adjust width as needed
	}

	const getListItemStyle = (key: string) => {
		let backgroundColor = ""
		if (selected === key) {
			backgroundColor = data[key].verified ? "#006400" : "grey" // Darker green if selected and verified
		} else if (data[key].verified) {
			backgroundColor = "#90EE90" // Light green if only verified
		}
		return { backgroundColor }
	}

	return (
		<div className="sidebar" style={sidebarStyle}>
			<ul>
				{Object.keys(data).map((key, index) => (
					<li
						key={index}
						className={`${data[key].verified ? "verified" : ""} ${
							selected === key ? "selected" : ""
						}`}
						onClick={() => handleSelectEntry(key)}
						style={getListItemStyle(key)}
					>
						{key.length > 13 ? `${key.substring(0, 10)}...` : key}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Sidebar
