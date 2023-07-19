import {React, useEffect} from 'react'
import p5 from 'p5'

const sketch = (p) => {
    let x = 100;
    let y = 100;
    p.setup = () => {
        //setup code
        //p5.background(100)
        //p5.line(15, 25, 70, 90);
        p.createCanvas(400, 400);
    }
     p.draw = () => {
        p.background(0);
        p.fill(255);
        p.rect(x,y,50,50);
        //drawing code
        //p5.background(220);
        //p5.ellipse(50,50,80,80);
     }
}

export default function P5Component(){
    useEffect(() => {
        new p5(sketch)
    }, [])

    return <div id="p5-container"></div>
}