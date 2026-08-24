/* =====================================================
   MUSIC
===================================================== */

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

let musicStarted = false;

if (musicButton && music) {

    musicButton.addEventListener("click", function () {

        music.play()
            .then(() => {

                musicStarted = true;

                musicButton.innerHTML =
                    "🎵 Music Playing ❤️";

            })
            .catch(error => {

                console.log(
                    "Music error:",
                    error
                );

            });

    });

}


/* =====================================================
   SCREEN SWITCHING
===================================================== */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });


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


/* =====================================================
   SCREEN 1 → SCREEN 2
===================================================== */

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


/* =====================================================
   SCREEN 2 → SCREEN 3
===================================================== */

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


/* =====================================================
   SCREEN 3 → SCREEN 4
===================================================== */

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


/* =====================================================
   SCREEN 4 → MEMORY BOOK
===================================================== */

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


/* =====================================================
   MEMORY BOOK
===================================================== */

const memories = [

    {
        image: "memory1.jpg",
        caption:
            "Our beautiful memory ❤️"
    },

    {
        image: "memory2.jpg",
        caption:
            "Another beautiful moment ❤️"
    },

    {
        image: "memory3.jpg",
        caption:
            "A moment I will always remember 💕"
    },

    {
        image: "memory4.jpg",
        caption:
            "Another page of our story ❤️"
    },

    {
        image: "memory5.jpg",
        caption:
            "Memories that became ours 💗"
    },

    {
        image: "memory6.jpg",
        caption:
            "Another little piece of us ❤️"
    },

    {
        image: "memory7.jpg",
        caption:
            "A beautiful moment together 💕"
    },

    {
        image: "memory8.jpg",
        caption:
            "One more memory to keep forever ❤️"
    },

    {
        image: "memory9.jpg",
        caption:
            "Every picture tells our story 💗"
    },

    {
        image: "memory10.jpg",
        caption:
            "And the story continues... ❤️"
    }

];


let currentMemory = 0;


const memoryBook =
    document.getElementById(
        "memoryBook"
    );


const memoryPhoto =
    document.getElementById(
        "memoryPhoto"
    );


const photoCaption =
    document.getElementById(
        "photoCaption"
    );


const bookCounter =
    document.getElementById(
        "bookCounter"
    );


const bookPage =
    document.getElementById(
        "bookPage"
    );


/* =====================================================
   OPEN MEMORY BOOK
===================================================== */

function openMemoryBook() {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });


    if (memoryBook) {

        memoryBook.classList.add(
            "active"
        );

    }


    currentMemory = 0;

    updateMemory(false);

}


/* =====================================================
   UPDATE MEMORY
===================================================== */

function updateMemory(
    animationDirection = false
) {

    if (!memoryPhoto) {
        return;
    }


    const memory =
        memories[currentMemory];


    if (!memory) {
        return;
    }


    memoryPhoto.src =
        memory.image;


    memoryPhoto.alt =
        memory.caption;


    if (photoCaption) {

        photoCaption.textContent =
            memory.caption;

    }


    if (bookCounter) {

        bookCounter.textContent =
            `${currentMemory + 1} / ${memories.length}`;

    }


    memoryPhoto.onerror =
        function () {

            console.log(
                "Missing image:",
                memory.image
            );


            memoryPhoto.style.display =
                "none";


            if (photoCaption) {

                photoCaption.textContent =
                    `Please check ${memory.image}`;

            }

        };


    memoryPhoto.onload =
        function () {

            memoryPhoto.style.display =
                "block";

        };


    if (
        animationDirection &&
        bookPage
    ) {

        bookPage.classList.remove(
            "flip-next",
            "flip-prev"
        );


        void bookPage.offsetWidth;


        bookPage.classList.add(
            animationDirection
        );

    }

}


/* =====================================================
   NEXT MEMORY
===================================================== */

function nextMemory() {

    if (
        currentMemory >=
        memories.length - 1
    ) {

        return;

    }


    currentMemory++;

    updateMemory(
        "flip-next"
    );

}


