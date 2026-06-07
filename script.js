// =============================================
// TEBAK KATA PIXEL - SCRIPT (FINAL ENHANCED)
// 100+ Kosakata, Musik Autoplay, Fix Reset
// =============================================

const WORD_LIST = [
  // Daftar asli
  "kata", "pixel", "game", "retro", "warna", "tebak", "kunci", "layar",
  "musik", "pohon", "laptop", "kopi", "hujan", "buku", "daun", "bunga",
  "mobil", "pisang", "mangga", "kucing", "sandal", "topi", "baju",
  "roti", "susu", "meja", "kursi", "lampu", "awan", "bintang",
  // Tambahan baru (100+ kata umum 4-6 huruf)
  "pintu", "makan", "minum", "tidur", "jalan", "baca", "tulis", "gambar",
  "suara", "cahaya", "tanah", "air", "api", "angin", "hewan", "manusia",
  "rumah", "kamar", "dapur", "lemari", "piring", "gelas", "sendok", "garpu",
  "pisau", "cangkir", "kompor", "kulkas", "televisi", "radio", "telepon",
  "printer", "mouse", "keyboard", "monitor", "speaker", "headset", "kamera",
  "video", "lagu", "film", "koran", "majalah", "surat", "paket", "uang",
  "bank", "pasar", "toko", "warung", "restoran", "hotel", "apotek", "obat",
  "dokter", "suster", "polisi", "tentara", "pilot", "supir", "guru",
  "dosen", "murid", "mahasiswa", "pelajar", "sekolah", "kampus", "kelas",
  "ujian", "nilai", "tugas", "libur", "wisata", "pantai", "gunung",
  "hutan", "sungai", "danau", "laut", "pulau", "desa", "kota", "negara",
  "dunia", "planet", "langit", "pelangi", "matahari", "rembulan", "bumi",
  "ruang", "waktu", "hari", "minggu", "bulan", "tahun", "jam", "menit",
  "detik", "pagi", "siang", "sore", "malam", "cuaca", "panas", "dingin",
  "salju", "badai", "gempa", "banjir", "asap", "debu", "kotor", "bersih",
  "indah", "cantik", "tampan", "jelek", "buruk", "baik", "jahat", "marah",
  "senang", "sedih", "takut", "berani", "malas", "rajin", "pintar", "bodoh",
  "kaya", "miskin", "muda", "tua", "besar", "kecil", "tinggi", "rendah",
  "cepat", "lambat", "dekat", "jauh", "atas", "bawah", "depan", "belakang",
  "samping", "dalam", "luar", "baru", "lama", "hidup", "mati", "sehat",
  "sakit", "kuat", "lemah", "keras", "lunak", "basah", "kering", "gelap",
  "terang", "bising", "sunyi", "ramai", "sepi", "penuh", "kosong", "berat",
  "ringan", "mahal", "murah", "lezat", "enak", "pahit", "manis", "asin",
  "asam", "pedas", "tawar", "harum", "busuk", "wangi"
];

const MAX_ATTEMPTS = 6;
const STORAGE_KEY = 'tebakKataPixelStats';

let targetWord = '';
let attempts = [];
let currentRow = 0;
let gameOver = false;
let win = false;
let hintUsed = false;
let hintData = null;
let winIdleInterval = null;

let stats = {
  totalWins: 0,
  totalLosses: 0,
  winStreak: 0
};

const gameBoard = document.getElementById('gameBoard');
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const messageArea = document.getElementById('messageArea');
const hintBtn = document.getElementById('hintBtn');
const hintCountSpan = document.getElementById('hintCount');
const hintDisplay = document.getElementById('hintDisplay');
const hintText = document.getElementById('hintText');
const restartBtn = document.getElementById('restartBtn');
const popupOverlay = document.getElementById('popupOverlay');
const popup = document.getElementById('popup');
const popupIcon = document.getElementById('popupIcon');
const popupTitle = document.getElementById('popupTitle');
const popupMessage = document.getElementById('popupMessage');
const popupAnswer = document.getElementById('popupAnswer');
const popupBtn = document.getElementById('popupBtn');
const winStreakSpan = document.getElementById('winStreak');
const totalWinsSpan = document.getElementById('totalWins');
const totalLossesSpan = document.getElementById('totalLosses');
const chancesDots = document.getElementById('chancesDots');
const particleContainer = document.getElementById('particleContainer');
const starsContainer = document.getElementById('starsContainer');

