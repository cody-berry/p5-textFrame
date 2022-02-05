/*
@author
@date 2022.02.05

coding plan
    strokes without fill
    make filled shape
    reflection
    transparent object as background

 */
let font

function preload() {
    font = loadFont('data/meiryo.ttf')
}

function setup() {
    createCanvas(1280, 720)
    colorMode(HSB, 360, 100, 100, 100)
    background(234, 34, 24)

    stroke(188, 20, 98)
    noFill()

    // our margins, telling us where to place our box
    let sideMargin = 90
    let topMargin = 440
    let bottomMargin = 60

    // the length for our thin line
    let smallLength = 300

    // how much right the middle (from left to right) vertex or how much
    // down the middle (from bottom to top) should go in relation to the
    // position
    let strokeMargin = 15

    // our dialog box's width and height
    let boxWidth = width - sideMargin*2
    let boxHeight = height - topMargin - bottomMargin

    // the top-left corner of our dialog box
    let pos = new p5.Vector(sideMargin, topMargin)

    // the center of our dialog box
    let center = new p5.Vector(pos.x + boxWidth/2, pos.y + boxHeight/2)
    point(pos.x, center.y)


    // the height of the vertical edge
    let strokeHeight = 30

    // our thickness for the thin line and the thick lines
    let thicknessThin = 4
    let thicknessThick = 6

    // our thin line
    strokeWeight(thicknessThin)
    line(center.x, pos.y, center.x-smallLength, pos.y)

    // our thick lines
    strokeWeight(thicknessThick)
    beginShape()
    vertex(center.x-smallLength, pos.y)
    vertex(pos.x+strokeMargin, pos.y)
    vertex(pos.x, pos.y+strokeMargin)
    vertex(pos.x, pos.y+strokeMargin+strokeHeight)
    endShape()


    fill(210, 100, 10, 80)
}

function draw() {    
    // background(234, 34, 24)

}