/* =========================================================
   MUSLIM PRAYER GUIDE
   Complete script.js
   English + Kurdish Badini
   5 Prayers + Wudu
   Arabic Browser Audio
========================================================= */


/* =========================================================
   LANGUAGE
========================================================= */

let language = "en";


const translations = {

    /* =====================================================
       ENGLISH
    ===================================================== */

    en: {

        appName: "Prayer Guide",

        title: "Muslim Prayer Guide",

        subtitle:
            "Learn what to do and what to say, step by step.",

        choosePrayer:
            "Choose a Prayer",

        fajr: "Fajr",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha",

        wudu: "Wudu",
        ablution: "Ablution",

        back: "← Back",

        previous: "← Previous",

        next: "Next →",

        listen: "🔊 Listen",

        finish: "✓ Finish",

        wuduTitle: "Wudu",

        wuduInfo: "Ablution",

        listenError:
            "Your browser does not support Arabic speech."

    },


    /* =====================================================
       KURDISH BADINI
    ===================================================== */

    badini: {

        appName: "ڕێبەرێ نوێژێ",

        title: "ڕێبەرێ نوێژێ",

        subtitle:
            "فێربە چی بکەی و چی بێژی، هەنگاو بە هەنگاو.",

        choosePrayer:
            "نوێژەکێ هەلبژێرە",

        fajr: "بەیانی",

        dhuhr: "نیڤڕۆ",

        asr: "ئەسر",

        maghrib: "مەغریب",

        isha: "عیشا",

        wudu: "دەستنوێژ",

        ablution: "دەستنوێژ",

        back: "← ڤەگەڕە",

        previous: "← پێشوو",

        next: "دویی →",

        listen: "🔊 گوهداری بکە",

        finish: "✓ تەمام",

        wuduTitle: "دەستنوێژ",

        wuduInfo: "چێکرنا دەستنوێژێ",

        listenError:
            "براوزەرێ تە پشتیوانیا دەنگێ عەرەبی ناکەت."
    }

};


/* =========================================================
   STATE
========================================================= */

let currentPrayer = null;

let currentStep = 0;

let currentMode = "prayer";


/* =========================================================
   FULL ARABIC TEXT
========================================================= */

const AL_FATIHAH_ARABIC =
`بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
الرَّحْمَٰنِ الرَّحِيمِ
مَالِكِ يَوْمِ الدِّينِ
إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ
صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ
غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ
وَلَا الضَّالِّينَ`;


const TAKBIR_ARABIC =
"اللَّهُ أَكْبَرُ";


const RUKU_ARABIC =
"سُبْحَانَ رَبِّيَ الْعَظِيمِ";


const RISE_ARABIC =
"سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ";


const SUJOOD_ARABIC =
"سُبْحَانَ رَبِّيَ الْأَعْلَى";


const TASHahHUD_ARABIC =
`التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ،
السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ،
السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ،
أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ،
وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ.`;


const SALAWAT_ARABIC =
`اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ،
وَعَلَى آلِ مُحَمَّدٍ،
كَمَا صَلَّيْتَ عَلَى آلِ إِبْرَاهِيمَ،
إِنَّكَ حَمِيدٌ مَجِيدٌ،
اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ،
وَعَلَى آلِ مُحَمَّدٍ،
كَمَا بَارَكْتَ عَلَى آلِ إِبْرَاهِيمَ،
إِنَّكَ حَمِيدٌ مَجِيدٌ.`;


const SALAM_ARABIC =
"السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ";


/* =========================================================
   CREATE PRAYER STEPS
========================================================= */

