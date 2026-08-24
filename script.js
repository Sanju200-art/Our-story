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
                ".screen, .memory-book, .puzzle-chapter"
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

                    showScreen(
                        "puzzleChapter"
                    );

                    startPuzzle();

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
       PUZZLE
    ========================================= */

    const puzzleBoard =
        document.getElementById(
            "puzzleBoard"
        );

    const puzzlePieces =
        document.getElementById(
            "puzzlePieces"
        );

    const puzzleMessage =
        document.getElementById(
            "puzzleMessage"
        );

    const puzzleContinue =
        document.getElementById(
            "puzzleContinue"
        );

    const puzzleHint =
        document.getElementById(
            "puzzleHint"
        );


    let puzzleStarted = false;

    let correctPieces = 0;


    function startPuzzle() {

        if (!puzzleBoard || !puzzlePieces) {
            return;
        }


        puzzleStarted = true;

        correctPieces = 0;


        puzzleMessage.classList.remove(
            "show"
        );

        puzzleContinue.classList.remove(
            "show"
        );

        puzzleBoard.classList.remove(
            "completed"
        );


        puzzleHint.textContent =
            "Drag each piece into the correct place ❤️";


        const pieces =
            Array.from(
                puzzlePieces.querySelectorAll(
                    ".puzzle-piece"
                )
            );


        /*
           SHUFFLE PIECES
        */

        pieces.sort(function () {

            return Math.random() - 0.5;

        });


        pieces.forEach(function (piece) {

            piece.classList.remove(
                "correct"
            );

            puzzlePieces.appendChild(
                piece
            );

        });


        setupPuzzlePieces();

    }


    /* =========================================
       PUZZLE PIECE DRAG / TOUCH
    ========================================= */

    function setupPuzzlePieces() {

        const pieces =
            document.querySelectorAll(
                ".puzzle-piece"
            );


        pieces.forEach(function (piece) {


            piece.addEventListener(
                "dragstart",
                function (event) {

                    event.dataTransfer.setData(
                        "text/plain",
                        piece.dataset.position
                    );

                    piece.classList.add(
                        "dragging"
                    );

                }
            );


            piece.addEventListener(
                "dragend",
                function () {

                    piece.classList.remove(
                        "dragging"
                    );

                }
            );


            /*
               TOUCH SUPPORT
            */

            piece.addEventListener(
                "touchstart",
                function (event) {

                    piece.classList.add(
                        "dragging"
                    );

                    piece._startX =
                        event.touches[0]
                        .clientX;

                    piece._startY =
                        event.touches[0]
                        .clientY;

                },
                { passive: true }
            );


            piece.addEventListener(
                "touchend",
                function () {

                    piece.classList.remove(
                        "dragging"
                    );

                    checkTouchDrop(piece);

                },
                { passive: true }
            );


        });


        /*
           DESKTOP DROP
        */

        const slots =
            document.querySelectorAll(
                ".puzzle-slot"
            );


        slots.forEach(function (slot) {

            slot.addEventListener(
                "dragover",
                function (event) {

                    event.preventDefault();

                }
            );


            slot.addEventListener(
                "drop",
                function (event) {

                    event.preventDefault();


                    const position =
                        event.dataTransfer
                        .getData(
                            "text/plain"
                        );


                    const piece =
                        document.querySelector(
                            `.puzzle-piece[data-position="${position}"]`
                        );


                    if (piece) {

                        placePiece(
                            piece,
                            slot
                        );

                    }

                }
            );

        });

    }


    /* =========================================
       TOUCH DROP
    ========================================= */

    function checkTouchDrop(piece) {

        const pieceRect =
            piece.getBoundingClientRect();


        const pieceCenterX =
            pieceRect.left +
            pieceRect.width / 2;


        const pieceCenterY =
            pieceRect.top +
            pieceRect.height / 2;


        const slots =
            document.querySelectorAll(
                ".puzzle-slot"
            );


        slots.forEach(function (slot) {

            const rect =
                slot.getBoundingClientRect();


            if (

                pieceCenterX >= rect.left &&
                pieceCenterX <= rect.right &&
                pieceCenterY >= rect.top &&
                pieceCenterY <= rect.bottom

            ) {

                placePiece(
                    piece,
                    slot
                );

            }

        });

    }


    /* =========================================
       PLACE PUZZLE PIECE
    ========================================= */

    function placePiece(
        piece,
        slot
    ) {

        const piecePosition =
            piece.dataset.position;


        const slotPosition =
            slot.dataset.position;


        if (
            piecePosition ===
            slotPosition
        ) {

            piece.classList.add(
                "correct"
            );


            slot.style.backgroundImage =
                "url('puzzle-photo.jpg')";


            slot.style.backgroundSize =
                "300% 200%";


            const position =
                parseInt(
                    piecePosition
                );


            const backgrounds = [

                "0% 0%",

                "50% 0%",

                "100% 0%",

                "0% 100%",

                "50% 100%",

                "100% 100%"

            ];


            slot.style.backgroundPosition =
                backgrounds[position];


            correctPieces++;


            if (
                correctPieces === 6
            ) {

                completePuzzle();

            }

        }

    }


    /* =========================================
       PUZZLE COMPLETED
    ========================================= */

    function completePuzzle() {

        puzzleBoard.classList.add(
            "completed"
        );


        puzzleHint.textContent =
            "You put every piece together ❤️";


        puzzleMessage.classList.add(
            "show"
        );


        puzzleContinue.classList.add(
            "show"
        );

    }


    /* =========================================
       PUZZLE CONTINUE
    ========================================= */

    if (puzzleContinue) {

        puzzleContinue.addEventListener(
            "click",
            function () {

                /*
                   NEXT CHAPTER WILL GO HERE.

                   For now this is just a
                   temporary message.
                */

                alert(
                    "Another beautiful chapter is coming ❤️"
                );

            }
        );

    }

});
