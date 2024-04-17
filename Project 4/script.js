$(document).ready(function() {
    let deckId = '';
    let playerBalance = 2500; // Starting balance $2500
    let playerBet = 0;
    let playerTotal = 0;
    let dealerTotal = 0;
    let gameStarted = false;

    function createDeck() {
        $.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6', function(data) {
            deckId = data.deck_id;
        });
    }

    function drawCard(handId, count) {
        $.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`, function(data) {
            if (data.success) {
                data.cards.forEach(function(card) {
                    $(`#${handId}`).append($('<img>').attr('src', card.image).addClass('card'));
                    if (handId === 'player-hand') {
                        playerTotal += getCardValue(card.value);
                    } else if (handId === 'dealer-hand') {
                        dealerTotal += getCardValue(card.value);
                    }
                });
                updateScores();
                if (handId === 'player-hand' && playerTotal > 21) {
                    $('#player-score').text('Bust');
                    endGame();
                }
            } else {
                console.log('Failed to draw cards.');
            }
        });
    }

    function getCardValue(cardValue) {
        if (cardValue === 'KING' || cardValue === 'QUEEN' || cardValue === 'JACK') {
            return 10;
        } else if (cardValue === 'ACE') {
            return 11; // For simplicity, count Ace as 11 for now
        } else {
            return parseInt(cardValue);
        }
    }

    function updateScores() {
        if (playerTotal <= 21) {
            $('#player-score').text(`Player: ${playerTotal}`);
        }
    }

    function clearHands() {
        $('#player-hand').empty();
        $('#dealer-hand').empty();
        playerTotal = 0;
        dealerTotal = 0;
    }

    function resetGame() {
        clearHands();
        $('#result').empty();
        $('#player-score').text('');
        $('#dealer-score').text('');
        playerBet = 0;
        $('#bet-input').val('10');
        updateBalance(playerBalance);
        gameStarted = false;
    }

    function updateBalance(balance) {
        $('#balance').text(`Balance: $${balance}`);
    }

    function endGame() {
        // Determine winner and update balance
        let result = determineWinner();
        $('#result').text(result);
        playerBalance += result === 'Player wins!' ? playerBet * 2 : 0; // Double the bet if player wins
        updateBalance(playerBalance);
        gameStarted = false;
    }

    function determineWinner() {
        if (playerTotal > 21) {
            return 'Dealer wins! Player busts.';
        } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
            return 'Player wins!';
        } else if (playerTotal < dealerTotal) {
            return 'Dealer wins!';
        } else {
            return 'It\'s a tie!';
        }
    }

    $('#deal-btn').click(function() {
        if (!gameStarted && playerBet > 0) {
            clearHands();
            $('#result').empty();
            drawCard('player-hand', 2);
            drawCard('dealer-hand', 2);
            gameStarted = true;
        }
    });

    $('#hit-btn').click(function() {
        if (gameStarted) {
            drawCard('player-hand', 1);
        }
    });

    $('#stand-btn').click(function() {
        if (gameStarted) {
            while (dealerTotal < 17) {
                drawCard('dealer-hand', 1);
            }
            endGame();
        }
    });

    $('#place-bet-btn').click(function() {
        if (!gameStarted) {
            playerBet = parseInt($('#bet-input').val());
            if (playerBet <= playerBalance && playerBet > 0) {
                playerBalance -= playerBet;
                updateBalance(playerBalance);
                gameStarted = true;
            } else {
                alert('Invalid bet amount or insufficient balance!');
            }
        }
    });

    createDeck(); // Create a new deck when the page loads
});
