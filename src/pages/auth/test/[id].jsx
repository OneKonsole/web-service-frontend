import React from "react"
import {useParams} from "react-router-dom";
const Test = () => {
    const { id } = useParams()
    return (
        <p>test/[id].tsx: { id }</p>
    )
}

export default Test;