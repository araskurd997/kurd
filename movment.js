/* =====================================
   PRAYER MOVEMENTS
===================================== */

const movements = [

    {
        title: "Standing (Qiyam)",
        badini: "ڕاوەستان (قیام)",
        description: "Stand upright facing the Qiblah.",
        image: "image/movments/qiyam.jpg",
        arabic: "اللَّهُ أَكْبَرُ"
    },

    {
        title: "Takbir / Raising Hands",
        badini: "تەکبیر / بەرزکرنا دەستان",
        description: "Raise your hands when beginning the prayer.",
        image: "image/movments/takbir.jpg",
        arabic: "اللَّهُ أَكْبَرُ"
    },

    {
        title: "Ruku' (Bowing)",
        badini: "ڕکووع",
        description: "Bow and keep your back straight.",
        image: "image/movments/ruku'.jpg",
        arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ"
    },

    {
        title: "Standing After Ruku'",
        badini: "ڕابوون ژ ڕکووعێ",
        description: "Stand upright after Ruku'.",
        image: "image/movments/upruku'.jpg",
        arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ"
    },

    {
        title: "Sujood (Prostration)",
        badini: "سجود",
        description: "Prostrate with your forehead and nose on the ground.",
        image: "image/movments/sujud.jpg",
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى"
    },

    {
        title: "Sitting Between Sujoods",
        badini: "دانیشتن د ناڤبەرا دوو سجودان دا",
        description: "Sit briefly between the two prostrations.",
        image: "image/movments/seting.jpg",
        arabic: "رَبِّ اغْفِرْ لِي"
    },

    {
        title: "Second Sujood",
        badini: "سجودا دووێ",
        description: "Perform the second prostration.",
        image: "image/movments/sujud2.jpg",
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى"
    },

    {
        title: "Final Sitting (Tashahhud)",
        badini: "دانیشتنا دووماهی (تەشەهھود)",
        description: "Sit for the final Tashahhud.",
        image: "image/movments/finalsitting.jpg",
        arabic: "التَّحِيَّاتُ لِلَّهِ"
    },

    {
        title: "Salam (Ending)",
        badini: "سەلام",
        description: "Turn your head right and left and give Salam.",
        image: "image/movments/salam.jpg",
        arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ"
    }

];

/* =====================================
   CURRENT MOVEMENT
===================================== */

let currentMovement = 0;


/* =====================================
   HTML ELEMENTS
===================================== */

const number =
    document.getElementById("number");

const movementImage =
    document.getElementById("movementImage");

const movementTitle =
    document.getElementById("movementTitle");

const movementBadini =
    document.getElementById("movementBadini");

const movementDescription =
    document.getElementById("movementDescription");

const arabicText =
    document.getElementById("arabicText");

const stepText =
    document.getElementById("stepText");

const progress =
    document.getElementById("progress");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const dots =
    document.getElementById("dots");


/* =====================================
   CREATE MOVEMENT LIST
===================================== */

function createDots() {
    dots.innerHTML = "";

    movements.forEach(function (movement, index) {

        const item = document.createElement("button");

        item.className = "dot";
        item.type = "button";

        item.innerHTML = `
            <span class="movement-number">${index + 1}</span>
            <span>${movement.title}</span>
        `;

        item.addEventListener("click", function () {
            currentMovement = index;
            showMovement();
        });

        dots.appendChild(item);
    });
}
/* =====================================
   SHOW MOVEMENT
===================================== */

function showMovement() {

    const movement =
        movements[currentMovement];


    /* Number */

    number.textContent =
        currentMovement + 1;


    /* Title */

    movementTitle.textContent =
        movement.title;


    /* Badini */

    movementBadini.textContent =
        movement.badini;


    /* Description */

    movementDescription.textContent =
        movement.description;


    /* Arabic */

    arabicText.textContent =
        movement.arabic;


    /* Image */

    movementImage.src =
        movement.image;


    movementImage.alt =
        movement.title;


    /* Step */

    stepText.textContent =
        "Step " +
        (currentMovement + 1) +
        " of " +
        movements.length;


    /* Progress */

    const percentage =
        ((currentMovement + 1) /
        movements.length) * 100;


    progress.style.width =
        percentage + "%";


    /* Previous button */

    previousBtn.disabled =
        currentMovement === 0;


    /* Next button */

    nextBtn.disabled =
        currentMovement ===
        movements.length - 1;


    /* Active dot */

    const allItems =
    document.querySelectorAll(".movement-item");

allItems.forEach(function (item, index) {

    item.classList.toggle(
        "active",
        index === currentMovement
    );

});

}


/* =====================================
   NEXT
===================================== */

function nextMovement() {

    if (
        currentMovement <
        movements.length - 1
    ) {

        currentMovement++;

        showMovement();

    }

}


/* =====================================
   PREVIOUS
===================================== */

function previousMovement() {

    if (
        currentMovement > 0
    ) {

        currentMovement--;

        showMovement();

    }

}


/* =====================================
   ARABIC SPEECH
===================================== */

function speakArabic() {

    const text =
        movements[currentMovement].arabic;


    if (!("speechSynthesis" in window)) {

        alert(
            "Arabic speech is not supported on this browser."
        );

        return;

    }


    speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = "ar-SA";


    speech.rate = 0.75;


    speech.pitch = 1;


    speechSynthesis.speak(speech);

}


/* =====================================
   MOUSE GOLD GLOW
===================================== */

document.addEventListener(
    "mousemove",
    function (event) {

        document.documentElement.style.setProperty(
            "--mouse-x",
            event.clientX + "px"
        );


        document.documentElement.style.setProperty(
            "--mouse-y",
            event.clientY + "px"
        );

    }
);


/* =====================================
   KEYBOARD CONTROLS
===================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "ArrowRight") {

            nextMovement();

        }


        if (event.key === "ArrowLeft") {

            previousMovement();

        }

    }
);


/* =====================================
   START
===================================== */

createDots();

showMovement();