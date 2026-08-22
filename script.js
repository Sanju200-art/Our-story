/* =========================================
   OUR STORY ❤️ — COMPLETE SCRIPT
========================================= */

const memories = [
    ["memory1.jpg", "Our beautiful memory ❤️"],
    ["memory2.jpg", "Another beautiful moment together ❤️"],
    ["memory3.jpg", "Every picture has a story behind it 💕"],
    ["memory4.jpg", "A moment I will always remember ❤️"],
    ["memory5.jpg", "Another little piece of our journey 💗"],
    ["memory6.jpg", "Every moment with you became special ❤️"],
    ["memory7.jpg", "Memories that will stay in my heart forever 💕"],
    ["memory8.jpg", "And our story kept growing ❤️"],
    ["memory9.jpg", "Another chapter of us 💗"],
    ["memory10.jpg", "And this is still only the beginning... ❤️"]
];

let currentMemory = 0;
let musicPlaying = false;


/* =========================================
   SHOW SCREEN — CINEMATIC
========================================= */

function showScreen(id) {

    const nextScreen = document.getElementById(id);
    const currentScreen = document.querySelector(".screen.active");

    if (!nextScreen) return;

    /* If already on this screen */
    if (currentScreen === nextScreen) return;

    document.body.classList.add("transitioning");

    /* Fade current screen out */
    if (currentScreen) {

        currentScreen.classList.add("cinematic-exit");

    }

    setTimeout(function() {

        /* Hide every screen */
        document.querySelectorAll(".screen").forEach(function(screen) {

            screen.classList.remove(
                "active",
                "cinematic-exit",
                "cinematic-enter"
            );

            screen.style.display = "none";

        });

        /* Show new screen */
        nextScreen.style.display = "flex";
        nextScreen.classList.add("active");

        /* Force animation restart */
        void nextScreen.offsetWidth;

        nextScreen.classList.add("cinematic-enter");

        setTimeout(function() {

            document.body.classList.remove("transitioning");

        }, 1800);

    }, currentScreen ? 850 : 0);
}


/* =========================================
   PAGE LOADED
========================================= */

document.addEventListener("DOMContentLoaded", function() {

    /* IMPORTANT:
       First page is immediately active.
       No animation or delay here.
    */

    document.querySelectorAll(".screen").forEach(function(screen) {

        screen.style.display = "none";

    });

    const firstScreen = document.getElementById("screen1");

    if (firstScreen) {

        firstScreen.style.display = "flex";
        firstScreen.classList.add("active");

    }


    /* =====================================
       MUSIC
    ===================================== */

    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");

    if (musicButton && music) {

        musicButton.addEventListener("click", function(event) {

            event.preventDefault();
            event.stopPropagation();

            if (!musicPlaying) {

                music.play()
                    .then(function() {

                        musicPlaying = true;

                        musicButton.textContent =
                            "🎵 Music Playing ❤️";

                    })
                    .catch(function(error) {

                        console.log("Music needs another tap:", error);

                        musicButton.textContent =
                            "🎵 Click for Music";

                    });

            } else {

                music.pause();

                musicPlaying = false;

                musicButton.textContent =
                    "🎵 Click for Music";

            }

        });

    }


    /* =====================================
       FIRST PAGE → SCREEN 2
    ===================================== */

    const readyButton =
        document.getElementById("readyButton");

    if (readyButton) {

        readyButton.addEventListener("click", function(event) {

            event.preventDefault();

            showScreen("screen2");

        });

    }


    /* =====================================
       SCREEN 2 → SCREEN 3
    ===================================== */

    const continue1 =
        document.getElementById("continue1");

    if (continue1) {

        continue1.addEventListener("click", function(event) {

            event.preventDefault();

            showScreen("screen3");

        });

    }


    /* =====================================
       SCREEN 3 → SCREEN 4
    ===================================== */

    const continue2 =
        document.getElementById("continue2");

    if (continue2) {

        continue2.addEventListener("click", function(event) {

            event.preventDefault();

            showScreen("screen4");

        });

    }


    /* =====================================
       SCREEN 4 → PHOTO BOOK
    ===================================== */

    const continue3 =
        document.getElementById("continue3");

    if (continue3) {

        continue3.addEventListener("click", function(event) {

            event.preventDefault();

            openMemoryBook();

        });

    }


    /* =====================================
       BOOK BUTTONS
    ===================================== */

    const previousButton =
        document.getElementById("previousButton");

    const nextButton =
        document.getElementById("nextButton");

    if (previousButton) {

        previousButton.addEventListener("click", function() {

            previousMemory();

        });

    }

    if (nextButton) {

        nextButton.addEventListener("click", function() {

            nextMemory();

        });

    }


    /* =====================================
       BOOK CONTINUE
    ===================================== */

    const bookContinue =
        document.getElementById("bookContinue");

    if (bookContinue) {

        bookContinue.addEventListener("click", function() {

            continueFromBook();

        });

    }


    /* =====================================
       BOOK SWIPE
    ===================================== */

    setupSwipe();

    updateMemory();

});


