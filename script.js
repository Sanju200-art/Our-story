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


    /* =====================================================
   🧩 PUZZLE
===================================================== */

const puzzleScreen =
    document.getElementById("puzzleScreen");

const puzzleBoard =
    document.getElementById("puzzleBoard");

const piecesContainer =
    document.getElementById("piecesContainer");

const successMessage =
    document.getElementById("successMessage");

const puzzleContinue =
    document.getElementById("puzzleContinue");


/*
   YOUR PUZZLE PHOTO
*/

const puzzleImage =
    "puzzle-photo.jpg";


let draggedPiece = null;

let correctPieces = 0;


/* =====================================================
   OPEN PUZZLE
===================================================== */

function openPuzzle() {

    showScreen("puzzleScreen");

    createPuzzle();

}


/* =====================================================
   CREATE PUZZLE
===================================================== */

function createPuzzle() {

    if (!puzzleBoard || !piecesContainer) {
        return;
    }


    puzzleBoard.innerHTML = "";

    piecesContainer.innerHTML = "";

    correctPieces = 0;


    if (successMessage) {
        successMessage.classList.remove("show");
    }

    if (puzzleContinue) {
        puzzleContinue.classList.remove("show");
    }


    /*
       CREATE 9 EMPTY SLOTS
    */

    for (let i = 0; i < 9; i++) {

        const slot =
            document.createElement("div");

        slot.className =
            "puzzle-slot";

        slot.dataset.position =
            i;

        puzzleBoard.appendChild(slot);
    }


    /*
       CREATE 9 PIECES
    */

    const pieces = [];


    for (let i = 0; i < 9; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "puzzle-piece";

        piece.dataset.correct =
            i;


        /*
           3 × 3 image coordinates
        */

        const row =
            Math.floor(i / 3);

        const column =
            i % 3;


        piece.style.setProperty(
            "--piece-image",
            `url("${puzzleImage}")`
        );


        piece.style.setProperty(
            "--piece-position",
            `${column * 50}% ${row * 50}%`
        );


        pieces.push(piece);
    }


    /*
       SHUFFLE
    */

    pieces.sort(
        () => Math.random() - 0.5
    );


    /*
       PUT SHUFFLED PIECES
       UNDER THE BOARD
    */

    pieces.forEach(piece => {

        piecesContainer.appendChild(piece);

        setupPuzzleDrag(piece);

    });

}


/* =====================================================
   DRAG SETUP
===================================================== */

function setupPuzzleDrag(piece) {

    piece.addEventListener(
        "pointerdown",
        puzzlePointerDown
    );

}


/* =====================================================
   START DRAG
===================================================== */

function puzzlePointerDown(event) {

    event.preventDefault();

    draggedPiece =
        event.currentTarget;


    draggedPiece.classList.add(
        "dragging"
    );


    /*
       Capture the finger
    */

    draggedPiece.setPointerCapture(
        event.pointerId
    );


    /*
       Get exact current position
    */

    const rect =
        draggedPiece.getBoundingClientRect();


    /*
       Convert to fixed positioning
       so it follows the finger
    */

    draggedPiece.style.position =
        "fixed";

    draggedPiece.style.width =
        rect.width + "px";

    draggedPiece.style.height =
        rect.height + "px";

    draggedPiece.style.left =
        rect.left + "px";

    draggedPiece.style.top =
        rect.top + "px";

    draggedPiece.style.margin =
        "0";

    draggedPiece.style.zIndex =
        "99999";


    draggedPiece.addEventListener(
        "pointermove",
        puzzlePointerMove
    );


    draggedPiece.addEventListener(
        "pointerup",
        puzzlePointerUp
    );


    draggedPiece.addEventListener(
        "pointercancel",
        puzzlePointerUp
    );

}


/* =====================================================
   MOVE WITH FINGER
===================================================== */

function puzzlePointerMove(event) {

    if (!draggedPiece) {
        return;
    }

    event.preventDefault();


    const rect =
        draggedPiece.getBoundingClientRect();


    draggedPiece.style.left =
        (
            event.clientX -
            rect.width / 2
        ) + "px";


    draggedPiece.style.top =
        (
            event.clientY -
            rect.height / 2
        ) + "px";

}


/* =====================================================
   RELEASE / DROP
===================================================== */

