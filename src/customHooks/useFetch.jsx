import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        let isSubscribe = true;
        async function fetchData(){
            await axios.get(url).then(resp => {
                if(isSubscribe){
                    setData(resp)
                }
            }).catch(error => {
                console.log(error)
            })
        }
        
        fetchData()
        //to prevent race condition
        return () => {
            isSubscribe = false;
        }
    }, [url])

    return data
}
