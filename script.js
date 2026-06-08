'use strict';

// ============================================================
// WORD BANK — 200+ Indonesian words grouped by length
// ============================================================
const WORD_BANK = {
  4: [
    'BUKU','BOLA','BUAH','ANAK','NAMA','MEJA','KURSI','TAHU','SUSU','KAKI',
    'TALI','KAYU','BATU','EMAS','PAGI','SORE','MALAM','HUJAN','ANGIN','TANAH',
    'LAUT','SUNGAI','POHON','BUNGA','DAUN','BENIH','CAHAYA','BAYAM','KELAPA','PISANG',
    'JERUK','APEL','MANGGA','PEPAYA','BAMBU','ROTAN','GABAH','BERAS','KETAN','BUBUR',
    'NASI','LAUK','KUAH','GARAM','GULA','TEPUNG','KOPI','TEKI','DADU','BUKU',
    'KUDA','SAPI','ITIK','AYAM','BEBEK','IKAN','TIKUS','KATAK','ULAR','BURUNG',
    'PADI','SAWAH','KEBUN','HUTAN','GUNUNG','PANTAI','PULAU','KOTA','DESA','JALAN',
    'RUMAH','PINTU','ATAP','DINDING','LANTAI','SUMUR','KOLAM','KEBAB','ROTI','MADU',
    'TELUR','TOMAT','BAWANG','LOBAK','WORTEL','KANGKUNG','BAYAM','SAWI','CABE','KUBIS'
  ].filter(w => w.length === 4),
  5: [
    'PINTU','JALAN','RUMAH','MAKAN','TIDUR','PERGI','PULANG','BERDIRI','DUDUK',
    'BELAJAR','MENULIS','MEMBACA','BERLARI','BERMAIN','BERENANG','MEMANJAT','MELOMPAT',
    'BURUNG','KUMBANG','SEMUT','LALAT','NYAMUK','KUCING','ANJING','MONYET','HARIMAU',
    'GAJAH','KERBAU','DOMBA','KAMBING','RUSA','KELINCI','TUPAI','MUSANG','KIJANG',
    'MAWAR','MELATI','KAMBOJA','ANGGREK','TERATAI','KENANGA','DAHLIA','TULIP',
    'MATAHARI','BULAN','BINTANG','LANGIT','AWAN','PELANGI','PETIR','GUNTUR',
    'SEKOLAH','KANTOR','PASAR','TAMAN','STADION','MASJID','GEREJA','VIHARA',
    'PISANG','DURIAN','RAMBUTAN','MANGGIS','SALAK','PEPAYA','NANAS','SEMANGKA',
    'SUMBER','DANAU','RAWA','PANTAI','TEBING','LEMBAH','NGARAI','PUNCAK',
    'SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU','MINGGU',
    'KURSI','LEMARI','KASUR','BANTAL','SELIMUT','CERMIN','MEJA','LAMPU',
    'MERAH','HIJAU','BIRU','PUTIH','HITAM','KUNING','JINGGA','UNGU',
    'TEMAN','SAHABAT','MUSUH','GURU','MURID','DOKTER','PETANI','NELAYAN',
    'CINTA','RINDU','SEDIH','BAHAGIA','MARAH','TAKUT','MALU','BENCI',
    'ANGKA','HURUF','KATA','KALIMAT','BUKU','KERTAS','PENSIL','PENGHAPUS'
  ].filter(w => w.length === 5),
  6: [
    'SUNGAI','BANGUN','BANGGA','MANUSIA','NEGARA','BANGSA','BUDAYA','BAHASA',
    'SEKOLAH','BELAJAR','ILMUAN','DOKTER','PETANI','PELAJAR','PEMIMPIN','PEJUANG',
    'MASJID','MESJID','GEREJA','VIHARA','PURA','LANGGAR',
    'MATAHARI','BULAN','BINTANG','PELANGI','AWAN','HUJAN','PETIR','BADAI',
    'SAWIT','KEBUN','LADANG','HUTAN','GUNUNG','PANTAI','LAUTAN','DANAU',
    'GAJAH','HARIMAU','KERBAU','ULAR','BUAYA','KALONG','PENYU','LUMBA',
    'PISANG','DURIAN','NANGKA','RAMBUTAN','CEMPEDAK','LANGSAT','DUKU','MANGGIS',
    'WORTEL','LOBAK','KANGKUNG','BAYAM','KUBIS','BROKOLI','LABU','TERUNG',
    'MERAH','JINGGA','KUNING','HIJAU','BIRU','NILA','UNGU','PUTIH',
    'SENIN','SELASA','KAMIS','JUMAT','SABTU','RABU','MINGGU',
    'SATU','DUA','TIGA','EMPAT','LIMA','ENAM','TUJUH','DELAPAN',
    'RUMPUT','SEMAK','POHON','RANTING','DAHAN','AKAR','BATANG','MAHKOTA',
    'KEPALA','BADAN','TANGAN','KAKI','JARI','PERUT','DADA','PUNGGUNG',
    'PINTAR','BODOH','CANTIK','TAMPAN','JELEK','BAGUS','BURUK','INDAH',
    'CEPAT','LAMBAT','TINGGI','RENDAH','BESAR','KECIL','PANJANG','PENDEK',
    'TERBANG','BERLARI','BERENANG','MEMANJAT','MELOMPAT','MERANGKAK','MELATA',
    'MEMBACA','MENULIS','BERHITUNG','MENGGAMBAR','MEMASAK','BERNYANYI','MENARI',
    'PERCAYA','YAKIN','RAGU','MALAS','RAJIN','JUJUR','BOHONG','BERANI',
    'PULANG','PERGI','DATANG','MASUK','KELUAR','NAIK','TURUN','BELOK'
  ].filter(w => w.length === 6)
};