function puzzlePointerUp(event) {

    if (!draggedPiece) {
        return;
    }


    event.preventDefault();


    const piece =
        draggedPiece;


    piece.removeEventListener(
        "pointermove",
        puzzlePointerMove
    );


    piece.removeEventListener(
        "pointerup",
        puzzlePointerUp
    );


    piece.removeEventListener(
        "pointercancel",
        puzzlePointerUp
    );


    /*
       Temporarily hide piece
       so we can detect the slot
       underneath the finger.
    */

    piece.style.visibility =
        "hidden";


    const element =
        document.elementFromPoint(
            event.clientX,
            event.clientY
        );


    piece.style.visibility =
        "visible";


    const slot =
        element
            ?.closest(".puzzle-slot");


    /*
       CHECK CORRECT POSITION
    */

    const isCorrect =

        slot &&

        Number(slot.dataset.position) ===
        Number(piece.dataset.correct) &&

        slot.children.length === 0;


    if (isCorrect) {

        placePuzzlePiece(
            piece,
            slot
        );

    } else {

        returnPuzzlePiece(
            piece
        );

    }


    draggedPiece = null;

}


/* =====================================================
   CORRECT PIECE
===================================================== */

function placePuzzlePiece(
    piece,
    slot
) {

    piece.classList.remove(
        "dragging"
    );


    /*
       Reset position
    */

    piece.style.position =
        "relative";

    piece.style.left =
        "";

    piece.style.top =
        "";

    piece.style.width =
        "100%";

    piece.style.height =
        "100%";

    piece.style.margin =
        "";

    piece.style.zIndex =
        "";


    /*
       Put into board
    */

    slot.appendChild(
        piece
    );


    slot.classList.add(
        "correct"
    );


    correctPieces++;


    /*
       ALL 9 COMPLETED
    */

    if (correctPieces === 9) {

        puzzleCompleted();

    }

}


/* =====================================================
   WRONG PIECE
===================================================== */

function returnPuzzlePiece(
    piece
) {

    piece.classList.remove(
        "dragging"
    );


    piece.style.position =
        "";

    piece.style.left =
        "";

    piece.style.top =
        "";

    piece.style.width =
        "";

    piece.style.height =
        "";

    piece.style.margin =
        "";

    piece.style.zIndex =
        "";


    /*
       Return to pieces area
    */

    piecesContainer.appendChild(
        piece
    );

}


/* =====================================================
   PUZZLE COMPLETED
===================================================== */

function puzzleCompleted() {

    if (successMessage) {

        successMessage.classList.add(
            "show"
        );

    }


    if (puzzleContinue) {

        puzzleContinue.classList.add(
            "show"
        );

    }


    /*
       Board glow
    */

    if (puzzleBoard) {

        puzzleBoard.style.boxShadow =
            "0 0 15px #ff1493," +
            "0 0 35px #ff1493," +
            "0 0 70px rgba(255,20,147,0.8)";

    }


    createPuzzleHearts();

}


/* =====================================================
   HEART CELEBRATION
===================================================== */

function createPuzzleHearts() {

    for (let i = 0; i < 20; i++) {

        const heart =
            document.createElement("div");

        heart.innerHTML = "❤️";

        heart.style.position =
            "fixed";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.bottom =
            "-40px";

        heart.style.fontSize =
            (15 + Math.random() * 25) +
            "px";

        heart.style.zIndex =
            "99999";

        heart.style.pointerEvents =
            "none";

        heart.style.transition =
            "transform 3s linear, opacity 3s linear";

        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.style.transform =
                "translateY(-110vh) rotate(360deg)";

            heart.style.opacity =
                "0";

        }, 50);


        setTimeout(() => {

            heart.remove();

        }, 3200);

    }

}


/* =====================================================
   MEMORY BOOK → PUZZLE
===================================================== */

if (bookContinue) {

    bookContinue.addEventListener(
        "click",
        function () {

            /*
               If not on final memory,
               go to final memory first.
            */

            if (
                currentMemory <
                memories.length - 1
            ) {

                currentMemory =
                    memories.length - 1;

                updateMemory(false);

                return;

            }


            /*
               FINAL MEMORY → PUZZLE
            */

            openPuzzle();

        }
    );

}


/* =====================================================
   PUZZLE CONTINUE
===================================================== */

if (puzzleContinue) {

    puzzleContinue.addEventListener(
        "click",
        function () {

            alert(
                "❤️ The next chapter of our story is waiting..."
            );

        }
    );

}


/* =====================================================
   DO NOT CREATE PUZZLE UNTIL OPENED
===================================================== */
