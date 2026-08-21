const startButton =
    document.getElementById("startButton");

const opening =
    document.querySelector(".opening");

const firstStory =
    document.getElementById("firstStory");


startButton.addEventListener("click", function(){

    opening.style.display = "none";

    firstStory.style.display = "flex";

    firstStory.scrollIntoView({
        behavior: "smooth"
    });

});
