import {useEffect, useState} from 'react';



const useFetch = (url) => {
    const [data,setBlogs] = useState(null)
    useEffect(() => {
        const abortcont = new AbortController();
            fetch(url,{ signal: abortcont.signal})
                .then(res => {
                    if(!res.ok){
                        throw Error("Couldn't Fetch Data...")
                    }
                    return res.json();
                })
                .then(data => {
                    setBlogs(data)
                })
                .catch(err => {
                    if(err.name === 'AbortError'){
                    }else{
                        setIsLoading(false)
                        setError(err.message)
                    }
                })
        return () => abortcont.abort();
    },[url])
    return {data};
}
 
export default useFetch;