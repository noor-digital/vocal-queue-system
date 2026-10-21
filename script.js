// Recuperation des elements
const title = document.getElementById('card-title');
const counter = document.getElementById('counter');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');
const marqueeNumber = document.getElementById('marquee-number');
const MAX_COUNT = 10; // nombre maximum de clients (limite haute du compteur)
let count = 0;

// Condition plus Style 
function Counter() {  
    counter.textContent = count;

    // marquee number
    if (marqueeNumber) marqueeNumber.textContent = count;

    // decrement & increment btn disable
    if (count === 0) {
        decrementBtn.disabled = true;
    } else {
        decrementBtn.disabled = false;
    }
    if (count >= MAX_COUNT) {
        incrementBtn.disabled = true;
    } else {
        incrementBtn.disabled = false;
    }

    // Reset btn display
    if (count === 0) {
        resetBtn.style.display = 'none';
    } else {
        resetBtn.style.display = 'flex';
    }

    // Card-title
    if (count > 0 && count < MAX_COUNT) {
        title.style.display = 'none';
    } else if (count === 0) {
        title.style.display = 'block';
        title.style.backgroundColor = '#dc3545';
        title.style.color = 'white';
        title.innerHTML = '<i class="bi bi-alarm-fill"></i> min';
    } else if (count >= MAX_COUNT) {
        title.style.display = 'block';
        title.style.backgroundColor = 'gold';
        title.style.color = 'black';
        title.innerHTML = '<i class="bi bi-exclamation-triangle"></i> max';
    }

    // counter color
    counter.classList.remove('glow-red', 'glow-blue', 'glow-gold');

    if (count === 0) {
    counter.style.color = '#dc3545';
    counter.classList.add('glow-red');

    } else if (count > 0 && count < MAX_COUNT) {
    counter.style.color = 'darkturquoise';
    counter.classList.add('glow-blue');

    } else if (count >= MAX_COUNT) {
    counter.style.color = 'gold';
    counter.classList.add('glow-gold');
   }
}

// Parler guichet
function direClient(numero) {
    // Synthese vocale indisponible (navigateur ou WebView non compatible) : on ne fait rien
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
        return;
    }

    // Coupe toute annonce en cours (y compris quand on revient a 0)
    speechSynthesis.cancel();

    // 0 = aucun client appele : rien a annoncer
    if (numero < 1) return;

    const DireText = `Client numéro ${numero}, au guichet.`;
    const utterance = new SpeechSynthesisUtterance(DireText);
    utterance.lang = 'fr-FR';

    speechSynthesis.speak(utterance);
}

// increment button
incrementBtn.addEventListener('click', () => {
    if (count < MAX_COUNT) {
        count++;
        Counter();

        direClient(count);
    }
});

// decrement button
decrementBtn.addEventListener('click', () => {
    if (count > 0) {
        count--;
        Counter();

        direClient(count);
    }
}); 

// reset button
resetBtn.addEventListener('click', () => {
    count = 0;
    Counter();

    direClient(count);
});

// Etat initial de l'affichage (compteur a 0)
Counter();
