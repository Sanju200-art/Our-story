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

    const screenTransition =
        document.getElementById("screenTransition");


    function showScreen(id) {

        const target =
            document.getElementById(id);

        if (!target) {
            return;
        }


        if (screenTransition) {

            screenTransition.classList.add("active");

        }


        setTimeout(function () {

            document
                .querySelectorAll(
                    ".screen, .memory-book"
                )
                .forEach(function (screen) {

                    screen.classList.remove("active");

                    screen.classList.remove("entering");

                });


            target.classList.add("active");

            void target.offsetWidth;

            target.classList.add("entering");

            window.scrollTo(0, 0);


            if (screenTransition) {

                screenTransition.classList.remove("active");

            }

        }, 450);

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

                    showScreen("loveQuestion");

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


    /* =========================================
       WHO LOVES THE MOST
    ========================================= */

    const loveOptions =
        document.getElementById("loveOptions");

    const sanjuBtn =
        document.getElementById("sanjuBtn");

    const davidBtn =
        document.getElementById("davidBtn");

    const lovePopup =
        document.getElementById("lovePopup");

    const lovePopupClose =
        document.getElementById("lovePopupClose");


    function dodgeSanjuButton() {

        if (!loveOptions || !sanjuBtn) {
            return;
        }


        const containerRect =
            loveOptions.getBoundingClientRect();

        const btnRect =
            sanjuBtn.getBoundingClientRect();


        const maxLeft =
            Math.max(
                0,
                containerRect.width - btnRect.width
            );

        const maxTop =
            Math.max(
                0,
                containerRect.height - btnRect.height
            );


        const newLeft =
            Math.random() * maxLeft;

        const newTop =
            Math.random() * maxTop;


        sanjuBtn.style.left =
            newLeft + "px";

        sanjuBtn.style.top =
            newTop + "px";

    }


    if (sanjuBtn) {

        sanjuBtn.addEventListener(
            "mouseenter",
            dodgeSanjuButton
        );

        sanjuBtn.addEventListener(
            "touchstart",
            function (event) {

                event.preventDefault();

                dodgeSanjuButton();

            },
            { passive: false }
        );

        sanjuBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                dodgeSanjuButton();

            }
        );

    }


    if (davidBtn) {

        davidBtn.addEventListener(
            "click",
            function () {

                if (lovePopup) {

                    lovePopup.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    if (lovePopupClose) {

        lovePopupClose.addEventListener(
            "click",
            function () {

                if (lovePopup) {

                    lovePopup.classList.remove(
                        "active"
                    );

                }

                showScreen("letterScreen");

                setTimeout(typeLetter, 1200);

            }
        );

    }


    /* =========================================
       LOVE LETTER
       Edit the lines below with your own words.
    ========================================= */

    const letterLines = [

        "My dearest Sanju,",

        "Since 8 October 2024, every day with you has felt like a gift.",

        "Thank you for the laughs, the patience, and for choosing me again and again.",

        "Whatever comes next, I want to walk through it holding your hand.",

        "I love you more than these words can say. ❤️",

        "Forever yours,",

        "David 💞"

    ];

    const letterText =
        document.getElementById("letterText");

    const letterCard =
        document.getElementById("letterCard");

    const letterEnd =
        document.getElementById("letterEnd");

    let letterStarted = false;

    let letterFast = false;


    function sleep(ms) {

        return new Promise(function (resolve) {

            setTimeout(resolve, ms);

        });

    }


    async function typeLetter() {

        if (!letterText || letterStarted) {
            return;
        }

        letterStarted = true;

        letterText.innerHTML = "";


        for (const line of letterLines) {

            const p = document.createElement("p");

            letterText.appendChild(p);

            const chars = Array.from(line);


            for (let i = 0; i < chars.length; i++) {

                p.textContent =
                    chars.slice(0, i + 1).join("");

                letterCard.scrollTop =
                    letterCard.scrollHeight;

                await sleep(letterFast ? 4 : 45);

            }

            await sleep(letterFast ? 40 : 650);

        }


        if (letterEnd) {

            letterEnd.classList.add("show");

        }

    }


    if (letterCard) {

        letterCard.addEventListener(
            "click",
            function () {

                letterFast = true;

            }
        );

    }


    if (letterEnd) {

        letterEnd.addEventListener(
            "click",
            function () {

                showScreen("envelopeScreen");

            }
        );

    }


    /* =========================================
       ENVELOPE  →  WILL YOU MARRY ME
    ========================================= */

    const envelope =
        document.getElementById("envelope");

    const envelopeHint =
        document.getElementById("envelopeHint");

    const proposalOptions =
        document.getElementById("proposalOptions");

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const yesPopup = document.getElementById("yesPopup");
    const replayBtn = document.getElementById("replayBtn");


    if (envelope) {

        envelope.addEventListener(
            "click",
            function () {

                if (envelope.classList.contains("open")) {
                    return;
                }

                envelope.classList.add("open");

                if (envelopeHint) {
                    envelopeHint.style.visibility = "hidden";
                }

                setTimeout(function () {

                    showScreen("proposalScreen");

                }, 2200);

            }
        );

    }


    function dodgeNoButton() {

        if (!proposalOptions || !noBtn) {
            return;
        }

        const c = proposalOptions.getBoundingClientRect();
        const b = noBtn.getBoundingClientRect();

        noBtn.style.left =
            Math.random() * Math.max(0, c.width - b.width) + "px";

        noBtn.style.top =
            Math.random() * Math.max(0, c.height - b.height) + "px";

    }


    if (noBtn) {

        noBtn.addEventListener("mouseenter", dodgeNoButton);

        noBtn.addEventListener(
            "touchstart",
            function (event) {
                event.preventDefault();
                dodgeNoButton();
            },
            { passive: false }
        );

        noBtn.addEventListener(
            "click",
            function (event) {
                event.preventDefault();
                dodgeNoButton();
            }
        );

    }


    function burstHearts() {

        const icons = ["❤️", "💖", "💍", "💕", "💗"];

        for (let i = 0; i < 36; i++) {

            const s = document.createElement("span");

            s.className = "burst-heart";

            s.textContent =
                icons[Math.floor(Math.random() * icons.length)];

            s.style.left = Math.random() * 100 + "vw";

            s.style.animationDuration =
                3 + Math.random() * 3 + "s";

            s.style.animationDelay =
                Math.random() * 1.5 + "s";

            document.body.appendChild(s);

            setTimeout(function () {
                s.remove();
            }, 7000);

        }

    }


    if (yesBtn) {

        yesBtn.addEventListener(
            "click",
            function () {

                if (yesPopup) {
                    yesPopup.classList.add("active");
                }

                burstHearts();

            }
        );

    }


    if (replayBtn) {

        replayBtn.addEventListener(
            "click",
            function () {

                if (yesPopup) {
                    yesPopup.classList.remove("active");
                }

                if (envelope) {
                    envelope.classList.remove("open");
                }

                if (envelopeHint) {
                    envelopeHint.style.visibility = "visible";
                }

                showMemory(0);

                showScreen("screen1");

            }
        );

    }


});
