class Piece {  
    x;
    y;
    color;
    shape;
    ctx;
    typeId;

    constructor(ctx) {
        this.ctx = ctx;
        this.spawn();
    }
    
    spawn() {
        this.typeId = this.randomizeTetrominoType(COLORS.length - 1);
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];
        this.x = 0;
        this.y = 0;
    }

    // Метод отрисовки
    draw(){ 
        // Свойства для отрисовки
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1/BLOCK_SIZE;

        // Цикл отрисовки ячеек фигуры 
        // исходя из масива в масиве (мартицы)
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                    this.ctx.strokeRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    // Метод изменения координат
    move(p) {
        this.x = p.x;
        this.y = p.y;
        this.shape = p.shape;
    }

    // Начальная позиция
    setStartingPosition() {
        this.x = this.typeId === 4 ? 4 : 3;
    }

    // Рандом
    randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes + 1);
    }
    
}
