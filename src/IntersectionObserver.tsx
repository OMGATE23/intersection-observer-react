import React , {ReactNode , useEffect, useRef} from 'react'

type Props = {
    onEnter ?: () => void,
    onLeave ?: () => void,
    options ?: IntersectionObserverInit,
    once ?: boolean 

}
export default function Observer({
    onEnter , onLeave , options
} : Props){
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(!onEnter && !onLeave){
            throw new Error("either onEnter or onLeave must be provided")
        }
        const observer = new IntersectionObserver((entries , observer) =>{
            let [observedComponent] = entries
            if(observedComponent.isIntersecting){
                onEnter && onEnter.apply([entries , observer])
            } else {
                onLeave && onLeave.apply([entries , observer])
            }
        } , options)
        if(ref.current){
            observer.observe(ref.current)
        }
    } , [])
    return <div ref = {ref} style={{height : "1px"}}></div>
}