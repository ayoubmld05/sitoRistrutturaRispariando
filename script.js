const osservatore = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Appena l'elemento entra nello schermo, gli diamo la classe .mostra
            entry.target.classList.add('mostra'); 
            osservatore.unobserve(entry.target); // Ferma l'animazione, la fa fare una volta sola
        }
    });
}, { 
    threshold: 0.1 // L'animazione parte quando almeno il 10% dell'elemento è visibile
});

// Cerchiamo TUTTI gli elementi che hanno una classe che inizia per "nascosto-"
const elementiDaAnimare = document.querySelectorAll('.nascosto-basso, .nascosto-sinistra, .nascosto-destra');

elementiDaAnimare.forEach((el) => {
    osservatore.observe(el);
});

// LA LOGICA DELLA GALLERIA
const lightbox = document.getElementById('galleria-lightbox');
const immagineIngrandita = document.getElementById('immagine-ingrandita');
const pulsanteChiudi = document.querySelector('.chiudi-galleria');
const frecciaSx = document.getElementById('freccia-sx');
const frecciaDx = document.getElementById('freccia-dx');

// Catturiamo tutte le tue foto del collage
const tutteLeFoto = document.querySelectorAll('.terzoBlocco .foto');
let indiceFotoAttuale = 0;
let arraySorgentiFoto = [];

// Salviamo i link delle immagini
tutteLeFoto.forEach((foto, index) => {
    arraySorgentiFoto.push(foto.src);
    
    // Quando clicchi su una foto del collage...
    foto.addEventListener('click', () => {
        indiceFotoAttuale = index; // JS ricorda quale foto hai cliccato
        immagineIngrandita.src = arraySorgentiFoto[indiceFotoAttuale];
        lightbox.style.display = 'flex'; // Accende la galleria
    });
});

// Funzione per cambiare foto
function cambiaFoto(direzione) {
    indiceFotoAttuale += direzione;
    // Se andiamo oltre l'ultima, torniamo alla prima (e viceversa)
    if (indiceFotoAttuale >= arraySorgentiFoto.length) indiceFotoAttuale = 0;
    if (indiceFotoAttuale < 0) indiceFotoAttuale = arraySorgentiFoto.length - 1;
    immagineIngrandita.src = arraySorgentiFoto[indiceFotoAttuale];
}

// Eventi per i bottoni della galleria
pulsanteChiudi.addEventListener('click', () => lightbox.style.display = 'none');
frecciaDx.addEventListener('click', () => cambiaFoto(1));
frecciaSx.addEventListener('click', () => cambiaFoto(-1));

// Chicca da professionista: chiudere premendo il tasto ESC o cambiare con le frecce della tastiera!
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') lightbox.style.display = 'none';
        if (e.key === 'ArrowRight') cambiaFoto(1);
        if (e.key === 'ArrowLeft') cambiaFoto(-1);
    }
});


// CATTURIAMO IL POPUP E LA X
const scatolaPromo = document.getElementById('promo-fluttuante');
const bottoneChiudi = document.getElementById('chiudi-promo');

// QUANDO CLICCHI LA X, NASCONDI IL POPUP
bottoneChiudi.addEventListener('click', () => {
    scatolaPromo.style.display = 'none'; // Spegne letteralmente l'HTML
});

// IL MOTORE DEL RULLINO DELLE CARTE
const binarioCarte = document.getElementById('binario-carte');
const rullinoSx = document.getElementById('rullino-sx');
const rullinoDx = document.getElementById('rullino-dx');

// Quando clicchi a destra...
rullinoDx.addEventListener('click', () => {
    // Scorriamo il binario in avanti (circa la larghezza di una carta + il gap)
    binarioCarte.scrollBy({ left: 340, behavior: 'smooth' });
});

// Quando clicchi a sinistra...
rullinoSx.addEventListener('click', () => {
    // Scorriamo il binario indietro
    binarioCarte.scrollBy({ left: -340, behavior: 'smooth' });
});