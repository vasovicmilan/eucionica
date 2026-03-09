export async function getIndexPage(req, res, next) {
    try {

        const subjects = [
            {
                name: 'Teorija sistema i informacija',
                slug: 'teorija-sistema',
                icon: '🧠',
                description: 'Osnovni pojmovi teorije sistema, modelovanje sistema i analiza strukture kompleksnih sistema.',
                weeks: 12,
                espb: 8
            },
            {
                name: 'Otvoreno računarstvo',
                slug: 'otvoreno-racunarstvo',
                icon: '💻',
                description: 'Proučavanje otvorenog softvera, otvorenih standarda i digitalnih infrastruktura.',
                weeks: 12,
                espb: 8
            },
            {
                name: 'Multimedijalne i grafičke aplikacije',
                slug: 'multimedijalne-aplikacije',
                icon: '🎨',
                description: 'Rad sa slikom, zvukom i videom i razvoj multimedijalnih aplikacija.',
                weeks: 12,
                espb: 8
            }
        ];


        const features = [
            {
                icon: '📚',
                title: 'Strukturirani materijali',
                description: 'Predavanja i materijali organizovani po nedeljama.'
            },
            {
                icon: '📂',
                title: 'Centralizovani resursi',
                description: 'Svi dokumenti i prezentacije dostupni na jednom mestu.'
            },
            {
                icon: '📊',
                title: 'Jasna struktura predmeta',
                description: 'Pregled lekcija, materijala i plana rada.'
            },
            {
                icon: '🔓',
                title: 'Otvoren pristup',
                description: 'Materijali dostupni studentima bez ograničenja.'
            }
        ];


        const projectInfo = {
            title: "Elektronska učionica – Nastavni portal",

            about: {
                title: "O projektu",
                text: "Elektronska učionica predstavlja centralizovani web sistem razvijen sa ciljem objedinjavanja nastavnih materijala, lekcija i projektnih zadataka.",
                goals: [
                    "jasan pregled predmeta",
                    "transparentan prikaz nastavnog plana",
                    "pregled načina ocenjivanja",
                    "pristup lekcijama i materijalima",
                    "strukturisano praćenje gradiva"
                ]
            },

            pedagogy: {
                title: "Pedagoška ideja",
                points: [
                    "objedinjavanje nastavnih materijala",
                    "demonstracija realnog web sistema",
                    "razumevanje strukture aplikacije",
                    "praktična demonstracija teorijskih koncepata"
                ]
            },

            functionality: {
                title: "Funkcionalnosti sistema",
                items: [
                    "Stranice pojedinačnih predmeta",
                    "Plan rada po nedeljama",
                    "Sistem lekcija",
                    "Prikaz materijala",
                    "Projektni zadaci"
                ]
            },

            tech: {
                title: "Tehnološki okvir",
                items: [
                    "Serverski renderovane stranice",
                    "Modularna struktura aplikacije",
                    "Dinamički prikaz sadržaja",
                    "Jasna separacija logike i prikaza"
                ]
            },

            goal: "Cilj projekta je kreiranje digitalne baze nastavnog sadržaja i demonstracija realnog razvoja jednog sistema.",

            note: "Projekat je edukativnog karaktera i nije zvanični institucionalni kanal komunikacije."
        };


        const totalWeeks = subjects.reduce((sum, s) => sum + s.weeks, 0);

        const stats = {
            activeSubjects: subjects.length,
            totalLessons: totalWeeks,
            openAccess: 100
        };


        const meta = {
            title: 'E-učionica | Digitalna platforma za nastavu',
            description: 'Digitalna platforma za pristup nastavnim materijalima i predavanjima.',
            keywords: 'e-učionica, nastavni materijali, predavanja'
        };


        return res.status(200).render("index", {
            pageTitle: meta.title,
            pageDescription: meta.description,
            pageKeywords: meta.keywords,

            pageStyles: "pages/home.css",

            subjects,
            stats,
            features,
            projectInfo,

            currentYear: new Date().getFullYear(),
            isHomePage: true
        });

    } catch (error) {
        next(error);
    }
}