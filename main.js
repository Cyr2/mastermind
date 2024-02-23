const board = document.querySelector('#game');
const hideColor = document.querySelector('.hideColor');
const colorPicker = document.querySelector('.colorPicker');
const colorValid = ['blue', 'red', 'grey', 'white', 'green', 'yellow'];
let btn;
let colorSelected;
let endStatus = false;
const color = [];
let lineColor = [];

function buildGame(){
    colorValid.forEach((e)=>{
        const div = document.createElement('input');
        div.type = "radio";
        div.setAttribute('name', 'color');
        div.style.backgroundColor = e;
        colorPicker.appendChild(div)
    });

    for(let i = 0; i<4; i++) {
        const rdm = Math.floor(Math.random()*colorValid.length);
        color.push(colorValid[rdm]);
        const div = document.createElement('div');
        div.classList.add('color');
        div.style.backgroundColor = colorValid[rdm];
        hideColor.appendChild(div)
    }

    for(let i = 0; i<10; i++){
        let line = document.createElement('div');
        line.classList.add('line');
        board.appendChild(line)
        for(let i = 0; i<4; i++) {
            let btn = document.createElement('button');
            btn.classList.add('btn');
            line.appendChild(btn);
        }
    };

    const colorsPick = document.querySelectorAll('input[name="color"]');
    colorsPick.forEach((e) => {
        e.addEventListener('click', ()=>{
            colorSelected = e.style.backgroundColor;
        })
    });

    btn = document.querySelectorAll('.btn');
    for(const button of btn) {
        button.disabled = true;
    }
    btn[0].disabled = false;
    for(let i = 0; i<btn.length; i++) {
        btn[i].addEventListener('click', ()=>{
            if(colorSelected) {
                btn[i].style.backgroundColor = colorSelected;
                btn[i].disabled = true;
                lineColor.push(colorSelected);
                if(btn[i + 1]) btn[i + 1].disabled = false;
                else end = true;
                if((i % 4) === 3) {
                    check(i);
                }
            } else {
                alert('Merci de choisir un couleur');
            }
        })
    } 
};

function check(line){
    let good = 0;
    let close = 0;
    for(let i = 0; i<4; i++) {
        if(lineColor[i] == color[i]) {
            good++
        } else if(color.includes(lineColor[i])) {
            close++
        }
    }
    if(good !== 4 && !endStatus) {
        const score = document.createElement('div');
        score.textContent = `${good} Correct, ${close} Wrong`
        score.classList.add('score');
        document.querySelectorAll('.line')[Math.floor(line / 4)].appendChild(score);
        lineColor = [];    
    } else {
        end(good);
    }
}

buildGame();

function end() {
    if(endStatus) {
        alert('Loose')
    } else {
        alert('Win');
    }
    document.querySelectorAll('.color').forEach((e)=>{
        e.style.opacity = "100%";
    })
    btn.forEach((e)=>{
        e.disabled = true;
    })
}