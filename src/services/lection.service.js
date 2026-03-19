import https from 'https';
import axios from 'axios';
import { findAllLections, findOneLection } from "../repositories/lection.repository.js";

// ... ostali importi ako postoje ...

export async function getLections(subject) {
    try {
        const result = await findAllLections(subject);
        
        // Opciono: dodaj neku poslovnu logiku
        // Npr. sortiranje, filtriranje, transformacija podataka
        return {lections: result.lections, subject: result.subject};
        
    } catch (error) {
        console.error(`Greška u getLections servisu za ${subject}:`, error);
        throw error; // Propagiraj grešku kontroleru
    }
}

export async function getLectionBySlug(slug, subject) {
    try {
        if (!slug || !subject) {
            throw new Error("Slug i subject su obavezni parametri");
        }
        
        const lection = await findOneLection(slug, subject);
        
        if (!lection) {
            return null; // Kontroler će ovo detektovati i vratiti 404
        }
        
        return lection;
        
    } catch (error) {
        console.error(`Greška u getLectionBySlug servisu za ${slug}:`, error);
        throw error; // Propagiraj grešku kontroleru
    }
}

/**
 * Servis za HTTP Explorer - proverava URL i vraća odgovor
 * @param {string} url - URL koji treba proveriti
 * @param {string} protocol - 'http' ili 'https'
 * @returns {Promise<Object>} - Odgovor sa podacima ili simulacijom
 */
export async function exploreHttp(url, protocol) {
    try {
        // Validacija URL-a
        if (!url.startsWith('http')) {
            if (protocol === 'http') {
                url = 'http://' + url;
            } else {
                url = 'https://' + url;
            }
        }

        // Za Render free tier - HTTP je blokiran, pa vraćamo simulaciju
        if (protocol === 'http') {
            // Pokušaj prvo pravi HTTP zahtev (ako uspe - super)
            try {
                const result = await fetchHttpUrl(url);
                if (result.success) {
                    return result;
                }
            } catch (e) {
                console.log('HTTP request failed, returning simulation');
            }

            // Ako ne uspe, vrati simulaciju
            return simulateHttpRequest(url);
        }

        // Za HTTPS - pravi zahtev
        return await fetchHttpsUrl(url);

    } catch (error) {
        console.error('Greška u exploreHttp servisu:', error);
        return {
            success: false,
            error: {
                message: error.message,
                code: error.code || 'UNKNOWN_ERROR'
            }
        };
    }
}

/**
 * Fetch HTTP URL (pokušaj pravog zahteva)
 */
async function fetchHttpUrl(url) {
    try {
        const startTime = Date.now();
        
        const response = await axios({
            method: 'GET',
            url: url,
            timeout: 5000,
            maxRedirects: 5,
            validateStatus: (status) => true // Prihvatamo sve status kodove
        });

        const endTime = Date.now();

        return formatResponse(response, url, endTime - startTime, 'http');

    } catch (error) {
        return {
            success: false,
            error: {
                message: error.message,
                code: error.code
            }
        };
    }
}

/**
 * Fetch HTTPS URL
 */
async function fetchHttpsUrl(url) {
    try {
        const startTime = Date.now();
        
        const response = await axios({
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'User-Agent': 'HTTP-Explorer/1.0'
            },
            timeout: 10000,
            maxRedirects: 5,
            validateStatus: (status) => true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false // Za self-signed sertifikate
            })
        });

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        return formatResponse(response, url, responseTime, 'https');

    } catch (error) {
        // Ako je server odgovorio sa greškom (4xx, 5xx)
        if (error.response) {
            return formatResponse(error.response, url, 0, 'https');
        }

        return {
            success: false,
            error: {
                message: error.message,
                code: error.code || 'FETCH_ERROR'
            }
        };
    }
}

/**
 * Formatiraj axios response u naš format
 */
function formatResponse(response, url, responseTime, protocol) {
    const contentType = response.headers['content-type'] || 'text/plain';
    let formattedData = response.data;

    // Ako je JSON, lepo formatiraj
    if (contentType.includes('application/json')) {
        if (typeof response.data === 'object') {
            formattedData = JSON.stringify(response.data, null, 2);
        }
    } else if (typeof response.data === 'string') {
        // Ako je tekst, skrati ako je predugačak
        if (response.data.length > 2000) {
            formattedData = response.data.substring(0, 2000) + '\n... (odgovor je skraćen)';
        }
    }

    return {
        success: true,
        data: {
            url: url,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            data: formattedData,
            responseTime: responseTime,
            protocol: protocol,
            contentType: contentType
        }
    };
}

/**
 * Simulira HTTP zahtev za edukativne svrhe
 */
