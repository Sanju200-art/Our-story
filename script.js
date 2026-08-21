/* =========================================
   OUR STORY ❤️
   COMPLETE SCRIPT.JS
========================================= */


/* =========================================
   GET ELEMENTS
========================================= */

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

const continueButton =
    document.getElementById("continueButton");


/* =========================================
   START STORY
========================================= */

startButton.addEventListener("click", function(){

    /* Hide opening screen */

    opening.style.display = "none";


    /* Show first story screen */

    firstStory.style.display = "flex";


    /* Move automatically */

    firstStory.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* =========================================
   MUSIC BUTTON
========================================= */

musicButton.addEventListener("click", function(){

    music.volume = 0.7;

    music.play()
        .then(function(){

            musicButton.innerHTML =
                "🎵 Music Playing ❤️";

        })
        .catch(function(error){

            console.log(
                "Music could not start:",
                error
            );

        });

});


/* =========================================
   CONTINUE BUTTON
========================================= */

continueButton.addEventListener("click", function(){

    alert("Next chapter ❤️");

});


/* =========================================
   FLOATING HEART BUBBLES
========================================= */

function createHeartBubble(){

    const bubble =
        document.createElement("div");


    bubble.className =
        "heart-bubble";


    /* Random heart */

    bubble.innerHTML =
        Math.random() > 0.5
        ? "♡"
        : "♥";


    /* Random horizontal position */

    bubble.style.left =
        Math.random() * 100 + "vw";


    /* Random size */

    bubble.style.fontSize =
        (12 + Math.random() * 22) + "px";


    /* Side-to-side movement */

    bubble.style.setProperty(
        "--side",
        (Math.random() * 100 - 50) + "px"
    );


    /* Random speed */

    const duration =
        5 + Math.random() * 5;


    bubble.style.animationDuration =
        duration + "s";


    /* Add to page */

    document
        .getElementById("heartBubbles")
        .appendChild(bubble);


    /* Remove after animation */

    setTimeout(function(){

        bubble.remove();

    }, duration * 1000);

}


/* =========================================
   CREATE HEARTS CONTINUOUSLY
========================================= */

setInterval(
    createHeartBubble,
    450
);
