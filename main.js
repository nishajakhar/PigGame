
var roundScore, activePlayer;
var score, gamePlaying;
var lastdice;

init();

function init(){
    
    gamePlaying = true;
    score = [0,0];
    activePlayer = 0;
    roundScore =0;
    document.querySelector('.diceimg').style.display = 'none';
    
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player0').classList.remove('winner');
    document.querySelector('.player1').classList.remove('winner');
    document.querySelector('.player0').classList.remove('active');
    document.querySelector('.player1').classList.remove('active');
    document.querySelector('.player0').classList.add('active');
    
}


document.querySelector('.diceroll').addEventListener('click', function(){
    
    if(gamePlaying){
        //1. Random Number
        var dice = Math.floor(Math.random() *6) + 1;

    
        //2. Roll the dice
        document.querySelector('.diceimg').style.display='block';
        document.querySelector('.diceimg').src = 'img/dice-' + dice + '.png';
    
        //3. Update the roundscore
        if((lastdice === 6) && (dice === 6)){
            score[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = '0';
            nextPlayer();
        }else if(dice !== 1){
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }
        else
            nextPlayer();
        
        lastdice = dice;
    }
});



document.querySelector('.holdscore').addEventListener('click',function(){
    if(gamePlaying){
            //1. Update the globalscore
            score[activePlayer] += roundScore;

            //2. Update the GUI
            document.querySelector('#score-'+activePlayer).textContent = score[activePlayer];

            //3. Check if player wins
            if(score[activePlayer] >= 20){
                document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
                document.querySelector('.diceroll').style.disabled = 'false';
                document.querySelector('.holdscore').style.disabled = 'false';
                document.querySelector('.diceimg').style.display = 'none';

                document.querySelector('.player'+activePlayer).classList.remove('active');
                document.querySelector('.player'+activePlayer).classList.add('winner');
                gamePlaying = false;

            }
            else
                nextPlayer();
        
    }
});

function nextPlayer(){
        roundScore = 0;
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
        document.querySelector('#current-0').textContent = '0';
        document.querySelector('#current-1').textContent = '0';
        
        document.querySelector('.player0').classList.toggle('active');
        document.querySelector('.player1').classList.toggle('active');
    
        document.querySelector('.diceimg').style.display = 'none';

}

document.querySelector('#newgame').addEventListener('click',init);