import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Putanja do JSON fajlova (relativna u odnosu na repo fajl)
const DATA_PATH = path.join(__dirname, '../data/jsons');

export async function findAllLections(subject) {
    try {
        const filePath = path.join(DATA_PATH, `${subject}.json`);

        // Čitanje fajla
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        
        return data.lections || [];
        
    } catch (error) {
        // Ako fajl ne postoji, vrati prazan niz
        if (error.code === 'ENOENT') {
            console.warn(`Fajl ${subject}.json ne postoji.`);
            return [];
        }
        
        console.error(`Greška u findAllLections za ${subject}:`, error);
        throw error; // Propagiraj grešku dalje
    }
}

export async function findOneLection(slug, subject) {
    try {
        const filePath = path.join(DATA_PATH, `${subject}.json`);
        
        // Čitanje fajla
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        
        // Pronađi lekciju sa datim slug-om
        const lection = data.lections?.find(l => l.slug === slug);
        
        return lection || null;
        
    } catch (error) {
        // Ako fajl ne postoji, vrati null
        if (error.code === 'ENOENT') {
            console.warn(`Fajl ${subject}.json ne postoji.`);
            return null;
        }
        
        console.error(`Greška u findOneLection za ${slug}:`, error);
        throw error; // Propagiraj grešku dalje
    }
}