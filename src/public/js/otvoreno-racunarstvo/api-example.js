// public/js/otvoreno-racunarstvo/api-iframe-example.js
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const exampleSelect = document.getElementById('exampleSelect');
        const loadButton = document.getElementById('loadLocalButton');
        const iframe = document.getElementById('localIframe');

        if (!exampleSelect || !loadButton || !iframe) {
            console.warn('Elementi za iframe example nisu pronađeni.');
            return;
        }

        function loadUrl(url) {
            if (!url) return;
            if (url.toLowerCase().startsWith('javascript:')) {
                alert('Nije dozvoljeno učitavanje javascript: protokola.');
                return;
            }
            // Ukloni sandbox za sve sadržaje (svi su istog porijekla)
            iframe.removeAttribute('sandbox');
            iframe.src = url;
        }

        loadButton.addEventListener('click', function() {
            const selectedUrl = exampleSelect.value;
            if (selectedUrl) {
                loadUrl(selectedUrl);
            } else {
                alert('Molimo izaberite tip odgovora.');
            }
        });

        // Inicijalno učitaj JSON
        loadUrl('/otvoreno-racunarstvo/api-example/json');
    });
})();