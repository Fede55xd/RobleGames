const STORAGE_PREFIX = 'Stats_robleuy_foodStandEmpire';

const STORAGE_KEYS = {
    GAME_STATE: `${STORAGE_PREFIX}gameState`,
    LANGUAGE: `${STORAGE_PREFIX}language`,
    AUDIO_CONFIG: `${STORAGE_PREFIX}audioConfig`,
    GRAPHICS_QUALITY: `${STORAGE_PREFIX}graphicsQuality`
};

const gameState = {
    money: 0,
    moneyDisplay: 0, // Valor para mostrar animación suave
    pendingIncome: 0, // Ingresos pendientes por segundo
    lastMoneyUpdate: 0,
    reputation: 0,
    totalSales: 0, // Número total de ventas realizadas
    totalEarnings: 0, // Dinero total ganado
    prestigeLevel: 0,
    visualLevel: 1,
    lastUpdate: Date.now(),
    playTime: 0, // Tiempo jugado en segundos
    products: {
        popcorn: {
            level: 1,
            price: 2.00,
            baseProduction: 1.0,
            sales: 0,
            progress: 0,
            employees: 0,
            unlocked: true,
            lastSellTime: 0
        },
        donut: {
            level: 0,
            price: 3.00,
            baseProduction: 1.0,
            sales: 0,
            progress: 0,
            employees: 0,
            unlocked: false,
            requiredLevel: { product: 'popcorn', level: 10 }
        },
        nachos: {
            level: 0,
            price: 4.00,
            baseProduction: 1.0,
            sales: 0,
            progress: 0,
            employees: 0,
            unlocked: false,
            requiredLevel: { product: 'donut', level: 11 }
        },
        soda: {
            level: 0,
            price: 5.00,
            baseProduction: 1.0,
            sales: 0,
            progress: 0,
            employees: 0,
            unlocked: false,
            requiredLevel: { product: 'nachos', level: 12 }
        },
        hotdog: {
            level: 0,
            price: 6.00,
            baseProduction: 1.0,
            sales: 0,
            progress: 0,
            employees: 0,
            unlocked: false,
            requiredLevel: { product: 'soda', level: 14 }
        },
        icecream: {
            level: 0,
            price: 7.00,
            baseProduction: 1.0,
            sales: 0,
            progress: 0,
            employees: 0,
            unlocked: false,
            requiredLevel: { product: 'hotdog', level: 15 }
        },
        coffee: {
            level: 0,
            price: 8.00,
            baseProduction: 1.0,
            sales: 0,
            progress: 0,
            employees: 0,
            unlocked: false,
            requiredLevel: { product: 'icecream', level: 16 }
        },
        pizza: {
            level: 0,
            price: 9.00,
            baseProduction: 1.0,
            sales: 0,
            progress: 0,
            employees: 0,
            unlocked: false,
            requiredLevel: { product: 'coffee', level: 17 }
        },
        fries: {
            level: 0,
            price: 10.00,
            baseProduction: 1.0,
            sales: 0,
            progress: 0,
            employees: 0,
            unlocked: false,
            requiredLevel: { product: 'pizza', level: 18 }
        },
        burger: {
            level: 0,
            price: 11.00,
            baseProduction: 1.0,
            sales: 0,
            progress: 0,
            employees: 0,
            unlocked: false,
            requiredLevel: { product: 'fries', level: 20 }
        }
    },
    selectedStyle: 1
};

// Constantes
const EMPLOYEE_BASE_COSTS = {
    popcorn: 100,
    donut: 300,
    nachos: 900,
    soda: 2700,
    hotdog: 8100,
    icecream: 24300,
    coffee: 72900,
    pizza: 218700,
    fries: 656100,
    burger: 1968300
};

const PRODUCT_BASE_COSTS = {
    popcorn: 50,
    donut: 1000,
    nachos: 5000,
    soda: 25000,
    hotdog: 125000,
    icecream: 625000,
    coffee: 3125000,
    pizza: 15625000,
    fries: 78125000,
    burger: 390625000
};

const SELL_COOLDOWN = 100; // 500ms entre ventas manuales
const UPDATE_INTERVAL = 100; // 100ms para actualizaciones suaves
const SAVE_INTERVAL = 100; // 100ms entre guardados
const EMPLOYEE_CYCLE_TIME = 1; // 1 segundos por ciclo de empleado

// Constantes de audio
const AUDIO_SOURCES = {
    click: 'audios/click.mp3',
    compra: 'audios/compra.mp3',
    music: 'audios/music.mp3'
};

// Configuración de audio
const audioConfig = {
    musicVolume: 0.3,
    effectsVolume: 0.5,
    hasPermission: false,
    isFirstVisit: true // Nuevo campo para controlar si es primera visita
};

