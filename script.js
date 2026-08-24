/* =====================================================
   MUSIC
===================================================== */

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

let musicStarted = false;

musicButton.addEventListener("click", function () {

    music.play()
        .then(() => {

            musicStarted = true;

            musicButton.innerHTML = "🎵 Music Playing ❤️";

        })
        .catch(error => {

            console.log("Music error:", error);

        });

});


/* =====================================================
   SCREEN SWITCHING
===================================================== */

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.add("active");
    }
}


/* =====================================================
   SCREEN 1 → SCREEN 2
===================================================== */

const readyButton = document.getElementById("readyButton");

if (readyButton) {

    readyButton.addEventListener("click", function () {

        showScreen("screen2");

    });

}


/* =====================================================
   SCREEN 2 → SCREEN 3
===================================================== */

const continue1 = document.getElementById("continue1");

if (continue1) {

    continue1.addEventListener("click", function () {

        showScreen("screen3");

    });

}


/* =====================================================
   SCREEN 3 → SCREEN 4
===================================================== */

const continue2 = document.getElementById("continue2");

if (continue2) {

    continue2.addEventListener("click", function () {

        showScreen("screen4");

    });

}


/* =====================================================
   SCREEN 4 → MEMORY BOOK
===================================================== */

const continue3 = document.getElementById("continue3");

if (continue3) {

    continue3.addEventListener("click", function () {

        openMemoryBook();

    });

}


/* =====================================================
   MEMORY BOOK
===================================================== */

const memories = [

    {
        image: "memory1.jpg",
        caption: "Our beautiful memory ❤️"
    },

    {
        image: "memory2.jpg",
        caption: "Another beautiful moment ❤️"
    },

    {
        image: "memory3.jpg",
        caption: "A moment I will always remember 💕"
    },

    {
        image: "memory4.jpg",
        caption: "Another page of our story ❤️"
    },

    {
        image: "memory5.jpg",
        caption: "Memories that became ours 💗"
    },

    {
        image: "memory6.jpg",
        caption: "Another little piece of us ❤️"
    },

    {
        image: "memory7.jpg",
        caption: "A beautiful moment together 💕"
    },

    {
        image: "memory8.jpg",
        caption: "One more memory to keep forever ❤️"
    },

    {
        image: "memory9.jpg",
        caption: "Every picture tells our story 💗"
    },

    {
        image: "memory10.jpg",
        caption: "And the story continues... ❤️"
    }

];


let currentMemory = 0;

const memoryBook = document.getElementById("memoryBook");

const memoryPhoto = document.getElementById("memoryPhoto");

const photoCaption = document.getElementById("photoCaption");

const bookCounter = document.getElementById("bookCounter");

const bookPage = document.getElementById("bookPage");


/* =====================================================
   OPEN MEMORY BOOK
===================================================== */

function openMemoryBook() {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    if (memoryBook) {

        memoryBook.classList.add("active");

    }

    currentMemory = 0;

    updateMemory(false);

}


/* =====================================================
   UPDATE MEMORY
===================================================== */

function updateMemory(animationDirection = false) {

    if (!memoryPhoto) return;

    const memory = memories[currentMemory];

    if (!memory) return;


    memoryPhoto.src = memory.image;

    memoryPhoto.alt = memory.caption;

    if (photoCaption) {
        photoCaption.textContent = memory.caption;
    }

    if (bookCounter) {
        bookCounter.textContent =
            `${currentMemory + 1} / ${memories.length}`;
    }


    /*
       If an image is missing, show a useful message
       instead of leaving a broken huge image.
    */

    memoryPhoto.onerror = function () {

        console.log("Missing image:", memory.image);

        memoryPhoto.style.display = "none";

        if (photoCaption) {

            photoCaption.textContent =
                `Please check ${memory.image}`;

        }

    };


    memoryPhoto.onload = function () {

        memoryPhoto.style.display = "block";

    };


    if (animationDirection && bookPage) {

        bookPage.classList.remove(
            "flip-next",
            "flip-prev"
        );

        void bookPage.offsetWidth;

        bookPage.classList.add(animationDirection);

    }

}


/* =====================================================
   NEXT MEMORY
===================================================== */

function nextMemory() {

    if (currentMemory >= memories.length - 1) {

        return;

    }

    currentMemory++;

    updateMemory("flip-next");

}


/* =====================================================
   PREVIOUS MEMORY
===================================================== */

function previousMemory() {

    if (currentMemory <= 0) {

        return;

    }

    currentMemory--;

    updateMemory("flip-prev");

}


/* =====================================================
   SWIPE SUPPORT
===================================================== */

let touchStartX = 0;
let touchEndX = 0;

if (memoryBook) {

    memoryBook.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    memoryBook.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        { passive: true }
    );

}


function handleSwipe() {

    const difference =
        touchEndX - touchStartX;


    if (Math.abs(difference) < 50) {
        return;
    }


    if (difference < 0) {

        nextMemory();

    } else {

        previousMemory();

    }

}


/* =====================================================
   CONTINUE FROM BOOK
===================================================== */

function continueFromBook() {

    /*
       For now, after the last memory,
       return to a simple final chapter.
    */

    if (currentMemory < memories.length - 1) {

        currentMemory = memories.length - 1;

        updateMemory(false);

        return;

    }

    alert("More of our story is coming ❤️");

}
