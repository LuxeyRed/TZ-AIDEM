const categoriesData = {
    legalEntity: [
        [55.77946597068503,37.53031461842222],
        [55.751627745969145,37.578239444887885],
        [55.75250961908139,37.6248360674896],
        [55.76534924420448,37.65514748607763],
        [55.73652371042048,37.68716882471462]
    ],
    physicalEntity: [
        [55.75837488830284,37.552720529430374],
        [55.77309397028347,37.6011426514511],
        [55.75867483469934,37.64161328487774],
        [55.73961027784856,37.656283182208924],
        [55.770058210050834,37.69410797157554]
    ],
    showAll: [
        [55.77946597068503,37.53031461842222],
        [55.75837488830284,37.552720529430374],
        [55.751627745969145,37.578239444887885],
        [55.77309397028347,37.6011426514511],
        [55.75250961908139,37.6248360674896],
        [55.75867483469934,37.64161328487774],
        [55.76534924420448,37.65514748607763],
        [55.73961027784856,37.656283182208924],
        [55.73652371042048,37.68716882471462],
        [55.770058210050834,37.69410797157554]
    ]
};

function init() {
    var map = new ymaps.Map("map", {
        center: [55.759, 37.615],
        zoom: 13
    });

    let activeCategory = "showAll";

    function showCategory(category) {
        map.geoObjects.removeAll();

        categoriesData[category].forEach((item) => {
            let placemark = new ymaps.Placemark(item, {}, {
                            iconLayout: 'default#image',
                            iconImageHref: 'img/mark.png',
                            iconImageSize: [44, 44],
                            iconImageOffset: [-22, -22]
                        });
            map.geoObjects.add(placemark);
        });
        activeCategory = category;
    };


    let categoryButtons = document.querySelectorAll('.location-btn');

    categoryButtons.forEach((button) => {
        
        button.addEventListener('click', (e) => {
            categoryButtons.forEach(b => b.classList.remove('location-active'));
            const category = e.currentTarget.dataset.category;
           
            button.classList.add('location-active');
            showCategory(category);
            
        });
    });

    const activeBtn = document.querySelector('[data-category="showAll"]');
    activeBtn.classList.add('location-active');
    showCategory('showAll');

    map.controls.remove('geolocationControl'); 
    map.controls.remove('searchControl'); 
    map.controls.remove('trafficControl'); 
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl'); 
    map.controls.remove('rulerControl'); 

};

ymaps.ready(init);