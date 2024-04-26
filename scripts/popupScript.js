const openPopup = document.getElementById("open-popup");
const closePopup = document.getElementById("close-btn");
const persDataPopup = document.getElementById("pers-data-popup");
		
openPopup.addEventListener('click', function(e) {
	e.preventDefault();
   
    
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
	persDataPopup.classList.add('active');
});
		
closePopup.addEventListener('click', function() {
    document.getElementsByTagName('body')[0].style.overflow = 'visible';
	persDataPopup.classList.remove('active');
});


let popupScroll = document.querySelector('.pers-data-popup');
popupScroll.addEventListener("scroll", () =>  {
    let popupHeader = document.getElementById('popup-header');
    let closeBtn = document.getElementById('close-btn');
    let popupTitle = document.getElementById('pers-data-title');
    
    if(popupScroll.scrollTop > 200) {
        popupHeader.classList.add('popup-header');
        closeBtn.classList.remove('close-btn-top');
        closeBtn.classList.add('close-btn-scroll');
        popupTitle.classList.remove('pers-data-title');
        popupTitle.classList.add('pers-data-title-scroll');

    }
    else {
        popupHeader.classList.remove('popup-header');
        closeBtn.classList.add('close-btn-top');
        closeBtn.classList.remove('close-btn-scroll');
        popupTitle.classList.add('pers-data-title');
        popupTitle.classList.remove('pers-data-title-scroll');
    }
});