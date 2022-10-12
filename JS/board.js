class Board {
    ctx;
    ctxNext;
    grid;
    piece;
    next;
    requestId;
    time;


    constructor(ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.initial();
    }
    

    //Иницализация холста
    initial() {
        //Размер холста
        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;
        //Масштаб
        this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE)
    }


    // Сбрасывает игровое поле перед началом новой игры
    reset() {
        this.grid = this.getEmptyBoard();
        this.piece = new Piece(this.ctx);
        this.piece.setStartingPosition();
        this.getNewPiece();
    }


    getNewPiece() {
        this.next = new Piece(this.ctxNext);
        this.ctxNext.clearRect(
            0,
            0, 
            this.ctxNext.canvas.width, 
            this.ctxNext.canvas.height
        );
        this.next.draw();
    }
    

    draw() {
        this.piece.draw();
        this.drawBoard();
    }


    drop() {
        let p = moves[KEY.DOWN](this.piece);
        if (this.valid(p)) {
            this.piece.move(p);
        } else {
            this.freeze();
            this.clearLines();
            if (this.piece.y === 0) {
                // Game over
                return false;
            }
            this.piece = this.next;
            this.piece.ctx = this.ctx;
            this.piece.setStartingPosition();
            this.getNewPiece();
        }
        return true;
    }


    clearLines() {
        let lines = 0;
        this.grid.forEach((row, y) => {
            // Если все клетки в ряду заполнены
            if (row.every(value => value > 0)) {
                lines++;
                // Удалить этот ряд
                this.grid.splice(y, 1);
                // Добавить наверх поля новый пустой ряд клеток
                this.grid.unshift(Array(COLS).fill(0));
            }
        });
        if (lines > 0) {
            // Добавить очки за собранные линии
            account.score += this.getLinesClearedPoints(lines);
            account.lines += lines;
            // Если мы имеем линий для следующего уровня
            if (account.lines >= LINES_PER_LEVEL) {
                // Переход на след уровень
                account.level++;  
                // След ур.нь
                account.lines -= LINES_PER_LEVEL;
                // Изменить скорость игры
                time.level = LEVEL[account.level];
            }
        }
    }
        

    //Проверка положения фигуры и границ поля
    valid(p) {
        return p.shape.every((row, dy) => {
        return row.every((value, dx) => {
            let x = p.x + dx;
            let y = p.y + dy;
            return (
                value === 0 ||
                (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y))
                );
            });
        });
    }


    //Замарозка при достижении низа поля
    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });
    } 


    drawBoard() {
        // Свойства для отрисовки
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1/BLOCK_SIZE;

        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value];
                    this.ctx.fillRect(x, y, 1, 1);
                    this.ctx.strokeRect(x, y, 1, 1);
                }
            });
        });
    }


    // Создает матрицу нужного размера, заполненную нулями
    getEmptyBoard() {
        return Array.from(
            {length: ROWS}, () => Array(COLS).fill(0)
        );
    }
    //Стенки поля (граница по Х)
    insideWalls(x) {
        return x >= 0 && x < COLS;
    }
    //Граница по У
    aboveFloor(y) {
        return y <= ROWS;
    } 
    //Свободны-ли координаты от других фигур 
    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }
    
    
    rotate(piece){
        // Клонирование матрицы
        let p = JSON.parse(JSON.stringify(piece));
        // Транспонирование матрицы
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [p.shape[x][y], p.shape[y][x]] = 
                [p.shape[y][x], p.shape[x][y]];
            }
        }        
        // Изменение порядка колонок
        p.shape.forEach(row => row.reverse());        
        return p;
    }
    

    getLinesClearedPoints(lines, level) {
        const lineClearPoints =
          lines === 1
            ? POINTS.SINGLE
            : lines === 2
            ? POINTS.DOUBLE
            : lines === 3
            ? POINTS.TRIPLE
            : lines === 4
            ? POINTS.TETRIS
            : 0;
    
        return (account.level + 1) * lineClearPoints;
    }
}
    