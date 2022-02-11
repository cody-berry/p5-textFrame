/*
@author Cody
@date 2022.02.05

coding plan → animation
    isolate text frame part
    add line growing animation
    add height growing animation, putting line growing animation into a function
    combine line and height growing animation into one using 2 functions
    make the line and height growing animation actually with frames



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

    console.log(center.x-smallLength, pos.y-1)

    // and finally we return this gr aphics.
    return g
}

function setup() {
    createCanvas(1280, 360)
    colorMode(HSB, 360, 100, 100, 100)
    background(0, 0, 50)

    noStroke()
    fill(234, 34, 24)
    rect(0, 0, width/2, height)

    stroke(188, 20, 98)
    noFill()

    // our margins, telling us where to place our box
    const sideMargin = 90
    const topMargin = 80
    const bottomMargin = 60

    // a corner of our text frame
    let textFrameFourth = cornerOfTextFrame(sideMargin, topMargin, bottomMargin)
    translate(sideMargin, topMargin)
    image(textFrameFourth, 0, 0)

    // another corner
    translate(width-sideMargin*2, 0)
    scale(-1, 1)
    image(textFrameFourth, 0, 0)

    // yet another corner
    translate(0, height-topMargin-bottomMargin)
    scale(1, -1)
    image(textFrameFourth, 0, 0)

    // and the final corner
    translate(width-sideMargin*2, 0)
    scale(-1, 1)
    image(textFrameFourth, 0, 0)
}

function draw() {    
    // background(234, 34, 24)

}