// ========== AUDIO SYSTEM (MP3 + Web Audio API) ==========
let audioCtx = null;
let bgmAudio = null;
let audioInitialized = false;

function initAudio() {
  if (audioInitialized) return;
  try {
    // Web Audio API untuk efek suara
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Musik latar dari file MP3
    bgmAudio = new Audio('morning_paper_tiles.mp3');
    bgmAudio.loop = true;
    bgmAudio.volume = 0.3;

    audioInitialized = true;

    // Mulai musik otomatis setelah inisialisasi (website pribadi)
    startBackgroundMusic();
  } catch (e) {
    console.warn('Web Audio API tidak didukung');
  }
}

// Interaksi pertama akan memicu initAudio
document.body.addEventListener('click', initAudio, { once: true });
document.body.addEventListener('keydown', initAudio, { once: true });

// Efek suara pendek (tetap)
function playTone(freq, duration, type = 'square', gainValue = 0.15) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(gainValue, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + duration);
}

function playKeyPressSound() {
  playTone(800, 0.08, 'square', 0.1);
}

function playSubmitSound() {
  playTone(600, 0.1, 'triangle', 0.2);
  setTimeout(() => playTone(900, 0.1, 'triangle', 0.2), 50);
}

function playWinSound() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, 'square', 0.2), i * 100);
  });
}

function playLoseSound() {
  playTone(200, 0.3, 'sawtooth', 0.15);
  setTimeout(() => playTone(150, 0.4, 'sawtooth', 0.15), 200);
}

// Musik latar
function startBackgroundMusic() {
  if (!bgmAudio) return;
  bgmAudio.currentTime = 0;
  bgmAudio.play().catch(e => console.log('Musik tidak bisa autoplay:', e));
}

function stopBackgroundMusic() {
  if (bgmAudio) {
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
  }
}

// ========== STATISTIK ==========
function loadStats() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      stats = { ...stats, ...parsed };
    } catch (e) {}
  }
  updateStatsUI();
}

function saveStats() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function updateStatsUI() {
  winStreakSpan.textContent = stats.winStreak;
  totalWinsSpan.textContent = stats.totalWins;
  totalLossesSpan.textContent = stats.totalLosses;
}

// ========== INISIALISASI GAME ==========
function initGame() {
  clearWinIdle();
  // Tidak lagi stopBackgroundMusic() di sini agar musik tidak ter-reset
  targetWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)].toLowerCase();
  attempts = [];
  currentRow = 0;
  gameOver = false;
  win = false;
  hintUsed = false;
  hintData = null;

  guessInput.disabled = false;
  guessBtn.disabled = false;
  messageArea.textContent = '';
  hintDisplay.classList.remove('active');
  hintText.textContent = '';
  hintCountSpan.textContent = '1';
  hintBtn.disabled = false;
  guessInput.value = '';
  guessInput.maxLength = targetWord.length;

  renderBoard();
  updateChancesDots();
  guessInput.focus();

  // Musik akan tetap berjalan jika sudah pernah dimulai
}

function renderBoard() {
  gameBoard.innerHTML = '';
  for (let r = 0; r < MAX_ATTEMPTS; r++) {
    const row = document.createElement('div');
    row.className = 'row';
    if (r === currentRow && !gameOver) row.classList.add('current');
    row.dataset.row = r;

    for (let c = 0; c < targetWord.length; c++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.col = c;
      if (r < attempts.length) {
        tile.textContent = attempts[r][c] || '';
      }
      row.appendChild(tile);
    }
    gameBoard.appendChild(row);
  }
}

function updateChancesDots() {
  let dotsHTML = '';
  const remaining = MAX_ATTEMPTS - currentRow;
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    dotsHTML += `<span class="dot${i >= remaining ? ' empty' : ''}"></span>`;
  }
  chancesDots.innerHTML = dotsHTML;
}

