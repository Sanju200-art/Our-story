/* =========================
   MUSIC
========================= */

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

if (musicButton && music) {
    musicButton.addEventListener("click", function () {
        music.play()
            .then(() => {
                musicButton.innerHTML = "🎵 Music Playing ❤️";
            })
            .catch(() => {
                alert("Please tap again to start the music 🎵");
            });
    });
}


/* =========================
   SCREEN CONTROL
========================= */

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
        window.scrollTo(0, 0);
    }
}


/* =========================
   FIRST PAGE
========================= */

const readyButton = document.getElementById("readyButton");

if (readyButton) {
    readyButton.addEventListener("click", function () {
        showScreen("screen2");
    });
}


/* =========================
   CHAPTER 1
========================= */

const continue1 = document.getElementById("continue1");

if (continue1) {
    continue1.addEventListener("click", function () {
        showScreen("screen3");
    });
}


/* =========================
   FIRST DATE
========================= */

const continue2 = document.getElementById("continue2");

if (continue2) {
    continue2.addEventListener("click", function () {
        showScreen("screen4");
    });
}


/* =========================
   2 NOVEMBER
========================= */

const continue3 = document.getElementById("continue3");

if (continue3) {
    continue3.addEventListener("click", function () {
        openMemoryBook();
    });
}


/* =========================
   PHOTO BOOK
========================= */

const memories = [];

for (let i = 1; i <= 10; i++) {
    memories.push({
        image: `memory${i}.jpg`,
        caption: "Another beautiful page of our story ❤️"
    });
}

let currentMemory = 0;


/* Open photo book */

function openMemoryBook() {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const book = document.getElementById("memoryBook");

    if (book) {
        book.classList.add("active-book");
    }

    currentMemory = 0;
    updateMemory();
}


/* Update photo */

function updateMemory() {

    const photo = document.getElementById("memoryPhoto");
    const caption = document.getElementById("photoCaption");
    const counter = document.getElementById("bookCounter");

    if (!photo || !caption || !counter) return;

    photo.src = memories[currentMemory].image;
    caption.textContent = memories[currentMemory].caption;

    counter.textContent =
        `${currentMemory + 1} / ${memories.length}`;
}


/* Next page */

function nextMemory() {

    if (currentMemory < memories.length - 1) {

        currentMemory++;

        updateMemory();

        const page = document.getElementById("bookPage");

        if (page) {
            page.classList.remove("page-flip");

            void page.offsetWidth;

            page.classList.add("page-flip");
        }
    }
}


/* Previous page */

function previousMemory() {

    if (currentMemory > 0) {

        currentMemory--;

        updateMemory();

        const page = document.getElementById("bookPage");

        if (page) {
            page.classList.remove("page-flip-back");

            void page.offsetWidth;

            page.classList.add("page-flip-back");
        }
    }
}


/* =========================
   CONTINUE AFTER PHOTO BOOK
========================= */

function continueFromBook() {

    const book = document.getElementById("memoryBook");

    if (book) {
        book.classList.remove("active-book");
    }

    alert("Next chapter ❤️");

    // Later we can replace this with the next scene.
}


/* =========================
   SWIPE SUPPORT
========================= */

let touchStartX = 0;
let touchEndX = 0;

const bookPage = document.getElementById("bookPage");

if (bookPage) {

    bookPage.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
    });

    bookPage.addEventListener("touchend", function (event) {

        touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;

        if (difference > 50) {
            nextMemory();
        }

        if (difference < -50) {
            previousMemory();
        }
    });
}
