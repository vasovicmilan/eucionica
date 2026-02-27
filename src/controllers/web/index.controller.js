export async function getIndexPage(req, res, next) {
    try {
        const subjects = [
            {
                name: 'Otvoreno računarstvo',
                slug: 'otvoreno-racunarstvo',
                icon: '💻',
                description: 'Proučavanje otvorenih softverskih sistema, tehnologija i standarda',
                weeks: 12,
                espb: 8
            },
            {
                name: 'Multimedijalne i grafičke aplikacije',
                slug: 'multimedijalne-aplikacije',
                icon: '🎨',
                description: 'Rad sa slikom, zvukom i videom, kreiranje interaktivnih multimedijalnih sadržaja',
                weeks: 12,
                espb: 8
            }
        ];

        const stats = {
            activeSubjects: 2,
            totalLessons: 24,
            openAccess: 100
        };

        const features = [
            {
                icon: '📚',
                title: 'Strukturirani materijali',
                description: 'Svi predmeti organizovani po nedeljama i temama za lakše praćenje'
            },
            {
                icon: '📊',
                title: 'Praćenje napretka',
                description: 'Jasan pregled završenih i predstojećih lekcija'
            },
            {
                icon: '🔓',
                title: 'Potpuno otvoren pristup',
                description: 'Svi materijali dostupni bez ograničenja'
            }
        ];

        const meta = {
            title: 'E-učionica - Digitalno okruženje za savremeno učenje',
            description: 'Centralno mesto za nastavne materijale, predavanja i resurse u okviru studijskih predmeta. Potpuno otvoren pristup za sve studente.',
            keywords: 'e-učionica, online učenje, nastavni materijali, predavanja, otvoreno obrazovanje'
        };

        return res.status(200).render("index", {
            pageTitle: "E-učionica",
            pageDescription: meta.description,
            pageKeywords: meta.keywords,
            
            pageStyles: "pages/home.css",
            
            subjects: subjects,
            stats: stats,
            features: features,
            
            currentYear: new Date().getFullYear(),
            isHomePage: true
        });

    } catch (error) {
        next(error);
    }
}