function createPrayerSteps(numberOfRakahs) {

    const steps = [];


    /* -----------------------------------------------------
       INTENTION
    ----------------------------------------------------- */

    steps.push({

        title: {
            en: "Intention",
            badini: "نیەت"
        },

        description: {
            en:
                "Make the intention in your heart for the prayer.",

            badini:
                "د دڵێ خۆدا نیەت بکە بۆ نوێژێ."
        },

        arabic: "",

        translation: {
            en:
                "Make the intention for the prayer.",

            badini:
                "نیەتێ نوێژێ بکە."
        }

    });


    /* -----------------------------------------------------
       RAKAHS
    ----------------------------------------------------- */

    for (let rakah = 1; rakah <= numberOfRakahs; rakah++) {


        /* TAKBIR */

        steps.push({

            title: {
                en:
                    `Rak'ah ${rakah} - Takbir`,

                badini:
                    `ڕەکعەت ${rakah} - تەکبیر`
            },

            description: {
                en:
                    "Raise your hands and say Allahu Akbar.",

                badini:
                    "دەستان خۆ ڕاکە و بێژە الله أكبر."
            },

            arabic:
                TAKBIR_ARABIC,

            translation: {
                en:
                    "Allah is the Greatest.",

                badini:
                    "خودێ مەزنترە."
            }

        });


        /* RECITATION */

        steps.push({

            title: {
                en:
                    `Rak'ah ${rakah} - Recitation`,

                badini:
                    `ڕەکعەت ${rakah} - خوێندن`
            },

            description: {
                en:
                    "Recite Surah Al-Fatihah.",

                badini:
                    "سورەتا فاتحە بخوینە."
            },

            arabic:
                AL_FATIHAH_ARABIC,

            translation: {
                en:
                    "Surah Al-Fatihah.",

                badini:
                    "سورەتا فاتحە."
            }

        });


        /* RUKU */

        steps.push({

            title: {
                en: "Ruku",

                badini: "ڕکووع"
            },

            description: {
                en:
                    "Bow down and say Subhana Rabbiyal Adhim.",

                badini:
                    "ڕکووعێ بکە و بێژە سبحان ربي العظيم."
            },

            arabic:
                RUKU_ARABIC,

            translation: {
                en:
                    "Glory be to my Lord, the Most Great.",

                badini:
                    "پاک و پیرۆزە خودێ یێ مەزن."
            }

        });


        /* RISING */

        steps.push({

            title: {
                en: "Rise from Ruku",

                badini: "ژ ڕکووعێ ڕابە"
            },

            description: {
                en:
                    "Rise from Ruku and say Sami Allahu liman hamidah.",

                badini:
                    "ژ ڕکووعێ ڕابە و بێژە سمع الله لمن حمده."
            },

            arabic:
                RISE_ARABIC,

            translation: {
                en:
                    "Allah hears the one who praises Him.",

                badini:
                    "خودێ گوهدارێ ئەو کەسێیە کو حەمدێ دکەت."
            }

        });


        /* FIRST SUJOOD */

        steps.push({

            title: {
                en: "First Sujood",

                badini: "سوجدەیا ئێکێ"
            },

            description: {
                en:
                    "Prostrate and say Subhana Rabbiyal A'la.",

                badini:
                    "سوجدە بکە و بێژە سبحان ربي الأعلى."
            },

            arabic:
                SUJOOD_ARABIC,

            translation: {
                en:
                    "Glory be to my Lord, the Most High.",

                badini:
                    "پاک و پیرۆزە خودێ یێ بلند."
            }

        });


        /* SITTING */

        steps.push({

            title: {
                en: "Sit between the Sujoods",

                badini: "دناڤبەرا سوجدەیان دا روینە"
            },

            description: {
                en:
                    "Sit briefly between the two prostrations.",

                badini:
                    "دناڤبەرا هەردوو سوجدەیان دا کورتەکێ روینە."
            },

            arabic: "",

            translation: {
                en:
                    "Sit between the two Sujoods.",

                badini:
                    "دناڤبەرا هەردوو سوجدەیان دا روینە."
            }

        });


        /* SECOND SUJOOD */

        steps.push({

            title: {
                en: "Second Sujood",

                badini: "سوجدەیا دووێ"
            },

            description: {
                en:
                    "Prostrate again and say Subhana Rabbiyal A'la.",

                badini:
                    "دوبارە سوجدە بکە و بێژە سبحان ربي الأعلى."
            },

            arabic:
                SUJOOD_ARABIC,

            translation: {
                en:
                    "Glory be to my Lord, the Most High.",

                badini:
                    "پاک و پیرۆزە خودێ یێ بلند."
            }

        });


        /* FIRST TASHAHHUD */

        if (
            numberOfRakahs > 2 &&
            rakah === 2
        ) {

            steps.push({

                title: {
                    en: "First Tashahhud",

                    badini: "تەشەهۆدا ئێکێ"
                },

                description: {
                    en:
                        "Sit and recite the Tashahhud.",

                    badini:
                        "روینە و تەشەهۆدێ بخوینە."
                },

                arabic:
                    TASHahHUD_ARABIC,

                translation: {
                    en:
                        "The Tashahhud.",

                    badini:
                        "تەشەهۆد."
                }

            });

        }

    }


    /* -----------------------------------------------------
       FINAL TASHAHHUD
    ----------------------------------------------------- */

    steps.push({

        title: {
            en: "Final Tashahhud",

            badini: "تەشەهۆدا دوماهیێ"
        },

        description: {
            en:
                "Sit and recite the full Tashahhud.",

            badini:
                "روینە و تەشەهۆدا تەمام بخوینە."
        },

        arabic:
            TASHahHUD_ARABIC,

        translation: {
            en:
                "The full Tashahhud.",

            badini:
                "تەشەهۆدا تەمام."
        }

    });


    /* -----------------------------------------------------
       SALAWAT
    ----------------------------------------------------- */

    steps.push({

        title: {
            en: "Salawat",

            badini: "سەلاوات"
        },

        description: {
            en:
                "Recite the Salawat upon Prophet Muhammad ﷺ.",

            badini:
                "سەلاواتان ل سەر پێغەمبەرێ خودێ ﷺ بخوینە."
        },

        arabic:
            SALAWAT_ARABIC,

        translation: {
            en:
                "O Allah, bless Muhammad and the family of Muhammad.",

            badini:
                "ئەی خودێ، سەلاوات و سڵاڤان ل سەر محەممەد و مالا محەممەد بنێرە."
        }

    });


    /* -----------------------------------------------------
       SALAM
    ----------------------------------------------------- */

    steps.push({

        title: {
            en: "Salam",

            badini: "سەلام"
        },

        description: {
            en:
                "Turn your head to the right and say Salam, then to the left.",

            badini:
                "سەرێ خۆ بەرەڤ ڕاستێ بگەڕینە و سەلام بدە، پاشی بەرەڤ چەپێ بگەڕینە و سەلام بدە."
        },

        arabic:
            SALAM_ARABIC,

        translation: {
            en:
                "Peace and mercy of Allah be upon you.",

            badini:
                "سلاڤ و ڕەحمەتا خودێ ل سەر هەوە بیت."
        }

    });


    return steps;
}


