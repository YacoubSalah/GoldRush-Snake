class Matrix {

    constructor(rowCount, colCount, defaultValue) {
        this.rowCount = rowCount
        this.colCount = colCount
        this.matrix = []
        this.generateMatrix(rowCount, colCount, defaultValue)
    }

    generateMatrix(rowNum, colNum, defaultValue) {
        for (let r = 0; r < rowNum; r++) {
            this.matrix.push([])
            for (let c = 0; c < colNum; c++) {
                this.matrix[r].push(defaultValue)
            }
        }
    }

    matrixToText() {
        let matrixText = ""
        for (let r = 0; r < this.matrix.length; r++) {
            for (let c = 0; c < this.matrix[r].length; c++) {
                matrixText = matrixText + this.matrix[r][c] + "\t\t"
            }
            matrixText += "\n"
        }
        return matrixText
    }

    getValue(row, col){
        if (row >= this.matrix.length || col >= this.matrix[row].length) {
            return null
        }
        return this.matrix[row][col]
    }

    alter(row, col, val) {
        if (row >= this.matrix.length || col >= this.matrix[row].length) {
            return false
        }
        this.matrix[row][col] = val
        return true
    }
    
}