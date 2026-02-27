import {
  getLections,
  getLectionBySlug,
} from "../../../services/lection.service.js";
import { findAllAvailablePdfs } from "../../../services/materials.service.js";

import { errors } from "../../../helpers/error.helper.js";

import { safeString } from "../../../helpers/utils.helper.js";

export async function getIndexPage(req, res, next) {
  try {
    const lections = await getLections("otvoreno-racunarstvo");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // sortiraj po week da bude sigurno
    const sortedLections = [...lections].sort((a, b) => a.week - b.week);

    // pronađi trenutnu lekciju
    let currentLection = null;

    for (let i = sortedLections.length - 1; i >= 0; i--) {
      const lectionDate = new Date(sortedLections[i].date);
      lectionDate.setHours(0, 0, 0, 0);

      if (lectionDate <= today) {
        currentLection = sortedLections[i];
        break;
      }
    }

    // generiši workPlan iz lections
    const workPlan = sortedLections.map((lection) => {
      const d = new Date(lection.date);
      const formattedDate =
        String(d.getDate()).padStart(2, "0") +
        "." +
        String(d.getMonth() + 1).padStart(2, "0") +
        "." +
        d.getFullYear() +
        ".";

      return {
        week: lection.week,
        topic: lection.title,
        date: lection.date,
        formattedDate,
      };
    });

    const availableLections = sortedLections.filter((l) => {
      const d = new Date(l.date);
      d.setHours(0, 0, 0, 0);
      return d <= today;
    }).length;

    return res.status(200).render("subjects/otvoreno-racunarstvo/index", {
      lections: sortedLections,
      currentLection,
      workPlan,
      today,
      stats: {
        total: sortedLections.length,
        available: availableLections,
        percent: Math.round((availableLections / sortedLections.length) * 100),
      },
      pageStyles: "pages/subject.css"
    });
  } catch (error) {
    next(error);
  }
}

export async function getLectionDataPage(req, res, next) {
  try {
    const slug = safeString(req.params.slug);

    const rawLections = await getLections("otvoreno-racunarstvo");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sort + enrich (ISTO kao na index)
    const allLections = [...rawLections]
      .sort((a, b) => a.week - b.week)
      .map((l) => {
        const d = new Date(l.date);
        d.setHours(0, 0, 0, 0);

        return {
          ...l,
          available: d <= today,
          formattedDate: d.toLocaleDateString("sr-RS"),
        };
      });

    const index = allLections.findIndex((l) => l.slug === slug);

    if (index === -1) {
      throw errors.notFound("Lekcija nije pronađena");
    }

    const viewLection = allLections[index];

    if (!viewLection.available) {
      throw errors.forbidden("Lekcija još nije dostupna");
    }
    
    const prevCandidate = index > 0 ? allLections[index - 1] : null;
    const nextCandidate =
      index < allLections.length - 1 ? allLections[index + 1] : null;

    const navigation = {
      prev: prevCandidate && prevCandidate.available ? prevCandidate : null,
      next: nextCandidate && nextCandidate.available ? nextCandidate : null,
    };

    return res
      .status(200)
      .render(
        `subjects/otvoreno-racunarstvo/lections/${viewLection.template}`,
        {
          lections: allLections,
          lection: viewLection,
          navigation,
          currentSlug: slug,
          pageStyles: "pages/lection.css"
        },
      );
  } catch (error) {
    next(error);
  }
}

export async function getMaterialsPage(req, res, next) {
  try {
    const result = await findAllAvailablePdfs("otvoreno-racunarstvo");

    if (!result) {
      return res.status(404).render("error", {
        message: "Materijali nisu pronađeni",
      });
    }

    res.render("subjects/otvoreno-racunarstvo/materials", result);
  } catch (error) {
    next(error);
  }
}
