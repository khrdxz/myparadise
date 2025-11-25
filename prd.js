// ==================== WALLPAPER MODE ====================
const wallpaperBtn = document.getElementById('wallpaperBtn');

wallpaperBtn.addEventListener('mouseenter', () => {
    document.body.classList.add('wallpaper-mode');
});

wallpaperBtn.addEventListener('mouseleave', () => {
    document.body.classList.remove('wallpaper-mode');
});

// ==================== CLOCK SYSTEM ====================
const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds();
    
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    
    // Adiciona pulsação sutil a cada segundo
    if (seconds % 2 === 0) {
        document.querySelector('.clock-container').style.transform = 'translateY(-50%) scale(1.02)';
    } else {
        document.querySelector('.clock-container').style.transform = 'translateY(-50%) scale(1)';
    }
};

setInterval(updateClock, 1000);
updateClock();

// ==================== INTRO SCREEN ====================
setTimeout(() => {
    const introScreen = document.getElementById('introScreen');
    introScreen.classList.add('hidden');
}, 3500);

// ==================== CURSOR PERSONALIZADO ====================
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animação suave do cursor
const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    cursorGlow.style.left = `${mouseX}px`;
    cursorGlow.style.top = `${mouseY}px`;
    
    requestAnimationFrame(animateCursor);
};
animateCursor();

// Efeito de clique no cursor
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
});

// ==================== BACKGROUND PARALLAX ====================
let currentX = 50;
let currentY = 50;
let targetX = 50;
let targetY = 50;

document.addEventListener("mousemove", (e) => {
    targetX = 50 - (e.clientX / window.innerWidth) * 10;
    targetY = 50 - (e.clientY / window.innerHeight) * 10;
});

const smoothParallax = () => {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
    
    document.body.style.backgroundPosition = `${currentX}% ${currentY}%`;
    requestAnimationFrame(smoothParallax);
};

setTimeout(() => {
    smoothParallax();
}, 2000);

// ==================== PARTÍCULAS FLUTUANTES ====================
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
};
createParticles();

// ==================== BACKGROUND SWITCHER ====================
const bgTabs = document.querySelectorAll('.bg-tab');
const body = document.body;

// Set initial background
body.style.backgroundImage = `url('${bgTabs[0].dataset.bg}')`;

// Set tab preview images
bgTabs.forEach(tab => {
    tab.style.backgroundImage = `url('${tab.dataset.bg}')`;
});

bgTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        bgTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Efeito de transição com fade
        body.style.opacity = '0.7';
        setTimeout(() => {
            const newBg = tab.dataset.bg;
            body.style.backgroundImage = `url('${newBg}')`;
            body.style.opacity = '1';
        }, 300);
        
        // Efeito de onda ao trocar
        createRipple(tab);
    });
});

// Efeito de onda (ripple) ao clicar
const createRipple = (element) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple-effect');
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
};

// ==================== SCROLL REVEAL ====================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.intro-container, .discord-widget').forEach(el => {
    el.classList.add('reveal-element');
    observer.observe(el);
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== TYPING EFFECT NO TÍTULO ====================
const titulo = document.querySelector('.intro-titulo');
if (titulo) {
    const originalText = titulo.textContent;
    titulo.textContent = '';
    titulo.style.opacity = '1';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    setTimeout(() => {
        const typeChar = () => {
            if (charIndex < originalText.length) {
                titulo.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        };
        typeChar();
    }, 4000);
}

// ==================== EASTER EGG - KONAMI CODE ====================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

const activateEasterEgg = () => {
    // Efeito especial secreto!
    document.body.style.animation = 'rainbow 2s ease-in-out';
    
    // Cria confetes
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
};

const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
    confetti.style.animationDelay = `${Math.random() * 0.3}s`;
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3000);
};

// ==================== MENU INTERATIVO ====================
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        menuLinks.forEach(l => {
            if (l !== link) {
                l.style.opacity = '0.5';
            }
        });
    });
    
    link.addEventListener('mouseleave', () => {
        menuLinks.forEach(l => {
            l.style.opacity = '1';
        });
    });
});

// ==================== PERFORMANCE OPTIMIZATION ====================
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ==================== MUSIC PLAYER ====================
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const albumArt = document.getElementById('albumArt');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const musicPlayer = document.querySelector('.music-player');
const musicToggle = document.getElementById('musicToggle');

// Toggle Music Player
musicToggle.addEventListener('click', () => {
    musicPlayer.classList.toggle('open');
});

// Playlist - ADICIONE SUAS MÚSICAS AQUI!
const playlist = [
    {
        title: "Promise - Album Bewitched",
        artist: "Laufey",
        src: "music/Promise.mp3",
        cover: "music/Promise.png"
    },
    {
        title: "青い、濃い、橙色の日",
        artist: "MASS OF THE FERMENTING DREGS",
        src: "music/青い、濃い、橙色の日.mp3",
        cover: "music/AOI KOI DAIDARO.jpg"
    }
];

let currentSongIndex = 0;

// Carregar música
const loadSong = (index) => {
    const song = playlist[index];
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumArt.src = song.cover;
    
    // Atualizar duração quando carregar
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });
};

// Formatar tempo (segundos para minutos:segundos)
const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸';
        albumArt.classList.add('playing');
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶';
        albumArt.classList.remove('playing');
    }
});

// Música anterior
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
    albumArt.classList.add('playing');
});

// Próxima música
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
    albumArt.classList.add('playing');
});

// Atualizar barra de progresso
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
});

// Clicar na barra de progresso
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Controle de volume
volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value / 100;
    
    // Atualizar ícone
    if (e.target.value == 0) {
        volumeIcon.textContent = '🔇';
    } else if (e.target.value < 50) {
        volumeIcon.textContent = '🔉';
    } else {
        volumeIcon.textContent = '🔊';
    }
});

// Mutar/Desmutar ao clicar no ícone
volumeIcon.addEventListener('click', () => {
    if (audioPlayer.volume > 0) {
        audioPlayer.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.textContent = '🔇';
    } else {
        audioPlayer.volume = 0.7;
        volumeSlider.value = 70;
        volumeIcon.textContent = '🔊';
    }
});

// Tocar próxima música automaticamente
audioPlayer.addEventListener('ended', () => {
    nextBtn.click();
});

// Carregar primeira música
loadSong(currentSongIndex);
audioPlayer.volume = 0.4;

// ==================== MENSAGEM DE BOAS-VINDAS ====================
console.log('%c🥀 Bem-vindo ao STRESSED\'S WORLD 🥀', 'color: #af2abc; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cTente o Konami Code: ↑ ↑ ↓ ↓ ← → ← →', 'color: #EE000C; font-size: 14px;');
