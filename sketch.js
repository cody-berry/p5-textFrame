/*
@author Cody
@date 2022.02.05

coding plan → animation
    isolate text frame part
        display a green point at where the left margin and top margin is
    add line growing animation
        map with mouseX, put percentage of textFrame.width in
         variable, put white line with non-thick stroke weight in the center
    add height growing animation, putting line growing animation into a function
        map with mouseX, put percentage of textFrame.height in
         variable, add white flash with tint and alpha percentage with
          mapping, flash formula = (frameCount-10)⁻²
    combine line and height growing animation into one using 2 functions
        map with mouseX, determine how much time passed from short
         line and scaled text box growing, make function's parameters
          include the percentage and also map that and map the percentage of
           the transition of the line growing and the height growing
    make the line and height growing animation actually with frames
        replace mouseX with frameCount



    🥝 🔧 add basic expansion animation. add debug console. learned constrain,
    image 'resize', tint for transparency, toFixed(n), canvas.get()


coding plan → text frame generation
    strokes without fill
    make filled shape
    reflection
        make a graphics object and then scale it
            make a function that modifies a graphics object, call that
            function to show a corner, scale it, translate it, show it,
            repeat 2 times
        somehow use v.reflect(e), modifying v to be the reflection of e
            reflect the incoming vector (v) about a normal to a line (e) in
             2D, or
            about a normal to a plane in 3D
            this method acts on the vector directly.
    transparent object as background

 */
let font

// our text frame with a full canvas size of 1270, 640
let textFrame

// our margins, telling us where to place our box
let sideMargin = 90
let bottomMargin = 60
let topMargin

// only the text frame part
let textFrameIsolated

function preload() {
    font = loadFont('data/meiryo.ttf')
}

// draws a corner of our text frame
function cornerOfTextFrame(sideMargin, topMargin, bottomMargin) {

    // the graphics we're going to be returning

    // the length for our thin line
    const smallLength = 430

    // how much right the middle (from left to right) vertex or how much
    // down the middle (from bottom to top) should go in relation to the
    // position
    const strokeMargin = 13

    // our dialog box's width and height
    const boxWidth = width - sideMargin*2
    const boxHeight = height - topMargin - bottomMargin


    let g = createGraphics(boxWidth/2, boxHeight/2)

    // the top-left corner of our dialog box
    let pos = new p5.Vector(0, 0)

    // the center of our dialog box
    let center = new p5.Vector(pos.x + boxWidth/2, pos.y + boxHeight/2)


    // the height of the vertical edge
    const strokeHeight = 23

    // our thickness for the thin line, the thick lines, and the diagonal line
    const thicknessThin = 6
    const thicknessThick = 10

    // diagonalThickness should be a third of the way through thicknessThin
    // and thicknessThick.
    const diagonalThickness = 6 + (10 - 6)/3

    // set our color mode
    g.colorMode(HSB, 360, 100, 100, 100)

    // set our stroke settings (stroke ends, how to join strokes)
    // set stroke end shapes
    g.strokeCap(SQUARE)

    // set stroke join shape
    g.strokeJoin(MITER)

    // our filled shape
    g.fill(210, 100, 5, 50)
    g.noStroke()
    g.beginShape()
    g.vertex(center.x, center.y)
    g.vertex(center.x, pos.y)
    g.vertex(pos.x+strokeMargin, pos.y)
    g.vertex(pos.x, pos.y+strokeMargin)
    g.vertex(pos.x, center.y)
    g.endShape(CLOSE)

    // our thin line
    g.stroke(188, 20, 98)
    g.strokeWeight(thicknessThin)
    g.line(center.x, pos.y, center.x-smallLength, pos.y)

    // our thick lines
    g.strokeWeight(thicknessThick)
    g.noFill()
    g.line(center.x-smallLength, pos.y+1, pos.x+strokeMargin-3, pos.y+1)
    g.strokeWeight(diagonalThickness)
    g.line(pos.x+strokeMargin, pos.y+1, pos.x, pos.y+strokeMargin+1)
    g.strokeWeight(thicknessThick)
    g.line(pos.x, pos.y+strokeMargin-3, pos.x, pos.y+strokeMargin+strokeHeight+1)

    // a circle at the thickness change point
    g.noStroke()
    g.fill(188, 20, 98)
    g.circle(center.x-smallLength, pos.y-1 + thicknessThin/2, 8)

    // and finally we return this graphics.
    return g
}

