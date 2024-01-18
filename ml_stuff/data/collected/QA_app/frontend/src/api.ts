import axios from "axios"

export const BASE_URL = "http://localhost:5002/api"

export const fetchData = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/get-data`)
		return response.data
	} catch (error) {
		console.error("Error fetching data:", error)
		return {} // Return an empty object or handle the error as needed
	}
}

export const updateData = async (data: any) => {
	try {
		const response = await axios.post(`${BASE_URL}/update-data`, data)
		return response.data
	} catch (error) {
		console.error("Error updating data:", error)
		// Handle the error as needed
	}
}

export const setDataFilePath = async (filePath: string) => {
	try {
		const response = await axios.post(`${BASE_URL}/set-file-from-path`, {
			path: filePath,
		})
		return response.data
	} catch (error) {
		console.error("Error setting file path:", error)
	}
}
