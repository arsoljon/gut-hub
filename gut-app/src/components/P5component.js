import {React, useEffect} from 'react'
import p5 from 'p5'

//read data and make a gradient of different colors based on those numbers
//colors will neighbor, perpendicular and/or diagonally, of eachother within a shape. 
//colors will fade from their original color into the color of their neighbor/s.
//the shape will reserve an equal amount of sections of itself to the number of neighbors.
//each section will belong to a color. 
//if a color is similar to its neighbor, adjust the color or move it to a spot where
    // its neighbor less similar.
//the higher the data point, the slower it takes to gradiently change into its neighbor/s.

const data = [1,2]

const sketch = (p) => {
    //make a gradient within a shape. 
    const size = 150;
    let s1 = 400
    let s2 = 400
    let x = 100;
    let y = 100;
    let canvas;
    p.setup = () => {
        //setup code
        //p5.background(100)
        //p5.line(15, 25, 70, 90);
        if (!canvas) {
            canvas = p.createCanvas(s1, s2);
          }
        p.clear();
    }
     p.draw = () => {
        let amt = (p.mouseY + p.mouseX) % 255 + 1
        p.background(0);
        p.rect(x - size / 2, y - size / 2, size, size);
        let c1 = p.color(255, 0, 0)
        let c2 = p.color(0, 0, 255)
        fillGradient(c1, c2, x, y, x+size, y+size)
        //drawing code
        //p5.background(220);
        //p5.ellipse(50,50,80,80);
     }

     p.mousePressed = () => {
        x = p.random(s1-x)
        y = p.random(s2-y)
     }

     function fillGradient(c1, c2, centerX, centerY, shapeSize){
        let halfSize = shapeSize / 2;
  
        for (let x = centerX - halfSize; x <= centerX + halfSize; x++) {
          for (let y = centerY - halfSize; y <= centerY + halfSize; y++) {
            let distance = p.dist(centerX, centerY, x, y);
            let maxDist = halfSize * 0.8; // Adjust this value to control the gradient's maximum position
            let inter = p.constrain(distance, 0, maxDist) / maxDist;
            let c = p.lerpColor(c1, c2, inter);

            p.stroke(c);
            p.point(x, y);
          }
        }
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