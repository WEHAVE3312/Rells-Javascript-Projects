let cardsUnlocked = 0;
let cardOne = null;
let cardTwo = null;
let firstCardNumber = null;
let secondCardNumber = null;
let moves = 0;

let movesCard = document.getElementById("Movimientos");
let hitsCard = document.getElementById("aciertos");
let timerCard = document.getElementById("t-restante");
let clock = null;
let hits = 0;
let temporizer = false;
let time = 30;
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random() - 0.5});

function reset(){
    hits = 0;
    moves = 0;
    temporizer = false;
    clearInterval(clock);
    time = 30;
    numbers = numbers.sort(()=>{return Math.random() - 0.5});
  
    for (let i = 0; i<=15;i++){
        let cardBlock = document.getElementById(i)
        cardBlock.innerHTML = "";
        cardBlock.disabled = false;
        cardsUnlocked = 0;
     
    }
    timerCard.innerHTML = `Tiempo: ${time}s`;
    movesCard.innerHTML = `Movimientos: ${moves}`;
    hitsCard.innerHTML = `Aciertos: ${hits}`;


};

function timer(){
    clock = setInterval(() => {
        time--;
        timerCard.innerHTML = `Tiempo: ${time}s`;
        if(time==0){
            time_over();
            clearInterval(clock);
        }
    }, 1000);
}

function time_over(){
    for (let i = 0; i<=15;i++){
        let cardBlock = document.getElementById(i)
        cardBlock.innerHTML = numbers[i]
        cardBlock.disabled = true;
    }
}

function destapar(id){

    if(temporizer == false){
        timer();
        temporizer = true;
    }
    cardsUnlocked++;

    if(cardsUnlocked==1){
        cardOne = document.getElementById(id);
        firstCardNumber = numbers[id];
        cardOne.innerHTML = firstCardNumber;
        cardOne.disabled = true;
    }else if(cardsUnlocked==2){
        cardTwo = document.getElementById(id);
        secondCardNumber = numbers[id];
        cardTwo.innerHTML = secondCardNumber;
        cardTwo.disabled = true;

        moves++;
        movesCard.innerHTML = `Movimientos: ${moves}`;

        if(firstCardNumber == secondCardNumber){
            cardsUnlocked = 0;
            hits++;
            hitsCard.innerHTML = `Aciertos: ${hits}`;

            if(hits == 8){
                clearInterval(clock);
                hitsCard.innerHTML = `Aciertos: ${hits} <br> Has ganado!`
            }
        }else{
            cardOne.classList.add('anim');
            cardTwo.classList.add('anim');
            setTimeout(()=>{
                cardOne.innerHTML = "";
                cardTwo.innerHTML = "";
                cardOne.disabled = false;
                cardTwo.disabled = false;
                cardsUnlocked = 0;
                cardOne.classList.remove('anim');
                cardTwo.classList.remove('anim');
            },1000)
        }
    }

}