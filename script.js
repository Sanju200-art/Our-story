/* =========================================
   OUR STORY ❤️
   STABLE VERSION
========================================= */


/* =========================
   MEMORY PHOTOS
========================= */

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


/* =========================
   START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================
           MUSIC
        ===================== */

        const music =
            document.getElementById("music");

        const musicButton =
            document.getElementById("musicButton");


        if (musicButton && music) {

            musicButton.addEventListener(
                "click",
                function () {

                    if (music.paused) {

                        music.play()
                            .then(function () {

                                musicButton.innerHTML =
                                    "🎵 Music Playing ❤️";

                            })
                            .catch(function () {

                                musicButton.innerHTML =
                                    "🎵 Click for Music";

                            });

                    }

                    else {

                        music.pause();

                        musicButton.innerHTML =
                            "🎵 Click for Music";

                    }

                }
            );

        }


        /* =====================
           SCREEN 1 → SCREEN 2
        ===================== */

        const readyButton =
            document.getElementById(
                "readyButton"
            );


        if (readyButton) {

            readyButton.addEventListener(
                "click",
                function () {

                    showScreen("screen2");

                }
            );

        }


        /* =====================
           SCREEN 2 → SCREEN 3
        ===================== */

        const continue1 =
            document.getElementById(
                "continue1"
            );


        if (continue1) {

            continue1.addEventListener(
                "click",
                function () {

                    showScreen("screen3");

                }
            );

        }


        /* =====================
           SCREEN 3 → SCREEN 4
        ===================== */

        const continue2 =
            document.getElementById(
                "continue2"
            );


        if (continue2) {

            continue2.addEventListener(
                "click",
                function () {

                    showScreen("screen4");

                }
            );

        }


        /* =====================
           SCREEN 4 → PHOTO BOOK
        ===================== */

        const continue3 =
            document.getElementById(
                "continue3"
            );


        if (continue3) {

            continue3.addEventListener(
                "click",
                function () {

                    openMemoryBook();

                }
            );

        }


        /* =====================
           BOOK BUTTONS
        ===================== */

        const previousButton =
            document.getElementById(
                "previousButton"
            );


        const nextButton =
            document.getElementById(
                "nextButton"
            );


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


        /* =====================
           BOOK CONTINUE
        ===================== */

        const bookContinue =
            document.getElementById(
                "bookContinue"
            );


        if (bookContinue) {

            bookContinue.addEventListener(
                "click",
                continueFromBook
            );

        }


        /* =====================
           SWIPE
        ===================== */

        setupSwipe();


        /* =====================
           FIRST PHOTO
        ===================== */

        updateMemory();

    }
);


/* =========================
   CHANGE SCREEN
========================= */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(
            ".screen"
        );


    screens.forEach(
        function (screen) {

            screen.classList.remove(
                "active"
            );

        }
    );


    const target =
        document.getElementById(
            screenId
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }

}


/* =========================
   OPEN PHOTO BOOK
========================= */

function openMemoryBook() {

    currentMemory = 0;

    updateMemory();

    showScreen("memoryBook");

}


/* =========================
   UPDATE PHOTO
========================= */

function updateMemory() {

    const photo =
        document.getElementById(
            "memoryPhoto"
        );


    const caption =
        document.getElementById(
            "photoCaption"
        );


    const counter =
        document.getElementById(
            "bookCounter"
        );


    if (!photo ||
        !caption ||
        !counter) {

        return;

    }


    photo.src =
        memories[currentMemory].image;


    caption.textContent =
        memories[currentMemory].text;


    counter.textContent =
        (currentMemory + 1)
        + " / "
        + memories.length;

}


/* =========================
   NEXT PHOTO
========================= */

function nextMemory() {

    if (currentMemory >= memories.length - 1) {
        return;
    }

    const page = document.getElementById("bookPage");

    page.classList.remove("flip-next", "flip-prev");

    void page.offsetWidth;

    page.classList.add("flip-next");

    setTimeout(function () {

        currentMemory++;

        updateMemory();

        page.classList.remove("flip-next");

    }, 400);
}


function previousMemory() {

    if (currentMemory <= 0) {
        return;
    }

    const page = document.getElementById("bookPage");

    page.classList.remove("flip-next", "flip-prev");

    void page.offsetWidth;

    page.classList.add("flip-prev");

    setTimeout(function () {

        currentMemory--;

        updateMemory();

        page.classList.remove("flip-prev");

    }, 400);
}

/* =========================
   PREVIOUS PHOTO
========================= */

function previousMemory() {

    if (
        currentMemory > 0
    ) {

        currentMemory--;

        updateMemory();

    }

}


/* =========================
   SWIPE
========================= */

function setupSwipe() {

    const page =
        document.getElementById(
            "bookPage"
        );


    if (!page) {

        return;

    }


    let startX = 0;


    page.addEventListener(
        "touchstart",
        function (event) {

            startX =
                event.changedTouches[0]
                .screenX;

        },
        { passive: true }
    );


    page.addEventListener(
        "touchend",
        function (event) {

            const endX =
                event.changedTouches[0]
                .screenX;


            const difference =
                startX - endX;


            if (difference > 50) {

                nextMemory();

            }

            else if (
                difference < -50
            ) {

                previousMemory();

            }

        },
        { passive: true }
    );

}


/* =========================
   BOOK → FUTURE CHAPTER
========================= */

function continueFromBook() {

    /*
       We haven't created the next
       chapter yet.

       We'll connect this button
       when we create the next scene.
    */

    alert(
        "Next chapter is coming ❤️"
    );

    }
