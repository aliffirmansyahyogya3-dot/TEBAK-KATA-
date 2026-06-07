// =============================================
// TEBAK KATA ARCADE - SCRIPT (KEYBOARD FIX)
// =============================================

const WORD_LIST = [
  "kata", "pixel", "game", "retro", "warna", "tebak", "kunci", "layar",
  "musik", "pohon", "laptop", "kopi", "hujan", "buku", "daun", "bunga",
  "mobil", "pisang", "mangga", "kucing", "sandal", "topi", "baju",
  "roti", "susu", "meja", "kursi", "lampu", "awan", "bintang",
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
let currentGuess = '';

let stats = { totalWins:0, totalLosses:0, winStreak:0 };

// DOM
const gameBoard = document.getElementById('gameBoard');
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
const keyboard = document.getElementById('virtualKeyboard');

// Audio
let audioCtx = null; let bgmAudio = null; let audioInitialized = false;
function initAudio() {
  if (audioInitialized) return;
  try {
    audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    if (audioCtx.state==='suspended') audioCtx.resume();
    bgmAudio = new Audio('morning_paper_tiles.mp3');
    bgmAudio.loop=true; bgmAudio.volume=0.3; audioInitialized=true;
    startBackgroundMusic();
  } catch(e) {}
}
document.body.addEventListener('click', initAudio, {once:true});
document.body.addEventListener('keydown', initAudio, {once:true});

function playTone(f,d,t='square',g=0.15) {
  if(!audioCtx) return;
  const o=audioCtx.createOscillator(), gn=audioCtx.createGain();
  o.type=t; o.frequency.value=f; gn.gain.setValueAtTime(g,audioCtx.currentTime);
  gn.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+d);
  o.connect(gn); gn.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime+d);
}
function playKeyPressSound() { playTone(800,0.08,'square',0.1); }
function playSubmitSound() { playTone(600,0.1,'triangle',0.2); setTimeout(()=>playTone(900,0.1,'triangle',0.2),50); }
function playWinSound() { [523,659,784,1047].forEach((f,i)=>setTimeout(()=>playTone(f,0.2,'square',0.2),i*100)); }
function playLoseSound() { playTone(200,0.3,'sawtooth',0.15); setTimeout(()=>playTone(150,0.4,'sawtooth',0.15),200); }
function startBackgroundMusic() { if(bgmAudio) { bgmAudio.currentTime=0; bgmAudio.play().catch(()=>{}); } }
function stopBackgroundMusic() { if(bgmAudio) { bgmAudio.pause(); bgmAudio.currentTime=0; } }

// Statistik
function loadStats() { const s=localStorage.getItem(STORAGE_KEY); if(s){ try{ stats={...stats,...JSON.parse(s)}; }catch(e){} } updateStatsUI(); }
function saveStats() { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); }
function updateStatsUI() { winStreakSpan.textContent=stats.winStreak; totalWinsSpan.textContent=stats.totalWins; totalLossesSpan.textContent=stats.totalLosses; }

// Game
function initGame() {
  clearWinIdle();
  targetWord = WORD_LIST[Math.floor(Math.random()*WORD_LIST.length)].toLowerCase();
  attempts=[]; currentRow=0; gameOver=false; win=false; hintUsed=false; hintData=null; currentGuess='';
  hintBtn.disabled=false; hintCountSpan.textContent='1'; hintDisplay.classList.remove('active'); hintText.textContent='';
  messageArea.textContent='';
  renderBoard(); updateChancesDots(); focusCurrentRow();
}

function renderBoard() {
  gameBoard.innerHTML='';
  for(let r=0; r<MAX_ATTEMPTS; r++) {
    const row=document.createElement('div'); row.className='row';
    if(r===currentRow && !gameOver) row.classList.add('current');
    row.dataset.row=r;
    for(let c=0; c<targetWord.length; c++) {
      const tile=document.createElement('div'); tile.className='tile'; tile.dataset.col=c;
      if(r<attempts.length) tile.textContent=attempts[r][c]||'';
      row.appendChild(tile);
    }
    gameBoard.appendChild(row);
  }
}

