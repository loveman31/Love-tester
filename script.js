const form = document.getElementById('loveForm');
const resultDiv = document.getElementById('result');
const scorePercentage = document.getElementById('scorePercentage');
const resultMessage = document.getElementById('resultMessage');
const tryAgainBtn = document.getElementById('tryAgainBtn');

const messages = {
    0: '❌ Ikke noe håp',
    10: '😔 Veldig dårlig',
    20: '😞 Ikke bra',
    30: '😕 Så lala',
    40: '😐 Middels',
    50: '🤔 Fifty-fifty',
    60: '🙂 Ganske bra',
    70: '😊 Veldig bra',
    80: '😍 Fantastisk!',
    90: '🔥 Utrolig!',
    100: '💯 Du er gjort for hverandre!'
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();
    
    if (name1 === name2) {
        alert('Du kan ikke teste kjærligheten med deg selv!');
        return;
    }
    
    // Beregn score basert på navnene
    const score = calculateLoveScore(name1, name2);
    
    // Vis resultatet
    displayResult(score);
});

function calculateLoveScore(name1, name2) {
    // Kombinér navnene
    const combined = name1 + name2;
    
    // Beregn ASCII-sum
    let asciiSum = 0;
    for (let char of combined) {
        asciiSum += char.charCodeAt(0);
    }
    
    // Konverter til prosent (0-100)
    const score = (asciiSum % 101);
    
    return score;
}

function displayResult(score) {
    // Skjul form og vis resultat
    form.style.display = 'none';
    resultDiv.classList.remove('hidden');
    
    // Animér prosentvis fra 0 til score
    animateScore(0, score, 1500);
    
    // Sett resultatmelding
    const message = getResultMessage(score);
    resultMessage.textContent = message;
}

function animateScore(start, end, duration) {
    const startTime = Date.now();
    
    function update() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentScore = Math.floor(start + (end - start) * progress);
        scorePercentage.textContent = currentScore + '%';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

function getResultMessage(score) {
    // Finn beste match for meldingen
    let selectedScore = 0;
    for (let threshold of Object.keys(messages).map(Number).sort((a, b) => b - a)) {
        if (score >= threshold) {
            selectedScore = threshold;
            break;
        }
    }
    
    return messages[selectedScore];
}

tryAgainBtn.addEventListener('click', () => {
    // Nullstill skjemaet
    form.reset();
    form.style.display = 'block';
    resultDiv.classList.add('hidden');
    document.getElementById('name1').focus();
});