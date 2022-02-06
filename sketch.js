/*
@author
@date 2022.02.05

coding plan
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
    const smallLength = 300

    // how much right the middle (from left to right) vertex or how much
    // down the middle (from bottom to top) should go in relation to the
    // position
    const strokeMargin = 10

    // our dialog box's width and height
    const boxWidth = width - sideMargin*2
    const boxHeight = height - topMargin - bottomMargin


    let g = createGraphics(boxWidth/2, boxHeight/2)

    // the top-left corner of our dialog box
    let pos = new p5.Vector(0, 0)

    // the center of our dialog box
    let center = new p5.Vector(pos.x + boxWidth/2, pos.y + boxHeight/2)


    // the height of the vertical edge
    const strokeHeight = 15

    // our thickness for the thin line and the thick lines
    const thicknessThin = 4
    const thicknessThick = 6

    // set our color mode
    g.colorMode(HSB, 360, 100, 100, 100)

    // our filled shape
    g.fill(210, 100, 10, 20)
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
    g.beginShape()
    g.vertex(center.x-smallLength, pos.y+1)
    g.vertex(pos.x+strokeMargin, pos.y+1)
    g.vertex(pos.x, pos.y+strokeMargin+1)
    g.vertex(pos.x, pos.y+strokeMargin+strokeHeight+1)
    g.endShape()
    point(pos.x, pos.y)

    // and finally we return this graphics.
    return g
}

function setup() {
    createCanvas(1280, 720)
    colorMode(HSB, 360, 100, 100, 100)
    background(234, 34, 24)

    stroke(188, 20, 98)
    noFill()

    // our margins, telling us where to place our box
    const sideMargin = 90
    const topMargin = 440
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