// Configuración de idioma y traducciones
const translations = {
    en: {
        // Navegación
        stands: "Stands",
        stats: "Statistics",
        settings: "Settings",
        // Títulos y encabezados
        gameTitle: "Food Stand Empire",
        languageSettings: "Language Settings",
        audioSettings: "Audio Settings",
        musicVolume: "Music Volume",
        effectsVolume: "Effects Volume",
        // Estadísticas
        income: "Income",
        earningsPerSecond: "Earnings per second",
        totalSales: "Total sales",
        totalEarnings: "Total earnings",
        progress: "Progress",
        prestigeLevel: "Prestige Level",
        reputation: "Reputation",
        timePlayed: "Time Played",
        // Productos
        popcornStand: "Popcorn Stand",
        donutStand: "Donut Stand",
        nachosStand: "Nachos Stand",
        sodaStand: "Soda Stand",
        hotdogStand: "Hot Dog Stand",
        icecreamStand: "Ice Cream Stand",
        coffeeStand: "Coffee Stand",
        pizzaStand: "Pizza Stand",
        friesStand: "Fries Stand",
        burgerStand: "Burger Stand",
        // Acciones
        sell: "Sell",
        hire: "Hire",
        upgrade: "Upgrade",
        unlock: "Unlock",
        // Estados
        level: "Level",
        locked: "Locked",
        price: "Price",
        sold: "Sold",
        employees: "Employees",
        // Mensajes de bienvenida
        welcomeFirst: "Welcome to Food Stand Empire!\nStart your business adventure",
        welcomeMagnate: "The business tycoon is back!\nYour gastronomic empire awaits",
        welcomeSuccessful: "Welcome back, successful entrepreneur!\nYour food empire keeps growing",
        welcomeEntrepreneur: "Back to business, entrepreneur!\nYour stands need you",
        welcomeNewbie: "Welcome back, future entrepreneur!\nKeep expanding your business",
        welcomeBasic: "Welcome back!\nYour food stand awaits",
        // Instrucciones
        clickToStart: "Click anywhere to start",
        // Requisitos
        requires: "Requires",
        // Otros
        perSecond: "/s",
        employee: "Employee",
        clickAnywhere: "Click anywhere to start",
        'Classic Stand': 'Classic Stand',
        'Modern Shop': 'Modern Shop',
        'Neon Market': 'Neon Market',
        'Crystal Mall': 'Crystal Mall',
        'Cosmic Plaza': 'Cosmic Plaza',
        'Golden Bazaar': 'Golden Bazaar',
        'Cyber Market': 'Cyber Market',
        'Magic Emporium': 'Magic Emporium',
        'Rainbow Mall': 'Rainbow Mall',
        'Ultimate Empire': 'Ultimate Empire',
        // Estilos visuales
        visualStyle1: 'Classic Stand',
        visualStyle2: 'Modern Shop',
        visualStyle3: 'Neon Market',
        visualStyle4: 'Crystal Mall',
        visualStyle5: 'Cosmic Plaza',
        visualStyle6: 'Golden Bazaar',
        visualStyle7: 'Cyber Market',
        visualStyle8: 'Magic Emporium',
        visualStyle9: 'Rainbow Mall',
        visualStyle10: 'Ultimate Empire',
        visualStylesTitle: 'Visual Style',
        // Graphics Settings
        graphicsSettings: "Graphics Settings",
        graphicsHigh: "High",
        graphicsMedium: "Medium",
        graphicsLow: "Low",
        // Offline info
        offlineMessage: "You were inactive for {time} and accumulated ${money}."
    },
    es: {
        // Navegación
        stands: "Puestos",
        stats: "Estadísticas",
        settings: "Configuración",
        // Títulos y encabezados
        gameTitle: "Food Stand Empire",
        languageSettings: "Configuración de Idioma",
        audioSettings: "Configuración de Audio",
        musicVolume: "Volumen de Música",
        effectsVolume: "Volumen de Efectos",
        // Estadísticas
        income: "Ingresos",
        earningsPerSecond: "Ganancias por segundo",
        totalSales: "Ventas totales",
        totalEarnings: "Ganancias totales",
        progress: "Progreso",
        prestigeLevel: "Nivel de Prestigio",
        reputation: "Reputación",
        timePlayed: "Tiempo Jugado",
        // Productos
        popcornStand: "Puesto de Palomitas",
        donutStand: "Puesto de Donas",
        nachosStand: "Puesto de Nachos",
        sodaStand: "Puesto de Bebidas",
        hotdogStand: "Puesto de Hot Dogs",
        icecreamStand: "Puesto de Helados",
        coffeeStand: "Puesto de Café",
        pizzaStand: "Puesto de Pizza",
        friesStand: "Puesto de Papas Fritas",
        burgerStand: "Puesto de Hamburguesas",
        // Acciones
        sell: "Vender",
        hire: "Contratar",
        upgrade: "Mejorar",
        unlock: "Desbloquear",
        // Estados
        level: "Nivel",
        locked: "Bloqueado",
        price: "Precio",
        sold: "Vendidas",
        employees: "Empleados",
        // Mensajes de bienvenida
        welcomeFirst: "¡Bienvenido a Food Stand Empire!\nComienza tu aventura empresarial",
        welcomeMagnate: "¡El magnate de los negocios ha regresado!\nTu imperio gastronómico te espera",
        welcomeSuccessful: "¡Bienvenido de nuevo, exitoso empresario!\nTu imperio de comida sigue creciendo",
        welcomeEntrepreneur: "¡De vuelta al negocio, emprendedor!\nTus puestos te necesitan",
        welcomeNewbie: "¡Bienvenido nuevamente futuro empresario!\nSigue expandiendo tu negocio",
        welcomeBasic: "¡Bienvenido de nuevo!\nTu puesto de comida te espera",
        // Instrucciones
        clickToStart: "Pulsa en cualquier lugar para comenzar",
        // Requisitos
        requires: "Requiere",
        // Otros
        perSecond: "/s",
        employee: "Empleado",
        clickAnywhere: "Pulsa en cualquier lugar para comenzar",
        'Classic Stand': 'Puesto Clásico',
        'Modern Shop': 'Tienda Moderna',
        'Neon Market': 'Mercado Neón',
        'Crystal Mall': 'Centro Cristal',
        'Cosmic Plaza': 'Plaza Cósmica',
        'Golden Bazaar': 'Bazar Dorado',
        'Cyber Market': 'Mercado Cyber',
        'Magic Emporium': 'Emporio Mágico',
        'Rainbow Mall': 'Centro Arcoíris',
        'Ultimate Empire': 'Imperio Supremo',
        // Estilos visuales
        visualStyle1: 'Puesto Clásico',
        visualStyle2: 'Tienda Moderna',
        visualStyle3: 'Mercado Neón',
        visualStyle4: 'Centro Cristal',
        visualStyle5: 'Plaza Cósmica',
        visualStyle6: 'Bazar Dorado',
        visualStyle7: 'Mercado Cyber',
        visualStyle8: 'Emporio Mágico',
        visualStyle9: 'Centro Arcoíris',
        visualStyle10: 'Imperio Supremo',
        visualStylesTitle: 'Estilo Visual',
        // Graphics Settings
        graphicsSettings: "Configuración Gráfica",
        graphicsHigh: "Alta",
        graphicsMedium: "Media",
        graphicsLow: "Baja",
        // Offline info
        offlineMessage: "Estuviste inactivo por {time} y acumulaste ${money}."
    }
};

// Configuración actual del idioma
let currentLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en';

// Función para traducir texto
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Función para cambiar el idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    
    // Actualizar todos los textos
    updateAllText();
    
    // Actualizar todos los productos
    for (const [productId, data] of Object.entries(gameState.products)) {
        const productElement = document.getElementById(productId);
        if (productElement) {
            if (data.unlocked) {
                updateUnlockedProduct(productId, data);
            } else {
                updateLockedProduct(productId, data);
            }
        }
    }
    
    // Verificar desbloqueos después de actualizar los productos
    checkUnlocks();
    
    // Actualizar el display general
    updateDisplay();
    
    window.location.reload();
}

