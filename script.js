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
        text: "The beginning of another beautiful memory ❤️"
    },

    {
        image: "memory2.jpg",
        text: "Another moment I will always remember ❤️"
    },

    {
        image: "memory3.jpg",
        text: "Every picture has a story behind it..."
    },

    {
        image: "memory4.jpg",
        text: "And every story became a part of us ❤️"
    },

    {
        image: "memory5.jpg",
        text: "More memories, more reasons to smile ❤️"
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
