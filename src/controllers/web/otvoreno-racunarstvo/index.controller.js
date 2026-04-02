import {
  getLections,
  getLectionBySlug,
  exploreHttp,
  getHandshakeData,
} from "../../../services/lection.service.js";
import { findAllAvailablePdfs } from "../../../services/materials.service.js";

import { errors } from "../../../helpers/error.helper.js";

import { safeString } from "../../../helpers/utils.helper.js";

import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// __dirname za ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getIndexPage(req, res, next) {
  try {
    const result = await getLections("otvoreno-racunarstvo");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // sortiraj po week da bude sigurno
    const sortedLections = [...result.lections].sort((a, b) => a.week - b.week);

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

    const result = await getLections("otvoreno-racunarstvo");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sort + enrich (ISTO kao na index)
    const allLections = [...result.lections]
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

/**
 * API endpoint za HTTP Explorer
 * POST /otvoreno-racunarstvo/api/http-explorer
 */
export async function exploreHttpEndpoint(req, res, next) {
  try {
    const { url, protocol } = req.body;

    // Validacija
    if (!url) {
      return res.status(400).json({
        success: false,
        error: {
          message: "URL je obavezan"
        }
      });
    }

    if (protocol && !['http', 'https', 'json'].includes(protocol)) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Protocol mora biti http, https ili json"
        }
      });
    }

    // Pozovi servis
    const result = await exploreHttp(url, protocol || 'https');

    // Dodaj handshake podatke za edukaciju
    if (result.success) {
      result.handshake = getHandshakeData(protocol || 'https');
    }

    // Vrati rezultat
    return res.status(200).json(result);

  } catch (error) {
    console.error('Greška u exploreHttpEndpoint:', error);
    return res.status(500).json({
      success: false,
      error: {
        message: 'Interna greška servera',
        code: 'INTERNAL_ERROR'
      }
    });
  }
}

/**
 * API endpoint za handshake podatke
 * GET /otvoreno-racunarstvo/api/http-explorer/handshake
 */
export async function getHandshakeEndpoint(req, res, next) {
  try {
    const { protocol } = req.query;
    const handshake = getHandshakeData(protocol || 'https');
    return res.status(200).json(handshake);
  } catch (error) {
    console.error('Greška u getHandshakeEndpoint:', error);
    return res.status(500).json({
      error: 'Interna greška servera'
    });
  }
}

/**
 * JSON example endpoint
 * GET /api-example/json
 */
export async function getJsonExample(req, res) {
  res.json({
    id: 1,
    title: 'example JSON odgovor',
    body: 'Ovo je JSON koji vraća naš server za potrebe iframe demonstracije.',
    userId: 1,
    timestamp: new Date().toISOString()
  });
}

/**
 * HTML example endpoint
 * GET /api-example/html
 */
export async function getHtmlExample(req, res) {
    res.render('subjects/otvoreno-racunarstvo/api-example.ejs', {
        // Možeš proslediti i dodatne podatke ako želiš
    });
}

/**
 * Slika example endpoint
 * GET /api-example/image
 * Vraća postojeću sliku iz public/images/example-image.png
 */
export async function getImageExample(req, res) {
  const imagePath = path.join(process.cwd(), 'src', 'data', 'images', 'otvoreno-racunarstvo', 'api-example.png');
  
  try {
    // Pokušaj da učitaš i skaliraš sliku
    const buffer = await sharp(imagePath)
      .resize(800, 600, { fit: 'inside' })
      .png()
      .toBuffer();
    
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.log(err);
    // Ako slika ne postoji ili je oštećena, vrati običan tekst
    res.status(404).type('text/plain').send('Slika nije pronađena');
  }
}

/**
 * PDF example endpoint
 * GET /api-example/pdf
 * Vraća postojeći PDF fajl iz public/files/example.pdf
 */
export async function getPdfExample(req, res) {
  console.log(__dirname);
  const pdfPath = path.join(__dirname, '../../../../src/public/pdfs/api-example.pdf');
  console.log(pdfPath);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="api-example.pdf"');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.sendFile(pdfPath, (err) => {
    if (err) {
      console.error('Greška pri slanju PDF-a:', err);
      res.status(404).send('PDF dokument nije pronađen');
    }
  });
}