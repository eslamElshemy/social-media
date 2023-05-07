import { useEffect, useState } from "react"
import axios from "axios"
export const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    useEffect(() => {
        const mm = async() => {

            setLoading(true)
            try {
                let res = await axios.get(url, {withCredentials: true})
                setData(res.data)
            } catch (err) {
                setErr(err.response.data)
            }
            setLoading(false)
        }
        mm()
    }, [url])
    const reFetch = async() => {
        setLoading(true)
        try {
            let res = await axios.get(url, {withCredentials: true})
            setData(res.data)
        } catch (err) {
            setErr(err.response.data)
        }
        setLoading(false)
    }
    return {data, loading, err, reFetch}
}