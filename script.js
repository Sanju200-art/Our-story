const startButton =
    document.getElementById("startButton");

const opening =
    document.querySelector(".opening");

const firstStory =
    document.getElementById("firstStory");

const music =
    document.getElementById("storyMusic");


startButton.addEventListener("click", function(){

    // Start music
    music.volume = 0.7;

    music.play().catch(function(error){
        console.log("Music could not start:", error);
    });

    // Hide opening screen
    opening.style.display = "none";

    // Show first story
    firstStory.style.display = "flex";

    // Move automatically
    firstStory.scrollIntoView({
        behavior: "smooth"
    });

});