/* =========================================================
   PRAYERS
========================================================= */

const prayers = {

    fajr: {

        name: {
            en: "Fajr",
            badini: "بەیانی"
        },

        icon: "🌅",

        rakahs: "2 Rak'ahs",

        steps:
            createPrayerSteps(2)
    },


    dhuhr: {

        name: {
            en: "Dhuhr",
            badini: "نیڤڕۆ"
        },

        icon: "☀️",

        rakahs: "4 Rak'ahs",

        steps:
            createPrayerSteps(4)
    },


    asr: {

        name: {
            en: "Asr",
            badini: "ئەسر"
        },

        icon: "🌤️",

        rakahs: "4 Rak'ahs",

        steps:
            createPrayerSteps(4)
    },


    maghrib: {

        name: {
            en: "Maghrib",
            badini: "مەغریب"
        },

        icon: "🌇",

        rakahs: "3 Rak'ahs",

        steps:
            createPrayerSteps(3)
    },


    isha: {

        name: {
            en: "Isha",
            badini: "عیشا"
        },

        icon: "🌙",

        rakahs: "4 Rak'ahs",

        steps:
            createPrayerSteps(4)
    }

};


/* =========================================================
   WUDU
   YOUR EXACT 11 STEPS
========================================================= */

const wuduSteps = [

    {
        key: "wuduIntention"
    },

    {
        key: "face"
    },

    {
        key: "RightHand"
    },

    {
        key: "leftHand"
    },

    {
        key: "head"
    },

    {
        key: "ears"
    },

    {
        key: "mouth"
    },

    {
        key: "nose"
    },

    {
        key: "Rightfoot"
    },

    {
        key: "leftfoot"
    },

    {
        key: "wuduComplete"
    }

];


/* =========================================================
   WUDU TRANSLATIONS
========================================================= */

translations.en.wuduIntention =
    "Make the intention.";

translations.en.face =
    "Wash your face three times.";

translations.en.RightHand =
    "Wash your right hand up to the elbow.";

translations.en.leftHand =
    "Wash your left hand up to the elbow.";

translations.en.head =
    "Wipe your head.";

translations.en.ears =
    "Wipe your ears.";

translations.en.mouth =
    "Wash your mouth with water.";

translations.en.nose =
    "Clean your nose.";

translations.en.Rightfoot =
    "Wash your right foot up to the ankle three times.";

translations.en.leftfoot =
    "Wash your left foot up to the ankle three times.";

translations.en.wuduComplete =
    "Wudu is complete.";


/* ---------------------------------------------------------
   BADINI
--------------------------------------------------------- */

translations.badini.wuduIntention =
    "نیەت بکە";

translations.badini.face =
    "سێ جاران ناف چاڤێخو بشۆ";

translations.badini.RightHand =
    "دەستێ خۆ یێ راستێ هەتا ئەنیشکێ بشۆ";

translations.badini.leftHand =
    "دەستێ خۆ یێ جەپێ هەتا ئەنیشکێ بشۆ";

translations.badini.head =
    "سەرێ خۆ مەسح بکە";

