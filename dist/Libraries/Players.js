//we should deal with 1-head 2-neck 3-tail

class Player {

    constructor(row, col, direction) {
        this.playerName = ""
        this.snakeNodes = []
        this.intiatePlayer(row, col, direction)
        this.newNodesCount = 0
        this.deletedNodes = []
        this.isEating = false
        this.oppositeDirection = {
            "up": "down",
            "down": "up",
            "left": "right",
            "right": "left"
        }
    }

    intiatePlayer(startingRow, startingCol, startingDirection) {
        let head = {
            "row": startingRow,
            "col": startingCol,
            "type": "head",
            "direction1": startingDirection,
            "direction2": ""
        }
        this.snakeNodes.push(head)
        this.newNodesCount++
        let tail = this.#createTail(head)
        this.snakeNodes.push(tail)
        this.newNodesCount++
    }

    #createTail(head) {
        let tailRow, tailCol
        switch (head.direction1) {
            case "down":
                tailRow = head.row - 1
                tailCol = head.col
                break;
            case "right":
                tailRow = head.row
                tailCol = head.col - 1
                break;
            case "up":
                tailRow = head.row + 1
                tailCol = head.col
                break;
            case "left":
                tailRow = head.row
                tailCol = head.col + 1
                break;
        }
        let tail = {
            "row": tailRow,
            "col": tailCol,
            "type": "tail",
            "direction1": head.direction1,
            "direction2": ""
        }
        return tail
    }

    moveOneStep = (direction) => {
        direction = this.#validateDirection(direction)
        this.newNodesCount = 0
        this.#updateHead(direction)
        if (!this.isEating) {
            this.#updateTail()
        }
        if (this.snakeNodes.length > 2) {
            this.#updateNeck()
        }
    }

    #validateDirection(newDirection) {
        let headDirection = this.snakeNodes[0].direction1
        if (newDirection == this.oppositeDirection[headDirection]){
            return this.oppositeDirection[newDirection]
        }
        return newDirection
    }

    #updateHead(direction) {
        let currenthead = this.snakeNodes[0]
        let newRow, newCol
        switch (direction) {
            case "up":
                newRow = currenthead.row - 1
                newCol = currenthead.col
                break;
            case "left":
                newRow = currenthead.row
                newCol = currenthead.col - 1
                break;
            case "down":
                newRow = currenthead.row + 1
                newCol = currenthead.col
                break;
            case "right":
                newRow = currenthead.row
                newCol = currenthead.col + 1
                break;
        }
        let newHead = {
            "row": newRow,
            "col": newCol,
            "type": "head",
            "direction1": direction,
            "direction2": ""
        }
        this.snakeNodes.unshift(newHead)
        this.newNodesCount++
    }

    #updateNeck() {
        let head = this.snakeNodes[0]
        let neck = this.snakeNodes[1]
        if (head.direction1 == neck.direction1) {
            neck.type = "body"
        } else {
            neck.direction2 = head.direction1
            neck.type = "corner"
        }
        //this.snakeNodes[1] = neck
    }

    #updateTail() {
        this.deletedNodes.push(this.snakeNodes.pop())
        this.newNodesCount--
        let newTail = this.snakeNodes[this.snakeNodes.length - 1]
        if (newTail.type == "corner") {
            newTail.direction1 = newTail.direction2
            newTail.direction2 = ""
        }else if(newTail.type == "head"){
            let head=this.snakeNodes[0]
            newTail.direction1 = head.direction1
        }
        newTail.type = "tail"
    }

}