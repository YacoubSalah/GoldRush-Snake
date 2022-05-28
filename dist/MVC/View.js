class Renderer{
    
    constructor(playground){
        this.playground = playground
        this.playgroundTemplate = Handlebars.compile($("#playground-Template").html())
        this.playgroundContainer = $("#playground")
    }

    renderPlayground(){
        this.playgroundContainer.empty()
        let playgroundMatrixData = this.playgroundTemplate({playground : this.playground.matrix.matrix})
        this.playgroundContainer.append(playgroundMatrixData)
    }

}