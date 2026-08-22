/* =========================================================
   OUR STORY ❤️
   COMPLETE JAVASCRIPT
   Screens + Music + Photo Book + 10 Memories
========================================================= */


/* =========================================================
   VARIABLES
========================================================= */

let currentMemory = 0;

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

/* =========================================================
   SCREEN CONTROL
========================================================= */

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(function(screen) {
        screen.classList.remove("active");
        screen.style.display = "none";
    });

    const screen = document.getElementById(screenId);

    if (screen) {

        screen.classList.add("active");
        screen.style.display = "flex";

    }

}


/* =========================================================
   FIRST SCREEN → SECOND SCREEN
========================================================= */

const readyButton = document.getElementById("readyButton");

if (readyButton) {

    readyButton.addEventListener("click", function() {

        showScreen("screen2");

    });

}


/* =========================================================
   MUSIC
========================================================= */

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

let musicPlaying = false;


if (musicButton && music) {

    musicButton.addEventListener("click", function() {

        if (!musicPlaying) {

            music.play()
                .then(function() {

                    musicPlaying = true;

                    musicButton.innerHTML = "🎵 Music Playing ❤️";

                })
                .catch(function(error) {

                    console.log("Music could not start:", error);

                });

        } else {

            music.pause();

            musicPlaying = false;

            musicButton.innerHTML = "🎵 Click for Music";

        }

    });

}


/* =========================================================
   SCREEN 2 → SCREEN 3
========================================================= */

const continue1 = document.getElementById("continue1");

if (continue1) {

    continue1.addEventListener("click", function() {

        showScreen("screen3");

    });

}


/* =========================================================
   SCREEN 3 → SCREEN 4
========================================================= */

const continue2 = document.getElementById("continue2");

if (continue2) {

    continue2.addEventListener("click", function() {

        showScreen("screen4");

    });

}


/* =========================================================
   SCREEN 4 → PHOTO BOOK
========================================================= */

const continue3 = document.getElementById("continue3");

if (continue3) {

    continue3.addEventListener("click", function(event) {

        event.preventDefault();

        openMemoryBook();

    });

}


/* =========================================================
   OPEN PHOTO BOOK
========================================================= */

function openMemoryBook() {

    /* Hide all normal screens */

    document.querySelectorAll(".screen").forEach(function(screen) {

        screen.classList.remove("active");

        screen.style.display = "none";

    });


    /* Hide all other sections except the book */

    document.querySelectorAll("section").forEach(function(section) {

        if (section.id !== "memoryBook") {

            section.style.display = "none";

        }

    });


    /* Reset to first photo */

    currentMemory = 0;

    updateMemory();


    /* Show book */

    const book = document.getElementById("memoryBook");

    if (book) {

        book.classList.add("active");

        book.style.display = "flex";

    }


    /* Tell CSS book is open */

    document.body.classList.add("book-open");

}


/* =========================================================
   UPDATE PHOTO
========================================================= */

function updateMemory(direction) {

    const photo = document.getElementById("memoryPhoto");
    const caption = document.getElementById("photoCaption");
    const counter = document.getElementById("bookCounter");
    const page = document.getElementById("bookPage");


    if (!photo || !caption || !counter || !page) {

        return;

    }


    /* Flip animation */

    if (direction) {

        page.classList.remove("flip-next");
        page.classList.remove("flip-prev");


        /* Force browser to restart animation */

        void page.offsetWidth;


        if (direction === "next") {

            page.classList.add("flip-next");

        } else {

            page.classList.add("flip-prev");

        }

    }


    /* Change image after a short delay */

    const changeDelay = direction ? 180 : 0;


    setTimeout(function() {

        photo.src = memories[currentMemory].image;

        caption.textContent = memories[currentMemory].text;

        counter.textContent =
            (currentMemory + 1) + " / " + memories.length;


    }, changeDelay);

}


/* =========================================================
   NEXT PHOTO
========================================================= */

function nextMemory() {

    if (currentMemory >= memories.length - 1) {

        /* Already at last photo */

        return;

    }


    currentMemory++;

    updateMemory("next");

}


/* =========================================================
   PREVIOUS PHOTO
========================================================= */

function previousMemory() {

    if (currentMemory <= 0) {

        return;

    }


    currentMemory--;

    updateMemory("prev");

}


/* =========================================================
   SWIPE SUPPORT
========================================================= */

const bookPage = document.getElementById("bookPage");

let touchStartX = 0;
let touchEndX = 0;


if (bookPage) {

    bookPage.addEventListener("touchstart", function(event) {

        touchStartX = event.changedTouches[0].screenX;

    });


    bookPage.addEventListener("touchend", function(event) {

        touchEndX = event.changedTouches[0].screenX;

        handleSwipe();

    });

}


function handleSwipe() {

    const difference = touchStartX - touchEndX;


    /* Swipe left → next photo */

    if (difference > 50) {

        nextMemory();

    }


    /* Swipe right → previous photo */

    if (difference < -50) {

        previousMemory();

    }

}


/* =========================================================
   PHOTO BOOK CONTINUE BUTTON
========================================================= */

function continueFromBook() {

    const book = document.getElementById("memoryBook");


    if (book) {

        book.classList.remove("active");

        book.style.display = "none";

    }


    document.body.classList.remove("book-open");


    /* If you later create screen5,
       this will automatically open it. */

    const nextScreen = document.getElementById("screen5");


    if (nextScreen) {

        showScreen("screen5");

        return;

    }


    /* For now, if screen5 doesn't exist,
       keep the book closed and show a simple next-chapter message. */

    alert("Next chapter ❤️");


    showScreen("screen4");

}


/* =========================================================
   FIX PHOTO BOOK CONTINUE BUTTON
========================================================= */

/* Your current HTML has openMemoryBook()
   on the book's Continue button.

   We automatically correct it here so you
   don't have to edit the HTML again.
*/

const bookContinueButton =
    document.querySelector("#memoryBook .continue-btn");


if (bookContinueButton) {

    bookContinueButton.onclick = function(event) {

        event.preventDefault();

        continueFromBook();

    };

}


/* =========================================================
   PRELOAD ALL 10 PHOTOS
========================================================= */

memories.forEach(function(memory) {

    const image = new Image();

    image.src = memory.image;

});


/* =========================================================
   STARTING STATE
========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    showScreen("screen1");

    updateMemory();

});
