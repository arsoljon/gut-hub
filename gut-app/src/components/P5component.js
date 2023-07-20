import {React, useEffect} from 'react'
import p5 from 'p5'

const sketch = (p) => {
    let s1 = 400
    let s2 = 400
    let x = 100;
    let y = 100;
    let canvas;
    p.setup = () => {
        //setup code
        //p5.background(100)
        //p5.line(15, 25, 70, 90);
        p.clear()
        canvas = p.createCanvas(s1, s2);
    }
     p.draw = () => {
        let amt = (p.mouseY + p.mouseX) % 255 + 1
        p.background(0);
        p.fill(amt);
        p.rect(x,y,50,50);
        //drawing code
        //p5.background(220);
        //p5.ellipse(50,50,80,80);
     }

     p.mousePressed = () => {
        x = p.random(s1-x)
        y = p.random(s2-y)
     }

     /*
     ignore for now.
     p.keyPressed = () => {
        if(p.key === 'c' || p.key === 'C') {
            p.clear();
        }
     }
     */
}

//let myp5 = new p5(sketch); 

export default function P5Component(){
    useEffect(() => {
        new p5(sketch)
    }, [])

    return <div id="p5-container"></div>
}