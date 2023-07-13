import {React, useEffect} from 'react'
import p5 from 'p5'

const sketch = (p) => {
    p.setup = () => {
        //setup code
        line(15, 25, 70, 90);
    }
     p.draw = () => {
        //drawing code
     }
}

const P5Component = () => {
    useEffect(() => {
        new p5(sketch)
    }, [])

    return <div id="p5-container"></div>
}