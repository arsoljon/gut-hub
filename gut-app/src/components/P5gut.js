import {React, useEffect, useRef} from 'react'
import p5 from 'p5'

export default function P5Gut(){
    const p5Ref = useRef(null);
    let myP5;

    const sketch = (p) => {
        const screenX = 600
        const screenY = 600
        p.setup = () => {
            p.createCanvas(screenX, screenY)
            p.noLoop()
        }
        p.draw = () => {
            p.background(100)
        }
    }

    useEffect(() => {
        p5Ref.current = new p5(sketch, 'p5-container')
        return () => {p5Ref.current.remove();}
    }, [])

    return <div id="p5-container"></div>
}