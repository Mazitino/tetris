'use strict';

//Конфигурация
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 25;
const LINES_PER_LEVEL = 10;

//Коды клавиш
const KEY = {
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    P: 80
}
Object.freeze(KEY);

//Цвета фигур
const COLORS = [
    'none',
    'rgb(182, 69, 41)',
    'rgb(52, 30, 173)',
    'rgb(27, 158, 73)',
    'rgb(176, 52, 207)',
    'rgb(211, 34, 34)',
    'rgb(2, 182, 182)',
    'rgb(204, 181, 29)'
]
Object.freeze(COLORS);

//Форма фигур
const SHAPES = [
    [],
    //I
    [[0, 0, 0, 0],
     [1, 1, 1, 1],
     [0, 0, 0, 0],
     [0, 0, 0, 0]],
    //J
    [[2, 0, 0],
     [2, 2, 2],
     [0, 0, 0]],
    //J
    [[0, 0, 3],
     [3, 3, 3],
     [0, 0, 0]],
    //Z
    [[0, 4, 4],
     [4, 4, 0],
     [0, 0, 0]],
    //T
    [[0, 5, 0],
     [5, 5, 5],
     [0, 0, 0]],
    //Z
    [[6, 6, 0],
     [0, 6, 6],
     [0, 0, 0]],
    //O
    [[7, 7],
     [7, 7]]
]
Object.freeze(SHAPES);

//Очки
const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2,
  }
  Object.freeze(POINTS);
  
  //Уровни
  const LEVEL = {
    0: 800,
    1: 720,
    2: 630,
    3: 550,
    4: 470,
    5: 380,
    6: 300,
    7: 220,
    8: 130,
    9: 100,
    10: 80,
    11: 80,
    12: 80,
    13: 70,
    14: 70,
    15: 70,
    16: 50,
    17: 50,
    18: 50,
    19: 30,
    20: 30
  }
  Object.freeze(LEVEL);
  