// Función para actualizar todos los textos
function updateAllText() {
    // Actualizar navegación
    document.querySelectorAll('.nav-btn').forEach(btn => {
        const section = btn.dataset.section;
        if (section === 'stands') btn.innerHTML = `<i class="fas fa-store"></i> ${t('stands')}`;
        if (section === 'stats') btn.innerHTML = `<i class="fas fa-chart-line"></i> ${t('stats')}`;
        if (section === 'settings') btn.innerHTML = `<i class="fas fa-cog"></i> ${t('settings')}`;
    });

    // Actualizar título del juego
    document.querySelector('h1').innerHTML = `<i class="fas fa-store"></i> ${t('gameTitle')}`;

    // Actualizar configuración de audio
    document.querySelector('.settings-card:first-child h3').innerHTML = `<i class="fas fa-globe"></i> ${t('languageSettings')}`;
    document.querySelector('.settings-card:last-child h3').innerHTML = `<i class="fas fa-volume-up"></i> ${t('audioSettings')}`;
    document.querySelector('label[for="music-volume"]').textContent = t('musicVolume');
    document.querySelector('label[for="effects-volume"]').textContent = t('effectsVolume');

    // Actualizar estadísticas
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        statsSection.querySelector('h3').innerHTML = `<i class="fas fa-dollar-sign"></i> ${t('income')}`;
        const statTexts = statsSection.querySelectorAll('p');
        statTexts[0].innerHTML = `${t('earningsPerSecond')}: $<span id="income-stat">0</span>`;
        statTexts[1].innerHTML = `${t('totalSales')}: <span id="total-sales">0</span>`;
        statTexts[2].innerHTML = `${t('totalEarnings')}: $<span id="total-earnings">0</span>`;
        
        // Actualizar título de tiempo jugado
        const timePlayedCard = document.querySelector('.stat-card:last-child h3');
        if (timePlayedCard) {
            timePlayedCard.innerHTML = `<i class="fas fa-clock"></i> ${t('timePlayed')}`;
        }
    }

    // Actualizar mensaje de bienvenida
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
        welcomeText.textContent = getWelcomeMessage();
    }
    const clickInstruction = document.querySelector('.click-instruction');
    if (clickInstruction) {
        clickInstruction.textContent = t('clickToStart');
    }

    // Actualizar título de estilos visuales
    const visualStyleTitle = document.querySelector('.settings-card:nth-child(2) h3');
    if (visualStyleTitle) {
        visualStyleTitle.innerHTML = `<i class="fas fa-palette"></i> ${t('visualStylesTitle')}`;
    }

    // Actualizar textos de configuración gráfica
    const graphicsTitle = document.querySelector('.graphics-settings-title');
    if (graphicsTitle) {
        graphicsTitle.textContent = t('graphicsSettings');
    }

    const graphicsSelect = document.getElementById('graphics-quality');
    if (graphicsSelect) {
        Array.from(graphicsSelect.options).forEach(option => {
            switch(option.value) {
                case 'high':
                    option.textContent = t('graphicsHigh');
                    break;
                case 'medium':
                    option.textContent = t('graphicsMedium');
                    break;
                case 'low':
                    option.textContent = t('graphicsLow');
                    break;
            }
        });
    }
}

// Función para actualizar un producto desbloqueado
function updateUnlockedProduct(productId, data) {
    const element = document.getElementById(productId);
    const productName = t(productId + 'Stand');
    
    element.innerHTML = `
        <div class="product-header">
            <div class="product-title">
                <h3>${productName}</h3>
                <div class="level">${t('level')}: ${data.level}</div>
            </div>
        </div>
        <div class="progress-bar">
            <div class="progress-fill" id="${productId}-progress"></div>
        </div>
        <div class="product-stats">
            <span class="price">${t('price')}: $<span id="${productId}-price">${(data.price * data.level).toFixed(2)}</span></span>
            <span class="sales">${t('sold')}: <span id="${productId}-sales">${Math.floor(data.sales).toLocaleString()}</span></span>
        </div>
        <div class="product-actions">
            <button class="sell-btn" onclick="sellProduct('${productId}', event)">
                <i class="fas fa-cash-register"></i>
                ${t('sell')}
                <span class="button-info">+$${(data.price * data.level).toFixed(1)}</span>
            </button>
            <button class="hire-btn" onclick="hireEmployee('${productId}')">
                <i class="fas fa-user-plus"></i>
                ${t('hire')}
                <span class="button-info">+$${((data.price * data.level) / EMPLOYEE_CYCLE_TIME).toFixed(1)}${t('perSecond')}</span>
            </button>
        </div>
        <div class="employees-info">
            <div class="current-employees">
                <i class="fas fa-users"></i> ${t('employees')}: <span id="${productId}-employees">${data.employees}</span>
            </div>
            <div class="hire-cost">
                +1 ${t('employee')} <i class="fas fa-user"></i>: $<span id="${productId}-hire-cost">${getEmployeeCost(productId)}</span>
            </div>
        </div>
        <button class="upgrade-btn" onclick="upgradeProduct('${productId}')">
            <i class="fas fa-arrow-up"></i>
            ${t('upgrade')} ($${getProductUpgradeCost(productId)})
        </button>
    `;
}

// Función para actualizar un producto bloqueado
function updateLockedProduct(productId, data) {
    const element = document.getElementById(productId);
    const productName = t(productId + 'Stand');
    const requiredProductName = t(data.requiredLevel.product + 'Stand');
    
    element.innerHTML = `
        <div class="product-header">
            <div class="product-title">
                <h3>${productName}</h3>
                <div class="locked-status">(${t('locked')})</div>
            </div>
        </div>
        <div class="unlock-requirements">
            ${t('requires')} ${requiredProductName} ${t('level')} ${data.requiredLevel.level}
        </div>
        <button class="unlock-btn" onclick="unlockProduct('${productId}')" ${data.canUnlock ? '' : 'disabled'}>
            <i class="fas fa-lock"></i>
            ${t('unlock')} ($${PRODUCT_BASE_COSTS[productId]})
        </button>
    `;
}

// Modificar la función getWelcomeMessage para usar traducciones
function getWelcomeMessage() {
    const unlockedProducts = Object.values(gameState.products).filter(p => p.unlocked).length;
    
    if (audioConfig.isFirstVisit) {
        return t('welcomeFirst');
    }
    
    if (unlockedProducts >= 8) {
        return t('welcomeMagnate');
    } else if (unlockedProducts >= 5) {
        return t('welcomeSuccessful');
    } else if (unlockedProducts >= 3) {
        return t('welcomeEntrepreneur');
    } else if (unlockedProducts > 1) {
        return t('welcomeNewbie');
    } else {
        return t('welcomeBasic');
    }
}

// Cargar configuración de audio
function loadAudioConfig() {
    const savedConfig = localStorage.getItem(STORAGE_KEYS.AUDIO_CONFIG);
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        audioConfig.musicVolume = config.musicVolume;
        audioConfig.effectsVolume = config.effectsVolume;
        audioConfig.hasPermission = config.hasPermission;
        audioConfig.isFirstVisit = config.isFirstVisit;
        
        // Actualizar los controles de volumen
        document.getElementById('music-volume').value = audioConfig.musicVolume * 100;
        document.getElementById('music-volume-value').textContent = `${Math.round(audioConfig.musicVolume * 100)}%`;
        document.getElementById('effects-volume').value = audioConfig.effectsVolume * 100;
        document.getElementById('effects-volume-value').textContent = `${Math.round(audioConfig.effectsVolume * 100)}%`;
        
        // Actualizar el mensaje de bienvenida pero NO ocultar el mensaje
        const welcomeText = document.getElementById('welcome-text');
        welcomeText.textContent = getWelcomeMessage();
        
        // Si tenemos permiso, iniciar la música pero NO ocultar el mensaje
        if (audioConfig.hasPermission) {
            const music = document.getElementById('background-music');
            music.volume = audioConfig.musicVolume;
            music.play().catch(console.error);
        }
    }
}

