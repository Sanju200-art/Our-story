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
    );

}


/* =====================================================
   🧩 PUZZLE
===================================================== */

const puzzleBoard =
    document.getElementById("puzzleBoard");


const piecesContainer =
    document.getElementById("piecesContainer");


const successMessage =
    document.getElementById("successMessage");


const puzzleContinue =
    document.getElementById("puzzleContinue");


/*
   YOUR EXACT PUZZLE PHOTO
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

    if (
        !puzzleBoard ||
        !piecesContainer
    ) {

        console.log(
            "Puzzle elements not found."
        );

        return;

    }


    puzzleBoard.innerHTML = "";

    piecesContainer.innerHTML = "";


    correctPieces = 0;


    if (successMessage) {

        successMessage.classList.remove(
            "show"
        );

    }


    if (puzzleContinue) {

        puzzleContinue.classList.remove(
            "show"
        );

    }


    /*
       CREATE 9 BOARD SLOTS
    */

    for (
        let i = 0;
        i < 9;
        i++
    ) {

        const slot =
            document.createElement("div");


        slot.className =
            "puzzle-slot";


        slot.dataset.position =
            i;


        puzzleBoard.appendChild(
            slot
        );

    }


    /*
       CREATE 9 PIECES
    */

    const pieces = [];


    for (
        let i = 0;
        i < 9;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.className =
            "puzzle-piece";


        piece.dataset.correct =
            i;


        /*
           3 × 3 positions

           0 1 2
           3 4 5
           6 7 8
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


        pieces.push(
            piece
        );

    }


    /*
       SHUFFLE
    */

    for (
        let i = pieces.length - 1;
        i > 0;
        i--
    ) {

        const random =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            pieces[i],
            pieces[random]
        ] =
        [
            pieces[random],
            pieces[i]
        ];

    }


    /*
       ADD PIECES
    */

    pieces.forEach(
        function (piece) {

            piecesContainer.appendChild(
                piece
            );


            enablePuzzleDrag(
                piece
            );

        }
    );

}


/* =====================================================
   ENABLE DRAG
===================================================== */

function enablePuzzleDrag(piece) {

    piece.addEventListener(
        "pointerdown",
        puzzlePointerDown
    );

}


/* =====================================================
   START FINGER DRAG
===================================================== */

function puzzlePointerDown(event) {

    event.preventDefault();


    const piece =
        event.currentTarget;


    draggedPiece =
        piece;


    /*
       IMPORTANT:
       capture the finger
    */

    piece.setPointerCapture(
        event.pointerId
    );


    piece.classList.add(
        "dragging"
    );


    /*
       Get current position
    */

    const rect =
        piece.getBoundingClientRect();


    /*
       Store finger offset
       so piece doesn't jump.
    */

    piece.dataset.offsetX =
        event.clientX -
        rect.left;


    piece.dataset.offsetY =
        event.clientY -
        rect.top;


    /*
       Convert to fixed position
    */

    piece.style.position =
        "fixed";


    piece.style.width =
        rect.width + "px";


    piece.style.height =
        rect.height + "px";


    piece.style.left =
        rect.left + "px";


    piece.style.top =
        rect.top + "px";


    piece.style.margin =
        "0";


    piece.style.zIndex =
        "99999";


    /*
       Movement
    */

    piece.addEventListener(
        "pointermove",
        puzzlePointerMove
    );


    /*
       Release
    */

    piece.addEventListener(
        "pointerup",
        puzzlePointerUp
    );


    piece.addEventListener(
        "pointercancel",
        puzzlePointerUp
    );

}


/* =====================================================
   MOVE PIECE WITH FINGER
===================================================== */

function puzzlePointerMove(event) {

    if (!draggedPiece) {
        return;
    }


    event.preventDefault();


    const piece =
        draggedPiece;


    const offsetX =
        Number(
            piece.dataset.offsetX
        );


    const offsetY =
        Number(
            piece.dataset.offsetY
        );


    piece.style.left =
        (
            event.clientX -
            offsetX
        ) + "px";


    piece.style.top =
        (
            event.clientY -
            offsetY
        ) + "px";

}


/* =====================================================
   RELEASE PIECE
===================================================== */

function puzzlePointerUp(event) {

    if (!draggedPiece) {
        return;
    }


    event.preventDefault();


    const piece =
        draggedPiece;


    /*
       Stop listeners
    */

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
       to find board slot.
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
            ? element.closest(
                ".puzzle-slot"
            )
            : null;


    /*
       CHECK ANSWER
    */

    const correct =

        slot &&

        Number(
            slot.dataset.position
        ) ===
        Number(
            piece.dataset.correct
        ) &&

        slot.children.length === 0;


    if (correct) {

        lockPuzzlePiece(
            piece,
            slot
        );

    } else {

        resetPuzzlePiece(
            piece
        );

    }


    draggedPiece = null;

}


/* =====================================================
   LOCK CORRECT PIECE
===================================================== */

function lockPuzzlePiece(
    piece,
    slot
) {

    piece.classList.remove(
        "dragging"
    );


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
        "0";


    piece.style.zIndex =
        "";


    piece.style.pointerEvents =
        "none";


    slot.appendChild(
        piece
    );


    slot.classList.add(
        "correct"
    );


    correctPieces++;


    console.log(
        "Correct pieces:",
        correctPieces
    );


    /*
       PUZZLE COMPLETE
    */

    if (
        correctPieces === 9
    ) {

        puzzleCompleted();

    }

}


/* =====================================================
   WRONG PIECE
===================================================== */

function resetPuzzlePiece(
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


    piecesContainer.appendChild(
        piece
    );

}


/* =====================================================
   PUZZLE COMPLETE
===================================================== */

function puzzleCompleted() {

    console.log(
        "PUZZLE COMPLETED ❤️"
    );


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

    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.textContent =
            "❤️";


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.bottom =
            "-30px";


        heart.style.fontSize =
            (
                15 +
                Math.random() * 25
            ) + "px";


        heart.style.zIndex =
            "999999";


        heart.style.pointerEvents =
            "none";


        heart.style.transition =
            "transform 3s linear, opacity 3s linear";


        document.body.appendChild(
            heart
        );


        setTimeout(
            function () {

                heart.style.transform =
                    "translateY(-110vh) rotate(360deg)";

                heart.style.opacity =
                    "0";

            },
            50
        );


        setTimeout(
            function () {

                heart.remove();

            },
            3200
        );

    }

}


/* =====================================================
   PUZZLE CONTINUE
===================================================== */

if (puzzleContinue) {

    puzzleContinue.addEventListener(
        "click",
        function () {

            /*
               The next story screen
               can be connected later.
            */

            alert(
                "❤️ The next chapter of our story is waiting..."
            );

        }
    );

}


/* =====================================================
   INITIAL MEMORY
===================================================== */

updateMemory();
