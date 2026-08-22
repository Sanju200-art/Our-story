/* =========================================
   OUR STORY ❤️
   COMPLETE SCRIPT
========================================= */


/* =========================================
   GET ELEMENTS
========================================= */

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const readyButton =
    document.getElementById("readyButton");

const continue1 =
    document.getElementById("continue1");

const continue2 =
    document.getElementById("continue2");

const continue3 =
    document.getElementById("continue3");


const screen1 =
    document.getElementById("screen1");

const screen2 =
    document.getElementById("screen2");

const screen3 =
    document.getElementById("screen3");

const screen4 =
    document.getElementById("screen4");

const screen5 =
    document.getElementById("screen5");


/* =========================================
   CHANGE SCREEN
========================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(function(item) {

            item.classList.remove("active");

        });


    screen.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


/* =========================================
   MUSIC
========================================= */

let musicStarted = false;


function startMusic() {

    music.play()
        .then(function() {

            musicStarted = true;

            musicButton.innerHTML =
                "🎵 Music Playing ❤️";

        })
        .catch(function() {

            musicButton.innerHTML =
                "🎵 Tap Again for Music";

        });

}


/* MUSIC BUTTON */

musicButton.addEventListener(
    "click",
    function() {

        startMusic();

    }
);


/* =========================================
   ARE YOU READY
========================================= */

readyButton.addEventListener(
    "click",
    function() {

        /*
           The browser allows music
           after this user interaction.
        */

        startMusic();

        showScreen(screen2);

    }
);


/* =========================================
   8 OCTOBER
   → FIRST DATE
========================================= */

continue1.addEventListener(
    "click",
    function() {

        startMusic();

        showScreen(screen3);

    }
);


/* =========================================
   FIRST DATE
   → 2 NOVEMBER
========================================= */

continue2.addEventListener(
    "click",
    function() {

        startMusic();

        showScreen(screen4);

    }
);


/* =========================================
   2 NOVEMBER
   → NEXT PHASE
========================================= */

continue3.addEventListener(
    "click",
    function() {

        startMusic();

        showScreen(screen5);

    }
);

/* ============================= */
/*         PHOTO BOOK            */
/* ============================= */

const memories = [

    {
        image: "memory1.jpg",
        text: "13 Oct 2024 - 2nd Date 🥰"
    },

    {
        image: "memory2.jpg",
        text: "3 Nov 2024 -Private date 😘"
    },

    {
        image: "memory3.jpg",
        text: "18 Nov 2024 -Church time 😇"
    },

    {
        image: "memory4.jpg",
        text: "22 Dec 2024 -First christmas Together😚"
    },

    {
        image: "memory5.jpg",
        text: "25 Dec 2024 -Holiday Special 🤗"
    }

    {
        image: "memory6.jpg",
        text: "19 Jan 2025 -New Year Chapter 🥳"
    },

    {
        image: "memory7.jpg",
        text: "1 Mar 2025 -Jebel Jais Moments 🤩"
    },

    {
        image: "memory8.jpg",
        text: "31 Mar 2025 -Global Village Special 💝"
    },

    {
        image: "memory9.jpg",
        text: "18 May 2025 -Gathering Special 😊"
    },

    {
        image: "memory10.jpg",
        text: "16 Jun 2025 -That Last Touch of her 🥺"
    }
];

let currentMemory = 0;

const memoryPhoto = document.getElementById("memoryPhoto");
const photoCaption = document.getElementById("photoCaption");
const bookPage = document.getElementById("bookPage");
const bookCounter = document.getElementById("bookCounter");


function showMemory(animation) {

    bookPage.classList.remove("flip-next", "flip-prev");

    void bookPage.offsetWidth;

    bookPage.classList.add(animation);

    setTimeout(() => {

        memoryPhoto.src = memories[currentMemory].image;

        photoCaption.textContent =
            memories[currentMemory].text;

        bookCounter.textContent =
            `${currentMemory + 1} / ${memories.length}`;

    }, 300);
}


function nextMemory() {

    if (currentMemory >= memories.length - 1) {

        return;

    }

    currentMemory++;

    showMemory("flip-next");
}


function previousMemory() {

    if (currentMemory <= 0) {

        return;

    }

    currentMemory--;

    showMemory("flip-prev");
}


/* CONTINUE BUTTON */

function continueFromBook() {

    // Change this to whatever screen comes next
    const nextScreen =
        document.getElementById("next-screen");

    if (nextScreen) {

        document.querySelectorAll(".screen")
            .forEach(screen => {
                screen.style.display = "none";
            });

        nextScreen.style.display = "flex";
    }

}


/* ============================= */
/*          SWIPE SUPPORT        */
/* ============================= */

let touchStartX = 0;
let touchEndX = 0;

bookPage.addEventListener("touchstart", function(e) {

    touchStartX = e.changedTouches[0].screenX;

});


bookPage.addEventListener("touchend", function(e) {

    touchEndX = e.changedTouches[0].screenX;

    const distance =
        touchEndX - touchStartX;

    if (Math.abs(distance) < 50) {
        return;
    }

    if (distance < 0) {

        nextMemory();

    } else {

        previousMemory();

    }

});


/* LOAD FIRST PHOTO */

if (memories.length > 0) {

    memoryPhoto.src = memories[0].image;

    photoCaption.textContent =
        memories[0].text;

    bookCounter.textContent =
        `1 / ${memories.length}`;

}
