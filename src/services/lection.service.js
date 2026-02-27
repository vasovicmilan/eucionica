import { findAllLections, findOneLection } from "../repositories/lection.repository.js";

export async function getLections(subject) {
    try {
        const lections = await findAllLections(subject);
        
        // Opciono: dodaj neku poslovnu logiku
        // Npr. sortiranje, filtriranje, transformacija podataka
        return lections;
        
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