Object.keys(WORD_BANK).forEach(k => {
  WORD_BANK[k] = [...new Set(WORD_BANK[k].map(w => w.toUpperCase()))];
});

// ============================================================
// AUDIO ENGINE — lebih satisfying
// ============================================================
const Audio = (() => {
  let ctx = null;
  let muted = false;
  let ambientOsc = null, ambientGain = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function beep(freq, type, duration, vol = 0.15, startTime = 0) {
    if (muted) return;
    const c = getCtx();
    const t = c.currentTime + startTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain); gain.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.start(t); osc.stop(t + duration + 0.01);
  }

  function noise(duration, vol = 0.06) {
    if (muted) return;
    const c = getCtx();
    const bufSize = c.sampleRate * duration;
    const buf = c.createBuffer(1, bufSize, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    const gain = c.createGain();
    src.buffer = buf;
    src.connect(gain); gain.connect(c.destination);
    gain.gain.setValueAtTime(vol, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    src.start(); src.stop(c.currentTime + duration);
  }

  function startAmbient() {
    if (muted || ambientOsc) return;
    try {
      const c = getCtx();
      ambientOsc = c.createOscillator();
      ambientGain = c.createGain();
      const filter = c.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 200;
      ambientOsc.type = 'sawtooth';
      ambientOsc.frequency.value = 55;
      ambientGain.gain.value = 0.06; // lebih keras
      ambientOsc.connect(filter);
      filter.connect(ambientGain);
      ambientGain.connect(c.destination);
      ambientOsc.start();
      const lfo = c.createOscillator();
      const lfoGain = c.createGain();
      lfo.frequency.value = 0.3;
      lfoGain.gain.value = 0.02;
      lfo.connect(lfoGain);
      lfoGain.connect(ambientGain.gain);
      lfo.start();
    } catch(e) {}
  }

  function stopAmbient() {
    if (ambientOsc) { try { ambientOsc.stop(); } catch(e) {} ambientOsc = null; }
  }

  return {
    get muted() { return muted; },
    setMuted(v) {
      muted = v;
      if (v) stopAmbient();
      else startAmbient();
    },
    initAmbient() { startAmbient(); },
    keyType() { beep(660, 'square', 0.06, 0.12); noise(0.03, 0.03); },
    backspace() { beep(330, 'square', 0.06, 0.08); },
    btnClick() { beep(880, 'square', 0.04, 0.12); },
    correct() {
      [523, 659, 784, 1047].forEach((f, i) => beep(f, 'square', 0.1, 0.14, i*0.08));
    },
    absent() {
      beep(180, 'sawtooth', 0.15, 0.12);
      noise(0.15, 0.04);
    },
    present() { beep(440, 'sine', 0.12, 0.1); beep(550, 'sine', 0.08, 0.08, 0.08); },
    win() {
      [784,880,784,1047,988,1175,1568].forEach((f,i) => beep(f, 'square', 0.12, 0.2, i*0.1));
      noise(0.5, 0.03);
    },
    lose() {
      [392, 330, 262, 196].forEach((f,i) => beep(f, 'sawtooth', 0.15, 0.18, i*0.12));
    },
    hint() {
      [880, 1047, 880, 1175].forEach((f,i) => beep(f, 'sine', 0.1, 0.16, i*0.07));
    },
    invalidWord() {
      beep(200, 'square', 0.08, 0.1);
      beep(150, 'square', 0.08, 0.1, 0.06);
    }
  };
})();

// ============================================================
// PARTICLE SYSTEM
// ============================================================
const Particles = (() => {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let raf;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function create() {
    const colors = ['#00f5ff','#ff00e5','#ffe600','#00ff88','#0080ff','#ff8800'];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        alphaDir: (Math.random() > 0.5 ? 1 : -1) * 0.005
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.alpha += p.alphaDir;
      if (p.alpha <= 0.05 || p.alpha >= 0.65) p.alphaDir *= -1;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    window.addEventListener('resize', resize);
    create();
    draw();
  }

  return { init };
})();

// ============================================================
// CONFETTI
// ============================================================
const Confetti = (() => {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let pieces = [];
  let raf;
  const colors = ['#00f5ff','#ff00e5','#ffe600','#00ff88','#ff2255','#ff8800','#0080ff','#ffffff'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function burst() {
    resize();
    pieces = [];
    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * -12 - 4,
        size: Math.floor(Math.random() * 6) + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.2,
        gravity: 0.3,
        life: 1,
        decay: 0.012 + Math.random() * 0.008
      });
    }
    cancelAnimationFrame(raf);
    animate();
    setTimeout(() => { cancelAnimationFrame(raf); ctx.clearRect(0,0,canvas.width,canvas.height); }, 4000);
  }

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p => {
      p.vy += p.gravity;
      p.x += p.vx; p.y += p.vy;
      p.rot += p.rotV;
      p.life -= p.decay;
      if (p.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
      ctx.restore();
    });
    pieces = pieces.filter(p => p.life > 0);
    if (pieces.length) raf = requestAnimationFrame(animate);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }

  return { burst };
})();

