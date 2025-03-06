
document.addEventListener('DOMContentLoaded', () => {
    // Game state
    let gameState = loadGameState() || {
        balance: 1000,
        betAmount: 100,
        highestBalance: 1000,
        totalBets: 0,
        wins: 0,
        losses: 0
    };
    
    let isSpinning = false;

    // DOM elements
    const balanceElement = document.getElementById('balance');
    const resetButton = document.getElementById('reset-button');
    const safeBetButton = document.getElementById('safe-bet');
    const riskyBetButton = document.getElementById('risky-bet');
    const amountButtons = document.querySelectorAll('.amount-button');
    const customAmountInput = document.getElementById('custom-amount');
    const setCustomAmountButton = document.getElementById('set-custom-amount');
    const toastContainer = document.getElementById('toast-container');
    const highestBalanceElement = document.getElementById('highest-balance');
    const totalBetsElement = document.getElementById('total-bets');
    const totalWinsElement = document.getElementById('total-wins');
    const totalLossesElement = document.getElementById('total-losses');

    // Load game state from localStorage
    function loadGameState() {
        const savedState = localStorage.getItem('bigBetGameState');
        return savedState ? JSON.parse(savedState) : null;
    }

    // Save game state to localStorage
    function saveGameState() {
        localStorage.setItem('bigBetGameState', JSON.stringify(gameState));
    }

    // Update balance display
    const updateBalance = (newBalance) => {
        gameState.balance = newBalance;
        balanceElement.textContent = gameState.balance;
        
        // Update highest balance if needed
        if (gameState.balance > gameState.highestBalance) {
            gameState.highestBalance = gameState.balance;
            highestBalanceElement.textContent = gameState.highestBalance;
        }
        
        // Save game state
        saveGameState();
        
        // Check if game over
        if (gameState.balance <= 0) {
            showToast('Game Over', 'You ran out of funds! The game will reset.', 'error');
            setTimeout(() => {
                resetGame();
            }, 2000);
        }
    };

    // Reset game function
    const resetGame = () => {
        gameState = {
            balance: 1000,
            betAmount: 100,
            highestBalance: gameState.highestBalance,
            totalBets: gameState.totalBets,
            wins: gameState.wins,
            losses: gameState.losses
        };
        
        updateUI();
        saveGameState();
        showToast('Game Reset', 'Your balance has been reset to 1000', 'warning');
    };

    // Update UI from game state
    const updateUI = () => {
        balanceElement.textContent = gameState.balance;
        highestBalanceElement.textContent = gameState.highestBalance;
        totalBetsElement.textContent = gameState.totalBets;
        totalWinsElement.textContent = gameState.wins;
        totalLossesElement.textContent = gameState.losses;
        
        // Select the correct bet amount button
        amountButtons.forEach(button => {
            const buttonAmount = parseInt(button.getAttribute('data-amount'));
            if (buttonAmount === gameState.betAmount) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
    };

    // Toast notification function
    const showToast = (title, message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const content = document.createElement('div');
        content.className = 'toast-content';
        
        const titleElement = document.createElement('div');
        titleElement.className = 'toast-title';
        titleElement.textContent = title;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'toast-message';
        messageElement.textContent = message;
        
        content.appendChild(titleElement);
        content.appendChild(messageElement);
        toast.appendChild(content);
        
        toastContainer.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slide-out-right 0.3s forwards';
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }, 3000);
    };

    // Handle bets
    const handleBet = (type) => {
        if (gameState.betAmount > gameState.balance) {
            showToast('Invalid Bet', 'You don\'t have enough balance for this bet', 'error');
            return;
        }

        // Increment total bets counter
        gameState.totalBets++;
        totalBetsElement.textContent = gameState.totalBets;

        // Disable betting during spin
        isSpinning = true;
        safeBetButton.disabled = true;
        safeBetButton.textContent = 'Betting...';
        riskyBetButton.disabled = true;
        riskyBetButton.textContent = 'Betting...';

        const chance = Math.random();
        
        setTimeout(() => {
            if (type === 'safe' && chance > 0.4) {
                const win = Math.round(gameState.betAmount * 1.5);
                updateBalance(gameState.balance + win - gameState.betAmount);
                showToast('You Win!', `+${win} coins`, 'success');
                balanceElement.classList.add('win-animation');
                setTimeout(() => balanceElement.classList.remove('win-animation'), 500);
                
                // Increment wins counter
                gameState.wins++;
                totalWinsElement.textContent = gameState.wins;
            } else if (type === 'risky' && chance > 0.7) {
                const win = Math.round(gameState.betAmount * 3);
                updateBalance(gameState.balance + win - gameState.betAmount);
                showToast('BIG WIN!', `+${win} coins`, 'warning');
                balanceElement.classList.add('win-animation');
                setTimeout(() => balanceElement.classList.remove('win-animation'), 500);
                
                // Increment wins counter
                gameState.wins++;
                totalWinsElement.textContent = gameState.wins;
            } else {
                updateBalance(gameState.balance - gameState.betAmount);
                showToast('You Lost', `-${gameState.betAmount} coins`, 'error');
                
                // Increment losses counter
                gameState.losses++;
                totalLossesElement.textContent = gameState.losses;
            }

            // Re-enable betting
            isSpinning = false;
            safeBetButton.disabled = false;
            safeBetButton.textContent = 'Place Safe Bet';
            riskyBetButton.disabled = false;
            riskyBetButton.textContent = 'Place Risky Bet';
            
            // Save game state
            saveGameState();
        }, 1000);
    };

    // Set custom bet amount
    const setCustomAmount = () => {
        const customAmount = parseInt(customAmountInput.value);
        if (isNaN(customAmount) || customAmount < 10) {
            showToast('Invalid Amount', 'Please enter a valid amount (minimum 10)', 'error');
            return;
        }
        
        if (customAmount > gameState.balance) {
            showToast('Too High', 'You cannot bet more than your current balance', 'error');
            return;
        }
        
        // Update bet amount
        gameState.betAmount = customAmount;
        
        // Update UI
        amountButtons.forEach(btn => btn.classList.remove('selected'));
        
        // Save game state
        saveGameState();
        
        // Show confirmation
        showToast('Bet Amount Set', `Your bet amount is now ${customAmount}`, 'success');
        
        // Clear input
        customAmountInput.value = '';
    };

    // Event listeners
    resetButton.addEventListener('click', resetGame);

    safeBetButton.addEventListener('click', () => {
        if (!isSpinning) {
            handleBet('safe');
        }
    });

    riskyBetButton.addEventListener('click', () => {
        if (!isSpinning) {
            handleBet('risky');
        }
    });

    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!isSpinning) {
                // Update selected bet amount
                amountButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                
                gameState.betAmount = parseInt(button.getAttribute('data-amount'));
                saveGameState();
            }
        });
    });
    
    setCustomAmountButton.addEventListener('click', setCustomAmount);
    
    customAmountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            setCustomAmount();
        }
    });

    // Initialize the game
    updateUI();
});
