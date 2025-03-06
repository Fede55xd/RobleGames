document.addEventListener('DOMContentLoaded', function() {
  // Estado del juego
  const game = {
    resources: {
      stardust: 0,
      crystals: 0,
      rockets: 0
    },
    buildings: {
      stardustCollector: {
        count: 0,
        baseCost: 10,
        costMultiplier: 1.15,
        baseProduction: 1
      },
      crystalMiner: {
        count: 0,
        baseCost: 50,
        costMultiplier: 1.2,
        baseProduction: 0.2
      },
      rocketFactory: {
        count: 0,
        baseCost: 25,
        costMultiplier: 1.3,
        baseProduction: 0.05
      }
    },
    clickPower: 1,
    lastUpdate: Date.now()
  };

  // Elementos del DOM
  const stardustCount = document.getElementById('stardust-count');
  const crystalsCount = document.getElementById('crystals-count');
  const rocketsCount = document.getElementById('rockets-count');
  const planet = document.getElementById('planet');
  const messages = document.getElementById('messages');
  const resetButton = document.getElementById('reset-button');
  
  // Elementos de edificios
  const stardustCollectorCost = document.getElementById('stardust-collector-cost');
  const stardustCollectorCount = document.getElementById('stardust-collector-count');
  const stardustRate = document.getElementById('stardust-rate');
  const buyStardustCollector = document.getElementById('buy-stardust-collector');
  
  const crystalMinerCost = document.getElementById('crystal-miner-cost');
  const crystalMinerCount = document.getElementById('crystal-miner-count');
  const buyCrystalMiner = document.getElementById('buy-crystal-miner');
  
  const rocketFactoryCost = document.getElementById('rocket-factory-cost');
  const rocketFactoryCount = document.getElementById('rocket-factory-count');
  const buyRocketFactory = document.getElementById('buy-rocket-factory');
  
  // Elementos del modal
  const modal = document.getElementById('notification-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const modalConfirm = document.getElementById('modal-confirm');
  const modalCancel = document.getElementById('modal-cancel');

  // Funciones auxiliares
  function formatNumber(num) {
    if (num < 1000) return Math.floor(num);
    
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const exponent = Math.floor(Math.log10(num) / 3);
    const suffix = suffixes[exponent];
    
    const formatted = (num / Math.pow(1000, exponent)).toFixed(1);
    return formatted + suffix;
  }

  function calculateBuildingCost(building) {
    return Math.floor(building.baseCost * Math.pow(building.costMultiplier, building.count));
  }

  function calculateProduction(type) {
    let production = 0;
    
    switch(type) {
      case 'stardust':
        production = game.buildings.stardustCollector.count * game.buildings.stardustCollector.baseProduction;
        break;
      case 'crystals':
        production = game.buildings.crystalMiner.count * game.buildings.crystalMiner.baseProduction;
        break;
      case 'rockets':
        production = game.buildings.rocketFactory.count * game.buildings.rocketFactory.baseProduction;
        break;
    }
    
    return production;
  }

  // Función para mostrar el texto flotante
  // Ahora se ignoran las coordenadas del clic y se posiciona de forma fija:
  // horizontalmente centrado y justo en la parte superior del contenedor (planeta)
  function showFloatingText(amount, type, container) {
    const element = document.createElement('div');
    element.classList.add('resource-gain');
    
    let prefix = '+';
    let color = '#ffb400';
    
    switch(type) {
      case 'stardust':
        element.innerHTML = `${prefix}${amount} <i class="fas fa-star"></i>`;
        break;
      case 'crystals':
        element.innerHTML = `${prefix}${amount} <i class="fas fa-gem"></i>`;
        color = '#9f7aea';
        break;
      case 'rockets':
        element.innerHTML = `${prefix}${amount} <i class="fas fa-rocket"></i>`;
        color = '#f56565';
        break;
    }
    
    element.style.color = color;
    element.style.position = 'absolute';
    // Posición fija: 50% horizontal (centrado) y en la parte superior
    element.style.left = '50%';
    element.style.top = '0';
    element.style.transform = 'translate(-50%, 0)';
    
    container.appendChild(element);
    
    setTimeout(() => {
      element.remove();
    }, 1500);
  }

  function addMessage(text, type = 'info') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = text;
    
    messages.insertBefore(messageElement, messages.firstChild);
    
    setTimeout(() => {
      messageElement.remove();
    }, 3000);
  }

  // Funciones del modal
  function showModal(title, message, showCancel = false, confirmCallback = null) {
    modalTitle.innerHTML = title;
    modalMessage.textContent = message;
    
    modalConfirm.onclick = null;
    if (modalCancel) modalCancel.onclick = null;
    
    if (confirmCallback) {
      modalConfirm.onclick = function() {
        confirmCallback();
        closeModal();
      };
    } else {
      modalConfirm.onclick = closeModal;
    }
    
    if (modalCancel) {
      modalCancel.style.display = showCancel ? 'inline-block' : 'none';
      if (showCancel) {
        modalCancel.onclick = closeModal;
      }
    }
    
    modal.style.display = 'flex';
  }
  
  function closeModal() {
    modal.style.display = 'none';
  }

  // Bucle principal del juego
  function gameLoop() {
    const now = Date.now();
    const deltaTime = (now - game.lastUpdate) / 1000;
    game.lastUpdate = now;
    
    const stardustProduction = calculateProduction('stardust') * deltaTime;
    const crystalProduction = calculateProduction('crystals') * deltaTime;
    const rocketProduction = calculateProduction('rockets') * deltaTime;
    
    if (stardustProduction > 0) {
      game.resources.stardust += stardustProduction;
    }
    
    if (crystalProduction > 0 && game.resources.stardust >= crystalProduction) {
      game.resources.stardust -= crystalProduction;
      game.resources.crystals += crystalProduction;
    }
    
    if (rocketProduction > 0 && game.resources.crystals >= rocketProduction) {
      game.resources.crystals -= rocketProduction;
      game.resources.rockets += rocketProduction;
    }
    
    updateDisplay();
    updateButtonStates();
    
    requestAnimationFrame(gameLoop);
  }

  // Actualizar visualización
  function updateDisplay() {
    stardustCount.textContent = formatNumber(game.resources.stardust);
    crystalsCount.textContent = formatNumber(game.resources.crystals);
    rocketsCount.textContent = formatNumber(game.resources.rockets);
    
    stardustCollectorCount.textContent = game.buildings.stardustCollector.count;
    stardustCollectorCost.textContent = formatNumber(calculateBuildingCost(game.buildings.stardustCollector));
    stardustRate.textContent = formatNumber(calculateProduction('stardust'));
    
    crystalMinerCount.textContent = game.buildings.crystalMiner.count;
    crystalMinerCost.textContent = formatNumber(calculateBuildingCost(game.buildings.crystalMiner));
    
    rocketFactoryCount.textContent = game.buildings.rocketFactory.count;
    rocketFactoryCost.textContent = formatNumber(calculateBuildingCost(game.buildings.rocketFactory));
  }

  // Actualizar estado de botones
  function updateButtonStates() {
    const stardustCost = calculateBuildingCost(game.buildings.stardustCollector);
    buyStardustCollector.disabled = game.resources.stardust < stardustCost;
    
    const crystalCost = calculateBuildingCost(game.buildings.crystalMiner);
    buyCrystalMiner.disabled = game.resources.stardust < crystalCost;
    
    const rocketCost = calculateBuildingCost(game.buildings.rocketFactory);
    buyRocketFactory.disabled = game.resources.crystals < rocketCost;
  }

  // Evento de clic en el planeta (minería manual)
  // Ahora se muestra el efecto de "estrella" saliendo desde la parte superior, centrado
  planet.addEventListener('click', function(e) {
    // Reproducir sonido
    let clickSound = new Audio('sounds/click.mp3');
    clickSound.play();
    
    game.resources.stardust += game.clickPower;
    
    // Reiniciar animación del planeta
    this.style.animation = 'none';
    setTimeout(() => {
      this.style.animation = 'float 6s ease-in-out infinite';
    }, 10);
    
    // Se muestra el texto flotante usando el contenedor (el propio planeta)
    showFloatingText(game.clickPower, 'stardust', this);
    
    updateDisplay();
    updateButtonStates();
    saveGame();
  });

  // Manejo de compra de edificios
  buyStardustCollector.addEventListener('click', function() {
    const cost = calculateBuildingCost(game.buildings.stardustCollector);
    
    if (game.resources.stardust >= cost) {
      let purchaseSound = new Audio('sounds/compra.mp3');
      purchaseSound.play();
      
      game.resources.stardust -= cost;
      game.buildings.stardustCollector.count++;
      
      updateDisplay();
      updateButtonStates();
      addMessage('Purchased Stardust Collector');
      saveGame();
    }
  });
  
  buyCrystalMiner.addEventListener('click', function() {
    const cost = calculateBuildingCost(game.buildings.crystalMiner);
    
    if (game.resources.stardust >= cost) {
      let purchaseSound = new Audio('sounds/compra.mp3');
      purchaseSound.play();
      
      game.resources.stardust -= cost;
      game.buildings.crystalMiner.count++;
      
      updateDisplay();
      updateButtonStates();
      addMessage('Purchased Crystal Miner');
      saveGame();
    }
  });
  
  buyRocketFactory.addEventListener('click', function() {
    const cost = calculateBuildingCost(game.buildings.rocketFactory);
    
    if (game.resources.crystals >= cost) {
      let purchaseSound = new Audio('sounds/compra.mp3');
      purchaseSound.play();
      
      game.resources.crystals -= cost;
      game.buildings.rocketFactory.count++;
      
      updateDisplay();
      updateButtonStates();
      addMessage('Purchased Rocket Factory');
      saveGame();
    }
  });

  // Botón de reinicio
  resetButton.addEventListener('click', function() {
    showModal('<i class="fas fa-exclamation-triangle"></i> Reset Game', 'Are you sure you want to reset your progress? All your buildings and resources will be lost!', true, function() {
      localStorage.removeItem('cosmicClickerSave');
      resetGame();
      addMessage('Game reset!');
    });
  });

  // Guardar juego en localStorage
  function saveGame() {
    const saveData = JSON.stringify({
      resources: game.resources,
      buildings: game.buildings,
      clickPower: game.clickPower,
      lastUpdate: Date.now()
    });
    
    localStorage.setItem('cosmicClickerSave', saveData);
  }

  // Cargar juego y aplicar producción offline
  function loadGame() {
    const saveData = localStorage.getItem('cosmicClickerSave');
    
    if (saveData) {
      const loadedData = JSON.parse(saveData);
      
      game.resources = loadedData.resources;
      game.buildings = loadedData.buildings;
      game.clickPower = loadedData.clickPower;
      
      const offlineTime = (Date.now() - loadedData.lastUpdate) / 1000;
      if (offlineTime > 0) {
        const offlineStardust = calculateProduction('stardust') * offlineTime;
        game.resources.stardust += offlineStardust;
        
        const offlineCrystals = calculateProduction('crystals') * offlineTime;
        if (game.resources.stardust >= offlineCrystals) {
          game.resources.stardust -= offlineCrystals;
          game.resources.crystals += offlineCrystals;
        }
        
        const offlineRockets = calculateProduction('rockets') * offlineTime;
        if (game.resources.crystals >= offlineRockets) {
          game.resources.crystals -= offlineRockets;
          game.resources.rockets += offlineRockets;
        }
      }
      
      game.lastUpdate = Date.now();
      updateDisplay();
      updateButtonStates();
      addMessage('Game loaded!');
    }
  }

  // Reiniciar juego
  function resetGame() {
    game.resources = {
      stardust: 0,
      crystals: 0,
      rockets: 0
    };
    
    game.buildings = {
      stardustCollector: {
        count: 0,
        baseCost: 10,
        costMultiplier: 1.15,
        baseProduction: 1
      },
      crystalMiner: {
        count: 0,
        baseCost: 50,
        costMultiplier: 1.2,
        baseProduction: 0.2
      },
      rocketFactory: {
        count: 0,
        baseCost: 25,
        costMultiplier: 1.3,
        baseProduction: 0.05
      }
    };
    
    game.clickPower = 1;
    game.lastUpdate = Date.now();
    
    updateDisplay();
    updateButtonStates();
  }

  // Inicializar el juego
  function init() {
    loadGame();
    gameLoop();
    // Guardado automático cada segundo
    setInterval(saveGame, 1000);
  }

  init();
});
