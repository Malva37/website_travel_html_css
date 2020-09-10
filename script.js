$(document).ready(function () {

    //                  add new class during hover on images of places/categories/videos

    let activeClass = (collection) => {
        collection.each(function (index, elem) {
            $(elem).click(function () {
                collection.each(function (index, elem) {
                    $(elem).removeClass(" activeClass");
                })
                $(this).addClass(" activeClass")
            });
        });
    }
    activeClass($('.category'));
    activeClass($('.place'));
    activeClass($('.video'));

    //                  scroll of places/categories & trevellers

    let positionPlaces = 0;
    let position = 0;

    const slideToShowPlaces = 3;
    const slideToShow = 4;
    const slideToScroll = 1;

    let containerPlaces = $('.placesContainer');
    let places = $('.places');
    let place = $('.place');
    let prevPlace = $('.prevPlace');
    let nextPlace = $('.nextPlace');

    let container = $('.galleryContainer');
    let categories = $('.imagesCategory');
    let category = $('.category');
    let prevCateg = $('.prevCateg');
    let nextCateg = $('.nextCateg');



    let treveller = $('.treveller');
    let indicator = $('.lineIndicator');
    let prevTrev = $('.prevTreveller');
    let nextTrev = $('.nextTreveller');
    let indexCurrent = 0;

    let placeCount = place.length;
    let categoryCount = category.length;

    let marginLeftPlaces = containerPlaces.width() * 0.06;
    let marginLeftCategories = container.width() * 0.018;

    const placeWidth = containerPlaces.width() / slideToShowPlaces;
    const categoryWidth = container.width() / slideToShow;

    let movePositionPlace = slideToScroll * (placeWidth + marginLeftPlaces);
    let movePosition = slideToScroll * (categoryWidth + marginLeftCategories);

    place.each(function (index, elem) {
        if (index == 0) {
            $(elem).css({
                minWidth: placeWidth,
                marginLeft: -placeWidth / 2
            })
        } else {
            $(elem).css({
                minWidth: placeWidth,
                marginLeft: marginLeftPlaces
            });
        }
    });

    category.each(function (index, elem) {
        if (index == 0) {
            $(elem).css({
                minWidth: categoryWidth,
                marginLeft: -categoryWidth / 2
            });
        } else {
            $(elem).css({
                minWidth: categoryWidth,
                marginLeft: marginLeftCategories
            });
        }
    });


    let checkBtn = () => {
        prevCateg.prop('disabled', position >= categoryWidth / 2);
        prevPlace.prop('disabled', positionPlaces >= placeWidth / 2);
        prevTrev.prop('disabled', indexCurrent == 0);
        nextCateg.prop(
            'disabled',
            position <= -(categoryCount - slideToShow) * categoryWidth
        );
        nextPlace.prop(
            'disabled',
            positionPlaces <= -(placeCount - slideToShowPlaces) * placeWidth
        );
        nextTrev.prop('disabled', indexCurrent >= treveller.length - 1);

    }
    checkBtn();

    prevPlace.click(function () {
        positionPlaces += movePositionPlace;
        setPosition(positionPlaces, places);
        checkBtn();
    })

    nextPlace.click(function () {
        positionPlaces -= movePositionPlace;
        setPosition(positionPlaces, places);
        checkBtn();
    })


    prevCateg.click(function () {
        position += movePosition;
        setPosition(position, categories);
        checkBtn();

    })

    nextCateg.click(function () {
        position -= movePosition;
        setPosition(position, categories);
        checkBtn();


    })

    const setPosition = (pos, list) => {
        list.css({
            transform: `translateX(${pos}px)`
        });
    }

    // lineIndicator

    nextTrev.click(function () {
        indexCurrent++;
        checkSlide(indexCurrent);
        checkBtn();

    })

    prevTrev.click(function () {
        indexCurrent--;
        checkSlide(indexCurrent);
        checkBtn();
    })

    let checkSlide = function (index) {
        indexCurrent = index;
        let currentSlide = treveller.eq(index);
        currentSlide.addClass("active");
        treveller.not(currentSlide).removeClass('active');
        indicator.each(function (index, elem) {
            if (index == indexCurrent) {
                $(elem).addClass(' active');
            } else {
                $(elem).removeClass(' active');
            }
        });
    }

    indicator.click(function () {
        indexCurrent = $(this).index();
        checkSlide(indexCurrent);
        checkBtn();

    })


    //                  video player

    let videoMain = $('.videoFile');
    let videoBoxes = $('.video');
    let barSlider = $('.barSlider');
    let btn = $('.playPause');
    let timeMainVideo = $('.timeVideo');
    let titleVideo = $('.titleVideo');

    function setMainVideoDuration(video) {
        let duration = calculateVideoDuration(video);
        timeMainVideo.css('display', 'block').html(duration);
    };

    function setOtherVideoDuration(videos) {
        videos.each((ind, elem) => {
            let videoItem = $(elem).children('.videoFromList');
            let duration = calculateVideoDuration(videoItem);
            $(elem).find('.durationVideoFromList').text(duration);
            console.log(duration);
        })
    };

    function calculateVideoDuration(vid) {
        let duration = vid.get(0).duration.toFixed(0);
        let m = duration % 60;
        return Math.floor(duration / 60) + ':' + (m < 10 ? '0' : '') + m;
    };

    setMainVideoDuration(videoMain);

    setTimeout(function () {
        setOtherVideoDuration(videoBoxes)
    }, 500);


    let tooglePlayPause = function () {
        if (videoMain.get(0).paused) {
            btn.removeClass("play").addClass(" pause");
            timeMainVideo.css('display', 'none');
            titleVideo.css('display', 'none');
            videoMain.get(0).play();
        } else {
            btn.removeClass("pause").addClass(" play");
            titleVideo.css('display', 'block');
            timeMainVideo.css('display', 'block');
            videoMain.get(0).pause();
        }
    }
    btn.click(function () {
        tooglePlayPause();
    });

    videoMain.bind('timeupdate', function () {
        let sliderPos = videoMain.get(0).currentTime / videoMain.get(0).duration;
        barSlider.css({
            width: sliderPos * 100 + '%'
        });
        if (videoMain.get(0).ended) {
            btn.removeClass("pause").addClass(" play");
        }

    });


    videoBoxes.click(function () {
        let videoItem = $(this).children('.videoFromList');
        let newMainVideo = videoItem.attr('src');
        let newMainTitle = $(this).find('.titleVideoFromList').text();
        titleVideo.css('display', 'block').text(newMainTitle);
        $('.videoFile').attr("src", newMainVideo);
        btn.removeClass("pause").addClass(" play");
        setMainVideoDuration(videoItem);
    })


































})