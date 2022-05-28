class Playground {

    constructor() {
        this.matrix = []
        this.player1 = {}
        this.player2 = {}
        this.foodCount = 0
        this.emptySlotsCounter = 0
    }

    updatePlayground(wasdButton, ijklButton) {
        let isGameOver = false

        let isPlayer1Dead = this.#updatePlayer(this.player1, wasdButton)
        if (isPlayer1Dead) {
            return isGameOver = true
        }

        let isPlayer2Dead = this.#updatePlayer(this.player2, ijklButton)
        if (isPlayer2Dead) {
            return isGameOver = true
        }

        this.#updateEmptySlotsCounter()
        this.#generateFood()

        return isGameOver
    }

    #updatePlayer(player, button) {
        this.#movePlayerOneStep(player, button)
        let isPlayerDead = this.#checkPlayerStatus(player)
        if (isPlayerDead == "PlayerIsDead") {
            return true
        }
        this.#fetchPlayer(player)
    }

    #checkPlayerStatus(player) {
        if (this.#hasPlayerReachedBorder(player)) {
            alert(`${player.playerName} Has Lost, You Hit the Border`)
            return "PlayerIsDead"
        }
        if (this.#hasPlayerHitObs(player)) {
            alert(`${player.playerName} Has lost, You Hit An Obstacle`)
            return "PlayerIsDead"
        }
        this.#handlePlayerEatingFood(player)
        return "PlayerIsNormal"
    }

    #hasPlayerReachedBorder(player) {
        let snakeHead = player.snakeNodes[0]
        return (
            snakeHead.row >= this.matrix.rowCount
            || snakeHead.row < 0
            || snakeHead.col >= this.matrix.colCount
            || snakeHead.col < 0
        )
    }

    #hasPlayerHitObs(player) {
        let snakeHead = player.snakeNodes[0]
        let playGroundMatrix = this.matrix.matrix
        return (
            playGroundMatrix[snakeHead.row][snakeHead.col] != "Empty"
            && playGroundMatrix[snakeHead.row][snakeHead.col] != "apple"
        )
    }

    #handlePlayerEatingFood(player) {
        let head = player.snakeNodes[0]
        if (this.matrix.matrix[head.row][head.col] == "apple") {
            player.isEating = true
            this.foodCount--
        } else {
            player.isEating = false
        }
    }

    #movePlayerOneStep(player, button) {
        let direction
        switch (button) {
            case "i":
            case "w":
                direction = "up"
                break;
            case "j":
            case "a":
                direction = "left"
                break;
            case "k":
            case "s":
                direction = "down"
                break;
            case "l":
            case "d":
                direction = "right"
                break;
        }
        player.moveOneStep(direction)
    }

    #fetchPlayer(player) {
        //depending on the result of fetched player we might end game
        player.snakeNodes.forEach(seg => this.matrix.alter(seg.row, seg.col, seg.type + seg.direction1 + seg.direction2))
        player.deletedNodes.forEach(n => this.matrix.alter(n.row, n.col, "Empty"))
        player.deletedNodes = []
    }

    #updateEmptySlotsCounter() {
        this.emptySlotsCounter = this.emptySlotsCounter - this.player1.newNodesCount - this.player2.newNodesCount
        this.player1.newNodesCount = 0
        this.player2.newNodesCount = 0
    }

    #generateFood() {
        let tries = 0
        while (this.foodCount < 10 && this.emptySlotsCounter > 0 && tries < 20) {
            let randomRow = Math.floor(Math.random() * this.matrix.rowCount)
            let randomCol = Math.floor(Math.random() * this.matrix.colCount)
            if (this.matrix.getValue(randomRow, randomCol) == "Empty") {
                if (this.matrix.alter(randomRow, randomCol, "apple")) {
                    this.foodCount++
                    this.emptySlotsCounter--
                    tries++
                }
            }
        }
    }

    initiateNewPlayground() {
        this.foodCount = 0
        this.#buildNewPlayground()
        this.#addPlayers()
        this.#fetchPlayer(this.player1)
        this.#fetchPlayer(this.player2)
        this.#updateEmptySlotsCounter()
        this.#generateFood()
    }

    #buildNewPlayground() {
        this.matrix = new Matrix(10, 15, "Empty")
        this.emptySlotsCounter = this.matrix.rowCount * this.matrix.colCount
    }

    #addPlayers() {
        this.player1 = new Player(0, 1, "right")
        this.player1.playerName = $("#player1Name").val()
        this.player2 = new Player(this.matrix.rowCount - 1, this.matrix.colCount - 2, "left")
        this.player2.playerName = $("#player2Name").val()
        this.emptySlotsCounter = this.emptySlotsCounter - 4
    }

}