import { useEffect, useState } from "react";

let getMediaWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

export const useMediaWidth = () => {
    const [media, setMedia] = useState(getMediaWidth)

    useEffect(() => {
        setMedia(getMediaWidth)
    }, [getMediaWidth])

    return media
}