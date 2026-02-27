import { findAllPdfs } from "../repositories/materials.repository.js";

export async function findAllAvailablePdfs(subject) {
    try {
        const data = await findAllPdfs(subject);
        if (!data) return null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const availableMaterials = data.materials.map(item => {
            const unlockDate = new Date(item.date);
            unlockDate.setHours(0, 0, 0, 0);

            return {
                ...item,
                available: unlockDate <= today,
                downloadPath: `/pdfs/${subject}/${item.file}`
            };
        });

        return {
            subject: data.subject,
            materials: availableMaterials
        };
    } catch (error) {
        throw error;
    }
}