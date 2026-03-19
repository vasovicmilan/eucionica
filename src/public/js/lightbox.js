(function() {
    'use strict';

    // Utility funkcije za rad sa klasama (ako već nisu definisane)
    function addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
    }

    function removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    function hasClass(el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        }
    }

    // Kreiraj lightbox elemente ako ne postoje
    function initLightbox() {
        if (document.getElementById('lightboxOverlay')) return;

        // Overlay
        const overlay = document.createElement('div');
        overlay.id = 'lightboxOverlay';
        overlay.className = 'lightbox-overlay d-none'; // Početno sakriven
        
        // Kontejner za sliku
        const container = document.createElement('div');
        container.className = 'lightbox-container';
        
        // Slika
        const img = document.createElement('img');
        img.className = 'lightbox-image';
        img.alt = '';
        
        // Dugme za zatvaranje
        const closeBtn = document.createElement('div');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Zatvori');
        
        // Loading indikator
        const loading = document.createElement('div');
        loading.className = 'lightbox-loading d-none'; // Početno sakriven
        loading.innerHTML = '⏳';
        
        // Sastavi
        container.appendChild(img);
        container.appendChild(closeBtn);
        container.appendChild(loading);
        overlay.appendChild(container);
        
        // Dodaj u body
        document.body.appendChild(overlay);
        
        // Event listeners
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay || e.target === closeBtn) {
                hideLightbox();
            }
        });
        
        // ESC taster za zatvaranje
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !hasClass(overlay, 'd-none')) {
                hideLightbox();
            }
        });
    }

    // Prikaži lightbox
    function showLightbox(imgSrc, imgAlt) {
        const overlay = document.getElementById('lightboxOverlay');
        const img = document.querySelector('.lightbox-image');
        const loading = document.querySelector('.lightbox-loading');
        
        if (!overlay || !img) return;
        
        // Prikaži loading (ukloni d-none klasu)
        removeClass(loading, 'd-none');
        
        // Sakrij sliku (dodaj d-none klasu)
        addClass(img, 'd-none');
        
        // Postavi novu sliku
        img.src = imgSrc;
        img.alt = imgAlt || 'Povećana slika';
        
        // Kada se slika učita
        img.onload = function() {
            // Sakrij loading
            addClass(loading, 'd-none');
            // Prikaži sliku
            removeClass(img, 'd-none');
        };
        
        // Ako slika ne može da se učita
        img.onerror = function() {
            // Sakrij loading
            addClass(loading, 'd-none');
            // Prikaži sliku (sa placeholder-om)
            removeClass(img, 'd-none');
            img.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\' viewBox=\'0 0 400 300\'%3E%3Crect width=\'400\' height=\'300\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'Arial\' font-size=\'24\' fill=\'%23999\'%3ESlika nije dostupna%3C/text%3E%3C/svg%3E';
        };
        
        // Prikaži overlay (ukloni d-none klasu)
        removeClass(overlay, 'd-none');
        
        // Spreči skrolovanje pozadine - dodaj klasu na body
        addClass(document.body, 'overflow-hidden');
    }

    // Sakrij lightbox
    function hideLightbox() {
        const overlay = document.getElementById('lightboxOverlay');
        if (!overlay) return;
        
        // Sakrij overlay (dodaj d-none klasu)
        addClass(overlay, 'd-none');
        
        // Vrati skrol - ukloni klasu sa body
        removeClass(document.body, 'overflow-hidden');
        
        // Resetuj sliku (opciono, da ne ostaje stara slika u memoriji)
        const img = document.querySelector('.lightbox-image');
        if (img) {
            img.src = '';
        }
    }

    // Inicijalizuj kada se DOM učita
    document.addEventListener('DOMContentLoaded', function() {
        initLightbox();
        
        // Pronađi sve slike u terminalu i dodaj event listener
        const terminalImages = document.querySelectorAll('.lection__terminal img');
        
        terminalImages.forEach(img => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                const src = this.src;
                const alt = this.alt;
                showLightbox(src, alt);
            });
            
            // Dodaj aria-label za pristupačnost
            img.setAttribute('aria-label', 'Klikni za uvećanje');
            img.setAttribute('role', 'button');
            img.setAttribute('tabindex', '0');
            
            // Dodaj mogućnost otvaranja sa Enter tasterom
            img.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    });

    // Eksportuj funkcije za globalni pristup (opciono)
    window.lightbox = {
        show: showLightbox,
        hide: hideLightbox
    };
})();