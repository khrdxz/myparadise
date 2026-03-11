    // ==================== CURSOR ====================
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    
    (function animCursor() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        dot.style.left = mx + 'px'; dot.style.top = my + 'px';
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        requestAnimationFrame(animCursor);
    })();

    document.addEventListener('mousedown', () => { dot.style.transform = 'translate(-50%,-50%) scale(1.8)'; ring.style.transform = 'translate(-50%,-50%) scale(0.6)'; });
    document.addEventListener('mouseup', () => { dot.style.transform = ''; ring.style.transform = ''; });

    // hover effect on interactive elements
    document.querySelectorAll('a, button, .bg-card, input').forEach(el => {
        el.addEventListener('mouseenter', () => ring.style.transform = 'translate(-50%,-50%) scale(1.6)');
        el.addEventListener('mouseleave', () => ring.style.transform = '');
    });

    // ==================== INTRO ====================
    setTimeout(() => document.getElementById('introScreen').classList.add('hidden'), 3200);

    // ==================== CLOCK ====================
    function updateClock() {
        const now = new Date();
        document.getElementById('clockHours').textContent = String(now.getHours()).padStart(2,'0');
        document.getElementById('clockMins').textContent = String(now.getMinutes()).padStart(2,'0');
    }
    setInterval(updateClock, 1000); updateClock();

    // ==================== HEADER SCROLL ====================
    window.addEventListener('scroll', () => {
        document.getElementById('header').classList.toggle('scrolled', window.scrollY > 60);
    });

    // ==================== PARTICLES ====================
    const pc = document.getElementById('particles');
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.classList.add('petal');
        p.style.cssText = `left:${Math.random()*100}%;animation-delay:${Math.random()*12}s;animation-duration:${18+Math.random()*12}s;width:${3+Math.random()*4}px;height:${3+Math.random()*4}px;`;
        pc.appendChild(p);
    }

    // ==================== PARALLAX ====================
    let cx = 50, cy = 50, tx = 50, ty = 50;
    document.addEventListener('mousemove', e => {
        tx = 50 - (e.clientX / window.innerWidth) * 8;
        ty = 50 - (e.clientY / window.innerHeight) * 8;
    });
    (function parallax() {
        cx += (tx - cx) * 0.04; cy += (ty - cy) * 0.04;
        document.getElementById('bgImage').style.objectPosition = `${cx}% ${cy}%`;
        requestAnimationFrame(parallax);
    })();

    // ==================== WALLPAPER BTN ====================
    const wb = document.getElementById('wallpaperBtn');
    wb.addEventListener('mouseenter', () => document.body.classList.add('wallpaper-mode'));
    wb.addEventListener('mouseleave', () => document.body.classList.remove('wallpaper-mode'));

    // ==================== BG SWITCHER ====================
    const bgCards = document.querySelectorAll('.bg-card');
    bgCards.forEach(card => {
        card.addEventListener('click', () => {
            bgCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const img = document.getElementById('bgImage');
            img.style.opacity = '0.3';
            setTimeout(() => {
                img.src = card.dataset.bg;
                img.style.opacity = '1';
            }, 350);
        });
    });

    // ==================== SCROLL REVEAL ====================
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // ==================== MUSIC PLAYER ====================
    const audio = document.getElementById('audioPlayer');
    const ppBtn = document.getElementById('playPauseBtn');
    const prevB = document.getElementById('prevBtn');
    const nextB = document.getElementById('nextBtn');
    const pFill = document.getElementById('progressFill');
    const pBar = document.getElementById('progressBar');
    const curT = document.getElementById('currentTime');
    const durEl = document.getElementById('duration');
    const volSl = document.getElementById('volumeSlider');
    const volIc = document.getElementById('volumeIcon');
    const artEl = document.getElementById('albumArt');

    document.getElementById('musicToggle').addEventListener('click', () => {
        document.getElementById('playerPanel').classList.toggle('open');
    });

    const playlist = [
        { title: "Promise — Album Bewitched", artist: "Laufey", src: "music/Promise.mp3", cover: "music/Promise.png" },
        { title: "青い、濃い、橙色の日", artist: "MASS OF THE FERMENTING DREGS", src: "music/青い、濃い、橙色の日.mp3", cover: "music/AOI KOI DAIDARO.jpg" }
    ];

    let idx = 0;
    const fmt = s => isNaN(s) ? '0:00' : `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;

    function loadSong(i) {
        const s = playlist[i];
        audio.src = s.src;
        document.getElementById('songTitle').textContent = s.title;
        document.getElementById('songArtist').textContent = s.artist;
        artEl.src = s.cover;
        audio.addEventListener('loadedmetadata', () => durEl.textContent = fmt(audio.duration), { once: true });
    }

    ppBtn.addEventListener('click', () => {
        if (audio.paused) { audio.play(); ppBtn.textContent = '⏸'; artEl.classList.add('spinning'); }
        else { audio.pause(); ppBtn.textContent = '▶'; artEl.classList.remove('spinning'); }
    });

    prevB.addEventListener('click', () => { idx = (idx - 1 + playlist.length) % playlist.length; loadSong(idx); audio.play(); ppBtn.textContent = '⏸'; artEl.classList.add('spinning'); });
    nextB.addEventListener('click', () => { idx = (idx + 1) % playlist.length; loadSong(idx); audio.play(); ppBtn.textContent = '⏸'; artEl.classList.add('spinning'); });

    audio.addEventListener('timeupdate', () => {
        pFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
        curT.textContent = fmt(audio.currentTime);
    });

    pBar.addEventListener('click', e => {
        const r = pBar.querySelector('.progress-track').getBoundingClientRect();
        audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
    });

    volSl.addEventListener('input', e => {
        audio.volume = e.target.value / 100;
        volIc.textContent = e.target.value == 0 ? '🔇' : e.target.value < 50 ? '🔉' : '🔊';
    });

    volIc.addEventListener('click', () => {
        if (audio.volume > 0) { audio.volume = 0; volSl.value = 0; volIc.textContent = '🔇'; }
        else { audio.volume = 0.4; volSl.value = 40; volIc.textContent = '🔊'; }
    });

    audio.addEventListener('ended', () => nextB.click());

    loadSong(idx);
    audio.volume = 0.4;

    // ==================== KONAMI ====================
    const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight'];
    let ki = 0;
    document.addEventListener('keydown', e => {
        if (e.key === konami[ki]) { ki++; if (ki === konami.length) { burst(); ki = 0; } } else ki = 0;
    });

    function burst() {
        for (let i = 0; i < 40; i++) {
            const c = document.createElement('div');
            c.style.cssText = `position:fixed;left:${Math.random()*100}%;top:-10px;width:6px;height:6px;background:hsl(${Math.random()*360},80%,65%);border-radius:50%;z-index:9999;animation:floatPetal linear ${2+Math.random()*2}s forwards;pointer-events:none;`;
            document.body.appendChild(c);
            setTimeout(() => c.remove(), 4000);
        }
    }

    console.log('%c🥀 Stressed\'s Paradise', 'color:#c9405a;font-size:18px;font-weight:bold');
    console.log('%c↑ ↑ ↓ ↓ ← → ← → — Konami Code ativado?', 'color:#b8860b;font-size:12px');
    
    
    // Hamburger menu
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        function toggleMobileMenu() {
            hamburgerBtn.classList.toggle('open');
            mobileNavOverlay.classList.toggle('open');
            document.body.style.overflow = mobileNavOverlay.classList.contains('open') ? 'hidden' : '';
        }

        function closeMobileMenu() {
            hamburgerBtn.classList.remove('open');
            mobileNavOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }

        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', toggleMobileMenu);
        }

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