function focusCurrentRow() {
  document.querySelectorAll('.row').forEach(r=>r.classList.remove('current'));
  const row=document.querySelector(`.row[data-row='${currentRow}']`);
  if(!row) return;
  row.classList.add('current');
  const tiles=row.querySelectorAll('.tile');
  for(let i=0; i<tiles.length; i++) tiles[i].textContent = i<currentGuess.length ? currentGuess[i] : '';
}

function updateChancesDots() {
  const remaining = MAX_ATTEMPTS - currentRow;
  let html='';
  for(let i=0; i<MAX_ATTEMPTS; i++) {
    let cls='';
    if(i<remaining) {
      if(remaining>=5) cls='green'; else if(remaining>=3) cls='yellow'; else cls='red';
    } else cls='empty';
    html+=`<span class="dot ${cls}"></span>`;
  }
  chancesDots.innerHTML=html;
}

function handleKeyPress(key) {
  if(gameOver) return;
  if(key==='backspace') { if(currentGuess.length>0) { currentGuess=currentGuess.slice(0,-1); playKeyPressSound(); } }
  else if(key==='enter') { if(currentGuess.length===targetWord.length) submitGuess(); else { showMessage('Kata harus '+targetWord.length+' huruf'); shakeCurrentRow(); } return; }
  else { if(currentGuess.length<targetWord.length) { currentGuess+=key; playKeyPressSound(); } }
  focusCurrentRow();
}

function submitGuess() {
  if(gameOver) return;
  const guess=currentGuess.toLowerCase();
  if(guess.length!==targetWord.length) return;
  playSubmitSound();
  attempts.push(guess);
  const prevRowIdx=currentRow;
  currentRow++; currentGuess='';
  const prevRow=document.querySelector(`.row[data-row='${prevRowIdx}']`);
  if(prevRow) {
    const tiles=prevRow.querySelectorAll('.tile');
    tiles.forEach((tile,i)=>tile.textContent=guess[i]);
    prevRow.classList.remove('current');
  }
  const colors=computeColors(guess,targetWord);
  animateTiles(prevRow,colors,()=>{ checkWinOrLose(guess); });
  messageArea.textContent='';
  focusCurrentRow();
  updateChancesDots();
}

function computeColors(guess,target) {
  const res=Array(target.length).fill('absent');
  const tc={}; for(let ch of target) tc[ch]=(tc[ch]||0)+1;
  for(let i=0;i<guess.length;i++) if(guess[i]===target[i]) { res[i]='correct'; tc[guess[i]]--; }
  for(let i=0;i<guess.length;i++) { if(res[i]==='correct') continue; if(tc[guess[i]]>0) { res[i]='present'; tc[guess[i]]--; } }
  return res;
}

function animateTiles(row,colors,cb) {
  if(!row) { cb(); return; }
  const tiles=row.querySelectorAll('.tile');
  let done=0;
  tiles.forEach((tile,i)=>{
    setTimeout(()=>{
      tile.classList.add('flip');
      setTimeout(()=>{
        tile.classList.add(colors[i]);
        tile.addEventListener('animationend',()=>{ done++; if(done===tiles.length) cb(); },{once:true});
        setTimeout(()=>{ if(done<tiles.length) { done=tiles.length; cb(); } },600);
      },200);
    },i*120);
  });
}

function checkWinOrLose(guess) {
  if(guess===targetWord) {
    win=true; gameOver=true; stats.totalWins++; stats.winStreak++;
    saveStats(); updateStatsUI(); playWinSound(); spawnParticles(50); startWinIdle();
    stopBackgroundMusic(); setTimeout(()=>showPopup(true),800);
  } else {
    if(currentRow>=MAX_ATTEMPTS) { gameOver=true; stats.totalLosses++; stats.winStreak=0; saveStats(); updateStatsUI(); playLoseSound(); stopBackgroundMusic(); setTimeout(()=>showPopup(false),500); }
  }
  updateChancesDots();
}

function shakeCurrentRow() {
  const row=document.querySelector(`.row[data-row='${currentRow}']`);
  if(row){ row.classList.add('shake'); row.addEventListener('animationend',()=>row.classList.remove('shake'),{once:true}); }
}
function showMessage(msg) { messageArea.textContent=msg; setTimeout(()=>{ if(messageArea.textContent===msg) messageArea.textContent=''; },2000); }

