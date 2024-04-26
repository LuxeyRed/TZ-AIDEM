window.addEventListener("scroll", () =>  {
    let fillFormBtn = document.getElementById('fill-form-btn');
    
    if(window.scrollY > 100 && mediaQuery375.matches) {
        fillFormBtn.style.display = "block";
        fillFormBtn.classList.add('fill-form-btn-sticky');
    }
    else {
        fillFormBtn.style.display = "none";
        fillFormBtn.classList.remove('fill-form-btn-sticky');
    }
});


const btnHeandler = (list, prevBtn, nextBtn) => {
    const maxScrollLeft = list.scrollWidth - list.clientWidth;
    list.addEventListener("scroll", () => {
        prevBtn.querySelector(".arrow-btn").style.opacity = list.scrollLeft <= 0 ? "20%" :"100%";
        nextBtn.querySelector(".arrow-btn").style.opacity = list.scrollLeft >= maxScrollLeft ? "20%" :"100%";
    });
}

const initBannerSlider = () => {
    const bannerList = document.getElementById("banner-bg");
    const banner = document.querySelector(".banner");
    const prevBtn = document.getElementById("prev-switch");
    const nextBtn= document.getElementById("next-switch");

    nextBtn.addEventListener("click", () => {
    const slideWidth = banner.clientWidth;
    bannerList.scrollLeft += slideWidth;
    });

    prevBtn.addEventListener("click", () => {
    const slideWidth = banner.clientWidth;
    bannerList.scrollLeft -= slideWidth;
    });

    btnHeandler(bannerList,prevBtn,nextBtn);

}
window.addEventListener("load", initBannerSlider);

const initCardSlider = () => {
    const switchBtns = document.querySelectorAll(".card-section .switch-btn");
    const cardList = document.querySelector(".cards");

    switchBtns.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-card" ? -1 : 1;
            const scrollAmount = 0.5 * cardList.clientWidth * direction;
            cardList.scrollBy({left: scrollAmount, behavior: "smooth"});
        });
    });

    btnHeandler(cardList,switchBtns[0],switchBtns[1]);
}
window.addEventListener("load", initCardSlider);


const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("touchstart", () => {
        card.querySelector(".card-back").style.display = "flex";
    });
    card.addEventListener("touchend", () => {
        card.querySelector(".card-back").style.display = "none";
    });
});


const instContainer = document.querySelector('.instagram');
const showMoreBtn = document.getElementById('show-more-btn');
const mediaQuery768 = window.matchMedia('(max-width: 768px)');
const mediaQuery375 = window.matchMedia('(max-width: 375px)');

showMoreBtn.addEventListener("click", function() {
    let blockNum = 8;

    if (mediaQuery375.matches) {
        blockNum = 2;
    } else if (mediaQuery768.matches) {
        blockNum = 6;
    } else {
        blockNum = 8;
    }

    for (var i = 0; i < blockNum; i++) {
    instContainer.insertAdjacentHTML('beforeend', 
        '<div class="inst-item"></div>');
    }
});

