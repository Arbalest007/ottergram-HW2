var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
/*
var DETAIL_NEXT_SELECTOR = '[data-image-role="nextArrow"]';
var DETAIL_PREV_SELECTOR = '[data-image-role="prevArrow"]';
*/
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageURL, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function getCurrentPic() {
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    const imgsrc = detailImage.getAttribute('src');
    return parseInt(imgsrc[imgsrc.length - 5]);
}

function prevPicture() {
    'use strict';
    document.getElementById("prev").addEventListener("click", function (event) {
        event.preventDefault();
        var num = getCurrentPic();
        console.log("Afer num calc:" + num);
        var thumbnailArrayTemp = getThumbnailsArray();
        if (num < 2) {
            console.log("Previous Arrow: " + num);
            setDetailsFromThumb(thumbnailArrayTemp[num - 1]);
        } else
            setDetailsFromThumb(thumbnailArrayTemp[num - 2]);
    });
}

function nextPicture() {
    'use strict';
    document.getElementById("next").addEventListener("click", function (event) {
        event.preventDefault();
        var num = getCurrentPic();
        var thumbnailArrayTemp = getThumbnailsArray();
        console.log("Next Arrow: " + num);
        if (num > 4) {
            console.log("Next Arrow: " + num);
            setDetailsFromThumb(thumbnailArrayTemp[num - 1]);
        } else
            setDetailsFromThumb(thumbnailArrayTemp[num]);
    });
}

function addThumbClickHandler(thumb) {
    'use strict';

    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}


function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);

        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';

    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);

    prevPicture();
    nextPicture();

    addKeyPressHandler();
}

initializeEvents();