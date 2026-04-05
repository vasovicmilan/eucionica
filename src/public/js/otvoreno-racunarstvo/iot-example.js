// public/js/otvoreno-racunarstvo/iot-dashboard.js
(function() {
    let intervalId = null;

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    function stopPolling() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.log('Polling zaustavljen jer nema podataka.');
        }
    }

    function fetchReadings() {
        fetch('/otvoreno-racunarstvo/api/iot/latest-readings')
            .then(res => res.json())
            .then(data => {
                const tbody = document.getElementById('iotTableBody');
                if (!tbody) return;

                // Ako nema podataka
                if (data.length === 0) {
                    // Prikaži poruku samo ako već nije prikazana
                    if (tbody.innerHTML.includes('Još nema podataka')) return;
                    tbody.innerHTML = '<tr><td colspan="6">Još nema podataka. Pošaljite prvi POST zahtev sa ESP32.</td></tr>';
                    // Zaustavi dalje provere
                    stopPolling();
                    return;
                }

                // Ima podataka – prikaži ih
                tbody.innerHTML = data.map(r => `
                    <tr>
                        <td>${new Date(r.timestamp).toLocaleString()}</td>
                        <td>${escapeHtml(r.device)}</td>
                        <td>${r.temperature}</td>
                        <td>${escapeHtml(r.tempStatus || '')}</td>
                        <td>${r.humidity}</td>
                        <td>${escapeHtml(r.humStatus || '')}</td>
                    </tr>
                `).join('');
            })
            .catch(err => console.error('Greška pri dohvatanju podataka:', err));
    }

    // Prvo učitavanje
    fetchReadings();
    // Pokreni periodično proveravanje (na 60 sekundi)
    intervalId = setInterval(fetchReadings, 60000);
})();