function spawnParticles(count=40,large=false) {
  const colors=['#6f6','#ff6','#ff6b6b','#6bc5ff','#ffb347','#ff69b4','#ffd700'];
  for(let i=0;i<count;i++) {
    const p=document.createElement('div'); p.className='particle'+(large?' large':'');
    p.style.left=Math.random()*100+'%'; p.style.top=Math.random()*100+'%';
    const angle=Math.random()*360, dist=large?80+Math.random()*140:40+Math.random()*80;
    p.style.setProperty('--tx',Math.cos(angle*Math.PI/180)*dist+'px');
    p.style.setProperty('--ty',Math.sin(angle*Math.PI/180)*dist+'px');
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDuration=(0.8+Math.random()*0.8)+'s';
    particleContainer.appendChild(p);
    setTimeout(()=>p.remove(),1800);
  }
}
function startWinIdle() { clearWinIdle(); winIdleInterval=setInterval(()=>{ if(!win){clearWinIdle();return;} spawnParticles(8); },400); }
function clearWinIdle() { if(winIdleInterval){clearInterval(winIdleInterval); winIdleInterval=null;} }

function showPopup(isWin) {
  popupOverlay.classList.add('active'); popup.classList.remove('win','lose');
  if(isWin) { popup.classList.add('win'); popupIcon.textContent='🏆'; popupTitle.textContent='KAMU MENANG!'; popupMessage.textContent='Hebat!'; popupAnswer.textContent=targetWord.toUpperCase(); spawnParticles(100,true); }
  else { popup.classList.add('lose'); popupIcon.textContent='😵'; popupTitle.textContent='GAME OVER'; popupMessage.textContent='Kesempatan habis.'; popupAnswer.textContent=targetWord.toUpperCase(); }
  popupBtn.textContent='Main Lagi'; popupBtn.onclick=()=>{ popupOverlay.classList.remove('active'); restartGame(); };
  setTimeout(()=>popupBtn.focus(),100);
}

function useHint() {
  if(gameOver||hintUsed) return;
  const revealed=new Set();
  if(attempts.length>0) { const last=attempts[attempts.length-1]; const cols=computeColors(last,targetWord); cols.forEach((c,i)=>{ if(c==='correct') revealed.add(i); }); }
  const candidates=[]; for(let i=0;i<targetWord.length;i++) if(!revealed.has(i)) candidates.push(i);
  if(candidates.length===0) { showMessage('Semua sudah benar!'); return; }
  const pos=candidates[Math.floor(Math.random()*candidates.length)];
  hintData={position:pos,letter:targetWord[pos]}; hintUsed=true; hintCountSpan.textContent='0'; hintBtn.disabled=true;
  hintText.textContent=`Huruf ke-${pos+1}: "${targetWord[pos].toUpperCase()}"`; hintDisplay.classList.add('active'); showMessage('Petunjuk digunakan!');
}

function restartGame() {
  particleContainer.innerHTML=''; clearWinIdle();
  if(gameOver) stopBackgroundMusic();
  popupOverlay.classList.remove('active'); initGame();
  if(gameOver && audioInitialized) startBackgroundMusic();
}

function createStars() {
  starsContainer.innerHTML='';
  for(let i=0;i<80;i++) {
    const s=document.createElement('div'); s.className='star';
    s.style.width=(Math.random()*3+1)+'px'; s.style.height=s.style.width;
    s.style.left=Math.random()*100+'%'; s.style.top=Math.random()*100+'%';
    s.style.animationDelay=Math.random()*3+'s'; s.style.animationDuration=(15+Math.random()*25)+'s';
    starsContainer.appendChild(s);
  }
}

keyboard.addEventListener('click',(e)=>{ const btn=e.target.closest('.key-btn'); if(!btn) return; handleKeyPress(btn.dataset.key); });
hintBtn.addEventListener('click',useHint);
restartBtn.addEventListener('click',restartGame);
popupOverlay.addEventListener('click',(e)=>{ if(e.target===popupOverlay){ popupOverlay.classList.remove('active'); restartGame(); } });

loadStats(); createStars(); initGame();
