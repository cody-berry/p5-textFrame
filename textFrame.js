
class TextFrame {
    constructor(textFrame, sideMargin, bottomMargin, topMargin) {
        this.originalTextFrame = textFrame
        this.sideMargin = sideMargin
        this.bottomMargin = bottomMargin
        this.topMargin = topMargin
    }


    animate(scale) {

        // if the scale is in the line growing process (less than 0.3)...
        if (scale < 0.3) {
            // we define the scale for our line_grower() function
            let line_scale = map(scale, 0.001, 0.3, 0.001, 1)
            this.line_grower(line_scale)
        }
        // and otherwise...
        if (scale > 0.4) {
            // we define the scale for our height_grower() function
            let height_scale = map(scale, 0.3, 1, 0.001, 1)
            this.height_grower(height_scale)
        }
    }


    // given a certain scale, it displays the text frame from the scale of the frame
    height_grower(scale) {
        let textFrameIsolated = this.originalTextFrame.get(this.sideMargin, this.topMargin, width-this.sideMargin*2, height-this.topMargin-this.bottomMargin)
        let sideMargin = this.sideMargin
        let topMargin = this.topMargin
        let bottomMargin = this.bottomMargin
        // find the top
        let frameTop = textFrameIsolated.get(0, 0, textFrameIsolated.width, textFrameIsolated.height / 2)

        // find the bottom
        let frameBottom = textFrameIsolated.get(0, textFrameIsolated.height / 2, textFrameIsolated.width, textFrameIsolated.height / 2)

        // find the position height
        let positionY = (topMargin + (height - bottomMargin)) / 2

        // find the height of the scaled text frame
        let frameHeight = textFrameIsolated.height * scale


        // fill a white-ish color to fill the frame if it is in a good range
        if (scale > 0.5 && scale < 0.9) {
            fill(188, 2, 100, (scale - 0.7) ** -2)
            stroke(0, 0, 100, (scale - 0.7) ** -2)
            rect(sideMargin + 5, topMargin + textFrameIsolated.height * (1 - scale) / 2 + 5, textFrameIsolated.width - 10, textFrameIsolated.height * scale - 10)
        }

        // display the images

        // tint a white and alpha color
        tint(0, 0, 100, scale * 100)

        // frame top
        image(frameTop, sideMargin, positionY - frameHeight / 2, textFrameIsolated.width, frameHeight / 2)
        image(frameBottom, sideMargin, positionY, textFrameIsolated.width, frameHeight / 2)
    }


    // given a certain scale, it displays the line from te scale of the line
    line_grower(scale) {
        let sideMargin = this.sideMargin
        let topMargin = this.topMargin
        let bottomMargin = this.bottomMargin

        // make an integer called lineLength with a value of width - sideMargin*2
        let lineLength = (width - sideMargin * 2) * scale

        // make an integer called positionY = (topMargin + bottomMargin)/2,
        // the position height
        let positionY = (topMargin + (height - bottomMargin)) / 2

        // alpha is a number from map(scale, 0, 0.3, 100, 20), our alpha
        let alpha = constrain(map(scale, 0.8, 1, 100, 5), 0, 100)

        // draw a white line with an alpha of the variable alpha from position
        // (width/2-lineHeight, positionY) to position (width/2+lineHeight,
        // positionY)
        stroke(188, 20, 98, alpha)
        line(width / 2 - lineLength / 2, positionY, width / 2 + lineLength / 2, positionY)
    }
}