// typing animation script
var typed = new Typed(".typing",{
    strings: ["YouTuber", "Designer", "Developer", "Blogger", "Frelancer"],
    typeSpeed: 110,
    backSpeed: 65,
    loop: true
});

// typing animation script-2
var typed = new Typed(".typing-2",{
    strings: ["YouTuber", "Designer", "Developer", "Blogger", "Frelancer"],
    typeSpeed: 110,
    backSpeed: 65,
    loop: true
});

// navigation menu script

(() =>{

    const humburgerBtn = document.querySelector(".humburger-btn"),
    navBarMenu = document.querySelector(".navbar-menu"),
    closeNavBtn = navBarMenu.querySelector(".close-navbar-menu");

    humburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu(){
        navBarMenu.classList.add("visible");
        bodyScrollingToggle();
    }
    function hideNavMenu(){
        navBarMenu.classList.remove("visible");
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() =>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }
    // attach an event handler to document
    document.addEventListener("click", (event) =>{
        if(event.target.classList.contains('nav-link')){
            /* make sure event.target.hash has a value before overridding default behavior */
            if(event.target.hash !==""){
                // prevent defult anchor click behavior
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate existing active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // activate new 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                /* deactivate existing active navigation menu 'nav-link' */
                navBarMenu.querySelector(".active").classList.add("outer-shadow","hover-shadow");
                navBarMenu.querySelector(".active").classList.remove("active","inner-shadow");
                /* if clicked 'nav-link is contained within the navigation menu' */
                if(navBarMenu.classList.contains("visible")){
                    // activate new navigation menu 'nav-link'
                    event.target.classList.add("active","inner-shadow");
                    event.target.classList.remove("outer-shadow","hover-shadow");
                    // hide navigation menu
                    hideNavMenu();
                }else{
                    let navLinks = navBarMenu.querySelectorAll(".nav-link");
                    navLinks.forEach((item) =>{
                        if(hash === item.hash){
                            // activate new navigation menu 'nav-link'
                            item.classList.add("active","inner-shadow");
                            item.classList.remove("outer-shadow","hover-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                // add hash (#) to url
                window.location.hash = hash;
            }
        }
    })

})();

function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}


(() =>{

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) =>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }

    })

})();

// portfolio popup
(() =>{

    const portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-details-btn-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    portfolioItemsContainer.addEventListener("click", (event) =>{
        if(event.target.closest(".portfolio-item-inner")){
           const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
           // get the portfolio item index
           itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
           screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
           // convert screenshots into array
           screenshots = screenshots.split(",");
           if(screenshots.length === 1){
               prevBtn.style.display = "none";
               nextBtn.style.display = "none";
           }else{
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
           }
           slideIndex = 0;
           popupToggle();
           popupSlideshow();
           popupDetails();
        }
    })

    closeBtn.addEventListener("click", () =>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("visible");
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        /* activate loader until the popupImg loaded */
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src=imgSrc;
        popupImg.onload = () =>{
            /* deactivate loader after the popupImg loaded */
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        popupSlideshow();
    })

    // prev slide
    prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1;
        }else{
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails(){
        // if portfolio-item-details not exists
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display = "none";
            return; /* end function execution */
        }
        projectDetailsBtn.style.display = "block";
        // get the project details
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        // set the project details

        popup.querySelector(".pp-project-details").innerHTML = details;
        // get the project title
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        // get the project category
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        // set the project category
        popup.querySelector(".pp-project-category").innerHTML = category.split;
    }

    projectDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px"
        }else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }

})();
