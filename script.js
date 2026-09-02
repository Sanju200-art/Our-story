/* =====================================================
   OUR STORY ❤️
   CURRENT SCRIPT + FIXED 3×3 PUZZLE
===================================================== */


/* =====================================================
   MUSIC
===================================================== */

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

if (musicButton && music) {

    musicButton.addEventListener("click", function () {

        music.play().catch(function (error) {
            console.log("Music error:", error);
        });

        musicButton.textContent = "🎵 Music Playing ❤️";

    });

}


/* =====================================================
   SCREEN SYSTEM
===================================================== */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(function (screen) {

            screen.classList.remove("active");

        });


    const screen =
        document.getElementById(id);


    if (screen) {

        screen.classList.add("active");

    }

}


/* =====================================================
   OPENING SCREEN
===================================================== */

const readyButton =
    document.getElementById("readyButton");


if (readyButton) {

    readyButton.addEventListener(
        "click",
        function () {

            showScreen("screen2");

        }
    );

}


/* =====================================================
   SCREEN 2 → SCREEN 3
===================================================== */

const continue1 =
    document.getElementById("continue1");


if (continue1) {

    continue1.addEventListener(
        "click",
        function () {

            showScreen("screen3");

        }
    );

}


/* =====================================================
   SCREEN 3 → SCREEN 4
===================================================== */

const continue2 =
    document.getElementById("continue2");


if (continue2) {

    continue2.addEventListener(
        "click",
        function () {

            showScreen("screen4");

        }
    );

}


/* =====================================================
   SCREEN 4 → MEMORY BOOK
===================================================== */

const continue3 =
    document.getElementById("continue3");


if (continue3) {

    continue3.addEventListener(
        "click",
        function () {

            showScreen("memoryBook");

        }
    );

}


/* =====================================================
   MEMORY BOOK
===================================================== */

const memories = [

    "memory1.jpg",
    "memory2.jpg",
    "memory3.jpg",
    "memory4.jpg",
    "memory5.jpg",
    "memory6.jpg",
    "memory7.jpg",
    "memory8.jpg",
    "memory9.jpg",
    "memory10.jpg"

];


let currentMemory = 0;


const memoryPhoto =
    document.getElementById("memoryPhoto");


const bookCounter =
    document.getElementById("bookCounter");


const nextButton =
    document.getElementById("nextButton");


const previousButton =
    document.getElementById("previousButton");


const bookContinue =
    document.getElementById("bookContinue");


function updateMemory() {

    if (!memoryPhoto) {
        return;
    }


    memoryPhoto.src =
        memories[currentMemory];


    if (bookCounter) {

        bookCounter.textContent =
            `${currentMemory + 1} / ${memories.length}`;

    }

}


/* NEXT PAGE */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        function () {

            if (
                currentMemory <
                memories.length - 1
            ) {

                currentMemory++;

                updateMemory();

            }

        }
    );

}


/* PREVIOUS PAGE */

if (previousButton) {

    previousButton.addEventListener(
        "click",
        function () {

            if (currentMemory > 0) {

                currentMemory--;

                updateMemory();

            }

        }
    );

}


/* =====================================================
   MEMORY BOOK SWIPE
===================================================== */

let memoryTouchStartX = 0;
let memoryTouchEndX = 0;


const memoryBook =
    document.getElementById("memoryBook");


if (memoryBook) {

    memoryBook.addEventListener(
        "touchstart",
        function (event) {

            memoryTouchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    memoryBook.addEventListener(
        "touchend",
        function (event) {

            memoryTouchEndX =
                event.changedTouches[0].screenX;


            const distance =
                memoryTouchEndX -
                memoryTouchStartX;


            if (Math.abs(distance) < 50) {
                return;
            }


            if (distance < 0) {

                if (
                    currentMemory <
                    memories.length - 1
                ) {

                    currentMemory++;

                    updateMemory();

                }

            } else {

                if (currentMemory > 0) {

                    currentMemory--;

                    updateMemory();

                }

            }

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   MEMORY BOOK → PUZZLE
===================================================== */

if (bookContinue) {

    bookContinue.addEventListener(
        "click",
        function () {

            /*
               If user is not at the last
               memory, go to last memory.
            */

            if (
                currentMemory <
                memories.length - 1
            ) {

                currentMemory =
                    memories.length - 1;

                updateMemory();

                return;

            }


            /*
               Last memory →
               PUZZLE
            */

            openPuzzle();

        }
      
   }
