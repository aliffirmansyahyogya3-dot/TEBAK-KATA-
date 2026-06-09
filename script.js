'use strict';

// ============================================================
// WORD BANK — 200+ Indonesian words grouped by length
// ============================================================
const WORD_BANK = {
  4: [
'ACAK','ACAR','ACUH','ADAB','ADIK','ADIL','ADUH','AGAK','AGAR','AGEN','AHAD','AHLI','AJAL','AJAK','AJAR','AKAL','AKAN','AKAR','AKIK','ALAM','ALAS','ALIH','ALIR','ALUN','AMAL','AMAN','AMAT','ANAK','ANDA','ANEH','APEL','ARAH','ARUS','ASAH','ASAL','ASAP','ASIN','ASLI','ASUH','ATAS','ATAU','ATUR','AWAN','AWAL','AWAS','AYAH','AYAM','AYUN','BABI','BACA','BAGI','BAHU','BAIK','BAJA','BAJU','BAKI','BARA','BARU','BASI','BATA','BATU','BAWA','BAYI','BEDA','BELI','BERI','BESI','BIJI','BIRU','BISA','BISU','BLUS','BOLA','BUAH','BUAS','BUAT','BUDI','BUKA','BUKU','BULU','BUMI','BURU','BUTA','CARI','CARA','CIUM','COBA','CUCI','CUCU','CUKA','CUMI','CURI','DADA','DADU','DAKI','DARA','DARI','DASI','DAUN','DAYA','DEBU','DESA','DIAM','DIRI','DOSA','DUIT','DUKA','DURI','EDAN','EKOR','ELOK','EMAS','ENAK','ERAT','ESOK','FILM','FOTO','GAJI','GALI','GANG','GAUN','GAYA','GEMA','GIGI','GILA','GULA','GUNA','GURU','GUSI','HALO','HAMA','HATI','HINA','HOBI','HULU','IDAM','IKAN','IKAT','IMAM','INTI','IPAR','IRIS','ISAP','IZIN','JADI','JAGA','JALA','JAMU','JARI','JASA','JAUH','JEDA','JIKA','JIWA','JUGA','JAWA','KACA','KAIL','KAIT','KAKI','KALI','KAMI','KAMU','KATA','KAYA','KHAS','KINI','KIOS','KIRI','KITA','KOKI','KOMA','KOPI','KOTA','KUAT','KUDA','KUKU','LABA','LABU','LAGU','LAIN','LAKI','LALU','LAMA','LARI','LAUT','LIMA','LUAR','LUAS','LUCU','LUKA','LUPA','MAAF','MADU','MALU','MANA','MASA','MATA','MATI','MEJA','MEGA','MUDA','MUKA','NADA','NAIK','NAMA','NASI','NILA','NODA','NUSA','OBAT','OLAH','OTAK','PADA','PADI','PAGI','PAKU','PALA','PALU','PAPA','PARA','PARU','PIPI','PITA','RAGA','RAJA','RAPI','RASA','RATA','ROTI','RUPA','SAKU','SAMA','SAPI','SARI','SATE','SATU','SEPI','SERU','SIKU','SISA','SORE','SUKA','SUKU','SUSU','SAFA','TAHU','TALI','TAMU','TANI','TAPA','TARI','TATA','TAWA','TEGA','TEKO','TEPI','TIGA','TOKO','TOPI','UANG','UBAH','UCAP','UKIR','UKUR','ULAR','UMUR','UPAH','USIA','USIR','USUS','VISA','WIRA','YANG','ZONA'
  ].filter(w => w.length === 4),
  5: [
'ACARA','AKHIR','AGAMA','ANGIN','ANGKA','ANEKA','ASING','BEBAS','BEBEK','BENAR','BERAS','BESAR','BESOK','BIJAK','BOLEH','BOROS','BAKAR','BALAS','BALIK','BASAH','BATAS','BATIK','BEBAN','BEDAK','BEKAL','BEKAS','BELOK','BENCI','BERAT','BERES','BIKIN','BULAN','BULAT','BUNUH','BURUK','BUSUK','BUTUH','CEPAT','CINTA','CUKUP','CEMAS','DALAM','DAMAI','DAPAT','DARAT','DARAH','DEKAT','DEPAN','DERAS','DIDIK','DUDUK','DUNIA','ELANG','EMBUN','FOKUS','GAGAL','GARAM','GARIS','GATAL','GELAP','GEMUK','GERAK','GOSOK','GAJAH','GARPU','GELAS','HABIS','HADIR','HALUS','HAMIL','HARGA','HARUS','HASIL','HEBAT','HEMAT','HIDUP','HIJAU','HITAM','HUJAN','HUKUM','HUTAN','INGIN','INGAT','ISTRI','INDAH','IKLAN','JAHAT','JAHIT','JALUR','JANJI','JATUH','JELAS','JERUK','JUARA','JUJUR','JAMUR','JARUM','KABAR','KABEL','KABUR','KALAH','KANAN','KAPAN','KAPAL','KASIH','KECIL','KELAS','KASAR','KAWIN','KEJAM','KERAS','KEREN','KORAN','KUBUR','KUNCI','KURSI','LALAT','LAMPU','LAWAN','LEHER','LELAH','LEMAH','LIDAH','LIHAT','LILIN','LAPAR','LEBAR','LEBIH','LICIN','MABUK','MAHAL','MAKAN','MALAM','MANDI','MANIS','MASAK','MASUK','MIMPI','MINUM','MOBIL','MULAI','MULUT','MURAH','MUSIK','MUSIM','NANTI','NAPAS','NENEK','NOMOR','NYATA','NILAI','ORANG','OMONG','PAHIT','PANAS','PAPAN','PARAH','PASAR','PASIR','PATUH','PAYUNG','PERGI','PIKIR','PINTU','PUTIH','PADAM','PAKAI','PASTI','PEDAS','PENUH','PESTA','POHON','RAJIN','RAMAH','RAMAI','RAPAT','RESMI','RINDU','RUMAH','RUSAK','RATUS','RAWAT','ROKOK','SABAR','SABUN','SAKIT','SALAH','SAYUR','SEHAT','SEJUK','SEMUA','SIANG','SIKAT','SINGA','SOPIR','SULIT','SURAT','SALAM','SAWAH','SEDIH','SEMUT','SIFAT','SUAMI','SUARA','SUBUR','TABAH','TANAH','TANPA','TARUH','TEBAL','TELUR','TEMAN','TERUS','TETAP','TIDUR','TIKAR','TUBUH','TULIS','TURUN','TANDA','TAHAN','TAKUT','TANAM','TARIK','TEPAT','TINJU','TINTA','UDARA','UJIAN','UNTUK','VIDEO','VIRUS','WAJAH','WAKTU','WANGI','WARNA','WARGA','WAJIB','WAKIL','YATIM','ZAKAT'
  ].filter(w => w.length === 5),
  6: [
'ADALAH','ADAPUN','ALASAN','ALIRAN','ANJING','ANTARA','ATURAN','AYUNAN','BANYAK','BANGUN','BAYANG','BENTUK','BERISI','BERKAT','BILANG','BUDAYA','CABANG','CAMPUR','CANTIK','CERITA','CERDAS','DAFTAR','DAGING','DAMPAK','DENGAN','DAERAH','DENGAR','DINGIN','ENTENG','GAMBAR','GEDUNG','GUNUNG','HADIAH','HANCUR','HANTAM','HILANG','HORMAT','HANYUT','JANGAN','JEMPUT','JUMLAH','KACANG','KARENA','KARUNG','KEPALA','KERETA','KERTAS','KETIKA','KOMPOR','KUCING','KUNING','LAMBAT','LANGIT','LEMPAR','LINTAS','LONCAT','LOMBOK','LUMPUR','MANGGA','MELATI','MEMANG','MEREKA','MENANG','NEGARA','NIKMAT','NYANYI','PANDAI','PANJAT','PANTAI','PEGANG','PENDEK','PERAHU','PINTAR','PISANG','POLISI','POTONG','PULANG','PUSAKA','RAMBUT','RAKYAT','RANTAI','REMAJA','RENDAH','RIBUAN','RUMPUT','SAMPAI','SANDAL','SANGAT','SARANG','SARUNG','SELALU','SEMPIT','SENANG','SENDOK','SERING','SESUAI','SETIAP','SILANG','SIMPAN','SUMPAH','SUNGAI','TAMBAH','TAMPIL','TANGAN','TANGIS','TEMBUS','TEMPAT','TERANG','TERIMA','TETAPI','TIMBUL','TINDAK','TOLONG','TUMBUH','TUMBUK','TUNGGU','TUNJUK','UCAPAN','UNDANG','UNTUNG','WARUNG','WISUDA'
  ].filter(w => w.length === 6)
};

