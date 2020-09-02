$(document).ready(function () {

    let activeClass = (collection) => {
        collection.each(function (index, elem) {
            $(elem).click(function () {
                collection.each(function (index, elem) {
                    $(elem).removeClass("activeClass");
                })
                $(this).addClass("activeClass")
            })
        })
    }
    activeClass($('.category'));
    activeClass($('.place'));


    let positionPlaces = 0;
    let position = 0;

    const slideToShowPlaces = 3;
    const slideToScrollPlaces = 1;
    const slideToShow = 5;
    const slideToScroll = 1;

    let containerPlaces = $('.placesContainer');
    let places = $('.places');
    let place = $('.place');
    let prevPlace = $('.prevPlace');
    let nextPlace = $('.nextPlace');

    let container = $('.galleryContainer');
    let categories = $('.imagesCategory');
    let category = $('.imageCategory');
    let prevCateg = $('.prevCateg');
    let nextCateg = $('.nextCateg');

    let placeCount = place.length;
    let categoryCount = category.length;

    const categoryWidth = container.width() / slideToShow;
    const placeWidth = containerPlaces.width() / slideToShowPlaces;

    let movePosition = slideToScroll * categoryWidth;
    let movePositionPlace = slideToScrollPlaces * placeWidth;

    place.each(function (index, elem) {
        $(elem).css({
            minWidth: placeWidth
        })
    });

    category.each(function (index, elem) {
        $(elem).css({
            minWidth: categoryWidth
        })
    });

    let checkBtn = () => {
        prevCateg.prop('disabled', position === 0);
        prevPlace.prop('disabled', positionPlaces === 0);
        nextCateg.prop(
            'disabled',
            position <= -(categoryCount - slideToShow) * categoryWidth
        );
        nextPlace.prop(
            'disabled',
            positionPlaces <= -(placeCount - slideToShowPlaces) * placeWidth
        );
    }
    checkBtn();
    const setPositionPlaces = () => {
        places.css({
            transform: `translateX(${positionPlaces}px)`
        })
    }

    prevPlace.click(function () {
        positionPlaces += movePositionPlace;
        setPositionPlaces();
        checkBtn();
    })

    nextPlace.click(function () {
        positionPlaces -= movePositionPlace;
        setPositionPlaces();
        checkBtn();

    })




    prevCateg.click(function () {
        position += movePosition;
        setPosition();
        checkBtn();
    })

    nextCateg.click(function () {
        position -= movePosition;
        setPosition();
        checkBtn();
        console.log(position);

    })

    const setPosition = () => {
        categories.css({
            transform: `translateX(${position}px)`
        })
    }
































})