// Guardar configuración de audio
function saveAudioConfig() {
    localStorage.setItem(STORAGE_KEYS.AUDIO_CONFIG, JSON.stringify(audioConfig));
}

// Inicialización de la música de fondo
function initBackgroundMusic() {
    const music = document.getElementById('background-music');
    const clickToPlay = document.getElementById('click-to-play');
    const welcomeText = document.getElementById('welcome-text');
    
    // Actualizar el mensaje de bienvenida
    welcomeText.textContent = getWelcomeMessage();
    
    // Si ya tenemos permiso, reproducir la música pero NO ocultar el mensaje
    if (audioConfig.hasPermission) {
        music.volume = audioConfig.musicVolume;
        music.play().catch(console.error);
    }
    
    // Configurar el evento de clic en el div click-to-play
    clickToPlay.addEventListener('click', function startMusic() {
        audioConfig.hasPermission = true;
        audioConfig.isFirstVisit = false; // Marcar que ya no es primera visita
        music.volume = audioConfig.musicVolume;
        music.play().then(() => {
            clickToPlay.classList.add('hidden');
            saveAudioConfig();
        }).catch(console.error);
        clickToPlay.removeEventListener('click', startMusic);
    });
}

// Función para crear una nueva instancia de audio
function createAudio(source) {
    const audio = new Audio(source);
    audio.volume = audioConfig.effectsVolume;
    return audio;
}

// Configurar eventos de audio
function setupAudioControls() {
    const musicVolume = document.getElementById('music-volume');
    const effectsVolume = document.getElementById('effects-volume');
    const musicVolumeValue = document.getElementById('music-volume-value');
    const effectsVolumeValue = document.getElementById('effects-volume-value');
    const musicMuteBtn = document.getElementById('music-mute');
    const effectsMuteBtn = document.getElementById('effects-mute');

    let prevMusicVolume = 30;
    let prevEffectsVolume = 50;

    // Función para actualizar el ícono del botón de mute
    function updateMuteButton(button, volume) {
        const icon = button.querySelector('i');
        if (volume === 0) {
            icon.className = 'fas fa-volume-mute';
            button.classList.add('muted');
        } else if (volume < 50) {
            icon.className = 'fas fa-volume-down';
            button.classList.remove('muted');
        } else {
            icon.className = 'fas fa-volume-up';
            button.classList.remove('muted');
        }
    }

    // Función para animar el botón
    function animateButton(button) {
        button.classList.add('animating');
        setTimeout(() => button.classList.remove('animating'), 300);
    }

    // Manejador para el botón de mute de música
    musicMuteBtn.addEventListener('click', () => {
        const currentVolume = parseInt(musicVolume.value);
        if (currentVolume === 0) {
            musicVolume.value = prevMusicVolume;
            updateMusicVolume(prevMusicVolume);
        } else {
            prevMusicVolume = currentVolume;
            musicVolume.value = 0;
            updateMusicVolume(0);
        }
        animateButton(musicMuteBtn);
        updateMuteButton(musicMuteBtn, parseInt(musicVolume.value));
    });

    // Manejador para el botón de mute de efectos
    effectsMuteBtn.addEventListener('click', () => {
        const currentVolume = parseInt(effectsVolume.value);
        if (currentVolume === 0) {
            effectsVolume.value = prevEffectsVolume;
            updateEffectsVolume(prevEffectsVolume);
        } else {
            prevEffectsVolume = currentVolume;
            effectsVolume.value = 0;
            updateEffectsVolume(0);
        }
        animateButton(effectsMuteBtn);
        updateMuteButton(effectsMuteBtn, parseInt(effectsVolume.value));
    });

    // Actualizar los botones cuando se cambia el volumen
    musicVolume.addEventListener('input', () => {
        const volume = parseInt(musicVolume.value);
        updateMusicVolume(volume);
        updateMuteButton(musicMuteBtn, volume);
    });

    effectsVolume.addEventListener('input', () => {
        const volume = parseInt(effectsVolume.value);
        updateEffectsVolume(volume);
        updateMuteButton(effectsMuteBtn, volume);
    });

    // Inicializar los estados de los botones
    updateMuteButton(musicMuteBtn, parseInt(musicVolume.value));
    updateMuteButton(effectsMuteBtn, parseInt(effectsVolume.value));
}

// Configurar pantalla de bienvenida
function setupWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const playButton = document.getElementById('play-button');
    
    // Si ya tenemos permiso, ocultar la pantalla de bienvenida
    if (audioConfig.hasPermission) {
        welcomeScreen.classList.add('hidden');
        return;
    }
    
    playButton.addEventListener('click', () => {
        audioConfig.hasPermission = true;
        saveAudioConfig();
        welcomeScreen.classList.add('hidden');
        initBackgroundMusic();
    });
}

// Producción y costos
const getProductionRate = (product) => {
    const baseRate = gameState.products[product].baseProduction * gameState.products[product].level;
    return baseRate;
};

const getEmployeeCost = (product) => {
    const baseCost = EMPLOYEE_BASE_COSTS[product];
    return Math.floor(baseCost * Math.pow(1.2, gameState.products[product].employees));
};

const getProductUpgradeCost = (product) => {
    const baseCost = PRODUCT_BASE_COSTS[product];
    return Math.floor(baseCost * Math.pow(1.15, gameState.products[product].level));
};

// Optimización: Cache de elementos DOM
const domElements = {};
const getDOMElement = (id) => {
    if (!domElements[id]) {
        domElements[id] = document.getElementById(id);
    }
    return domElements[id];
};

// Optimización: Throttle para actualizaciones visuales
let lastUpdateTime = 0;
const UPDATE_THRESHOLD = 1000 / 60; // 60 FPS máximo

function throttledUpdate(fn) {
    const now = performance.now();
    if (now - lastUpdateTime >= UPDATE_THRESHOLD) {
        lastUpdateTime = now;
        fn();
    }
}

// Navegación
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.dataset.section;
            
            // Actualizar botones
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Actualizar secciones
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// Configuración de estilos visuales
const VISUAL_STYLES = {
    1: { name: 'visualStyle1', icon: 'fa-store' },
    2: { name: 'visualStyle2', icon: 'fa-store-alt' },
    3: { name: 'visualStyle3', icon: 'fa-shopping-basket' },
    4: { name: 'visualStyle4', icon: 'fa-shopping-cart' },
    5: { name: 'visualStyle5', icon: 'fa-star' },
    6: { name: 'visualStyle6', icon: 'fa-gem' },
    7: { name: 'visualStyle7', icon: 'fa-microchip' },
    8: { name: 'visualStyle8', icon: 'fa-hat-wizard' },
    9: { name: 'visualStyle9', icon: 'fa-rainbow' },
    10: { name: 'visualStyle10', icon: 'fa-crown' }
};

