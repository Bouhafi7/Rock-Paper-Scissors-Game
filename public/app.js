let rulesBtn = document.querySelector('.rules');
let rulesContainer = document.querySelector('.rules-container');
let overlay = document.querySelector('.overlay');

rulesBtn.addEventListener('click', () => {
    rulesContainer.classList.add('active');
    overlay.classList.add('active');
    document.querySelector('.fa-xmark').addEventListener('click', () => {
        rulesContainer.classList.remove('active');
        overlay.classList.remove('active');
    });
});

let underChoosedItem = document.querySelector('.choosed-item');
let gameContainer = document.querySelector('.game-container');
let agents = document.querySelectorAll('.big-circle');
let battleStatus = '';

agents.forEach(agent => {
    agent.addEventListener('click', (e) => {
        let dataAgent;
        let choosen;
        let dataChoose;
        agents.forEach(agent => {
            agent.style.pointerEvents = 'none';
            agent.classList.add('hide');
            gameContainer.classList.add('hide');
        });
        if (e.target.tagName == 'IMG') {
            e.target.parentElement.parentElement.classList.remove('hide');
            e.target.parentElement.parentElement.firstElementChild.classList.add('show');
            e.target.parentElement.parentElement.firstElementChild.innerHTML = 'you picked';
            choosen = e.target.parentElement.parentElement.innerHTML;
            dataAgent = agent.dataset.agent;
            dataChoose = agent.dataset.choose;
        } else if (e.target.classList.contains('pic')) {
            e.target.parentElement.classList.remove('hide');
            e.target.parentElement.firstElementChild.classList.add('show');
            e.target.parentElement.firstElementChild.innerHTML = 'you picked';
            choosen = e.target.parentElement.innerHTML;
            dataAgent = agent.dataset.agent;
            dataChoose = agent.dataset.choose;
        } else {
            e.target.classList.remove('hide');
            e.target.firstElementChild.classList.add('show');
            e.target.firstElementChild.innerHTML = 'you picked';
            choosen = e.target.innerHTML;
            dataAgent = agent.dataset.agent;
            dataChoose = agent.dataset.choose;
        }

        let houseChoosen = agents[Math.floor(Math.random() * agents.length)];
        let houseChoosenEl = houseChoosen.innerHTML;
        let houseChoosenClass = houseChoosen.className;
        startGame(e, agents, dataAgent, choosen, houseChoosen, houseChoosenClass, houseChoosenEl, dataChoose);
    });
});


function startGame(e, agents, dataAgent, choosen, houseChoosen, houseChoosenClass, houseChoosenEl, dataChoose) {
    let agentContainer = document.createElement('div');
    agentContainer.className = `${agents[dataAgent].className} chosen-agent`;
    agentContainer.setAttribute('data-agent', dataAgent);
    agentContainer.setAttribute('data-choose', dataChoose);
    agentContainer.innerHTML = choosen;
    gameContainer.appendChild(agentContainer);
    
    let houseAgentContainer = document.createElement('div');
    houseAgentContainer.setAttribute('data-agent', houseChoosen.dataset.agent);
    houseAgentContainer.setAttribute('data-choose', houseChoosen.dataset.choose);
    houseAgentContainer.className = `${houseChoosenClass} house-agent`;
    houseAgentContainer.innerHTML = houseChoosenEl;
    gameContainer.appendChild(houseAgentContainer);
    houseAgentContainer.firstElementChild.innerHTML = 'the house picked';
    let houseDataChoose = houseAgentContainer.dataset.choose;
    
    let gameOverContainer = document.createElement('div');
    gameOverContainer.className = 'game-over';
    let gameOver = `<div>
                        <div class="game-over-screen"></div>
                        <div class="rematch">play again</div>
                    </div>`;
    gameOverContainer.innerHTML = gameOver;
    gameContainer.appendChild(gameOverContainer);
    let gameOverScreen = document.querySelector('.game-over-screen');
    
    
    setTimeout(() => {
        e.target.parentElement.parentElement.classList.add('hide');
        e.target.parentElement.classList.add('hide');
        e.target.classList.add('hide');
        underChoosedItem.classList.add('show');
    }, 500);
    
    setTimeout(() => {
        agentContainer.classList.add('ready');
    }, 1200);
    
    setTimeout(() => {
        houseAgentContainer.classList.add('ready');
        houseAgentContainer.firstElementChild.classList.add('show');
    }, 2000);
    
    setTimeout(() => {
        agentContainer.classList.add('battle');
        houseAgentContainer.classList.add('battle');
        underChoosedItem.classList.remove('show');
    }, 2600);

    setTimeout(() => {
        gameOverContainer.classList.add('over');
    }, 3000);

    battle(e, houseDataChoose, gameOverScreen, agentContainer, houseAgentContainer);

    let rematchBtn = document.querySelector('.rematch');
    rematchBtn.addEventListener('click', () => {
        playAgain(agentContainer, houseAgentContainer, gameOverContainer, gameOverScreen);
    });
}