translations.badini.ears =
    "گوهان مەسح بکە";

translations.badini.mouth =
    "دەڤێ خۆ ب ئاڤێ بشۆ.";

translations.badini.nose =
    "دفنا خۆ پاک بکە";

translations.badini.Rightfoot =
    "سێ جاران پیێ راستێ هەتا گوزەکێ بشۆ";

translations.badini.leftfoot =
    "سێ جاران پیێ چەپێ هەتا گوزەکێ بشۆ";

translations.badini.wuduComplete =
    "دەستنڤێژ تەمام بوو";


/* =========================================================
   OPEN PRAYER
========================================================= */

function openPrayer(prayerName) {

    currentMode = "prayer";

    currentPrayer = prayerName;

    currentStep = 0;


    const home =
        document.getElementById("home");

    const guide =
        document.getElementById("guide");


    if (home) {
        home.classList.add("hidden");
    }


    if (guide) {
        guide.classList.remove("hidden");
    }


    showStep();
}


/* =========================================================
   OPEN WUDU
========================================================= */

function openWudu() {

    currentMode = "wudu";

    currentPrayer = null;

    currentStep = 0;


    const home =
        document.getElementById("home");

    const guide =
        document.getElementById("guide");


    if (home) {
        home.classList.add("hidden");
    }


    if (guide) {
        guide.classList.remove("hidden");
    }


    showStep();
}


/* =========================================================
   SHOW STEP
========================================================= */

function showStep() {

    let data;

    let title;

    let icon;

    let info;


    const t =
        translations[language];


    /* -----------------------------------------------------
       WUDU
    ----------------------------------------------------- */

    if (currentMode === "wudu") {

        data =
            wuduSteps;

        title =
            t.wuduTitle;

        icon =
            "💧";

        info =
            t.wuduInfo;

    }


    /* -----------------------------------------------------
       PRAYER
    ----------------------------------------------------- */

    else {

        const prayer =
            prayers[currentPrayer];


        data =
            prayer.steps;

        title =
            prayer.name[language];

        icon =
            prayer.icon;

        info =
            prayer.rakahs;
    }


    /* Safety */

    if (!data || !data[currentStep]) {
        currentStep = 0;
        return;
    }


    const step =
        data[currentStep];


    /* -----------------------------------------------------
       HEADER
    ----------------------------------------------------- */

    document
        .getElementById("guideIcon")
        .textContent =
        icon;


    document
        .getElementById("guideTitle")
        .textContent =
        title;


    document
        .getElementById("guideInfo")
        .textContent =
        info;


    /* -----------------------------------------------------
       STEP NUMBER
    ----------------------------------------------------- */

    document
        .getElementById("stepNumber")
        .textContent =
        currentStep + 1;


    /* -----------------------------------------------------
       WUDU
    ----------------------------------------------------- */

    if (currentMode === "wudu") {

        document
            .getElementById("stepTitle")
            .textContent =
            t[step.key] || "";


        document
            .getElementById("stepDescription")
            .textContent =
            "";


        document
            .getElementById("arabicText")
            .textContent =
            "";


        document
            .getElementById("translationText")
            .textContent =
            "";


        document
            .getElementById("audioButton")
            .style.display =
            "none";

    }


    /* -----------------------------------------------------
       PRAYER
    ----------------------------------------------------- */

    else {

        document
            .getElementById("stepTitle")
            .textContent =
            step.title[language];


        document
            .getElementById("stepDescription")
            .textContent =
            step.description[language];


        document
            .getElementById("arabicText")
            .textContent =
            step.arabic || "";


        document
            .getElementById("translationText")
            .textContent =
            step.translation[language];


        document
            .getElementById("audioButton")
            .style.display =
            step.arabic
                ? "inline-block"
                : "none";
    }


    /* -----------------------------------------------------
       PROGRESS
    ----------------------------------------------------- */

    const progress =
        ((currentStep + 1) / data.length) * 100;


    document
        .getElementById("progressBar")
        .style.width =
        progress + "%";


    /* -----------------------------------------------------
       PREVIOUS BUTTON
    ----------------------------------------------------- */

    document
        .getElementById("previousBtn")
        .disabled =
        currentStep === 0;


    /* -----------------------------------------------------
       NEXT BUTTON
    ----------------------------------------------------- */

    updateNextButton();
}


/* =========================================================
   NEXT BUTTON
========================================================= */

function nextStep() {

    let data;


    if (currentMode === "wudu") {

        data =
            wuduSteps;

    }

    else {

        data =
            prayers[currentPrayer].steps;
    }


    if (
        currentStep <
        data.length - 1
    ) {

        currentStep++;

        showStep();

    }

    else {

        goHome();
    }
}