Object.keys(WORD_BANK).forEach(k => {
  WORD_BANK[k] = [...new Set(WORD_BANK[k].map(w => w.toUpperCase()))];
});

// ============================================================
// AUDIO ENGINE
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

  function startAmbient() {}
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
// GAME CORE
// ============================================================
const Game = (() => {
  let targetWord = '';
  let wordLength = 5;
  let currentRow = 0;
  let currentInput = [];   // array panjang wordLength, '' = kosong
  let maxRows = 6;
  let lives = 6;
  let hintUsed = false;
  let gameOver = false;
  let tileGrid = [];
  let lockedHints = [];    // true = slot ini diisi hint, tidak boleh dihapus

  function init() {
    const lengths = [4, 5, 6];
    wordLength = lengths[Math.floor(Math.random() * lengths.length)];
    targetWord = pickWord(wordLength);
    currentRow = 0;
    currentInput = new Array(wordLength).fill('');
    lockedHints = new Array(wordLength).fill(false);
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

  // ============================================================
  // FIX: updateActiveTile — cari slot kosong pertama dari kiri.
  // lockedHints sudah terisi di currentInput, jadi tidak akan
  // terpilih sebagai 'kosong'. Tidak perlu cek lockedHints di sini.
  // ============================================================
  function updateActiveTile() {
    // Hapus semua active dulu
    tileGrid[currentRow].forEach(tile => tile.classList.remove('active'));

    // Cari index '' pertama dari kiri
    const activeIdx = currentInput.indexOf('');

    // Jika ada slot kosong, tandai active
    if (activeIdx !== -1) {
      tileGrid[currentRow][activeIdx].classList.add('active');
    }
  }

  // ============================================================
  // FIX: handleInput — isi slot '' pertama dari kiri
  // ============================================================
  function handleInput(letter) {
    if (gameOver) return;
    const idx = currentInput.indexOf('');
    if (idx === -1) return; // semua terisi
    currentInput[idx] = letter.toUpperCase();
    const tile = tileGrid[currentRow][idx];
    tile.textContent = letter.toUpperCase();
    tile.classList.add('filled');
    updateActiveTile();
  }

  // ============================================================
  // FIX: handleBackspace — hapus huruf terakhir yang bukan hint.
  // Cari dari KANAN, skip lockedHints[i] === true.
  // Setelah hapus, panggil updateActiveTile() untuk update kursor.
  // ============================================================
  function handleBackspace() {
    if (gameOver) return;

    // Cari dari kanan: slot terisi yang bukan hint
    let idx = -1;
    for (let i = currentInput.length - 1; i >= 0; i--) {
      if (currentInput[i] !== '' && !lockedHints[i]) {
        idx = i;
        break;
      }
    }

    if (idx === -1) return; // tidak ada yang bisa dihapus

    // Hapus dari data dan tile
    currentInput[idx] = '';
    const tile = tileGrid[currentRow][idx];
    tile.textContent = '';
    tile.classList.remove('filled');
    // Jangan remove 'active' manual di sini — biarkan updateActiveTile yang atur
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
        tile.classList.remove('active', 'hint-reveal');
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
          lockedHints = new Array(wordLength).fill(false); // reset hint lock untuk baris baru
          if (currentRow < maxRows) {
            updateActiveTile();
          }
        }
      }
    }, totalDelay);

    currentInput = new Array(wordLength).fill('');
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
    // Cari posisi yang masih kosong
    const emptyPositions = [];
    for (let i = 0; i < wordLength; i++) {
      if (currentInput[i] === '') emptyPositions.push(i);
    }
    if (emptyPositions.length === 0) {
      showToast('SEMUA SUDAH TERISI!', '#ffe600');
      return;
    }

    const pos = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    currentInput[pos] = target[pos];
    lockedHints[pos] = true; // tandai: tidak boleh dihapus backspace

    const tile = tileGrid[currentRow][pos];
    tile.textContent = target[pos];
    tile.classList.add('filled', 'hint-reveal');

    updateActiveTile(); // update kursor ke slot kosong berikutnya
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
