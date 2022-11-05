const canvas = document.getElementById('game'); /*подключение к холсту канвас*/
const context = canvas.getContext('2d');

let aster = [];
let timer = 0;
let ship = {};


const shipimg = new Image();
shipimg.src = 'rickandmorty.png';

const asterimg = new Image();
asterimg.src = 'aster.png';

const fonimg = new Image();
fonimg.src = 'NGC1427A.jpg';


canvas.addEventListener('mousemove', function (e) {
    ship.x = event.offsetX - 50;
    ship.y = event.offsetY - 50;
})

fonimg.onload = function () {
    context.drawImage(fonimg, 0, 0, 800, 800); //для отрисовки фона на холсте уже после загрузки
    context.drawImage(asterimg, 100, 300);
    context.drawImage(shipimg, 300, 300);
    game();
}

//основной игровой цикл
function game() {
update();
render();
requestAnimationFrame(game); /*цикл для вызова рендера 60 раз в сек*/
}

//обновление данных, физика
function update() {
    //генерация астероидов
    timer++;
    if (timer % 30 === 0) {
        aster.push({
            x: Math.random() * 800,
            y: -30,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 + 2,
        });
    }
    //физика
    for (let i = 0; i < aster.length; i++) {
        aster[i].x += aster[i].dx;
        aster[i].y += aster[i].dy;
    }
    //удаление астер после выхода за границы
    /*if (aster[i].y >= 800) {
        aster.splice(i, 1);
    }*/
}

//отрисовка
function render() {
    context.drawImage(fonimg, 0, 0, 800, 800);
    context.drawImage(shipimg, ship.x, ship.y, 100, 100);
    for (let i = 0; i < aster.length; i++) {
        context.drawImage(asterimg, aster[i].x, aster[i].y, 50, 50);
    }
}