function simulateHttpRequest(url) {
    return {
        success: true,
        simulated: true,
        data: {
            url: url,
            status: 200,
            statusText: 'OK (simulirano)',
            headers: {
                'content-type': 'application/json',
                'x-simulated': 'true',
                'x-warning': 'HTTP saobraćaj nije šifrovan'
            },
            data: JSON.stringify({
                id: 1,
                title: "🌐 Simulirani HTTP odgovor",
                body: "Pošto Render free tier blokira HTTP saobraćaj, ovo je simulirani odgovor.\n\nU stvarnosti, HTTP saobraćaj nije šifrovan i podaci se prenose u čistom tekstu. To znači da svako ko presreće komunikaciju može da vidi:\n• URL koji posećuješ\n• Podatke koje šalješ\n• Odgovore servera\n\n🔴 RANJIVOSTI HTTP-a:\n• Man-in-the-Middle napadi\n• Sniffing (prisluškivanje)\n• Session hijacking\n• Data tampering\n\n✅ Zato uvek koristi HTTPS kada god je to moguće!",
                userId: 1,
                warning: "Ovo je edukativna simulacija. Pravi HTTP zahtev bi izgledao ovako, ali bi bio nebezbedan."
            }, null, 2),
            responseTime: 150,
            protocol: 'http',
            contentType: 'application/json'
        }
    };
}

/**
 * Vraća handshake podatke za edukaciju
 */
export function getHandshakeData(protocol = 'https') {
    const handshakeData = {
        http: {
            title: '⚠️ HTTP - Nema enkripcije',
            details: `HTTP NE KORISTI SSL/TLS handshake.

Podaci se prenose u ČISTOM TEKSTU:

🔴 Šta napadač može da vidi:
• ceo URL (npr. /login?user=pera&pass=123)
• kolačiće (cookies) - session hijacking
• form podatke (lozinke, kreditne kartice)
• slike, HTML, JavaScript

🛡️ Kako se zaštititi:
• Koristi HTTPS (SSL/TLS)
• HSTS (HTTP Strict Transport Security)
• Nikad ne šalji osetljive podatke preko HTTP

➡️ Zato se HTTP više ne koristi za moderne web sajtove!`,
            className: 'lection__handshake--http',
            titleClass: 'lection__handshake-title--http'
        },
        https: {
            title: '🔒 HTTPS - Bezbedna komunikacija',
            details: `TLS 1.3 Handshake - KORAK PO KORAK:

1. 🔹 Client Hello
   • Klijent: "Zdravo, podržavam TLS 1.3, AES_256_GCM"
   • Generiše random broj (28 bajtova)

2. 🔸 Server Hello
   • Server: "OK, koristimo TLS 1.3 i AES_256_GCM"
   • Šalje svoj random broj
   • Šalje DIGITALNI SERTIFIKAT

3. 📜 Provera sertifikata
   • Izdavalac: Let's Encrypt, DigiCert,...
   • Potpis: Validan (proveren kod CA)
   • Domain: poklapa se sa URL-om
   • Rok: nije istekao

4. 🔑 Key Exchange
   • Razmena ključeva (ECDHE)
   • Svaka strana kreira session ključ
   • Perfect Forward Secrecy

5. 🔐 Change Cipher Spec
   • "Od sada sve šaljemo šifrovano!"
   • MAC (Message Authentication Code)
   • Zaštićen integritet podataka

✅ Handshake završen za ~3ms
Sva dalja komunikacija je šifrovana!`,
            className: 'lection__handshake--https',
            titleClass: 'lection__handshake-title--https'
        },
        json: {
            title: '🔒 HTTPS + JSON API',
            details: `Kako radi API preko HTTPS-a:

1. 🌐 TCP konekcija (3-way handshake)
   • SYN → SYN-ACK → ACK

2. 🔒 TLS handshake (isto kao HTTPS)
   • Client Hello → Server Hello → Sertifikat → Key Exchange

3. 📤 HTTP zahtev (šifrovano)
   \`\`\`
   GET /api/posts/1 HTTP/1.1
   Host: jsonplaceholder.typicode.com
   Accept: application/json
   \`\`\`

4. 📥 HTTP odgovor (šifrovano)
   \`\`\`
   HTTP/1.1 200 OK
   Content-Type: application/json
   
   {
     "id": 1,
     "title": "Post",
     "body": "Content..."
   }
   \`\`\`

5. 📊 JSON parsing
   • Browser/JS parsira u objekat
   • Laka manipulacija podacima

PREDNOSTI:
✅ Šifrovano (privatnost)
✅ JSON je lightweight
✅ Podržano u svim jezicima
✅ Idealno za web i mobile app

ZAŠTO JE BOLJE OD HTTP:
• Podaci nisu vidljivi napadaču
• Ne može Man-in-the-Middle
• Autentifikacija servera`,
            className: 'lection__handshake--json',
            titleClass: 'lection__handshake-title--json'
        }
    };

    return handshakeData[protocol] || handshakeData.https;
}