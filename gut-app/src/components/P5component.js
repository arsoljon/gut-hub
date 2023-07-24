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
    let s1 = 600
    let s2 = 600
    let varyShade = 10
    let varySize = 10
    let x = 100;
    let y = 100;
    let x2 = x + (x/2)
    let y2 = y
    x = p.random(size, s1-x)
    y = p.random(size, s1-y)
    x2 = p.random(size, s1-x)
    y2 = p.random(size, s1-y)

    //let xgrad = p.random(x-(size*.1),x-(size*.9))
    //let ygrad = p.random(y-(size*.1),y-(size*.9))
    let canvas;
    let canvasColor = 255
    p.setup = () => {
        //setup code
        //p5.background(100)
        //p5.line(15, 25, 70, 90);
        if (!canvas) {
            canvas = p.createCanvas(s1, s2);
          }
        p.noLoop()
    }
     p.draw = () => {
        let amt = (p.mouseY + p.mouseX) % 255 + 1
        
        let color1 = p.color(255,255,255,100)
        let color2 = p.color(0,0,255,0)
        let color3 = p.color(255,0,0,0)
        
        p.noStroke()
        p.stroke(0,100)
        p.strokeWeight(2)
 
        fillGradient(color1, color2, x, y, size,1,10) //blue
        fillGradient(color1, color3, x2, y2, size,1,10)

        //drawing code
        //p5.background(220);
        //p5.ellipse(50,50,80,80);
     }

     p.mousePressed = () => {
        //x = p.random(size, s1-x)
        //y = p.random(size, s2-y)
        //x2 = p.random(size, s1-x)
        //y2 = p.random(size, s2-y)
        //p.redraw()
        //xgrad = p.random(x-(size*.9), x)
        //ygrad = p.random(y-(size*.9), y)
     }
     // properties : color1, color2, x, y, defaultSize, colored darker if more (0-10), bigger surface area if more(0-5) 
     function fillGradient(c1, c2, centerX, centerY, shapeSize, shadeIntensity, sizeIntensity){
        sizeIntensity = p.constrain(sizeIntensity, 0, 10)
        shadeIntensity = p.constrain(shadeIntensity, 0, 3)
        sizeIntensity = p.map(sizeIntensity, 0, 10, 0, 1.5)
        shadeIntensity = p.map(shadeIntensity, 0, 4, 0,15)
        shapeSize = shapeSize * sizeIntensity
        let halfSize = shapeSize / 2;
        let radius = halfSize;
        const centerColorSize = 10
        for (let x = centerX - halfSize; x <= centerX + halfSize; x++) {
          for (let y = centerY - halfSize; y <= centerY + halfSize; y++) {
            let distance = p.dist(centerX, centerY, x, y);
            let maxDist = (halfSize * centerColorSize); // Adjust this value to control the gradient's maximum position
            //let inter = p.constrain(distance/halfSize, 0, 1);
            if (distance <= radius){
                let inter = p.map(distance, 0, radius, 0, 1);
                let c = p.lerpColor(c1, c2, inter);
                console.log(`c2 value : ${c2}`)
                
                for(let i = 0; i < shadeIntensity; ++i){
                    p.stroke(c);
                    p.point(x, y);
                }
                
                //p.stroke(c);
                //p.point(x, y);

            }
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