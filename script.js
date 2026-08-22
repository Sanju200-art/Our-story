document.addEventListener("DOMContentLoaded", function () {

    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");

    const readyButton = document.getElementById("readyButton");
    const continue1 = document.getElementById("continue1");
    const continue2 = document.getElementById("continue2");
    const continue3 = document.getElementById("continue3");

    /* =========================
       SHOW ONLY ONE SCREEN
    ========================= */

    function showScreen(screenId) {

        document.querySelectorAll(".screen").forEach(function (screen) {
            screen.classList.remove("active");
            screen.style.display = "none";
        });

        const screen = document.getElementById(screenId);

        if (screen) {
            screen.style.display = "flex";
            screen.classList.add("active");
        }
    }


    /* =========================
       FIRST SCREEN
    ========================= */

    showScreen("screen1");


    /* =========================
       MUSIC
    ========================= */

    if (musicButton && music) {

        musicButton.addEventListener("click", function () {

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

            } else {

                music.pause();

                musicButton.innerHTML =
                    "🎵 Click for Music";
            }

        });

    }


    /* =========================
       SCREEN 1 → SCREEN 2
    ========================= */

    if (readyButton) {

        readyButton.addEventListener("click", function () {

            showScreen("screen2");

        });

    }


    /* =========================
       SCREEN 2 → SCREEN 3
    ========================= */

    if (continue1) {

        continue1.addEventListener("click", function () {

            showScreen("screen3");

        });

    }


    /* =========================
       SCREEN 3 → SCREEN 4
    ========================= */

    if (continue2) {

        continue2.addEventListener("click", function () {

            showScreen("screen4");

        });

    }


    /* =========================
       SCREEN 4 → PHOTO BOOK
    ========================= */

    if (continue3) {

        continue3.addEventListener("click", function () {

            showScreen("memoryBook");

        });

    }

});
