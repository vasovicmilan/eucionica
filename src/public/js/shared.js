'use strict';

document.addEventListener('DOMContentLoaded', function () {

    /* ===========================
       TOP NAV TOGGLE
    =========================== */

    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('open');
        });
    }

    /* ===========================
       SIDEBAR TOGGLE
    =========================== */

    const sidebarToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (sidebarToggle && navList) {
        sidebarToggle.addEventListener('click', function () {
            navList.classList.toggle('open');
        });
    }

    /* ===========================
       PROGRESS BAR (CSP SAFE)
    =========================== */

    const progressBar = document.querySelector('.progress-bar');

    if (progressBar) {
        const percent = progressBar.dataset.progress;

        if (percent) {
            progressBar.style.width = percent + '%';
        }
    }

});