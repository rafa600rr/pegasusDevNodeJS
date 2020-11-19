let time = 3000,
    slidesIndex = 0,
    slides = document.querySelectorAll(".imgCarousel");

// FUNCTION TO RUN FROM TIME TO TIME
const nextImage = () => {

    if(slidesIndex === slides.length -1){
        slidesIndex = 0;
    }else{
        slidesIndex++;
    }

       slides.forEach(slides =>{
           slides.classList.remove("imgCarouselVisible");
       })

    slides[slidesIndex].classList.add("imgCarouselVisible");   
}

const start = () => {
    setInterval(() =>{nextImage()}, time);
}

window.addEventListener("load", start);