/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, dice1, dice2, input, winningScore, x1 = 0, x2 = 0;

initialize_game();

document.querySelector('.btn-roll').addEventListener('click', function(){

        dice1 = Math.floor((Math.random()*6)+1);
        dice2 = Math.floor((Math.random()*6)+1);

        showDice();

        if(dice1 === 6 && x1 === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = 0;
            nextPlayer();
            document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
            document.getElementById('dice2').style.display = 'none';
        }else if(dice2 === 6 && x2 === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = 0;
            nextPlayer();
            document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
            document.getElementById('dice1').style.display = 'none';
        } else {
            document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
            document.getElementById('dice2').src = 'dice-' + dice2 + '.png';
        }
        //keep track of previous dice value
        x1 = dice1;
        x2 = dice2;



        if(dice1 === 1 || dice2 === 1){
            //hide the dice image
            hideDice();
            //switch to nextPlayer
            nextPlayer();
        } else {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }

            //************Testing******************
            if(scores[0] >= winningScore || scores[1] >= winningScore){
                initialize_game();
            }
            //************Testing******************
    });

//********************************************************************************************
//********************************HOLD BUTTON ACTIVITY****************************************
//********************************************************************************************
document.querySelector('.btn-hold').addEventListener('click', function(){

    input = document.querySelector('.final-score').value;

    if(input){
        winningScore = input;
    } else {
        winningScore = 100;
    }

//update the main score board and the UI
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
//reset the round score to zero
    roundScore = 0;
//checking if the player is win the game
    if(scores[activePlayer] >= winningScore){
        //winer
        //hide the dice
        document.querySelector('.dice').style.display = 'none';
        //change the player name to winner
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        //remove the css of active player
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        //set new css for the winner
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    } else {
        //switch to next player
        nextPlayer();
    }
});//*************************************HOLD BUTTON END*****************************************


//********************************************************************************************
//********************************NEW GAME BUTTON ACTIVITY************************************
//********************************************************************************************
document.querySelector('.btn-new').addEventListener('click', initialize_game);//NEW GAME BUTTON END


//********************************************************************************************
//*************************************INITIALIZE GAME****************************************
//********************************************************************************************
function initialize_game(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    hideDice();
    //score board, current round score and player name
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    //reset the winner css and active player set to player-0
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer(){
            //everything set to zero
            x1 = 0;
            x2 = 0;
            roundScore = 0;
            dice1 = 0;
            dice2 = 0;
            document.querySelector('#current-0').textContent = 0;
            document.querySelector('#current-1').textContent = 0;
            //switch to next player
            if(activePlayer === 0){
                activePlayer = 1;
            } else {
                activePlayer = 0;
            }
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
}

function showDice(){
    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice2').style.display = 'block';
}

function hideDice(){
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
}