/* =========================================
   OPEN MEMORY BOOK
========================================= */

function openMemoryBook() {

    const currentScreen =
        document.querySelector(".screen.active");

    const book =
        document.getElementById("memoryBook");

    if (!book) return;

    document.body.classList.add("transitioning");

    if (currentScreen) {

        currentScreen.classList.add("cinematic-exit");

    }

    setTimeout(function() {

        document.querySelectorAll(".screen").forEach(function(screen) {

            screen.style.display = "none";

            screen.classList.remove(
                "active",
                "cinematic-exit",
                "cinematic-enter"
            );

        });

        currentMemory = 0;

        updateMemory();

        book.style.display = "flex";
        book.classList.add("active");

        void book.offsetWidth;

        book.classList.add("cinematic-enter");

        setTimeout(function() {

            document.body.classList.remove("transitioning");

        }, 1800);

    }, 850);
}


/* =========================================
   UPDATE MEMORY
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

    if (!photo || !caption || !counter) return;


    /* Flip animation */

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


    photo.src = memories[currentMemory][0];

    caption.textContent =
        memories[currentMemory][1];

    counter.textContent =
        (currentMemory + 1) +
        " / " +
        memories.length;
}


/* =========================================
   NEXT MEMORY
========================================= */

function nextMemory() {

    if (currentMemory >= memories.length - 1) {

        return;

    }

    currentMemory++;

    updateMemory("next");
}


/* =========================================
   PREVIOUS MEMORY
========================================= */

function previousMemory() {

    if (currentMemory <= 0) {

        return;

    }

    currentMemory--;

    updateMemory("prev");
}


/* =========================================
   SWIPE
========================================= */

function setupSwipe() {

    const page =
        document.getElementById("bookPage");

    if (!page) return;

    let startX = 0;

    page.addEventListener("touchstart", function(event) {

        startX =
            event.changedTouches[0].screenX;

    }, { passive: true });


    page.addEventListener("touchend", function(event) {

        const endX =
            event.changedTouches[0].screenX;

        const difference =
            startX - endX;

        if (difference > 50) {

            nextMemory();

        } else if (difference < -50) {

            previousMemory();

        }

    }, { passive: true });
}


/* =========================================
   BOOK → NEXT CHAPTER
========================================= */

function continueFromBook() {

    /* For now there is no Screen 5 yet.
       When we create it, we will connect
       it here. */

    const screen5 =
        document.getElementById("screen5");

    if (screen5) {

        showScreen("screen5");

    } else {

        alert(
            "Next chapter is coming ❤️"
        );

    }
}


/* =========================================
   PRELOAD PHOTOS
========================================= */

memories.forEach(function(memory) {

    const image = new Image();

    image.src = memory[0];

});
