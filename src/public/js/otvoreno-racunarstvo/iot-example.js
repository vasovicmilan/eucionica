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

    function format(val, unit = '') {
        if (val === undefined || val === null || isNaN(val)) return '-';
        return `${val}${unit}`;
    }

    function fetchReadings() {
        fetch('/otvoreno-racunarstvo/api/iot/latest-readings')
            .then(res => res.json())
            .then(data => {
                const tbody = document.getElementById('iotTableBody');
                if (!tbody) return;

                // Ako nema podataka
                if (!Array.isArray(data) || data.length === 0) {
                    if (tbody.innerHTML.includes('Još nema podataka')) return;
                    tbody.innerHTML = '<tr><td colspan="8">Još nema podataka. Pošaljite prvi POST zahtev sa ESP32.</td></tr>';
                    stopPolling();
                    return;
                }

                // Ima podataka
                tbody.innerHTML = data.map(r => `
                    <tr>
                        <td>${new Date(r.timestamp).toLocaleString()}</td>
                        <td>${escapeHtml(r.device)}</td>
                        <td>${format(r.temperature, '°C')}</td>
                        <td>${format(r.humidity, '%')}</td>
                        <td>${format(r.pressure, ' hPa')}</td>
                        <td>${format(r.soil, '%')}</td>
                        <td>${format(r.rain, '%')}</td>
                        <td>${format(r.light, '%')}</td>
                    </tr>
                `).join('');
            })
            .catch(err => console.error('Greška pri dohvatanju podataka:', err));
    }

    // inicijalno učitavanje
    fetchReadings();

    // polling na 10s (možeš menjati)
    intervalId = setInterval(fetchReadings, 10000);
})();