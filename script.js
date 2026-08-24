document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MUSIC
    ========================================= */

    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");

    if (musicButton && music) {

        musicButton.addEventListener("click", function () {

            if (music.paused) {

                music.play()
                    .then(() => {
                        musicButton.textContent = "🎵 Music Playing ❤️";
                    })
                    .catch(() => {
                        musicButton.textContent = "🎵 Tap Again for Music";
                    });

            } else {

                music.pause();
                musicButton.textContent = "🎵 Click for Music";

            }

        });

    }


    /* =========================================
       SCREEN CHANGING
    ========================================= */

    function showScreen(screenId) {

        document.querySelectorAll(".screen, .memory-book")
            .forEach(function (screen) {

                screen.classList.remove("active");

            });

        const target = document.getElementById(screenId);

        if (target) {
            target.classList.add("active");
            window.scrollTo(0, 0);
        }

    }


    /* =========================================
       FIRST PAGE
    ========================================= */

    const readyButton = document.getElementById("readyButton");

    if (readyButton) {

        readyButton.addEventListener("click", function () {

            showScreen("screen2");

        });

    }


    /* =========================================
       SCREEN 2 → SCREEN 3
    ========================================= */

    const continue1 = document.getElementById("continue1");

    if (continue1) {

        continue1.addEventListener("click", function () {

            showScreen("screen3");

        });

    }


    /* =========================================
       SCREEN 3 → SCREEN 4
    ========================================= */

    const continue2 = document.getElementById("continue2");

    if (continue2) {

        continue2.addEventListener("click", function () {

            showScreen("screen4");

        });

    }


    /* =========================================
       SCREEN 4 → MEMORY BOOK
    ========================================= */

    const continue3 = document.getElementById("continue3");

    if (continue3) {

        continue3.addEventListener("click", function () {

            showScreen("memoryBook");

        });

    }


    /* =========================================
       MEMORY BOOK
       10 PHOTOS
    ========================================= */

    const memoryPhotos = [
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


    const memoryCaptions = [
        "Our beautiful memory ❤️",
        "Another beautiful moment ❤️",
        "A memory worth keeping 💕",
        "Another page of our story ❤️",
        "A moment we will always remember 💗",
        "Another little piece of us ❤️",
        "Beautiful moments together 💕",
        "Another memory, another smile ❤️",
        "Our story continues 💗",
        "And this is only the beginning ❤️"
    ];


    let currentMemory = 0;


    const memoryPhoto =
        document.getElementById("memoryPhoto");

    const photoCaption =
        document.getElementById("photoCaption");

    const bookCounter =
        document.getElementById("bookCounter");

    const bookPage =
        document.getElementById("bookPage");

    const bookContinue =
        document.getElementById("bookContinue");


    function showMemory(index) {

        if (index < 0) {
            index = 0;
        }

        if (index >= memoryPhotos.length) {
            index = memoryPhotos.length - 1;
        }

        currentMemory = index;


        /* PAGE FLIP ANIMATION */

        if (bookPage) {

            bookPage.classList.remove("page-changing");

            void bookPage.offsetWidth;

            bookPage.classList.add("page-changing");

        }


        /* CHANGE PHOTO */

        if (memoryPhoto) {
            memoryPhoto.src = memoryPhotos[currentMemory];
        }


        /* CHANGE CAPTION */

        if (photoCaption) {
            photoCaption.textContent =
                memoryCaptions[currentMemory];
        }


        /* CHANGE COUNTER */

        if (bookCounter) {
            bookCounter.textContent =
                `${currentMemory + 1} / ${memoryPhotos.length}`;
        }

    }


    /* =========================================
       CONTINUE BUTTON
       
       Continue moves to next PHOTO.
       
       After PHOTO 10:
       change this later to your next chapter.
    ========================================= */

    if (bookContinue) {

        bookContinue.addEventListener("click", function () {

            if (currentMemory < memoryPhotos.length - 1) {

                showMemory(currentMemory + 1);

            } else {

                alert("Our story continues ❤️");

            }

        });

    }


    /* =========================================
       SWIPE PHOTOS
    ========================================= */

    let touchStartX = 0;
    let touchEndX = 0;


    if (bookPage) {

        bookPage.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        bookPage.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event.changedTouches[0].screenX;

                const distance =
                    touchEndX - touchStartX;


                /* SWIPE LEFT → NEXT */

                if (distance < -50) {

                    if (
                        currentMemory <
                        memoryPhotos.length - 1
                    ) {

                        showMemory(currentMemory + 1);

                    }

                }


                /* SWIPE RIGHT → PREVIOUS */

                else if (distance > 50) {

                    if (currentMemory > 0) {

                        showMemory(currentMemory - 1);

                    }

                }

            },
            { passive: true }
        );

    }


    /* =========================================
       INITIAL PHOTO
    ========================================= */

    showMemory(0);

});
