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

export async function getExtraMaterials(req, res, next) {
    try {
        const pageData = {
            disclaimer: {
                message: "Ovo je moje lično viđenje – put kojim bih ja krenuo da moram da učim iz početka. Svi navedeni resursi su javno dostupni na internetu.",
                noAffiliate: "Nemam nikakvu finansijsku korist od ovih preporuka, nisam afilijat, affiliate ili partner. Neki kursevi se plaćaju (npr. Udemy) – njih sam lično kupio i koristio, ali vas ništa ne obavezuje da ih kupite.",
                tip: "Najveća greška početnika: čekanje savršenog resursa umesto početka rada. Bilo koji od ovih resursa je dovoljno dobar za početak."
            },

            timeline: [
                {
                    phase: 1,
                    title: "Faza 1: Osnove",
                    items: [
                        { name: "HTML/CSS", link: "https://www.w3schools.com/html/", description: "w3schools (potpuno besplatno)" },
                        { name: "CSS - The Complete Guide", link: "https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/", description: "CSS - Flexbox, Grid, Sass (Udemy kurs)" },
                        { name: "JavaScript", link: "https://eloquentjavascript.net/", description: "Eloquent JavaScript (besplatna knjiga online)" },
                        { name: "TypeScript", link: "https://www.udemy.com/course/understanding-typescript/", description: "Understanding TypeScript (Udemy kurs)" },
                        { name: "Git & GitHub", link: "https://www.udemy.com/course/git-github-practical-guide/", description: "Git - Practical Guide (Udemy kurs)" },
                        { name: "Alati: Visual Studio Code, browser DevTools", description: "osnovne komande" }
                    ]
                },
                {
                    phase: 2,
                    title: "Faza 2: Web razvoj, baze i freelancing",
                    items: [
                        { name: "Node.js / Express", description: "backend osnove" },
                        { name: "SQL - Complete Developer's Guide", link: "https://www.udemy.com/course/sql-the-complete-developers-guide-mysql-postgresql/", description: "MySQL, PostgreSQL (Udemy kurs)" },
                        { name: "NoSQL", description: "MongoDB (osnovne operacije)" },
                        { name: "REST API", description: "kako da napraviš i kako da koristiš tuđe" },
                        { name: "Postman", link: "https://www.postman.com/", description: "testiranje API-ja" },
                        { name: "Freelance Web Design", link: "https://www.udemy.com/course/freelance-web-design-from-design-to-development-to-making-money/", description: "Od dizajna do zarade (Udemy kurs)" }
                    ]
                },
                {
                    phase: 3,
                    title: "Faza 3: Dubinsko razumevanje (Frontend & Mobile)",
                    items: [
                        { name: "Strukture podataka i algoritmi", description: "osnove (array, linked list, stack, queue, hash table, tree, graph)" },
                        { name: "UML i OOP Foundations", link: "https://www.udemy.com/course/uml-and-object-oriented-design-foundations/", description: "UML i objektno orijentisano projektovanje (Udemy kurs)" },
                        { name: "The Complete Guide to Angular", link: "https://www.udemy.com/course/the-complete-guide-to-angular-2/", description: "Angular (Udemy kurs)" },
                        { name: "Angular Advanced", link: "https://www.udemy.com/course/angular-full-app-with-angular-material-angularfire-ngrx/", description: "Angular Material, Firebase, NgRx (Udemy kurs)" },
                        { name: "Ionic - Mobile Apps", link: "https://www.udemy.com/course/ionic-2-the-practical-guide-to-building-ios-android-apps/", description: "Hybrid mobile apps (Udemy kurs)" }
                    ]
                },
                {
                    phase: 4,
                    title: "Faza 4: Arhitektura i DevOps",
                    items: [
                        { name: "Clean Code", description: "Robert C. Martin – kako pisati kod koji drugi (i ti) mogu da čitaju" },
                        { name: "Clean Architecture", description: "Robert C. Martin – kako organizovati velike sisteme" },
                        { name: "Design Patterns", description: "Head First Design Patterns" },
                        { name: "Domain-Driven Design", description: "Implementing Domain-Driven Design (Vaughn Vernon)" },
                        { name: "GitHub Actions - The Complete Guide", link: "https://www.udemy.com/course/github-actions-the-complete-guide/", description: "CI/CD pipelines (Udemy kurs)" },
                        { name: "Docker", description: "kontejnerizacija (osnove)" },
                        { name: "Linux osnove", description: "komandna linija, bash, cron, systemd" }
                    ]
                },
                {
                    phase: 5,
                    title: "Faza 5: Game Development & Kreativnost",
                    items: [
                        { name: "Game Development with Python", link: "https://www.udemy.com/course/the-art-of-doing-video-game-creation-with-python-and-pygame/", description: "Python i Pygame (Udemy kurs)" },
                        { name: "Pixel Art Master Course", link: "https://www.udemy.com/course/pixel-art-master-course/", description: "Pixel art za igre (Udemy kurs)" },
                        { name: "Unity (C#)", description: "Najpopularniji game engine" },
                        { name: "Unreal Engine (C++)", description: "Vrhunski 3D game engine" },
                        { name: "Godot", description: "Open source engine (GDScript/C#)" }
                    ]
                }
            ],

            careerPaths: {
                title: "Različiti pravci u IT industriji",
                intro: "IT industrija nudi mnogo različitih karijernih puteva. Evo pregleda najpopularnijih pravaca i šta je potrebno za svaki od njih:",
                paths: [
                    { icon: "🌐", title: "Web Development", content: ["Frontend: React, Angular, Vue, TypeScript", "Backend: Node.js, Python, Java, C#, PHP", "DevOps: Docker, Kubernetes, AWS"], tip: "Počni sa HTML/CSS/JS, zatim React ili Angular, pa backend" },
                    { icon: "📱", title: "Mobile Development", content: ["Android: Kotlin, Java, Jetpack Compose", "iOS: Swift, SwiftUI, Xcode", "Cross-platform: React Native, Flutter, Ionic"], tip: "React Native ako znaš React, Ionic za brze hybrid aplikacije" },
                    { icon: "🎮", title: "Game Development", content: ["Unity (C#), Unreal Engine (C++)", "Godot (GDScript/C#)", "Python + Pygame za 2D igre", "Pixel art: Aseprite, Piskel"], tip: "Počni sa Unity i C# – najviše tutorijala" },
                    { icon: "📊", title: "Data Science", content: ["Python: Pandas, NumPy, Scikit-learn", "SQL: PostgreSQL, MySQL", "Vizualizacija: Tableau, Power BI"], tip: "Statistika je ključna – Python i SQL su samo alati" },
                    { icon: "🤖", title: "Machine Learning / AI", content: ["TensorFlow, PyTorch, Keras", "NLP, computer vision, LLMs", "MLOps: MLflow, Kubeflow"], tip: "Počni sa Python i scikit-learn, napreduj ka PyTorch" },
                    { icon: "🖥️", title: "Desktop Development", content: ["Windows: C#/.NET (WPF, WinForms)", "Cross-platform: Electron, Tauri, Qt", "macOS: Swift, SwiftUI"], tip: "Electron ako već znaš web tehnologije" },
                    { icon: "🔒", title: "Cybersecurity", content: ["Network security, firewalls, IDS/IPS", "Application security, OWASP, pen testing", "Cloud security, forensics, IR"], tip: "Počni sa TryHackMe i HackTheBox" },
                    { icon: "☁️", title: "Cloud & DevOps", content: ["AWS, Azure, GCP", "Terraform, Ansible", "CI/CD: GitHub Actions, Jenkins", "Kubernetes, Docker"], tip: "Počni sa Docker i GitHub Actions" },
                    { icon: "📡", title: "Embedded & IoT", content: ["C, C++, Rust, MicroPython", "ESP32, Arduino, Raspberry Pi", "MQTT, BLE, Zigbee, LoRaWAN", "FreeRTOS, Zephyr"], tip: "Počni sa Arduino (C++) ili MicroPython" }
                ],
                summary: [
                    "Web development – najlakši ulaz, najviše poslova",
                    "Mobile – dobar ako voliš aplikacije koje milioni koriste",
                    "Gaming – zahteva matematiku i fiziku, dizajn, muziku, storytelling – veoma kreativan",
                    "Data/ML/AI – budućnost industrije, zahteva jaku matematiku",
                    "Cybersecurity – uvek tražen, za one koji vole da razmišljaju kao napadač",
                    "DevOps/Cloud – za one koji vole automatizaciju i infrastrukturu",
                    "Embedded/IoT – za one koji vole i hardver i softver"
                ],
                conclusion: "Osnove (OOP, algoritmi, baze) su iste za sve pravce. Izaberi ono što te najviše zanima i specijalizuj se!"
            },

            platformParallel: {
                title: "🔗 Paralela: Web vs Desktop vs Mobile vs Gaming",
                intro: "Bez obzira na platformu, principi razvoja softvera su univerzalni:",
                concepts: [
                    { concept: "Objektno orijentisano programiranje", web: "React komponente", desktop: "C#/WPF klase", mobile: "Activity/Fragment", gaming: "GameObject" },
                    { concept: "Modularnost", web: "npm package", desktop: ".dll/.jar", mobile: "Gradle module", gaming: "Unity Package" },
                    { concept: "Design Patterns", web: "Singleton, Observer", desktop: "MVC, MVVM", mobile: "MVVM, VIPER", gaming: "Component, State" },
                    { concept: "State Management", web: "Redux, Context, NgRx", desktop: "DataBinding", mobile: "ViewModel", gaming: "ScriptableObject" },
                    { concept: "Clean Architecture", web: "Controller→Service→Repo", desktop: "Presentation→Domain→Data", mobile: "UI→Domain→Data", gaming: "GameLoop→Systems" }
                ],
                conclusion: "Ako naučiš OOP, šablone i modularnost, lako prelaziš između platformi."
            },

            programmingLanguages: [
                { name: "JavaScript/TypeScript", description: "web (frontend + backend), ogroman ekosistem" },
                { name: "Python", description: "data science, AI, skriptovi, backend, game dev (Pygame)" },
                { name: "C# / Java", description: "enterprise, backend, game dev (Unity)" },
                { name: "C++", description: "sistemski softver, game engine (Unreal), visoke performanse" },
                { name: "SQL", description: "obavezan za svakog developera" }
            ],

            databases: {
                sql: [
                    { name: "PostgreSQL", link: "https://www.postgresql.org/docs/", description: "najčešći izbor za nove projekte" },
                    { name: "MySQL / MariaDB", description: "i dalje veoma popularan" },
                    { name: "SQLite", description: "za male projekte, mobilne aplikacije" }
                ],
                nosql: [
                    { name: "MongoDB", description: "dokument baza (JSON-like)" },
                    { name: "Redis", description: "keširanje, queue" }
                ],
                advice: "SQL je must-have, NoSQL je dobar dodatak. Nauči SQL prvo."
            },

            frameworks: [
                { name: "React", link: "https://react.dev/", description: "najtraženiji na tržištu, ogroman ekosistem" },
                { name: "Angular", link: "https://angular.dev/", description: "kompletan framework, dobar za enterprise" },
                { name: "Node.js + Express", link: "https://nodejs.org/en/docs/", description: "backend standard" },
                { name: "Tailwind CSS", link: "https://tailwindcss.com/", description: "brzo stilizovanje" },
                { name: "Bun / npm", description: "package manageri (bun je brži)" }
            ],

            frameworkAdvice: "Nauči jedan framework dobro umesto svih površno. React ili Angular su najbolji izbor za početak.",

            books: [
                { title: "Clean Code", author: "Robert C. Martin", description: "Kako pisati kod koji drugi (i ti) mogu da čitaju." },
                { title: "Clean Architecture", author: "Robert C. Martin", description: "Kako organizovati velike sisteme da budu održivi." },
                { title: "Refactoring", author: "Martin Fowler", description: "Kako poboljšati postojeći kod." },
                { title: "Head First Design Patterns", author: "Freeman, Robson", description: "Najpristupačnija knjiga za šablone." },
                { title: "Implementing Domain-Driven Design", author: "Vaughn Vernon", description: "Kako modelovati domen." }
            ],

            hostingPlatforms: [
                { name: "Render", url: "https://render.com", description: "Free tier, dobar za web i baze." },
                { name: "Heroku", url: "https://heroku.com", description: "Klasičan izbor, jednostavan za korišćenje. Free tier je ukinut, ali ima jeftin plan ($5/mesec). Odličan za brzi deployment." },
                { name: "Vercel", url: "https://vercel.com", description: "Najbolji za frontend (Next.js, React). Free tier veoma darežljiv." },
                { name: "Netlify", url: "https://netlify.com", description: "Odličan za statičke sajtove i JAMstack." },
                { name: "Firebase", url: "https://firebase.google.com", description: "Google BaaS - auth, baza, hosting, serverless funkcije." },
                { name: "GitHub Pages", url: "https://pages.github.com", description: "Potpuno besplatno za statičke sajtove (HTML/CSS/JS)." },
                { name: "Railway", url: "https://railway.app", description: "Moderniji, free tier sa kreditima, slično Render-u." }
            ],

            hostingAdvice: "Počni sa Render (backend) ili Vercel (frontend).",

            gameDevTools: [
                { name: "Unity", url: "https://unity.com/", description: "Najpopularniji game engine (C#)" },
                { name: "Unreal Engine", url: "https://www.unrealengine.com/", description: "Vrhunski 3D game engine (C++)" },
                { name: "Godot", url: "https://godotengine.org/", description: "Open source engine (GDScript/C#)" },
                { name: "Pygame", url: "https://www.pygame.org/", description: "Python biblioteka za 2D igre" },
                { name: "Tiled Map Editor", url: "https://www.mapeditor.org/", description: "Pravljenje mapa za 2D igre" },
                { name: "Aseprite", url: "https://www.aseprite.org/", description: "Pixel art editor (plaćen)" },
                { name: "Piskel", url: "https://www.piskelapp.com/", description: "Besplatna online alternativa za Aseprite" }
            ],

            webTools: [
                { name: "Postman", url: "https://www.postman.com/", description: "Testiranje API-ja" },
                { name: "Itch.io", url: "https://itch.io/", description: "Platforma za indie igre" }
            ],

            learningPlatforms: [
                { name: "Udemy", url: "https://www.udemy.com/", description: "Najveća platforma za kurseve (česti popusti)" },
                { name: "Boot.dev", url: "https://boot.dev/", description: "Backend development (gamified learning)" },
                { name: "Zenva", url: "https://zenva.com/", description: "Game development i web kursevi" },
                { name: "Coursera", url: "https://www.coursera.org/", description: "Akademski kursevi, specijalizacije" },
                { name: "Humble Bundle", url: "https://www.humblebundle.com/", description: "Povoljni bundle-ovi knjiga i kurseva" },
                { name: "freeCodeCamp", url: "https://www.freecodecamp.org/", description: "Potpuno besplatni kursevi" }
            ],

            youtubeChannels: {
                webDev: [
                    { name: "Academind", url: "https://www.youtube.com/@academind" },
                    { name: "Maximilian Schwarzmüller", url: "https://www.youtube.com/@maximilian-schwarzmueller" },
                    { name: "Fireship", url: "https://www.youtube.com/@Fireship" },
                    { name: "freeCodeCamp", url: "https://www.youtube.com/@freecodecamp" },
                    { name: "coding2go", url: "https://www.youtube.com/@coding2go" },
                    { name: "StarCodeKh", url: "https://www.youtube.com/@StarCodeKh" }
                ],
                frontend: [
                    { name: "Angular University", url: "https://www.youtube.com/@AngularUniversity" },
                    { name: "Flux Academy", url: "https://www.youtube.com/@FluxAcademy" },
                    { name: "Adam C. Younis", url: "https://www.youtube.com/@AdamCYounis" },
                    { name: "Satori Graphics", url: "https://www.youtube.com/@SatoriGraphics" },
                    { name: "SelfMadeWebDesigner", url: "https://www.youtube.com/@SelfMadeWebDesigner" },
                    { name: "Jesse Showalter", url: "https://www.youtube.com/@jesseshowalter" },
                    { name: "Payton Clark Smith", url: "https://www.youtube.com/@PaytonClarkSmith" },
                    { name: "Rachel How", url: "https://www.youtube.com/@RachelHow" },
                    { name: "JuniperDev", url: "https://www.youtube.com/@JuniperDev" }
                ],
                tools: [
                    { name: "Elementor", url: "https://www.youtube.com/@Elementor" },
                    { name: "Learn & Free Skills", url: "https://www.youtube.com/@Learnfree_skills" },
                    { name: "Next Work", url: "https://www.youtube.com/@itsnextwork" }
                ],
                devops: [
                    { name: "Andreas Spiess", url: "https://www.youtube.com/@AndreasSpiess" },
                    { name: "Better Stack", url: "https://www.youtube.com/@betterstack" },
                    { name: "EEVblog", url: "https://www.youtube.com/@EEVblog" }
                ]
            },

            aiTools: [
                { name: "ChatGPT / DeepSeek", description: "pomoć pri debagovanju, objašnjenje koncepata" },
                { name: "GitHub Copilot", description: "autocomplete za kod" },
                { name: "Gamma", description: "pravljenje prezentacija" }
            ],

            aiAdvice: "AI ne radi umesto tebe – AI radi sa tobom. Uvek proveri i razumi rešenje!",

            officialDocs: [
                { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
                { name: "Node.js docs", url: "https://nodejs.org/en/docs/" },
                { name: "React docs", url: "https://react.dev/" },
                { name: "Angular docs", url: "https://angular.dev/" },
                { name: "Tailwind CSS docs", url: "https://tailwindcss.com/docs" },
                { name: "PostgreSQL docs", url: "https://www.postgresql.org/docs/" },
                { name: "Docker docs", url: "https://docs.docker.com/" },
                { name: "Unity docs", url: "https://docs.unity.com/" },
                { name: "Unreal Engine docs", url: "https://docs.unrealengine.com/" }
            ],

            docsAdvice: "Pre nego što pitaš ChatGPT – pročitaj zvaničnu dokumentaciju!",

            builders: [
                { name: "WordPress + Elementor" },
                { name: "Wix" },
                { name: "Squarespace" },
                { name: "Webflow" }
            ],

            buildersNote: "Probaj buildere – razumećeš logiku koju ćeš kasnije sam programirati.",

            googleTools: [
                { name: "Google Docs", description: "pisanje dokumentacije" },
                { name: "Google Sheets", description: "planiranje zadataka" },
                { name: "Google Drive", description: "deljenje materijala" }
            ],

            finalTips: {
                good: [
                    "Radi male projekte – 10 malih projekata > 1 veliki kurs",
                    "Git commit svaki dan",
                    "Čitaj tuđi kod na GitHub-u",
                    "Iskoristi Humble Bundle za jeftine knjige i kurseve"
                ],
                warnings: [
                    "Ne zaglavi u 'tutorial hell' – pisanje koda > gledanje kurseva",
                    "Ne preskači baze podataka",
                    "Ne uči 10 jezika odjednom – JS/TS + Python + SQL je dovoljno za početak"
                ]
            },

            udemyCourses: [
                { name: "SQL - The Complete Developer's Guide (MySQL, PostgreSQL)", url: "https://www.udemy.com/course/sql-the-complete-developers-guide-mysql-postgresql/" },
                { name: "GitHub Actions - The Complete Guide", url: "https://www.udemy.com/course/github-actions-the-complete-guide/" },
                { name: "Angular - Full App with Angular Material, AngularFire, NgRx", url: "https://www.udemy.com/course/angular-full-app-with-angular-material-angularfire-ngrx/" },
                { name: "Understanding TypeScript", url: "https://www.udemy.com/course/understanding-typescript/" },
                { name: "Freelance Web Design - From Design to Development to Making Money", url: "https://www.udemy.com/course/freelance-web-design-from-design-to-development-to-making-money/" },
                { name: "Git & GitHub - Practical Guide", url: "https://www.udemy.com/course/git-github-practical-guide/" },
                { name: "The Art of Doing - Video Game Creation with Python and Pygame", url: "https://www.udemy.com/course/the-art-of-doing-video-game-creation-with-python-and-pygame/" },
                { name: "Pixel Art Master Course", url: "https://www.udemy.com/course/pixel-art-master-course/" },
                { name: "CSS - The Complete Guide (Flexbox, Grid, Sass)", url: "https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/" },
                { name: "UML and Object-Oriented Design Foundations", url: "https://www.udemy.com/course/uml-and-object-oriented-design-foundations/" },
                { name: "The Complete Guide to Angular", url: "https://www.udemy.com/course/the-complete-guide-to-angular-2/" },
                { name: "Ionic - The Practical Guide to Building iOS & Android Apps", url: "https://www.udemy.com/course/ionic-2-the-practical-guide-to-building-ios-android-apps/" }
            ],

            udemyInstructor: {
                name: "Maximilian Schwarzmüller",
                url: "https://www.udemy.com/user/maximilian-schwarzmuller/",
                note: "Odlični kursevi za web development (Angular, React, Node.js, TypeScript). Kursevi koje sam lično kupio i koristio."
            },

            w3schools: {
                url: "https://www.w3schools.com/",
                description: "Odlična baza za HTML, CSS, JavaScript, SQL."
            }
        };

        const meta = {
            title: 'Dodatni materijali',
            description: 'Lični vodič kroz resurse za samoedukaciju - programiranje, web razvoj, baze, algoritmi i više.',
            keywords: 'programiranje, učenje, resursi, knjige, youtube, samoedukacija'
        };

        return res.status(200).render("extra-materials", {
            pageTitle: meta.title,
            pageDescription: meta.description,
            pageKeywords: meta.keywords,
            pageStyles: "pages/extra-materials.css",
            ...pageData,
            currentYear: new Date().getFullYear()
        });

    } catch (error) {
        next(error);
    }
}