/* =========================================================
   PREVIOUS BUTTON
========================================================= */

function previousStep() {

    if (currentStep > 0) {

        currentStep--;

        showStep();
    }
}


/* =========================================================
   NEXT BUTTON TEXT
========================================================= */

function updateNextButton() {

    const button =
        document.getElementById("nextBtn");


    if (!button) {
        return;
    }


    let data;


    if (currentMode === "wudu") {

        data =
            wuduSteps;

    }

    else {

        data =
            prayers[currentPrayer].steps;
    }


    const t =
        translations[language];


    if (
        currentStep ===
        data.length - 1
    ) {

        button.textContent =
            t.finish;

    }

    else {

        button.textContent =
            t.next;
    }
}


/* =========================================================
   GO HOME
========================================================= */

function goHome() {

    const home =
        document.getElementById("home");

    const guide =
        document.getElementById("guide");


    if (guide) {
        guide.classList.add("hidden");
    }


    if (home) {
        home.classList.remove("hidden");
    }


    currentPrayer = null;

    currentStep = 0;

    currentMode = "prayer";
}


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function changeLanguage() {

    if (language === "en") {

        language = "badini";

    }

    else {

        language = "en";
    }


    applyLanguage();
}


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage() {

    const t =
        translations[language];


    /* -----------------------------------------------------
       HTML data-i18n
    ----------------------------------------------------- */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.getAttribute("data-i18n");


            if (t[key]) {

                element.textContent =
                    t[key];
            }

        });


    /* -----------------------------------------------------
       LANGUAGE BUTTON
    ----------------------------------------------------- */

    const languageButton =
        document.getElementById("languageBtn");


    if (languageButton) {

        languageButton.textContent =
            language === "en"
                ? "کوردی"
                : "English";
    }


    /* -----------------------------------------------------
       PREVIOUS
    ----------------------------------------------------- */

    const previousButton =
        document.getElementById("previousBtn");


    if (previousButton) {

        previousButton.textContent =
            t.previous;
    }


    /* -----------------------------------------------------
       AUDIO
    ----------------------------------------------------- */

    const audioButton =
        document.getElementById("audioButton");


    if (audioButton) {

        audioButton.textContent =
            t.listen;
    }


    /* -----------------------------------------------------
       RTL
    ----------------------------------------------------- */

    if (language === "badini") {

        document.body.classList.add("rtl");

    }

    else {

        document.body.classList.remove("rtl");
    }


    /* -----------------------------------------------------
       REFRESH CURRENT STEP
    ----------------------------------------------------- */

    if (
        currentMode === "wudu" ||
        currentPrayer
    ) {

        showStep();
    }
}


/* =========================================================
   ARABIC AUDIO
========================================================= */

function playArabic() {

    const arabicElement =
        document.getElementById("arabicText");


    const statusElement =
        document.getElementById("audioStatus");


    if (!arabicElement) {
        return;
    }


    const text =
        arabicElement.textContent.trim();


    if (!text) {
        return;
    }


    if (
        !("speechSynthesis" in window)
    ) {

        if (statusElement) {

            statusElement.textContent =
                translations[language].listenError;
        }

        return;
    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang =
        "ar-SA";


    speech.rate =
        0.72;


    speech.pitch =
        1;


    speech.volume =
        1;


    /* Try to find Arabic voice */

    const voices =
        window.speechSynthesis.getVoices();


    const arabicVoice =
        voices.find(
            voice =>
                voice.lang &&
                voice.lang
                    .toLowerCase()
                    .startsWith("ar")
        );


    if (arabicVoice) {

        speech.voice =
            arabicVoice;
    }


    if (statusElement) {

        statusElement.textContent =
            "🔊 Playing...";
    }


    speech.onend =
        function () {

            if (statusElement) {

                statusElement.textContent =
                    "";
            }
        };


    window.speechSynthesis.speak(
        speech
    );
}


/* =========================================================
   LOAD VOICES
========================================================= */

if (
    "speechSynthesis" in window
) {

    window.speechSynthesis
        .addEventListener(
            "voiceschanged",
            function () {
                window.speechSynthesis
                    .getVoices();
            }
        );
}


/* =========================================================
   MOUSE GOLD GLOW
========================================================= */

document.addEventListener(
    "mousemove",
    function (event) {

        document.documentElement
            .style
            .setProperty(
                "--mouse-x",
                event.clientX + "px"
            );


        document.documentElement
            .style
            .setProperty(
                "--mouse-y",
                event.clientY + "px"
            );
    }
);


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        applyLanguage();

    }
);