// ========== PROSES TEBAKAN ==========
function submitGuess() {
  if (gameOver) return;
  const guess = guessInput.value.trim().toLowerCase();

  if (guess.length !== targetWord.length) {
    showMessage('Panjang kata harus ' + targetWord.length + ' huruf');
    shakeCurrentRow();
    return;
  }

  playSubmitSound();

  attempts.push(guess);

  const currentRowEl = document.querySelector(`.row[data-row='${currentRow}']`);
  if (currentRowEl) {
    const tiles = currentRowEl.querySelectorAll('.tile');
    for (let i = 0; i < guess.length; i++) {
      tiles[i].textContent = guess[i];
    }
    currentRowEl.classList.remove('current');
  }

  const colors = computeColors(guess, targetWord);
  animateTiles(currentRowEl, colors, () => {
    checkWinOrLose(guess);
  });

  guessInput.value = '';
  messageArea.textContent = '';
}

function computeColors(guess, target) {
  const result = Array(target.length).fill('absent');
  const targetLetterCount = {};

  for (let ch of target) {
    targetLetterCount[ch] = (targetLetterCount[ch] || 0) + 1;
  }

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      result[i] = 'correct';
      targetLetterCount[guess[i]]--;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === 'correct') continue;
    if (targetLetterCount[guess[i]] && targetLetterCount[guess[i]] > 0) {
      result[i] = 'present';
      targetLetterCount[guess[i]]--;
    }
  }

  return result;
}

function animateTiles(rowEl, colors, callback) {
  if (!rowEl) {
    callback();
    return;
  }
  const tiles = rowEl.querySelectorAll('.tile');
  let completed = 0;
  const total = tiles.length;

  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add('flip');
      setTimeout(() => {
        tile.classList.add(colors[index]);
        const onAnimEnd = () => {
          completed++;
          if (completed === total) callback();
        };
        tile.addEventListener('animationend', onAnimEnd, { once: true });
        setTimeout(() => {
          if (completed < total) {
            completed = total;
            callback();
          }
        }, 600);
      }, 200);
    }, index * 120);
  });
}

function checkWinOrLose(guess) {
  if (guess === targetWord) {
    win = true;
    gameOver = true;
    stats.totalWins++;
    stats.winStreak++;
    saveStats();
    updateStatsUI();
    disableInput();
    playWinSound();
    spawnParticles(50);
    startWinIdle();
    stopBackgroundMusic(); // Musik berhenti saat menang
    setTimeout(() => showPopup(true), 800);
  } else {
    currentRow++;
    updateChancesDots();

    if (currentRow >= MAX_ATTEMPTS) {
      gameOver = true;
      stats.totalLosses++;
      stats.winStreak = 0;
      saveStats();
      updateStatsUI();
      disableInput();
      playLoseSound();
      stopBackgroundMusic(); // Musik berhenti saat kalah
      setTimeout(() => showPopup(false), 500);
    } else {
      const nextRow = document.querySelector(`.row[data-row='${currentRow}']`);
      if (nextRow) nextRow.classList.add('current');
      guessInput.focus();
    }
  }
}

function disableInput() {
  guessInput.disabled = true;
  guessBtn.disabled = true;
  hintBtn.disabled = true;
}

// ========== IDLE KEMENANGAN ==========
function startWinIdle() {
  clearWinIdle();
  winIdleInterval = setInterval(() => {
    if (!win) {
      clearWinIdle();
      return;
    }
    spawnParticles(8);
  }, 400);
}

function clearWinIdle() {
  if (winIdleInterval) {
    clearInterval(winIdleInterval);
    winIdleInterval = null;
  }
}

// ========== EFEK & ANIMASI ==========
function shakeCurrentRow() {
  const row = document.querySelector(`.row[data-row='${currentRow}']`);
  if (row) {
    row.classList.add('shake');
    row.addEventListener('animationend', () => row.classList.remove('shake'), { once: true });
  }
}

