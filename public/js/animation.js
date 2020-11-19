var menu = false;

window.onload = function (){
    // FUNCTION TO RUN THE MOBILE MENU
    document.getElementById("checkboxMenu").addEventListener("click", function(){
        menu = !menu
        if(menu == true){
            document.getElementsByClassName("movelSideMenu")[0].style.display = "block";     
        }else{
            document.getElementsByClassName("movelSideMenu")[0].style.display = "none";     
        }
        
    });

    // FUNCTION TO RUN THE CAROUSEL
    const slides = document.querySelectorAll(".imgCarousel");
    let slidesIndex = 0;

    // BUTTON NEXT IMAGE
    document.getElementById("buttonNext").addEventListener("click", () => {

        if(slidesIndex === slides.length -1){
            slidesIndex = 0;
        }else{
            slidesIndex++;
        }

           slides.forEach(slides =>{
               slides.classList.remove("imgCarouselVisible");
           })

        slides[slidesIndex].classList.add("imgCarouselVisible");   
    });

    // BUTTON PREVIOUS IMAGE
    document.getElementById("buttonPrev").addEventListener("click", () => {

        if(slidesIndex === 0){
            slidesIndex = slides.length -1;
        }else{
            slidesIndex--;
        }

            slides.forEach(slides => {
                slides.classList.remove("imgCarouselVisible");
            })

        slides[slidesIndex].classList.add("imgCarouselVisible");   
    });

};