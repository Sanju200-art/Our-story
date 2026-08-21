const startButton =
    document.getElementById("startButton");

const opening =
    document.querySelector(".opening");

const firstStory =
    document.getElementById("firstStory");

const music =
    document.getElementById("storyMusic");

const musicButton =
    document.getElementById("musicButton");


/* OPEN STORY */

startButton.addEventListener("click", function(){

    opening.style.display = "none";

    firstStory.style.display = "flex";

    firstStory.scrollIntoView({
        behavior: "smooth"
    });

});


/* MUSIC BUTTON */

musicButton.addEventListener("click", function(){

    music.volume = 0.7;

    music.play();

    musicButton.innerHTML = "🎵 Music Playing ❤️";

});

/* FLOATING HEART BUBBLES */

function createHeartBubble(){

    const bubble =
        document.createElement("div");

    bubble.className = "heart-bubble";

    bubble.innerHTML =
        Math.random() > 0.5
        ? "♡"
        : "♥";

    bubble.style.left =
        Math.random() * 100 + "vw";

    bubble.style.fontSize =
        (12 + Math.random() * 22) + "px";

    bubble.style.setProperty(
        "--side",
        (Math.random() * 100 - 50) + "px"
    );

    const duration =
        5 + Math.random() * 5;

    bubble.style.animationDuration =
        duration + "s";

    document
        .getElementById("heartBubbles")
        .appendChild(bubble);

    setTimeout(function(){

        bubble.remove();

    }, duration * 1000);

}


/* Create new hearts continuously */

setInterval(
    createHeartBubble,
    450
);

const continueButton =
    document.getElementById("continueButton");

continueButton.addEventListener("click", function(){

    alert("Next chapter ❤️");

});