/* =====================================================
   PREVIOUS MEMORY
===================================================== */

function previousMemory() {

    if (
        currentMemory <= 0
    ) {

        return;

    }


    currentMemory--;

    updateMemory(
        "flip-prev"
    );

}


/* =====================================================
   SWIPE SUPPORT FOR MEMORY BOOK
===================================================== */

let touchStartX = 0;
let touchEndX = 0;


if (memoryBook) {

    memoryBook.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    memoryBook.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0]
                    .screenX;

            handleSwipe();

        },
        {
            passive: true
        }
    );

}


function handleSwipe() {

    const difference =
        touchEndX -
        touchStartX;


    if (
        Math.abs(difference) < 50
    ) {

        return;

    }


    if (difference < 0) {

        nextMemory();

    } else {

        previousMemory();

    }

}


/* =====================================================
   MEMORY BOOK → PUZZLE
===================================================== */

const bookContinue =
    document.getElementById(
        "bookContinue"
    );


if (bookContinue) {

    bookContinue.addEventListener(
        "click",
        function () {

            /*
               If she hasn't reached
               the last memory yet,
               keep her in the book.
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
               Last memory completed.
               Open the puzzle.
            */

            showScreen(
                "puzzleScreen"
            );

        }
    );

}


/* =====================================================
   🧩 PUZZLE
===================================================== */


/*
   IMPORTANT:

   This is the photo used for
   the puzzle.

   You can change this to:
   memory1.jpg
   memory2.jpg
   etc.
*/

const puzzleImage =
    "memory10.jpg";


const puzzleBoard =
    document.getElementById(
        "puzzleBoard"
    );


const piecesContainer =
    document.getElementById(
        "piecesContainer"
    );


const puzzleContinue =
    document.getElementById(
        "puzzleContinue"
    );


const successMessage =
    document.getElementById(
        "successMessage"
    );


let draggedPiece = null;

let correctPieces = 0;


/* =====================================================
   CREATE PUZZLE
===================================================== */