function playAgain(agentContainer, houseAgentContainer, gameOverContainer,gameOverScreen) {
    gameOverScreen.classList.add('show');
    gameOverContainer.classList.remove('over');
    
    agents.forEach(agent => {
        agent.firstElementChild.innerText = '';
        houseAgentContainer.firstElementChild.innerText = '';
        agent.style.pointerEvents = 'auto';
        setTimeout(() => {
            agent.classList.remove('hide');
            agentContainer.remove();
            houseAgentContainer.remove();
            gameOverContainer.remove();
            gameContainer.classList.remove('hide');
        }, 500);
    });
}

function battle(e, houseDataChoose, gameOverScreen, agentContainer, houseAgentContainer) {
    let dataChoose;
    if (e.target.tagName == 'IMG') {
        dataChoose = e.target.parentElement.parentElement.dataset.choose;
    } else if (e.target.classList.contains('pic')) {
        dataChoose = e.target.parentElement.dataset.choose;
    } else {
        dataChoose = e.target.dataset.choose;
    }
    
    gameOverScreen = document.querySelector('.game-over-screen');
    
    if (dataChoose == 'paper' && houseDataChoose == 'scissors') {
        battleStatus = false;
        setTimeout(() => {manageScore(houseAgentContainer, agentContainer, gameOverScreen);}, 3500);
    } else if (dataChoose == 'paper' && houseDataChoose == 'rock') {
        battleStatus = true;
        setTimeout(() => {manageScore(houseAgentContainer, agentContainer, gameOverScreen);}, 3500);
    } else if (dataChoose == 'paper' && houseDataChoose == 'paper') {
        gameOverScreen.innerText = 'draw';
    } else if (dataChoose == 'rock' && houseDataChoose == 'scissors') {
        battleStatus = true;
        setTimeout(() => {manageScore(houseAgentContainer, agentContainer, gameOverScreen);}, 3500);
    } else if (dataChoose == 'rock' && houseDataChoose == 'paper') {
        battleStatus = false;
        setTimeout(() => {manageScore(houseAgentContainer, agentContainer, gameOverScreen);}, 3500);
    } else if (dataChoose == 'rock' && houseDataChoose == 'rock') {
        gameOverScreen.innerText = 'draw';
    } else if (dataChoose == 'scissors' && houseDataChoose == 'rock') {
        battleStatus = false;
        setTimeout(() => {manageScore(houseAgentContainer, agentContainer, gameOverScreen);}, 3500);
    } else if (dataChoose == 'scissors' && houseDataChoose == 'paper') {
        battleStatus = true;
        setTimeout(() => {manageScore(houseAgentContainer, agentContainer, gameOverScreen);}, 3500);
    } else if (dataChoose == 'scissors' && houseDataChoose == 'scissors') {
        gameOverScreen.innerText = 'draw';
    }
    setTimeout(() => {
        gameOverScreen.classList.add('show');
    }, 3500);
}


let score = document.querySelector('.score');

function manageScore(houseAgentContainer, agentContainer, gameOverScreen) {
    gameOverScreen = document.querySelector('.game-over-screen');
    if (battleStatus) {
        agentContainer.classList.add('winner');
        score.innerText++;
        gameOverScreen.innerText = 'you win';
    } else {
        houseAgentContainer.classList.add('winner');
        score.innerText--;
        gameOverScreen.innerText = 'you lose';
    }
    if (score.innerText <= 0) {
        score.innerText = 0;
    }
}