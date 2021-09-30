import React, { useState, useEffect, useCallback, useRef, DOMElement } from 'react'
import defaultImg from '@/assets/images/default.jpeg'

type ErrImgType = any

let increament = 0

export default function ({
    src,
    ...imgProps
}: ErrImgType) {
    const [err, setErr] = useState(false)
    const imgRef = useRef<any>(null)
    const errtokenRef = useRef(-1)

    const onError = useCallback(() => {
        if (errtokenRef.current === imgRef.current?.dataset?.errtoken) {
            setErr(false)
        }
    }, [errtokenRef.current])

    useEffect(() => {
        const token = increament++
        imgRef.current && (imgRef.current.dataset.errtoken = token)
        errtokenRef.current = token
        setErr(true)
    }, [src])

    return <img ref={imgRef} src={err ? defaultImg : src} onError={onError} {...imgProps} />
}