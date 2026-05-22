// ==========================================
// 1. MOTORE DELLO STICKY REVEAL (La testata che scende)
// ==========================================
const header = document.querySelector('.testata');

window.addEventListener('scroll', () => {
    const scrollAttuale = window.scrollY || document.documentElement.scrollTop;
    if (scrollAttuale > 150) {
        header.classList.add('scesa');
    } else {
        header.classList.remove('scesa');
    }
});

// ==========================================
// 2. MOTORE DELLE ANIMAZIONI ALLO SCROLL
// ==========================================
const osservatore = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('mostra'); 
            osservatore.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 });

const elementiDaAnimare = document.querySelectorAll('.nascosto-basso, .nascosto-sinistra, .nascosto-destra');
elementiDaAnimare.forEach((el) => {
    osservatore.observe(el);
});

// ==========================================
// 3. IL MOTORE DEL NUOVO SLIDER "PERCHÈ SCEGLIERCI"
// ==========================================
let indiceRagione = 0;
const slidesRagioni = document.querySelectorAll('.slide-ragione');
const puntiSlider = document.querySelectorAll('.punto-slider');

// Assicuriamoci che il codice parta solo se lo slider esiste nella pagina
if (slidesRagioni.length > 0) {
    function mostraRagione(indice) {
        // Spegne tutto
        slidesRagioni.forEach(slide => slide.classList.remove('attiva'));
        puntiSlider.forEach(punto => punto.classList.remove('attivo'));

        // Accende quello giusto
        slidesRagioni[indice].classList.add('attiva');
        puntiSlider[indice].classList.add('attivo');
    }

    function cambiaRagione(direzione) {
        indiceRagione += direzione;
        if (indiceRagione >= slidesRagioni.length) { indiceRagione = 0; }
        if (indiceRagione < 0) { indiceRagione = slidesRagioni.length - 1; }
        mostraRagione(indiceRagione);
    }

    function vaiARagione(indice) {
        indiceRagione = indice;
        mostraRagione(indiceRagione);
    }

    // "Esportiamo" le funzioni per farle leggere ai pulsanti HTML (i trapani)
    window.cambiaRagione = cambiaRagione;
    window.vaiARagione = vaiARagione;
}

// ==========================================
// 4. LA LOGICA DELLA GALLERIA (Il Carrellino delle foto)
// ==========================================
const lightbox = document.getElementById('galleria-lightbox');
const immagineIngrandita = document.getElementById('immagine-ingrandita');
const pulsanteChiudi = document.querySelector('.chiudi-galleria');
const frecciaSx = document.getElementById('freccia-sx');
const frecciaDx = document.getElementById('freccia-dx');

const tutteLeFoto = document.querySelectorAll('.terzoBlocco .foto');
let indiceFotoAttuale = 0;
let arraySorgentiFoto = [];

if(tutteLeFoto.length > 0) {
    tutteLeFoto.forEach((foto, index) => {
        arraySorgentiFoto.push(foto.src);
        foto.addEventListener('click', () => {
            indiceFotoAttuale = index; 
            immagineIngrandita.src = arraySorgentiFoto[indiceFotoAttuale];
            lightbox.style.display = 'flex'; 
        });
    });

    function cambiaFotoGalleria(direzione) {
        indiceFotoAttuale += direzione;
        if (indiceFotoAttuale >= arraySorgentiFoto.length) indiceFotoAttuale = 0;
        if (indiceFotoAttuale < 0) indiceFotoAttuale = arraySorgentiFoto.length - 1;
        immagineIngrandita.src = arraySorgentiFoto[indiceFotoAttuale];
    }

    pulsanteChiudi.addEventListener('click', () => lightbox.style.display = 'none');
    frecciaDx.addEventListener('click', () => cambiaFotoGalleria(1));
    frecciaSx.addEventListener('click', () => cambiaFotoGalleria(-1));

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') lightbox.style.display = 'none';
            if (e.key === 'ArrowRight') cambiaFotoGalleria(1);
            if (e.key === 'ArrowLeft') cambiaFotoGalleria(-1);
        }
    });
}

// ==========================================
// 5. CATTURIAMO IL POPUP E LA X
// ==========================================
const scatolaPromo = document.getElementById('promo-fluttuante');
const bottoneChiudiPromo = document.getElementById('chiudi-promo');

if (bottoneChiudiPromo) {
    bottoneChiudiPromo.addEventListener('click', () => {
        scatolaPromo.style.display = 'none'; 
    });
}
// ==========================================
// 6. MENU HAMBURGER PER MOBILE
// ==========================================
const hamburger = document.getElementById('hamburger');
const menuPrincipale = document.getElementById('menu-principale');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // Aggiunge e toglie le classi per animare la X e aprire il menu
        hamburger.classList.toggle('attivo');
        menuPrincipale.classList.toggle('aperto');
    });

    // Chicca extra: se clicchi un bottone del menu, il menu si chiude da solo!
    const bottoniMenu = document.querySelectorAll('.bottone_menu');
    bottoniMenu.forEach(bottone => {
        bottone.addEventListener('click', () => {
            hamburger.classList.remove('attivo');
            menuPrincipale.classList.remove('aperto');
        });
    });
}