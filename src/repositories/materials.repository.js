import fs from "fs/promises";
import path from "path";

export async function findAllPdfs(subject) {
    try {
        const filePath = path.join(
            process.cwd(),
            "src",
            "data",
            "jsons",
            `${subject}.json`
        );

        const raw = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(raw);

        return {
            subject: data.subject,
            materials: data.materials || []
        };
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw error;
    }
}