// ============================================================
// TOAST
// ============================================================
let toastTimeout;
function showToast(msg, color = '#00f5ff') {
  let el = document.getElementById('toast-message');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast-message';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.borderColor = color;
  el.style.color = color;
  el.style.boxShadow = `0 0 14px ${color}66`;
  el.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.classList.remove('show'), 2000);
}

// ============================================================
// STATS
// ============================================================
const Stats = (() => {
  const KEY = 'pwc_stats';
  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || { wins:0, losses:0, streak:0, best:0 };
    } catch(e) { return { wins:0, losses:0, streak:0, best:0 }; }
  }
  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch(e) {}
  }
  function onWin() {
    const s = load();
    s.wins++; s.streak++;
    if (s.streak > s.best) s.best = s.streak;
    save(s); return s;
  }
  function onLose() {
    const s = load();
    s.losses++; s.streak = 0;
    save(s); return s;
  }
  function get() { return load(); }
  return { onWin, onLose, get };
})();

function updateStatsUI() {
  const s = Stats.get();
  document.getElementById('stat-win').textContent = s.wins;
  document.getElementById('stat-lose').textContent = s.losses;
  document.getElementById('stat-streak').textContent = s.streak;
  document.getElementById('stat-best').textContent = s.best;
}

function updateLifebar(lives, maxLives) {
  const fill = document.getElementById('lifebar-fill');
  const text = document.getElementById('lives-text');
  const pct = (lives / maxLives) * 100;
  fill.style.width = pct + '%';
  text.textContent = lives;
  let color, shadow;
  if (lives >= maxLives - 1) {
    color = 'linear-gradient(90deg, #00ff88, #00cc66)';
    shadow = '0 0 8px #00ff88';
    text.style.color = '#00ff88';
    text.style.textShadow = '0 0 6px #00ff88';
  } else if (lives >= maxLives / 2) {
    color = 'linear-gradient(90deg, #ffe600, #cc9900)';
    shadow = '0 0 8px #ffe600';
    text.style.color = '#ffe600';
    text.style.textShadow = '0 0 6px #ffe600';
  } else {
    color = 'linear-gradient(90deg, #ff2255, #aa0033)';
    shadow = '0 0 8px #ff2255';
    text.style.color = '#ff2255';
    text.style.textShadow = '0 0 6px #ff2255';
  }
  fill.style.background = color;
  fill.style.boxShadow = shadow + ', inset 0 1px 0 rgba(255,255,255,0.2)';
  const container = document.getElementById('lifebar');
  container.style.animation = 'none';
  container.offsetHeight;
  container.style.animation = 'lifeLost 0.3s ease';
}

