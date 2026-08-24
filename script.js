/* =========================================
   OUR STORY ❤️
   3 x 3 PUZZLE
========================================= */


/* =========================================
   SETTINGS
========================================= */


/*
   CHANGE THIS ONLY IF YOU WANT
   A DIFFERENT PHOTO.

   Your photo must be in the same
   GitHub folder as index.html.
*/

const puzzleImage = "puzzle-photo.jpg";


/* =========================================
   ELEMENTS
========================================= */

const puzzleBoard =
    document.getElementById("puzzleBoard");

const piecesContainer =
    document.getElementById("piecesContainer");

const puzzleContinue =
    document.getElementById("puzzleContinue");

const successMessage =
    document.getElementById("successMessage");

const backgroundMusic =
    document.getElementById("backgroundMusic");


/* =========================================
   VARIABLES
========================================= */

let draggedPiece = null;

let correctPieces = 0;

let startX = 0;

let startY = 0;

let originalParent = null;

let originalNextSibling = null;


/* =========================================
   CREATE BOARD
========================================= */

function createBoard() {

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

        puzzleBoard.appendChild(slot);
    }
}


/* =========================================
   CREATE PIECES
========================================= */

function createPieces() {

    let pieces = [];


    for (
        let i = 0;
        i < 9;
        i++
    ) {

        const piece =
            document.createElement("div");

        piece.className =
            "puzzle-piece";


        /*
           Correct position of this piece
        */

        piece.dataset.correct =
            i;


        /*
           Calculate image section

           0 1 2
           3 4 5
           6 7 8
        */

        const row =
            Math.floor(i / 3);

        const column =
            i % 3;


        /*
           Make each piece show
           the correct part of the image
        */

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
       Shuffle pieces
    */

    pieces.sort(
        () =>
            Math.random() - 0.5
    );


    /*
       Put pieces below board
    */

    pieces.forEach(
        piece => {

            piecesContainer.appendChild(
                piece
            );

            setupDragging(piece);
        }
    );
}


/* =========================================
   DRAGGING
   MOBILE + COMPUTER
========================================= */

function setupDragging(piece) {

    piece.addEventListener(
        "pointerdown",
        startDragging
    );
}


/* =========================================
   START DRAG
========================================= */

function startDragging(event) {

    event.preventDefault();


    draggedPiece =
        event.currentTarget;


    /*
       Remember original location
    */

    originalParent =
        draggedPiece.parentElement;

    originalNextSibling =
        draggedPiece.nextSibling;


    startX =
        event.clientX;

    startY =
        event.clientY;


    /*
       Capture finger
    */

    draggedPiece.setPointerCapture(
        event.pointerId
    );


    draggedPiece.classList.add(
        "dragging"
    );


    /*
       Put piece in fixed position
       so it follows finger
    */

    const rect =
        draggedPiece.getBoundingClientRect();


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
       Move
    */

    draggedPiece.addEventListener(
        "pointermove",
        dragMove
    );


    /*
       Release
    */

    draggedPiece.addEventListener(
        "pointerup",
        stopDragging
    );


    draggedPiece.addEventListener(
        "pointercancel",
        stopDragging
    );
}


/* =========================================
   MOVE PIECE
========================================= */

function dragMove(event) {

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


/* =========================================
   DROP PIECE
========================================= */

function stopDragging(event) {

    if (!draggedPiece) {
        return;
    }


    event.preventDefault();


    const piece =
        draggedPiece;


    /*
       Stop listening
    */

    piece.removeEventListener(
        "pointermove",
        dragMove
    );

    piece.removeEventListener(
        "pointerup",
        stopDragging
    );

    piece.removeEventListener(
        "pointercancel",
        stopDragging
    );


    /*
       Temporarily hide piece
       so we can see what's underneath
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


    /*
       Find puzzle slot
    */

    const slot =
        element?.closest(
            ".puzzle-slot"
        );


    /*
       Check whether correct
    */

    const isCorrect =

        slot &&

        Number(
            slot.dataset.position
        ) === Number(
            piece.dataset.correct
        ) &&

        slot.children.length === 0;


    if (isCorrect) {

        placePiece(
            piece,
            slot
        );

    } else {

        returnPiece(
            piece
        );
    }


    draggedPiece = null;
}


/* =========================================
   PLACE CORRECT PIECE
========================================= */

function placePiece(
    piece,
    slot
) {

    /*
       Remove dragging style
    */

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
       Check completion
    */

    if (
        correctPieces === 9
    ) {

        puzzleCompleted();
    }
}


/* =========================================
   WRONG PIECE
========================================= */

function returnPiece(piece) {

    piece.classList.remove(
        "dragging"
    );


    /*
       Reset fixed position
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
       Put it back into pieces area
    */

    piecesContainer.appendChild(
        piece
    );
}


/* =========================================
   PUZZLE COMPLETED
========================================= */

function puzzleCompleted() {

    /*
       Glow the board
    */

    puzzleBoard.style.boxShadow =

        "0 0 15px #ff1493," +
        "0 0 35px #ff1493," +
        "0 0 70px #ff1493";


    /*
       Show message
    */

    successMessage.classList.add(
        "show"
    );


    /*
       Show continue button
    */

    puzzleContinue.classList.add(
        "show"
    );


    /*
       Celebration
    */

    createCelebration();
}


/* =========================================
   HEART CELEBRATION
========================================= */

function createCelebration() {

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
            Math.random() * 100 + "%";

        heart.style.bottom =
            "-40px";

        heart.style.fontSize =
            (15 +
             Math.random() * 25) +
            "px";

        heart.style.zIndex =
            "10000";

        heart.style.pointerEvents =
            "none";

        heart.style.transition =
            "transform 3s linear," +
            "opacity 3s linear";

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


/* =========================================
   MUSIC
========================================= */

function toggleMusic() {

    if (
        backgroundMusic.paused
    ) {

        backgroundMusic.play()
            .catch(() => {});

    } else {

        backgroundMusic.pause();
    }
}


/* =========================================
   BACK BUTTON
========================================= */

function goBack() {

    /*
       If your existing website
       uses screen navigation,
       replace this with your
       previous screen ID.

       For now:
    */

    window.history.back();
}


/* =========================================
   CONTINUE
========================================= */

function continueStory() {

    /*
       IMPORTANT:

       Change "nextScreen"
       to the ID of your next
       story screen.

       Example:

       document.getElementById(
           "screen5"
       )
    */

    const nextScreen =
        document.getElementById(
            "nextScreen"
        );


    if (nextScreen) {

        document.querySelectorAll(
            ".screen"
        ).forEach(
            screen => {

                screen.classList.remove(
                    "active"
                );
            }
        );


        nextScreen.classList.add(
            "active"
        );


    } else {

        /*
           Temporary message
           until your next screen
           is connected.
        */

        alert(
            "❤️ Our next memory is waiting for you..."
        );
    }
}


/* =========================================
   START
========================================= */

createBoard();

createPieces();
