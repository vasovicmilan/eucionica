(function() {
    const form = document.getElementById('httpForm');
    if (!form) return;

    const responseContainer = document.getElementById('responseContainer');
    const requestStatus = document.getElementById('requestStatus');
    const handshakeInfo = document.getElementById('handshakeInfo');
    const handshakeTitle = document.getElementById('handshakeTitle');
    const handshakeDetails = document.getElementById('handshakeDetails');
    const customUrlInput = document.getElementById('customUrl');
    
    // API endpoint - relativna putanja
    const API_URL = '/otvoreno-racunarstvo/api/http-explorer';
    const HANDSHAKE_API_URL = '/otvoreno-racunarstvo/api/http-explorer/handshake';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const selectedEndpoint = document.querySelector('input[name="endpoint"]:checked').value;
        let url = customUrlInput.value.trim();
        
        // Prikaži handshake info - ukloni d-none klasu
        handshakeInfo.classList.remove('d-none');
        
        // Resetuj klase
        handshakeInfo.classList.remove(
            'lection__handshake--http',
            'lection__handshake--https',
            'lection__handshake--json'
        );
        
        handshakeTitle.classList.remove(
            'lection__handshake-title--http',
            'lection__handshake-title--https',
            'lection__handshake-title--json'
        );
        
        requestStatus.className = 'lection__status lection__status--info';
        requestStatus.innerHTML = `⏳ Šaljem zahtev na: ${url}...`;
        responseContainer.textContent = '⏳ Sačekaj, šaljem zahtev na backend...';
        
        try {
            // 1. Prvo pošalji zahtev na backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: url,
                    protocol: selectedEndpoint
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP greška! status: ${response.status}`);
            }

            const data = await response.json();
            
            // 2. Prikaži handshake podatke (dolaze sa backenda)
            if (data.handshake) {
                handshakeInfo.classList.add(data.handshake.className);
                handshakeTitle.classList.add(data.handshake.titleClass);
                handshakeTitle.textContent = data.handshake.title;
                handshakeDetails.textContent = data.handshake.details;
            } else {
                // Ako nema handshake podataka, probaj da ih dobiješ posebno
                try {
                    const handshakeResponse = await fetch(`${HANDSHAKE_API_URL}?protocol=${selectedEndpoint}`);
                    const handshakeData = await handshakeResponse.json();
                    
                    handshakeInfo.classList.add(handshakeData.className);
                    handshakeTitle.classList.add(handshakeData.titleClass);
                    handshakeTitle.textContent = handshakeData.title;
                    handshakeDetails.textContent = handshakeData.details;
                } catch (handshakeError) {
                    console.warn('Ne mogu dobiti handshake podatke:', handshakeError);
                }
            }

            // 3. Prikaži status
            requestStatus.className = 'lection__status';
            
            if (!data.success) {
                // Greška od backenda
                requestStatus.classList.add('lection__status--error');
                requestStatus.innerHTML = `❌ Greška: ${data.error?.message || 'Nepoznata greška'}`;
                
                if (data.data) {
                    responseContainer.textContent = typeof data.data === 'string' 
                        ? data.data 
                        : JSON.stringify(data.data, null, 2);
                } else {
                    responseContainer.textContent = 'Došlo je do greške na serveru.';
                }
                
                return;
            }

            // Uspešan odgovor
            if (data.simulated) {
                // Simulirani HTTP odgovor (zbog Render ograničenja)
                requestStatus.classList.add('lection__status--warning');
                requestStatus.innerHTML = `⚠️ SIMULACIJA | Status: 200 OK (simulirano) | Vreme: ${data.data.responseTime}ms<br>⚠️ ${data.data.warning || 'HTTP saobraćaj nije šifrovan!'}`;
            } else if (data.data) {
                // Pravi odgovor
                const protocol = data.data.protocol === 'https' ? '🔒 HTTPS' : '⚠️ HTTP';
                const statusClass = data.data.status >= 200 && data.data.status < 300 
                    ? 'lection__status--success' 
                    : 'lection__status--error';
                
                requestStatus.classList.add(statusClass);
                
                let statusHtml = `${protocol} | Status: ${data.data.status} ${data.data.statusText || ''} | Vreme: ${data.data.responseTime}ms`;
                
                if (data.data.protocol === 'http' && !data.simulated) {
                    statusHtml += `<br>⚠️ Upozorenje: HTTP saobraćaj nije šifrovan!`;
                }
                
                requestStatus.innerHTML = statusHtml;
            }

            // 4. Prikaži odgovor
            if (data.data && data.data.data) {
                responseContainer.textContent = typeof data.data.data === 'string' 
                    ? data.data.data 
                    : JSON.stringify(data.data.data, null, 2);
            } else {
                responseContainer.textContent = 'Nema podataka u odgovoru.';
            }
            
        } catch (error) {
            console.error('Fetch error:', error);
            
            requestStatus.className = 'lection__status lection__status--error';
            requestStatus.innerHTML = `❌ Greška: ${error.message}`;
            
            responseContainer.textContent = `Došlo je do greške prilikom slanja zahteva.
            
Detalji: ${error.message}

Mogući uzroci:
• Backend server ne radi
• API ruta nije dostupna
• Mrežni problemi

Proveri da li je server pokrenut i da li ruta /otvoreno-racunarstvo/api/http-explorer postoji.`;
        }
    });
    
    // Promena radio button-a
    const radioButtons = document.querySelectorAll('input[name="endpoint"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            // Promeni URL prema izabranom protokolu
            if (e.target.value === 'http') {
                customUrlInput.value = 'jsonplaceholder.typicode.com/posts/1';
            } else if (e.target.value === 'https') {
                customUrlInput.value = 'jsonplaceholder.typicode.com/posts/1';
            } else {
                customUrlInput.value = 'jsonplaceholder.typicode.com/posts';
            }
            
            // Resetuj prikaz
            responseContainer.textContent = 'Čekam tvoj zahtev...';
            requestStatus.className = 'lection__status';
            requestStatus.innerHTML = '';
            
            // Sakrij handshake info
            handshakeInfo.classList.add('d-none');
        });
    });

    // Opciono: dodaj dugme za testiranje
    const testButtons = document.querySelectorAll('.test-url-btn');
    testButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const url = e.target.dataset.url;
            const protocol = e.target.dataset.protocol || 'https';
            
            customUrlInput.value = url;
            
            // Izaberi odgovarajući radio
            document.querySelector(`input[name="endpoint"][value="${protocol}"]`).checked = true;
            
            // Triggeruj submit
            form.dispatchEvent(new Event('submit'));
        });
    });
})();