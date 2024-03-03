import React , {ReactNode , useEffect, useRef} from 'react'

type IntersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;


type Props = {
    onEnter ?: IntersectionObserverCallback,
    onLeave ?: IntersectionObserverCallback,
    options ?: IntersectionObserverInit,
    once ?: boolean 
}
export default function Observer({
    onEnter = () => {} , onLeave = () => {} , options
} : Props){
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver((entries , observer) =>{
            let [observedComponent] = entries
            if(observedComponent.isIntersecting){
                onEnter(entries , observer)
            } else {
                onLeave(entries , observer)
            }
        } , options)
        if(ref.current){
            observer.observe(ref.current)
        }
    } , [])
    return <div ref = {ref} style={{height : "1px"}}></div>
}