// ============================================================
// GAME CORE — input yang sudah diperbaiki
// ============================================================
const Game = (() => {
  let targetWord = '';
  let wordLength = 5;
  let currentRow = 0;
  let currentInput = [];   // array of chars, length = wordLength, diisi '' untuk kosong
  let maxRows = 6;
  let lives = 6;
  let hintUsed = false;
  let gameOver = false;
  let tileGrid = [];

  function init() {
    // Acak panjang kata, pemain tidak bisa pilih
    const lengths = [4,5,6];
    wordLength = lengths[Math.floor(Math.random() * lengths.length)];
    targetWord = pickWord(wordLength);
    currentRow = 0;
    currentInput = new Array(wordLength).fill('');
    lives = maxRows;
    hintUsed = false;
    gameOver = false;
    tileGrid = [];

    buildGrid();
    buildKeyboard();
    updateLifebar(lives, maxRows);
    updateStatsUI();
    document.getElementById('hint-btn').disabled = false;
    document.getElementById('win-popup').classList.add('hidden');
    document.getElementById('lose-popup').classList.add('hidden');
    updateActiveTile();
  }

  function pickWord(len) {
    const pool = WORD_BANK[len];
    if (!pool || !pool.length) return 'KATA';
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function buildGrid() {
    const grid = document.getElementById('game-grid');
    grid.innerHTML = '';
    tileGrid = [];
    for (let r = 0; r < maxRows; r++) {
      const row = document.createElement('div');
      row.className = 'grid-row';
      row.id = `row-${r}`;
      const rowTiles = [];
      for (let c = 0; c < wordLength; c++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.id = `tile-${r}-${c}`;
        row.appendChild(tile);
        rowTiles.push(tile);
      }
      tileGrid.push(rowTiles);
      grid.appendChild(row);
    }
  }

  const ROWS = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['Z','X','C','V','B','N','M']
  ];
  const keyMap = {};

  function buildKeyboard() {
    Object.keys(keyMap).forEach(k => delete keyMap[k]);
    ROWS.forEach((row, ri) => {
      const rowEl = document.getElementById(ri < 2 ? `kb-row-${ri+1}` : 'kb-row-3-letters');
      if (!rowEl) return;
      rowEl.innerHTML = '';
      row.forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'kb-key';
        btn.textContent = letter;
        btn.dataset.key = letter;
        btn.addEventListener('click', () => { Game.handleInput(letter); Audio.keyType(); });
        rowEl.appendChild(btn);
        keyMap[letter] = btn;
      });
    });
    const bsBtn = document.getElementById('kb-backspace');
    if (bsBtn) {
      const newBs = bsBtn.cloneNode(true);
      bsBtn.parentNode.replaceChild(newBs, bsBtn);
      newBs.addEventListener('click', () => { Game.handleBackspace(); Audio.backspace(); });
    }
  }

  function updateKeyColor(letter, state) {
    const btn = keyMap[letter];
    if (!btn) return;
    const priority = { 'key-correct': 3, 'key-present': 2, 'key-absent': 1 };
    const cls = `key-${state}`;
    const existing = ['key-correct','key-present','key-absent'].find(c => btn.classList.contains(c));
    if (!existing || (priority[cls] || 0) > (priority[existing] || 0)) {
      btn.classList.remove('key-correct','key-present','key-absent');
      btn.classList.add(cls);
    }
  }

  // Cari tile kosong pertama untuk active
  function updateActiveTile() {
    const activeIdx = currentInput.findIndex(ch => ch === '');
    tileGrid[currentRow].forEach((tile, i) => {
      tile.classList.toggle('active', i === activeIdx);
    });
  }

  function handleInput(letter) {
    if (gameOver) return;
    const idx = currentInput.indexOf('');
    if (idx === -1) return; // penuh
    currentInput[idx] = letter.toUpperCase();
    const tile = tileGrid[currentRow][idx];
    tile.textContent = letter.toUpperCase();
    tile.classList.add('filled');
    updateActiveTile();
  }

  function handleBackspace() {
    if (gameOver) return;
    let idx = -1;
    for (let i = currentInput.length - 1; i >= 0; i--) {
      if (currentInput[i] !== '') { idx = i; break; }
    }
    if (idx === -1) return;
    currentInput[idx] = '';
    const tile = tileGrid[currentRow][idx];
    tile.textContent = '';
    tile.classList.remove('filled', 'active');
    updateActiveTile();
  }

  function evaluateGuess() {
    if (gameOver) return;
    if (currentInput.some(ch => ch === '')) {
      showToast(`ISI SEMUA ${wordLength} HURUF!`, '#ff8800');
      shakeRow(currentRow);
      Audio.invalidWord();
      return;
    }
    const guess = currentInput.join('').toUpperCase();
    const target = targetWord.toUpperCase();
    const result = computeResult(guess, target);

    result.forEach((state, i) => {
      const tile = tileGrid[currentRow][i];
      setTimeout(() => {
        tile.classList.remove('active');
        // Hapus hint-reveal agar tidak konflik warna
        tile.classList.remove('hint-reveal');
        tile.classList.add('flip-reveal');
        setTimeout(() => {
          tile.classList.remove('flip-reveal');
          tile.classList.add(state);
          if (state === 'correct') {
            setTimeout(() => tile.classList.add('bounce-correct'), 50);
            setTimeout(() => tile.classList.remove('bounce-correct'), 600);
            Audio.correct();
          } else if (state === 'present') {
            Audio.present();
          } else {
            Audio.absent();
          }
        }, 250);
        updateKeyColor(guess[i], state);
      }, i * 80);
    });

    const allCorrect = result.every(s => s === 'correct');
    const totalDelay = wordLength * 80 + 350;

    setTimeout(() => {
      if (allCorrect) {
        gameOver = true;
        const s = Stats.onWin();
        updateStatsUI();
        setTimeout(() => {
          Audio.win();
          Confetti.burst();
          showWinPopup(target, s);
        }, 300);
      } else {
        lives--;
        updateLifebar(lives, maxRows);
        if (lives <= 0) {
          gameOver = true;
          const s = Stats.onLose();
          updateStatsUI();
          setTimeout(() => {
            Audio.lose();
            showLosePopup(target);
          }, 300);
        } else {
          currentRow++;
          currentInput = new Array(wordLength).fill('');
          if (currentRow < maxRows) {
            updateActiveTile();
          }
        }
      }
    }, totalDelay);

    currentInput = new Array(wordLength).fill(''); // clear buffer segera
  }

  function computeResult(guess, target) {
    const result = Array(guess.length).fill('absent');
    const targetArr = target.split('');
    const usedTarget = Array(target.length).fill(false);
    const usedGuess = Array(guess.length).fill(false);
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === targetArr[i]) {
        result[i] = 'correct';
        usedTarget[i] = true;
        usedGuess[i] = true;
      }
    }
    for (let i = 0; i < guess.length; i++) {
      if (usedGuess[i]) continue;
      for (let j = 0; j < targetArr.length; j++) {
        if (!usedTarget[j] && guess[i] === targetArr[j]) {
          result[i] = 'present';
          usedTarget[j] = true;
          break;
        }
      }
    }
    return result;
  }

  function useHint() {
    if (gameOver || hintUsed) return;
    hintUsed = true;
    document.getElementById('hint-btn').disabled = true;
    Audio.hint();

    const target = targetWord.toUpperCase();
    // Cari posisi yang masih kosong di currentInput
    const emptyPositions = [];
    for (let i = 0; i < wordLength; i++) {
      if (currentInput[i] === '') emptyPositions.push(i);
    }
    if (emptyPositions.length === 0) return;

    const pos = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    currentInput[pos] = target[pos];
    const tile = tileGrid[currentRow][pos];
    tile.textContent = target[pos];
    tile.classList.add('hint-reveal', 'filled');
    updateActiveTile();
    showToast('HINT DIGUNAKAN!', '#ffe600');
  }

  function shakeRow(rowIdx) {
    const row = document.getElementById(`row-${rowIdx}`);
    if (!row) return;
    row.classList.remove('shake');
    row.offsetHeight;
    row.classList.add('shake');
    setTimeout(() => row.classList.remove('shake'), 500);
  }

  function showWinPopup(word, stats) {
    const popup = document.getElementById('win-popup');
    document.getElementById('win-word-display').textContent = word;
    document.getElementById('win-streak-display').textContent =
      stats.streak > 1 ? `🔥 STREAK: ${stats.streak}` : 'PERTAHANKAN STREAK!';
    popup.classList.remove('hidden');
  }

  function showLosePopup(word) {
    const popup = document.getElementById('lose-popup');
    document.getElementById('lose-word-display').textContent = word;
    popup.classList.remove('hidden');
  }

  return {
    init,
    handleInput,
    handleBackspace,
    evaluateGuess,
    useHint,
    reset() {
      Audio.btnClick();
      Game.init();
    }
  };
})();

