class Controller {

    constructor() {
        this.playground = new Playground
        this.renderer = new Renderer(this.playground)
        $("#startGame").on("click", this.#startGame)
        this.wsadPressed = null
        this.ijklPressed = null
        this.gameStarted = false
        this.endCurrentGame = false
    }

    #startGame = () => {
        this.playground.initiateNewPlayground()
        this.renderer.renderPlayground()
        $("body").keydown(this.#readButton);
        let gameClockSpeed = 400
        let gameProcess = setInterval(() => {
            if (this.endCurrentGame) {
                $("body").off()
                clearInterval(gameProcess)
            }
            if (this.wsadPressed != null && this.ijklPressed != null && this.gameStarted == false) {
                this.gameStarted = true
            }
            if (this.gameStarted) {
                let isGameOver = this.playground.updatePlayground(this.wsadPressed, this.ijklPressed)
                if (isGameOver) {
                    this.#handleGameOver()
                }
                this.renderer.renderPlayground()
            }
        }, gameClockSpeed)
    }

    #handleGameOver = () => {
        this.wsadPressed = null
        this.ijklPressed = null
        this.gameStarted = false
        let startNewGame = confirm("Game Over, start new game ?")
        if (startNewGame) {
            this.playground.initiateNewPlayground()
            this.renderer.renderPlayground()
        } else {
            this.endCurrentGame = true
        }
    }

    #readButton = (button) => {
        if (
            button.key == "w"
            || button.key == "s"
            || button.key == "a"
            || button.key == "d"
            || button.key == "W"
            || button.key == "S"
            || button.key == "A"
            || button.key == "D"
        ) {
            this.wsadPressed = (button.key).toLowerCase()
        } else if (
            button.key == "i"
            || button.key == "j"
            || button.key == "k"
            || button.key == "l"
            || button.key == "I"
            || button.key == "J"
            || button.key == "K"
            || button.key == "L"
        ) {
            this.ijklPressed = (button.key).toLowerCase()
        }
    }



}

let controller = new Controller