// Función para actualizar la visualización de los estilos
function updateStylesDisplay() {
    const styleGrid = document.getElementById('style-grid');
    if (!styleGrid) return;

    styleGrid.innerHTML = '';
    const unlockedProducts = Object.values(gameState.products).filter(p => p.unlocked).length;

    for (let i = 1; i <= 10; i++) {
        const style = VISUAL_STYLES[i];
        const isUnlocked = i <= unlockedProducts;
        const isActive = gameState.selectedStyle === i;

        const styleOption = document.createElement('div');
        styleOption.className = `style-option ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}`;
        
        if (isUnlocked) {
            styleOption.onclick = () => changeVisualStyle(i);
        }

        styleOption.innerHTML = `
            <div class="style-icon">
                <i class="fas ${style.icon}"></i>
            </div>
            <div class="style-name">${t(style.name)}</div>
        `;

        styleGrid.appendChild(styleOption);
    }
}

// Función para cambiar el estilo visual
function changeVisualStyle(level) {
    gameState.selectedStyle = level;
    document.body.dataset.level = level;
    saveGame();
    updateStylesDisplay();
}

// Actualización visual del nivel (modificada para forzar el cambio inmediato)
function updateVisualLevel() {
    const totalProducts = Object.values(gameState.products).filter(p => p.unlocked).length;
    const newLevel = totalProducts;
    
    if (newLevel !== gameState.visualLevel) {
        gameState.visualLevel = newLevel;
        // Forzar que el estilo visual sea el del nuevo puesto desbloqueado
        gameState.selectedStyle = newLevel;
        document.body.dataset.level = newLevel;
        
        // Efecto de transición
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.5s;
            z-index: 1000;
        `;
        document.body.appendChild(overlay);
        
        requestAnimationFrame(() => {
            overlay.style.opacity = '0.5';
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 500);
            }, 500);
        });
        
        updateStylesDisplay();
        saveGame();
    }
}

// Actualización de display optimizada
function updateDisplay() {
    // Update money display with smooth animation
    const moneyDisplay = document.getElementById('money');
    if (moneyDisplay) moneyDisplay.textContent = gameState.money.toFixed(2);
    
    // Calculate and update income per second
    let totalIncomePerSecond = 0;
    for (const productId in gameState.products) {
        const product = gameState.products[productId];
        if (product.unlocked) {
            const productionRate = getProductionRate(productId);
            totalIncomePerSecond += (product.employees * product.price * productionRate);
            
            // Actualizar todos los elementos del producto
            const productElement = document.getElementById(productId);
            if (productElement) {
                // Actualizar nivel
                const levelElement = productElement.querySelector('.level');
                if (levelElement) levelElement.textContent = `${t('level')}: ${product.level}`;
                
                // Actualizar precio
                const priceElement = document.getElementById(`${productId}-price`);
                if (priceElement) priceElement.textContent = (product.price * product.level).toFixed(2);
                
                // Actualizar ventas
                const salesElement = document.getElementById(`${productId}-sales`);
                if (salesElement) salesElement.textContent = Math.floor(product.sales).toLocaleString();
                
                // Actualizar empleados
                const employeesElement = document.getElementById(`${productId}-employees`);
                if (employeesElement) employeesElement.textContent = product.employees;
                
                // Actualizar costo de empleados
                const hireCostElement = document.getElementById(`${productId}-hire-cost`);
                if (hireCostElement) hireCostElement.textContent = getEmployeeCost(productId);
                
                // Actualizar botón de venta
                const sellButton = productElement.querySelector('.sell-btn');
                if (sellButton) {
                    const buttonInfo = sellButton.querySelector('.button-info');
                    sellButton.innerHTML = `
                        <i class="fas fa-cash-register"></i>
                        ${t('sell')}
                        <span class="button-info">+$${(product.price * product.level).toFixed(1)}</span>
                    `;
                }
                
                // Actualizar botón de contratar
                const hireButton = productElement.querySelector('.hire-btn');
                if (hireButton) {
                    const buttonInfo = hireButton.querySelector('.button-info');
                    hireButton.innerHTML = `
                        <i class="fas fa-user-plus"></i>
                        ${t('hire')}
                        <span class="button-info">+$${((product.price * product.level) / EMPLOYEE_CYCLE_TIME).toFixed(1)}${t('perSecond')}</span>
                    `;
                }
                
                // Actualizar botón de mejora
                const upgradeButton = productElement.querySelector('.upgrade-btn');
                if (upgradeButton) {
                    upgradeButton.innerHTML = `
                        <i class="fas fa-arrow-up"></i>
                        ${t('upgrade')} ($${getProductUpgradeCost(productId)})
                    `;
                }
                
                // Actualizar barra de progreso
                const progressElement = document.getElementById(`${productId}-progress`);
                if (progressElement) {
                    progressElement.style.width = `${product.progress * 100}%`;
                }
            }
        }
    }
    
    // Update MPS (Money Per Second) display
    const mpsDisplay = document.getElementById('mps');
    if (mpsDisplay) mpsDisplay.textContent = totalIncomePerSecond.toFixed(2);
    
    // Update statistics
    const incomeStat = document.getElementById('income-stat');
    if (incomeStat) incomeStat.textContent = totalIncomePerSecond.toFixed(2);
    
    const totalSalesDisplay = document.getElementById('total-sales');
    if (totalSalesDisplay) totalSalesDisplay.textContent = Math.floor(gameState.totalSales).toLocaleString();
    
    const totalEarningsDisplay = document.getElementById('total-earnings');
    if (totalEarningsDisplay) totalEarningsDisplay.textContent = gameState.totalEarnings.toFixed(2);
    
    // Recursos principales
    const reputationElement = document.getElementById('reputation');
    if (reputationElement) {
        reputationElement.textContent = Math.floor(gameState.reputation).toLocaleString();
    }
    const prestigeElement = document.getElementById('prestige-level');
    if (prestigeElement) {
        prestigeElement.textContent = gameState.prestigeLevel;
    }
}

// Venta de productos
function sellProduct(product, event) {
    const now = Date.now();
    if (now - gameState.products[product].lastSellTime < SELL_COOLDOWN) return;
    
    gameState.products[product].lastSellTime = now;
    gameState.products[product].sales++;
    gameState.totalSales++; // Increment total sales counter
    const earnings = gameState.products[product].price * gameState.products[product].level;
    gameState.money += earnings;
    gameState.totalEarnings += earnings; // Add to total earnings
    
    if (event) {
        const rect = event.target.getBoundingClientRect();
        createParticle(rect.left + rect.width / 2, rect.top + rect.height / 2, '+$' + earnings.toFixed(2));
    }
    
    playSound('click');
    updateDisplay();
}

// Contratación de empleados
function hireEmployee(product) {
    const cost = getEmployeeCost(product);
    if (gameState.money >= cost) {
        gameState.money -= cost;
        gameState.products[product].employees++;
        gameState.reputation += 1;
        playSound('compra');
        
        // Actualizar la visualización completa del producto
        const productElement = document.getElementById(product);
        if (productElement) {
            const productData = gameState.products[product];
            const productName = t(product + 'Stand');
            productElement.innerHTML = `
                <div class="product-header">
                    <div class="product-title">
                        <h3>${productName}</h3>
                        <div class="level">${t('level')}: ${productData.level}</div>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="${product}-progress"></div>
                </div>
                <div class="product-stats">
                    <span class="price">${t('price')}: $<span id="${product}-price">${(productData.price * productData.level).toFixed(2)}</span></span>
                    <span class="sales">${t('sold')}: <span id="${product}-sales">${Math.floor(productData.sales).toLocaleString()}</span></span>
                </div>
                <div class="product-actions">
                    <button class="sell-btn" onclick="sellProduct('${product}', event)">
                        <i class="fas fa-cash-register"></i>
                        ${t('sell')}
                        <span class="button-info">+$${(productData.price * productData.level).toFixed(1)}</span>
                    </button>
                    <button class="hire-btn" onclick="hireEmployee('${product}')">
                        <i class="fas fa-user-plus"></i>
                        ${t('hire')}
                        <span class="button-info">+$${((productData.price * productData.level) / EMPLOYEE_CYCLE_TIME).toFixed(1)}${t('perSecond')}</span>
                    </button>
                </div>
                <div class="employees-info">
                    <div class="current-employees">
                        <i class="fas fa-users"></i> ${t('employees')}: <span id="${product}-employees">${productData.employees}</span>
                    </div>
                    <div class="hire-cost">
                        +1 ${t('employee')} <i class="fas fa-user"></i>: $<span id="${product}-hire-cost">${getEmployeeCost(product)}</span>
                    </div>
                </div>
                <button class="upgrade-btn" onclick="upgradeProduct('${product}')">
                    <i class="fas fa-arrow-up"></i>
                    ${t('upgrade')} ($${getProductUpgradeCost(product)})
                </button>
            `;
        }
        
        updateDisplay();
        saveGame(); // Guardar después de contratar
    }
}

// Mejora de productos
function upgradeProduct(product) {
    const cost = getProductUpgradeCost(product);
    if (gameState.money >= cost) {
        gameState.money -= cost;
        gameState.products[product].level++;
        gameState.reputation += 2;
        playSound('compra');
        
        // Actualizar la visualización del producto
        const productElement = document.getElementById(product);
        if (productElement) {
            const productData = gameState.products[product];
            const productName = t(product + 'Stand');
            productElement.innerHTML = `
                <div class="product-header">
                    <div class="product-title">
                        <h3>${productName}</h3>
                        <div class="level">${t('level')}: ${productData.level}</div>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="${product}-progress"></div>
                </div>
                <div class="product-stats">
                    <span class="price">${t('price')}: $<span id="${product}-price">${(productData.price * productData.level).toFixed(2)}</span></span>
                    <span class="sales">${t('sold')}: <span id="${product}-sales">${Math.floor(productData.sales).toLocaleString()}</span></span>
                </div>
                <div class="product-actions">
                    <button class="sell-btn" onclick="sellProduct('${product}', event)">
                        <i class="fas fa-cash-register"></i>
                        ${t('sell')}
                        <span class="button-info">+$${(productData.price * productData.level).toFixed(1)}</span>
                    </button>
                    <button class="hire-btn" onclick="hireEmployee('${product}')">
                        <i class="fas fa-user-plus"></i>
                        ${t('hire')}
                        <span class="button-info">+$${((productData.price * productData.level) / EMPLOYEE_CYCLE_TIME).toFixed(1)}${t('perSecond')}</span>
                    </button>
                </div>
                <div class="employees-info">
                    <div class="current-employees">
                        <i class="fas fa-users"></i> ${t('employees')}: <span id="${product}-employees">${productData.employees}</span>
                    </div>
                    <div class="hire-cost">
                        +1 ${t('employee')} <i class="fas fa-user"></i>: $<span id="${product}-hire-cost">${getEmployeeCost(product)}</span>
                    </div>
                </div>
                <button class="upgrade-btn" onclick="upgradeProduct('${product}')">
                    <i class="fas fa-arrow-up"></i>
                    ${t('upgrade')} ($${getProductUpgradeCost(product)})
                </button>
            `;
        }
        
        // Verificar desbloqueos
        checkUnlocks();
        updateDisplay();
        saveGame(); // Guardar después de mejorar
    }
}

// Reproducir sonido
function playSound(sound) {
    try {
        if (AUDIO_SOURCES[sound]) {
            const audio = createAudio(AUDIO_SOURCES[sound]);
            audio.play().catch(error => {
                console.log("Error reproduciendo audio:", error);
            });
        }
    } catch (error) {
        console.log("Error en playSound:", error);
    }
}

// Verificar desbloqueos disponibles
function checkUnlocks() {
    for (const [product, data] of Object.entries(gameState.products)) {
        if (!data.unlocked && data.requiredLevel) {
            const requiredProduct = gameState.products[data.requiredLevel.product];
            const productElement = document.getElementById(product);
            if (productElement) {
                const canUnlock = requiredProduct.level >= data.requiredLevel.level;
                productElement.classList.toggle('can-unlock', canUnlock);
                
                // Actualizar el contenido del producto si se puede desbloquear
                if (canUnlock) {
                    const productName = t(product + 'Stand');
                    const requiredProductName = t(data.requiredLevel.product + 'Stand');
                    productElement.innerHTML = `
                        <div class="product-header">
                            <div class="product-title">
                                <h3>${productName}</h3>
                                <div class="locked-status">(${t('locked')})</div>
                            </div>
                        </div>
                        <div class="unlock-requirements">
                            ${t('requires')} ${requiredProductName} ${t('level')} ${data.requiredLevel.level}
                        </div>
                        <button class="unlock-btn available" onclick="unlockProduct('${product}')">
                            <i class="fas fa-lock-open"></i>
                            ${t('unlock')} ($${PRODUCT_BASE_COSTS[product]})
                        </button>
                    `;
                } else {
                    const productName = t(product + 'Stand');
                    const requiredProductName = t(data.requiredLevel.product + 'Stand');
                    productElement.innerHTML = `
                        <div class="product-header">
                            <div class="product-title">
                                <h3>${productName}</h3>
                                <div class="locked-status">(${t('locked')})</div>
                            </div>
                        </div>
                        <div class="unlock-requirements">
                            ${t('requires')} ${requiredProductName} ${t('level')} ${data.requiredLevel.level}
                        </div>
                        <button class="unlock-btn" onclick="unlockProduct('${product}')" disabled>
                            <i class="fas fa-lock-open"></i>
                            ${t('unlock')} ($${PRODUCT_BASE_COSTS[product]})
                        </button>
                    `;
                }
            }
        }
    }
}

// Desbloqueo de productos
function unlockProduct(product) {
    const productData = gameState.products[product];
    const requiredProduct = gameState.products[productData.requiredLevel.product];
    
    // Verificar si cumple los requisitos
    if (requiredProduct.level >= productData.requiredLevel.level) {
        const cost = PRODUCT_BASE_COSTS[product];
        if (gameState.money >= cost) {
            gameState.money -= cost;
            productData.unlocked = true;
            productData.level = 1;
            gameState.reputation += 5;
            playSound('compra');
            
            // Actualizar visualización del producto desbloqueado
            const productElement = document.getElementById(product);
            if (productElement) {
                productElement.classList.remove('locked');
                const productName = t(product + 'Stand');
                productElement.innerHTML = `
                    <div class="product-header">
                        <div class="product-title">
                            <h3>${productName}</h3>
                            <div class="level">${t('level')}: ${productData.level}</div>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="${product}-progress"></div>
                    </div>
                    <div class="product-stats">
                        <span class="price">${t('price')}: $<span id="${product}-price">${(productData.price * productData.level).toFixed(2)}</span></span>
                        <span class="sales">${t('sold')}: <span id="${product}-sales">${Math.floor(productData.sales).toLocaleString()}</span></span>
                    </div>
                    <div class="product-actions">
                        <button class="sell-btn" onclick="sellProduct('${product}', event)">
                            <i class="fas fa-cash-register"></i>
                            ${t('sell')}
                            <span class="button-info">+$${(productData.price * productData.level).toFixed(1)}</span>
                        </button>
                        <button class="hire-btn" onclick="hireEmployee('${product}')">
                            <i class="fas fa-user-plus"></i>
                            ${t('hire')}
                            <span class="button-info">+$${((productData.price * productData.level) / EMPLOYEE_CYCLE_TIME).toFixed(1)}${t('perSecond')}</span>
                        </button>
                    </div>
                    <div class="employees-info">
                        <div class="current-employees">
                            <i class="fas fa-users"></i> ${t('employees')}: <span id="${product}-employees">${productData.employees}</span>
                        </div>
                        <div class="hire-cost">
                            +1 ${t('employee')} <i class="fas fa-user"></i>: $<span id="${product}-hire-cost">${getEmployeeCost(product)}</span>
                        </div>
                    </div>
                    <button class="upgrade-btn" onclick="upgradeProduct('${product}')">
                        <i class="fas fa-arrow-up"></i>
                        ${t('upgrade')} ($${getProductUpgradeCost(product)})
                    </button>
                `;
            }
            
            updateVisualLevel();
            updateDisplay();
            saveGame();
        }
    }
}

// Game loop optimizado
let lastFrameTime = performance.now();
let accumulator = 0;
const FIXED_TIMESTEP = 1000 / 60; // 60 FPS

function gameLoop() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    accumulator += deltaTime;

    while (accumulator >= FIXED_TIMESTEP) {
        updateGame(FIXED_TIMESTEP / 1000); // Convertir a segundos
        accumulator -= FIXED_TIMESTEP;
    }

    requestAnimationFrame(gameLoop);
}

function updateGame(delta) {
    const secondsElapsed = delta;
    
    // Update each product's progress and handle automatic sales
    for (const productId in gameState.products) {
        const product = gameState.products[productId];
        if (product.unlocked && product.employees > 0) {
            // Actualizar el progreso
            product.progress += (secondsElapsed) / EMPLOYEE_CYCLE_TIME;
            
            // Cuando el progreso llega a 1 o más, realizar ventas
            while (product.progress >= 1) {
                product.progress -= 1;
                // Multiplicar las ventas y ganancias por el número de empleados
                const salesAmount = product.employees;
                product.sales += salesAmount;
                gameState.totalSales += salesAmount;
                const earnings = (product.price * product.level) * salesAmount;
                gameState.money += earnings;
                gameState.totalEarnings += earnings;
            }
            
            // Actualizar la barra de progreso
            const progressElement = document.getElementById(`${productId}-progress`);
            if (progressElement) {
                progressElement.style.width = `${product.progress * 100}%`;
            }
        }
    }
    
    // Update display
    updateDisplay();
}

// Optimización: Limitar partículas
const MAX_PARTICLES = 20;
let activeParticles = 0;

function createParticle(x, y, text) {
    if (activeParticles >= MAX_PARTICLES) return;
    
    activeParticles++;
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.innerHTML = text;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
        activeParticles--;
    }, 2000);
}

// Función para formatear el tiempo jugado
function formatPlayTime(seconds) {
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= (24 * 3600);
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    
    return `${days}D ${hours}H ${minutes}M ${Math.floor(seconds)}S`;
}

// Actualizar tiempo jugado
function updatePlayTime() {
    gameState.playTime++;
    document.getElementById('play-time').textContent = formatPlayTime(gameState.playTime);
}

// ===============================
// Función para calcular ganancias offline y mostrar la información debajo del mensaje de bienvenida
function loadOfflineEarnings() {
    const now = Date.now();
    const offlineSeconds = (now - gameState.lastUpdate) / 1000; // tiempo offline en segundos
    if (offlineSeconds > 0) {
        let totalOfflineEarnings = 0;
        // Recorremos cada producto para calcular sus ganancias offline
        for (const productId in gameState.products) {
            const product = gameState.products[productId];
            if (product.unlocked && product.employees > 0) {
                // Ganancia por segundo para este producto (empleados * precio * nivel)
                const earningsPerSecond = product.employees * product.price * product.level;
                totalOfflineEarnings += earningsPerSecond * offlineSeconds;
            }
        }
        gameState.money += totalOfflineEarnings;
        gameState.totalEarnings += totalOfflineEarnings;
        gameState.playTime += offlineSeconds;
        console.log(`Ganancias offline: $${totalOfflineEarnings.toFixed(2)} en ${offlineSeconds.toFixed(2)} segundos.`);
        
        // Utilizamos la clave de traducción para el mensaje offline y reemplazamos los placeholders
        let offlineMessage = t('offlineMessage')
            .replace("{time}", formatPlayTime(offlineSeconds))
            .replace("{money}", totalOfflineEarnings.toFixed(2));
        
        // Actualizar la información en pantalla debajo del mensaje de bienvenida
        let welcomeText = document.getElementById('welcome-text');
        if (welcomeText) {
            let offlineInfo = document.getElementById('offline-info');
            if (!offlineInfo) {
                offlineInfo = document.createElement('div');
                offlineInfo.id = 'offline-info';
                welcomeText.parentNode.insertBefore(offlineInfo, welcomeText.nextSibling);
            }
            offlineInfo.textContent = offlineMessage;
        }
    }
    // Actualizamos lastUpdate para el próximo cálculo
    gameState.lastUpdate = now;
}
// ===============================

// Guardado y carga
function saveGame() {
    try {
        localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(gameState));
    } catch (error) {
        console.log("Error guardando el juego:", error);
    }
}

function loadGame() {
    try {
        const savedGame = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
        if (savedGame) {
            const loadedState = JSON.parse(savedGame);
            loadedState.playTime = loadedState.playTime || 0;
            loadedState.selectedStyle = loadedState.selectedStyle || 1;
            Object.assign(gameState, loadedState);
            
            document.getElementById('play-time').textContent = formatPlayTime(gameState.playTime);
            
            // Actualizar el nivel visual y el estilo seleccionado
            const totalProducts = Object.values(gameState.products).filter(p => p.unlocked).length;
            gameState.visualLevel = totalProducts;
            document.body.dataset.level = gameState.selectedStyle;

            for (const [product, data] of Object.entries(gameState.products)) {
                if (data.unlocked) {
                    const productElement = document.getElementById(product);
                    if (productElement) {
                        productElement.classList.remove('locked');
                        const productName = t(product + 'Stand');
                        productElement.innerHTML = `
                            <div class="product-header">
                                <div class="product-title">
                                    <h3>${productName}</h3>
                                    <div class="level">${t('level')}: ${data.level}</div>
                                </div>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" id="${product}-progress"></div>
                            </div>
                            <div class="product-stats">
                                <span class="price">${t('price')}: $<span id="${product}-price">${(data.price * data.level).toFixed(2)}</span></span>
                                <span class="sales">${t('sold')}: <span id="${product}-sales">${Math.floor(data.sales).toLocaleString()}</span></span>
                            </div>
                            <div class="product-actions">
                                <button class="sell-btn" onclick="sellProduct('${product}', event)">
                                    <i class="fas fa-cash-register"></i>
                                    ${t('sell')}
                                    <span class="button-info">+$${(data.price * data.level).toFixed(1)}</span>
                                </button>
                                <button class="hire-btn" onclick="hireEmployee('${product}')">
                                    <i class="fas fa-user-plus"></i>
                                    ${t('hire')}
                                    <span class="button-info">+$${((data.price * data.level) / EMPLOYEE_CYCLE_TIME).toFixed(1)}${t('perSecond')}</span>
                                </button>
                            </div>
                            <div class="employees-info">
                                <div class="current-employees">
                                    <i class="fas fa-users"></i> ${t('employees')}: <span id="${product}-employees">${data.employees}</span>
                                </div>
                                <div class="hire-cost">
                                    +1 ${t('employee')} <i class="fas fa-user"></i>: $<span id="${product}-hire-cost">${getEmployeeCost(product)}</span>
                                </div>
                            </div>
                            <button class="upgrade-btn" onclick="upgradeProduct('${product}')">
                                <i class="fas fa-arrow-up"></i>
                                ${t('upgrade')} ($${getProductUpgradeCost(product)})
                            </button>
                        `;
                    }
                } else {
                    const productElement = document.getElementById(product);
                    if (productElement) {
                        const productName = t(product + 'Stand');
                        productElement.innerHTML = `
                            <div class="product-header">
                                <div class="product-title">
                                    <h3>${productName}</h3>
                                    <div class="locked-status">(${t('locked')})</div>
                                </div>
                            </div>
                            <div class="unlock-requirements">
                                ${t('requires')} ${t(data.requiredLevel.product + 'Stand')} ${t('level')} ${data.requiredLevel.level}
                            </div>
                            <button class="unlock-btn" onclick="unlockProduct('${product}')" disabled>
                                <i class="fas fa-lock-open"></i>
                                ${t('unlock')} ($${PRODUCT_BASE_COSTS[product]})
                            </button>
                        `;
                    }
                }
            }
        }
    } catch (error) {
        console.log("Error cargando el juego:", error);
    }
    
    // Calcular y aplicar las ganancias offline antes de actualizar la interfaz
    loadOfflineEarnings();
    
    updateDisplay();
    updateStylesDisplay();
    checkUnlocks();
}

// Inicialización
function init() {
    // Configurar el selector de idioma
    const languageSelect = document.getElementById('language-select');
    languageSelect.value = currentLanguage;
    languageSelect.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });

    loadAudioConfig();
    initBackgroundMusic();
    setupAudioControls();
    setupNavigation();
    loadGame();
    updateAllText();
    updateStylesDisplay();
    requestAnimationFrame(gameLoop);
    setInterval(saveGame, SAVE_INTERVAL);
    setInterval(updatePlayTime, 1000);
    checkUnlocks();

    // Configurar el selector de calidad gráfica
    const graphicsSelect = document.getElementById('graphics-quality');
    if (graphicsSelect) {
        graphicsSelect.addEventListener('change', (e) => {
            updateGraphicsQuality(e.target.value);
        });
    }

    loadGraphicsSettings();
}

// Eventos
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') sellProduct('burger', null);
});

// Asegurarse de llamar a initAudioControls después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    initAudioControls();
    init();
});

function updateMusicVolume(value) {
    const normalizedValue = value / 100;
    audioConfig.musicVolume = normalizedValue;
    document.getElementById('music-volume-value').textContent = `${value}%`;
    document.getElementById('background-music').volume = normalizedValue;
    saveAudioConfig();
}

function updateEffectsVolume(value) {
    const normalizedValue = value / 100;
    audioConfig.effectsVolume = normalizedValue;
    document.getElementById('effects-volume-value').textContent = `${value}%`;
    saveAudioConfig();
}

function initAudioControls() {
    
}

// Función para actualizar la calidad gráfica
function updateGraphicsQuality(quality) {
    document.body.dataset.graphics = quality;
    localStorage.setItem(STORAGE_KEYS.GRAPHICS_QUALITY, quality);
    
    // Actualizar el selector
    const graphicsSelect = document.getElementById('graphics-quality');
    if (graphicsSelect) {
        graphicsSelect.value = quality;
    }

    // Aplicar cambios de calidad gráfica
    const root = document.documentElement;
    switch (quality) {
        case 'low':
            // Desactivar todas las animaciones y efectos
            root.style.setProperty('--shadow', 'none');
            root.style.setProperty('--card-background', 'rgba(0, 0, 0, 0.2)');
            document.body.classList.add('low-graphics');
            document.body.classList.remove('medium-graphics', 'high-graphics');
            // Desactivar partículas
            const particles = document.getElementById('particles');
            if (particles) particles.style.display = 'none';
            break;
        case 'medium':
            // Efectos y animaciones moderados
            root.style.setProperty('--shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
            root.style.setProperty('--card-background', 'rgba(255, 255, 255, 0.1)');
            document.body.classList.add('medium-graphics');
            document.body.classList.remove('low-graphics', 'high-graphics');
            // Reducir partículas
            if (particles) particles.style.display = 'block';
            break;
        case 'high':
            // Todos los efectos activados
            root.style.setProperty('--shadow', '0 8px 32px rgba(0, 0, 0, 0.3)');
            root.style.setProperty('--card-background', 'rgba(255, 255, 255, 0.15)');
            document.body.classList.add('high-graphics');
            document.body.classList.remove('low-graphics', 'medium-graphics');
            // Activar partículas
            if (particles) particles.style.display = 'block';
            break;
    }
}

// Función para cargar la configuración gráfica
function loadGraphicsSettings() {
    const savedQuality = localStorage.getItem(STORAGE_KEYS.GRAPHICS_QUALITY) || 'high';
    updateGraphicsQuality(savedQuality);
}

// Al cerrar la página, guardar el último timestamp en gameState.lastUpdate
window.addEventListener('beforeunload', function() {
    gameState.lastUpdate = Date.now();
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(gameState));
});