function createPuzzle() {

    if (
        !puzzleBoard ||
        !piecesContainer
    ) {

        return;

    }


    /*
       Make sure board is empty
    */

    puzzleBoard.innerHTML = "";


    piecesContainer.innerHTML = "";


    correctPieces = 0;


    /*
       CREATE 9 BOARD SLOTS
    */

    for (
        let i = 0;
        i < 9;
        i++
    ) {

        const slot =
            document.createElement(
                "div"
            );


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
            document.createElement(
                "div"
            );


        piece.className =
            "puzzle-piece";


        /*
           Which board position
           is this piece supposed
           to go into?
        */

        piece.dataset.correct =
            i;


        /*
           Image grid:

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

    pieces.sort(
        function () {

            return Math.random() - 0.5;

        }
    );


    /*
       PUT PIECES BELOW BOARD
    */

    pieces.forEach(
        function (piece) {

            piecesContainer.appendChild(
                piece
            );


            enablePuzzleDragging(
                piece
            );

        }
    );

}


/* =====================================================
   MOBILE DRAGGING
===================================================== */

function enablePuzzleDragging(
    piece
) {

    piece.addEventListener(
        "pointerdown",
        startPuzzleDrag
    );

}


/* =====================================================
   START DRAG
===================================================== */

function startPuzzleDrag(
    event
) {

    event.preventDefault();


    draggedPiece =
        event.currentTarget;


    /*
       Capture finger/mouse
    */

    try {

        draggedPiece.setPointerCapture(
            event.pointerId
        );

    } catch (error) {

        console.log(error);

    }


    draggedPiece.classList.add(
        "dragging"
    );


    /*
       Get current size/location
    */

    const rect =
        draggedPiece.getBoundingClientRect();


    /*
       Change to fixed position
       so it can follow the finger
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
        "9999";


    /*
       Listen for movement
    */

    draggedPiece.addEventListener(
        "pointermove",
        movePuzzlePiece
    );


    /*
       Listen for release
    */

    draggedPiece.addEventListener(
        "pointerup",
        finishPuzzleDrag
    );


    draggedPiece.addEventListener(
        "pointercancel",
        finishPuzzleDrag
    );

}


/* =====================================================
   MOVE PUZZLE PIECE
===================================================== */

function movePuzzlePiece(
    event
) {

    if (!draggedPiece) {
        return;
    }


    event.preventDefault();


    const rect =
        draggedPiece.getBoundingClientRect();


    const x =
        event.clientX -
        rect.width / 2;


    const y =
        event.clientY -
        rect.height / 2;


    draggedPiece.style.left =
        x + "px";


    draggedPiece.style.top =
        y + "px";

}


/* =====================================================
   DROP PUZZLE PIECE
===================================================== */

function finishPuzzleDrag(
    event
) {

    if (!draggedPiece) {
        return;
    }


    event.preventDefault();


    const piece =
        draggedPiece;


    /*
       Stop movement
    */

    piece.removeEventListener(
        "pointermove",
        movePuzzlePiece
    );


    piece.removeEventListener(
        "pointerup",
        finishPuzzleDrag
    );


    piece.removeEventListener(
        "pointercancel",
        finishPuzzleDrag
    );


    /*
       Hide piece temporarily
       to detect the slot underneath
    */

    piece.style.visibility =
        "hidden";


    const elementBelow =
        document.elementFromPoint(
            event.clientX,
            event.clientY
        );


    piece.style.visibility =
        "visible";


    /*
       Find puzzle slot
    */

    const slot =
        elementBelow
            ?.closest(
                ".puzzle-slot"
            );


    /*
       Is this the correct slot?
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

        putPieceInPlace(
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

function putPieceInPlace(
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
        "static";


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
       Put inside board
    */

    slot.appendChild(
        piece
    );


    /*
       Mark correct
    */

    slot.classList.add(
        "correct"
    );


    correctPieces++;


    /*
       Check if all 9
       are completed
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

function returnPuzzlePiece(
    piece
) {

    piece.classList.remove(
        "dragging"
    );


    /*
       Reset fixed positioning
    */

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
       Put it back at bottom
    */

    piecesContainer.appendChild(
        piece
    );

}


/* =====================================================
   PUZZLE COMPLETED
===================================================== */

function puzzleCompleted() {

    /*
       Glow board
    */

    if (puzzleBoard) {

        puzzleBoard.style.boxShadow =
            "0 0 15px #ff1493," +
            "0 0 35px #ff1493," +
            "0 0 70px #ff1493";

    }


    /*
       Show success message
    */

    if (successMessage) {

        successMessage.classList.add(
            "show"
        );

    }


    /*
       Show continue button
    */

    if (puzzleContinue) {

        puzzleContinue.classList.add(
            "show"
        );

    }


    /*
       Heart celebration
    */

    createPuzzleHearts();

}


/* =====================================================
   HEART CELEBRATION
===================================================== */

function createPuzzleHearts() {

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.innerHTML =
            "❤️";


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() * 100 +
            "%";


        heart.style.bottom =
            "-40px";


        heart.style.fontSize =
            (
                15 +
                Math.random() * 25
            ) + "px";


        heart.style.zIndex =
            "10000";


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
   PUZZLE → NEXT STORY
===================================================== */

if (puzzleContinue) {

    puzzleContinue.addEventListener(
        "click",
        function () {

            /*
               IMPORTANT:

               We don't create a fake
               screen here.

               Change "nextScreen"
               later when we add the
               next memory.
            */

            const nextScreen =
                document.getElementById(
                    "nextScreen"
                );


            if (nextScreen) {

                showScreen(
                    "nextScreen"
                );

            } else {

                alert(
                    "❤️ The next chapter of our story is waiting..."
                );

            }

        }
    );

}


/* =====================================================
   START PUZZLE
===================================================== */

createPuzzle();
