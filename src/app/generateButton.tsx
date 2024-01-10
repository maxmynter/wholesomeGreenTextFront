"use client"
import { BigPostRef } from "./postRefs"


const GenerateButton = () => {
	return <BigPostRef text="Generate" onClick={() => console.log("Log")} />
}

export default GenerateButton
