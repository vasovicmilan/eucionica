import { getLections, getLectionBySlug } from "../../../services/lection.service.js";
import { safeString } from "../../../helpers/utils.helper.js";

export async function getIndexPage(req, res, next) {
    try {
        const result = await getLections("multimedijalne-aplikacije");

        return res.status(200).render("subjects/multimedijalne-aplikacije/index", {
            lections: result
        })
    } catch (error) {
        next(error);
    }
}

export async function getLectionDataPage(req, res, next) {
    try {
        const slug = safeString(req.params.slug);

        // const result = await getLectionBySlug(slug, "multimedijalne-aplikacije");

        return res.status(200).render(`subjects/multimedijalne-aplikacije/lections/${slug}`);
    } catch (error) {
        next(error)
    }
}