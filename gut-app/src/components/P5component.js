import {React, useEffect, useRef} from 'react'
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



//let myp5 = new p5(sketch); 

export default function P5Component(){
    const p5CanvasRef = useRef(null);
    let myP5;
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
        let prevSecond;
        let changeInDirection;
        let tempSecond;
        let tempMillis;
        let angle = 0;
        let amplitude = 100;
        let speed = 100;
    
        //let xgrad = p.random(x-(size*.1),x-(size*.9))
        //let ygrad = p.random(y-(size*.1),y-(size*.9))
        let canvas;
        let canvasColor = 255
        p.setup = () => {
            //setup code
            //p5.background(100)
            //p5.line(15, 25, 70, 90);
            p.noFill(); // Set the fill to transparent
            p.stroke(0); // Set the stroke color to black
            p.strokeWeight(4);
            p.stroke(1)
            prevSecond = p.second()
            tempMillis = p.millis() % 1000
            changeInDirection = 1
            //p.map(tempMillis, 0, 1000, 0, s2)
            if (!canvas) {
                canvas = p.createCanvas(s1, s2);
              }
            p.frameRate(20)
            //p.noLoop()
        }
    
        //(sin(8pi(t),cos(5pi(t)))
         p.draw = () => {
            //let amt = (p.mouseY + p.mouseX) % 255 + 1
            p.rect(0, 0, p.width, p.height);
            let color1 = p.color(255,255,255,100)
            let color2 = p.color(0,0,255,0)
            let color3 = p.color(255,0,0,0)
            p.clear()
            p.rect(0, 0, p.width, p.height);
            p.noStroke()
            p.stroke(0,100)
            p.strokeWeight(2)
            fillGradient(color1, color2, x, y, size,1,10) //blue
            fillGradient(color1, color3, x2, y2, size,1,10)
            prevSecond = p.second()
            
            if(y < 0 + size/2 || y > (s2-size/2)){
                changeInDirection = -changeInDirection
            }
            y = y+(speed * changeInDirection);
            //y = y + changeInDirection
    /*
            if (p.second() % 2 === 0){
                p.clear()
                p.rect(0, 0, p.width, p.height);
                p.noStroke()
                p.stroke(0,100)
                p.strokeWeight(2)
                fillGradient(color1, color2, x, y, size,1,10) //blue
                fillGradient(color1, color3, x2, y2, size,1,10)
                prevSecond = p.second()
            }
            else {
                if(y < 0 + size/2 || y > (s2-size/2)){
                    changeInDirection = -changeInDirection
                }
                y = y + changeInDirection
            }
    */        
    
            //drawing code
            
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
    useEffect(() => {
        myP5 = new p5(sketch, 'p5-container')
        return () => myP5.remove();
    }, [])

    return <div id="p5-container" ref={p5CanvasRef}></div>
}