function showMessage(msg) {
  messageArea.textContent = msg;
  setTimeout(() => {
    if (messageArea.textContent === msg) messageArea.textContent = '';
  }, 2000);
}

function spawnParticles(count = 40, large = false) {
  const colors = ['#6f6', '#ff6', '#ff6b6b', '#6bc5ff', '#ffb347', '#ff69b4', '#ffd700'];
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    if (large) particle.classList.add('large');
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const angle = Math.random() * 360;
    const distance = large ? 80 + Math.random() * 140 : 40 + Math.random() * 80;
    const tx = Math.cos(angle * Math.PI / 180) * distance;
    const ty = Math.sin(angle * Math.PI / 180) * distance;
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = (0.8 + Math.random() * 0.8) + 's';
    particleContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 1800);
  }
}

// ========== POPUP ==========
function showPopup(isWin) {
  popupOverlay.classList.add('active');
  const popupEl = document.getElementById('popup');

  popupEl.classList.remove('win', 'lose');

  if (isWin) {
    popupEl.classList.add('win');
    popupIcon.textContent = '🏆';
    popupTitle.textContent = 'KAMU MENANG!';
    popupMessage.textContent = 'Hebat! Kata berhasil ditebak.';
    popupAnswer.textContent = targetWord.toUpperCase();
    spawnParticles(100, true);
  } else {
    popupEl.classList.add('lose');
    popupIcon.textContent = '😵';
    popupTitle.textContent = 'GAME OVER';
    popupMessage.textContent = 'Kesempatan habis. Kata yang benar:';
    popupAnswer.textContent = targetWord.toUpperCase();
  }

  popupBtn.textContent = 'Main Lagi';
  popupBtn.onclick = () => {
    popupOverlay.classList.remove('active');
    restartGame();
  };

  setTimeout(() => popupBtn.focus(), 100);
}

// ========== HINT ==========
function useHint() {
  if (gameOver || hintUsed) return;
  const revealedPositions = new Set();
  if (attempts.length > 0) {
    const lastGuess = attempts[attempts.length - 1];
    const colors = computeColors(lastGuess, targetWord);
    colors.forEach((color, idx) => {
      if (color === 'correct') revealedPositions.add(idx);
    });
  }

  const candidates = [];
  for (let i = 0; i < targetWord.length; i++) {
    if (!revealedPositions.has(i)) candidates.push(i);
  }
  if (candidates.length === 0) {
    showMessage('Semua huruf sudah benar!');
    return;
  }
  const randomPos = candidates[Math.floor(Math.random() * candidates.length)];
  const letter = targetWord[randomPos];

  hintData = { position: randomPos, letter: letter };
  hintUsed = true;
  hintCountSpan.textContent = '0';
  hintBtn.disabled = true;

  hintText.textContent = `Huruf ke-${randomPos + 1} adalah "${letter.toUpperCase()}"`;
  hintDisplay.classList.add('active');
  showMessage('Petunjuk digunakan!');
}

// ========== RESTART (MUSIK DIMULAI LAGI) ==========
function restartGame() {
  particleContainer.innerHTML = '';
  clearWinIdle();
  // Hentikan musik dulu (biar restart dari awal)
  stopBackgroundMusic();
  popupOverlay.classList.remove('active');
  initGame();
  // Mulai musik kembali
  if (audioInitialized) {
    startBackgroundMusic();
  }
}

// ========== BACKGROUND STARS ==========
function createStars() {
  starsContainer.innerHTML = '';
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (15 + Math.random() * 25) + 's';
    starsContainer.appendChild(star);
  }
}

// ========== EVENT LISTENERS ==========
guessBtn.addEventListener('click', submitGuess);
guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    submitGuess();
  }
});

guessInput.addEventListener('input', () => {
  const currentLength = guessInput.value.length;
  if (currentLength > (guessInput.dataset.prevLength || 0)) {
    playKeyPressSound();
  }
  guessInput.dataset.prevLength = currentLength;
});

hintBtn.addEventListener('click', useHint);
restartBtn.addEventListener('click', restartGame);

popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove('active');
    restartGame();
  }
});

// ========== MULAI ==========
loadStats();
createStars();
initGame();
