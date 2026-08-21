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
