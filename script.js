/* =========================================
   OUR STORY ❤️
   COMPLETE SCRIPT
========================================= */


/* =========================================
   SCREEN FUNCTION
========================================= */

function showScreen(id) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
        screen.style.display = "none";
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
        target.style.display = "flex";
    }
}


/* =========================================
   START APP
========================================= */

document.addEventListener("DOMContentLoaded", function() {

    /* Start on first page */
    showScreen("screen1");


    /* =====================================
       MUSIC BUTTON
    ===================================== */

    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");

    let musicPlaying = false;

    if (musicButton && music) {

        musicButton.addEventListener("click", function() {

            if (!musicPlaying) {

                music.play()
                    .then(function() {

                        musicPlaying = true;

                        musicButton.innerHTML =
                            "🎵 Music Playing ❤️";

                    })
                    .catch(function(error) {

                        console.log("Music error:", error);

                        musicButton.innerHTML =
                            "🎵 Tap Again for Music";

                    });

            } else {

                music.pause();

                musicPlaying = false;

                musicButton.innerHTML =
                    "🎵 Click for Music";

            }

        });

    }


    /* =====================================
       FIRST PAGE → 8 OCTOBER
    ===================================== */

    const readyButton =
        document.getElementById("readyButton");

    if (readyButton) {

        readyButton.addEventListener("click", function() {

            showScreen("screen2");

        });

    }


    /* =====================================
       8 OCTOBER → FIRST DATE
    ===================================== */

    const continue1 =
        document.getElementById("continue1");

    if (continue1) {

        continue1.addEventListener("click", function() {

            showScreen("screen3");

        });

    }


    /* =====================================
       FIRST DATE → 2 NOVEMBER
    ===================================== */

    const continue2 =
        document.getElementById("continue2");

    if (continue2) {

        continue2.addEventListener("click", function() {

            showScreen("screen4");

        });

    }


    /* =====================================
       2 NOVEMBER → PHOTO BOOK
    ===================================== */

    const continue3 =
        document.getElementById("continue3");

    if (continue3) {

        continue3.addEventListener("click", function() {

            openMemoryBook();

        });

    }


    /* =====================================
       BOOK ARROWS
    ===================================== */

    const previousButton =
        document.getElementById("previousButton");

    const nextButton =
        document.getElementById("nextButton");

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousMemory
        );

    }

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextMemory
        );

    }


    /* =====================================
       BOOK CONTINUE
    ===================================== */

    const bookContinue =
        document.getElementById("bookContinue");

    if (bookContinue) {

        bookContinue.addEventListener(
            "click",
            continueFromBook
        );

    }


    /* =====================================
       PHOTO BOOK
    ===================================== */

    setupMemoryBook();

});


/* =========================================
   MEMORY PHOTOS
========================================= */

const memories = [

    {
        image: "memory1.jpg",
        text: "Our beautiful memory ❤️"
    },

    {
        image: "memory2.jpg",
        text: "Another beautiful moment together ❤️"
    },

    {
        image: "memory3.jpg",
        text: "Every picture has a story behind it 💕"
    },

    {
        image: "memory4.jpg",
        text: "A moment I will always remember ❤️"
    },

    {
        image: "memory5.jpg",
        text: "Another little piece of our journey 💗"
    },

    {
        image: "memory6.jpg",
        text: "Every moment with you became special ❤️"
    },

    {
        image: "memory7.jpg",
        text: "Memories that will stay in my heart forever 💕"
    },

    {
        image: "memory8.jpg",
        text: "And our story kept growing ❤️"
    },

    {
        image: "memory9.jpg",
        text: "Another chapter of us 💗"
    },

    {
        image: "memory10.jpg",
        text: "And this is still only the beginning... ❤️"
    }

];


let currentMemory = 0;


/* =========================================
   SETUP BOOK
========================================= */

function setupMemoryBook() {

    const bookPage =
        document.getElementById("bookPage");

    if (!bookPage) {
        return;
    }


    let startX = 0;


    bookPage.addEventListener(
        "touchstart",
        function(event) {

            startX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    bookPage.addEventListener(
        "touchend",
        function(event) {

            const endX =
                event.changedTouches[0].screenX;

            const distance =
                startX - endX;


            if (distance > 50) {

                nextMemory();

            }

            else if (distance < -50) {

                previousMemory();

            }

        },
        { passive: true }
    );


    updateMemory();

}


/* =========================================
   OPEN BOOK
========================================= */

function openMemoryBook() {

    currentMemory = 0;

    updateMemory();

    document.querySelectorAll(".screen")
        .forEach(function(screen) {

            screen.classList.remove("active");
            screen.style.display = "none";

        });


    const book =
        document.getElementById("memoryBook");


    if (book) {

        book.classList.add("active");
        book.style.display = "flex";

    }

}


/* =========================================
   UPDATE PHOTO
========================================= */

function updateMemory(direction) {

    const photo =
        document.getElementById("memoryPhoto");

    const caption =
        document.getElementById("photoCaption");

    const counter =
        document.getElementById("bookCounter");

    const page =
        document.getElementById("bookPage");


    if (!photo || !caption || !counter) {
        return;
    }


    if (direction && page) {

        page.classList.remove(
            "flip-next",
            "flip-prev"
        );

        void page.offsetWidth;


        if (direction === "next") {

            page.classList.add("flip-next");

        } else {

            page.classList.add("flip-prev");

        }

    }


    photo.src =
        memories[currentMemory].image;

    caption.textContent =
        memories[currentMemory].text;

    counter.textContent =
        (currentMemory + 1) +
        " / " +
        memories.length;

}


/* =========================================
   NEXT PHOTO
========================================= */

function nextMemory() {

    if (
        currentMemory <
        memories.length - 1
    ) {

        currentMemory++;

        updateMemory("next");

    }

}


/* =========================================
   PREVIOUS PHOTO
========================================= */

function previousMemory() {

    if (currentMemory > 0) {

        currentMemory--;

        updateMemory("prev");

    }

}


/* =========================================
   BOOK → NEXT CHAPTER
========================================= */

function continueFromBook() {

    const book =
        document.getElementById("memoryBook");


    if (book) {

        book.classList.remove("active");
        book.style.display = "none";

    }


    /* If we create screen5 later,
       it will automatically open here. */

    const screen5 =
        document.getElementById("screen5");


    if (screen5) {

        showScreen("screen5");

    } else {

        /* For now return to screen 4 */

        showScreen("screen4");

    }

}


/* =========================================
   PRELOAD ALL PHOTOS
========================================= */

memories.forEach(function(memory) {

    const img = new Image();

    img.src = memory.image;

});
