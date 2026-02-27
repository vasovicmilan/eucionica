'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const backBtn = document.getElementById('goBackBtn');

    if (!backBtn) return;

    backBtn.addEventListener('click', function () {
        if (window.history.length > 1) {
            window.history.back();
            return;
        }

        if (document.referrer && document.referrer !== window.location.href) {
            window.location.href = document.referrer;
            return;
        }

        window.location.href = '/';
    });
});