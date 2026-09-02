document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       MUSIC
    ========================================= */

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

                            musicButton.textContent =
                                "🎵 Music Playing ❤️";

                        })
                        .catch(function () {

                            musicButton.textContent =
                                "🎵 Tap Again for Music";

                        });

                }

            }
        );

    }


    /* =========================================
       SCREEN NAVIGATION
    ========================================= */

    function showScreen(id) {

        document
            .querySelectorAll(
                ".screen, .memory-book"
            )
            .forEach(function (screen) {

                screen.classList.remove("active");

            });


        const target =
            document.getElementById(id);


        if (target) {

            target.classList.add("active");

            window.scrollTo(0, 0);

        }

    }


    /* =========================================
       SCREEN 1
    ========================================= */

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


    /* =========================================
       SCREEN 2 → SCREEN 3
    ========================================= */

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


    /* =========================================
       SCREEN 3 → SCREEN 4
    ========================================= */

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


    /* =========================================
       SCREEN 4 → MEMORY BOOK
    ========================================= */

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


    /* =========================================
       MEMORY BOOK
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

        "13 Oct 2024 - 2nd Date 🥰",

        "3 Nov 2024 - Private date 😘",

        "18 Nov 2024 - Church time 😇",

        "22 Dec 2024 - First Christmas Together 😚",

        "25 Dec 2024 - Holiday Special 🤗",

        "19 Jan 2025 - New Year Chapter 🥳",

        "1 Mar 2025 - Jebel Jais Moments 🤩",

        "31 Mar 2025 - Global Village Special 💝",

        "18 May 2025 - Gathering Special 😊",

        "16 Jun 2025 - That Last Touch of her 🥺"

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


        if (
            index >=
            memoryPhotos.length
        ) {

            index =
                memoryPhotos.length - 1;

        }


        currentMemory = index;


        if (bookPage) {

            bookPage.classList.remove(
                "page-changing"
            );

            void bookPage.offsetWidth;

            bookPage.classList.add(
                "page-changing"
            );

        }


        if (memoryPhoto) {

            memoryPhoto.src =
                memoryPhotos[currentMemory];

        }


        if (photoCaption) {

            photoCaption.textContent =
                memoryCaptions[currentMemory];

        }


        if (bookCounter) {

            bookCounter.textContent =
                `${currentMemory + 1} / ${memoryPhotos.length}`;

        }

    }


    showMemory(0);


    /* =========================================
       MEMORY BOOK CONTINUE
    ========================================= */

    if (bookContinue) {

        bookContinue.addEventListener(
            "click",
            function () {

                if (
                    currentMemory <
                    memoryPhotos.length - 1
                ) {

                    showMemory(
                        currentMemory + 1
                    );

                } else {

                    alert(
                        "Another beautiful chapter is coming ❤️"
                    );

                }

            }
        );

    }


    /* =========================================
       MEMORY BOOK SWIPE
    ========================================= */

    let touchStartX = 0;


    if (bookPage) {

        bookPage.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0]
                    .screenX;

            },
            { passive: true }
        );


        bookPage.addEventListener(
            "touchend",
            function (event) {

                const touchEndX =
                    event.changedTouches[0]
                    .screenX;


                const distance =
                    touchEndX - touchStartX;


                if (distance < -50) {

                    if (
                        currentMemory <
                        memoryPhotos.length - 1
                    ) {

                        showMemory(
                            currentMemory + 1
                        );

                    }

                }


                else if (distance > 50) {

                    if (currentMemory > 0) {

                        showMemory(
                            currentMemory - 1
                        );

                    }

                }

            },
            { passive: true }
        );

    }


});