function setup() {
    createCanvas(1280, 720)
    colorMode(HSB, 360, 100, 100, 100)
    background(0, 0, 50)
    topMargin = height - bottomMargin - 220

    // create a new graphics image for our text frame
    textFrame = createGraphics(width, height)

    // a corner of our text frame
    let textFrameFourth = cornerOfTextFrame(sideMargin, topMargin, bottomMargin)

    // one corner
    textFrame.translate(sideMargin, topMargin)
    textFrame.image(textFrameFourth, 0, 0)

    // another corner
    textFrame.translate(width-sideMargin*2, 0)
    textFrame.scale(-1, 1)
    textFrame.image(textFrameFourth, 0, 0)

    // yet another corner
    textFrame.translate(0, height-topMargin-bottomMargin)
    textFrame.scale(1, -1)
    textFrame.image(textFrameFourth, 0, 0)

    // and the final corner
    textFrame.translate(width-sideMargin*2, 0)
    textFrame.scale(-1, 1)
    textFrame.image(textFrameFourth, 0, 0)

    textFrameIsolated = textFrame.get(sideMargin, topMargin, width-sideMargin*2, height-topMargin-bottomMargin)
}

function draw() {    
    background(234, 34, 24)

    noStroke()
    fill(234, 34, 24)
    rect(0, 0, width/2, height)

    stroke(188, 20, 98)
    noFill()


    // scale is a number from map(mouseX, 0, width, 0, 1)
    let scale = constrain(map(mouseX, 0, width, 0, 1), 0.001, 1)

    // if the scale is in the line growing process (less than 0.3)...
    if (scale < 0.3) {
        // we define the scale for our line_grower() function
        let line_scale = map(scale, 0, 0.3, 0.001, 1)
        line_grower(line_scale)
    }
    // and otherwise...
    if (scale > 0.4) {
        // we define the scale for our height_grower() function
        let height_scale = map(scale, 0.3, 1, 0.001, 1)
        height_grower(height_scale)
    }

}

// given a certain scale, it displays the text frame from the scale of the frame
function height_grower(scale) {
    // find the top
    let frameTop = textFrameIsolated.get(0, 0, textFrameIsolated.width, textFrameIsolated.height/2)

    // find the bottom
    let frameBottom = textFrameIsolated.get(0, textFrameIsolated.height/2, textFrameIsolated.width, textFrameIsolated.height/2)

    // find the position height
    let positionY = (topMargin + (height-bottomMargin))/2

    // find the height of the scaled text frame
    let frameHeight = textFrameIsolated.height * scale


    // fill a white-ish color to fill the frame if it is in a good range
    if (scale > 0.5 && scale < 0.9) {
        fill(0, 0, 100, (scale-0.7)**-4 * 0.01)
        stroke(0, 0, 100, (scale-0.7)**-4 * 0.01)
        rect(sideMargin, topMargin + textFrameIsolated.height * (1-scale)/2, textFrameIsolated.width, textFrameIsolated.height * scale)
    }

    // display the images

    // tint a white and alpha color
    tint(0, 0, 100, scale*100)

    // frame top
    image(frameTop, sideMargin, positionY-frameHeight/2, textFrameIsolated.width, frameHeight/2)
    image(frameBottom, sideMargin, positionY, textFrameIsolated.width, frameHeight/2)
}


// given a certain scale, it displays the line from te scale of the line
function line_grower(scale) {

    // make an integer called lineLength with a value of width - sideMargin*2
    let lineLength = (width - sideMargin*2)*scale

    // make an integer called positionY = (topMargin + bottomMargin)/2,
    // the position height
    let positionY = (topMargin + (height-bottomMargin))/2

    // alpha is a number from map(scale, 0, 0.3, 100, 20), our alpha
    let alpha = constrain(map(scale, 0.8, 1, 100, 5), 0, 100)

    // draw a white line with an alpha of the variable alpha from position
    // (width/2-lineHeight, positionY) to position (width/2+lineHeight,
    // positionY)
    stroke(188, 20, 98, alpha)
    line(width/2-lineLength/2, positionY, width/2+lineLength/2, positionY)
}