// ============================================================
// EVENT LISTENERS
// ============================================================
document.addEventListener('keydown', e => {
  const key = e.key.toUpperCase();
  if (key === 'ENTER') {
    e.preventDefault();
    Game.evaluateGuess();
    Audio.btnClick();
  } else if (key === 'BACKSPACE') {
    e.preventDefault();
    Game.handleBackspace();
    Audio.backspace();
  } else if (/^[A-Z]$/.test(key)) {
    Game.handleInput(key);
    Audio.keyType();
  }
});

document.getElementById('enter-btn').addEventListener('click', () => {
  Game.evaluateGuess();
  Audio.btnClick();
});
document.getElementById('reset-btn').addEventListener('click', () => {
  Game.reset();
});
document.getElementById('hint-btn').addEventListener('click', () => {
  Game.useHint();
});

const soundBtn = document.getElementById('sound-btn');
soundBtn.addEventListener('click', () => {
  const newMuted = !Audio.muted;
  Audio.setMuted(newMuted);
  document.getElementById('sound-icon').textContent = newMuted ? '✕' : '♪';
  soundBtn.classList.toggle('muted', newMuted);
  showToast(newMuted ? 'SOUND OFF' : 'SOUND ON', newMuted ? '#556688' : '#00f5ff');
});

document.getElementById('win-next-btn').addEventListener('click', () => {
  Audio.btnClick();
  document.getElementById('win-popup').classList.add('hidden');
  Game.reset();
});
document.getElementById('lose-retry-btn').addEventListener('click', () => {
  Audio.btnClick();
  document.getElementById('lose-popup').classList.add('hidden');
  Game.reset();
});

// Cabinet parallax
document.addEventListener('mousemove', e => {
  const cabinet = document.getElementById('arcade-cabinet');
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  cabinet.style.transform = `perspective(1200px) rotateY(${dx * 1.5}deg) rotateX(${-dy * 1}deg)`;
});
document.addEventListener('mouseleave', () => {
  document.getElementById('arcade-cabinet').style.transform = '';
});

// Lifebar animation keyframe
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes lifeLost {
    0% { transform: scale(1); }
    30% { transform: scale(1.04); }
    60% { transform: scale(0.97); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(styleTag);

// Boot
function boot() {
  Particles.init();
  window.addEventListener('resize', () => {
    const cc = document.getElementById('confetti-canvas');
    cc.width = window.innerWidth;
    cc.height = window.innerHeight;
  });
  Game.init();
  updateStatsUI();
  document.addEventListener('click', function startAudio() {
    Audio.initAmbient();
    document.removeEventListener('click', startAudio);
  }, { once: true });
  setTimeout(() => showToast('TEBAK KATA ARCADE!', '#00f5ff'), 800);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
