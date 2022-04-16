

window.onload = function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
// This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded. This has Cross-browser support.
    window.scrollTo(0,0);
// wait for everything to be ready

    var options = {
        "animate": true,
        "patternWidth": 285.56,
        "patternHeight": 285.56,
        "grainOpacity": 0.05,
        "grainDensity": 1,
        "grainWidth": 1,
        "grainHeight": 1
    }
    grained("#first", options);
    grained("#about", options);
    grained("#info2", options);
    grained("#info1", options);
//preloader
    setTimeout(function () {

        $('.preloader').addClass('preloader-disactive');

        setTimeout(function () {

            $('.preloader').addClass('preloader-display');

        },2000);

    },3500);





//close

//to-about


    //mars
    var canvas = document.getElementById("glslCanvas");
    var sandbox = new GlslCanvas(canvas);
    var texCounter = 0;
    var sandbox_content = "";
    var sandbox_title = "";
    var sandbox_author = "";
    var sandbox_thumbnail = "";
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    function parseQuery (qstr) {
        var query = {};
        var a = qstr.split('&');
        for (var i in a) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
        }
        return query;
    }

    function load(url) {
        // Make the request and wait for the reply
        fetch(url)
            .then(function (response) {
                // If we get a positive response...
                if (response.status !== 200) {
                    console.log('Error getting shader. Status code: ' + response.status);
                    return;
                }
                // console.log(response);
                return response.text();
            })
            .then(function(content) {
                sandbox_content = content;
                sandbox.load(content);

                var title = addTitle();
                var author = addAuthor();
                if ( title === "unknown" && author === "unknown") {
                    document.getElementById("credits").style.visibility = "hidden";
                } else {
                    document.getElementById("credits").style.visibility = "visible";
                }

                addMeta({
                    'title' : title + ' by ' + author,
                    'type' : 'website',
                    'url': window.location.href,
                    'image': sandbox_thumbnail
                })
            })
    }

    function addTitle() {
        var result = sandbox_content.match(/\/\/\s*[T|t]itle\s*:\s*([\w|\s|\@|\(|\)|\-|\_]*)/i);
        if (result && !(result[1] === ' ' || result[1] === '')) {
            sandbox_title = result[1].replace(/(\r\n|\n|\r)/gm, '');
            var title_el = document.getElementById("title").innerHTML = sandbox_title;
            return sandbox_title;
        }
        else {
            return "unknown";
        }
    }

    function addAuthor() {
        var result = sandbox_content.match(/\/\/\s*[A|a]uthor\s*[\:]?\s*([\w|\s|\@|\(|\)|\-|\_]*)/i);
        if (result && !(result[1] === ' ' || result[1] === '')) {
            sandbox_author = result[1].replace(/(\r\n|\n|\r)/gm, '');
            document.getElementById("author").innerHTML = sandbox_author;
            return sandbox_author;
        }
        else {
            return "unknown";
        }
    }

    function addMeta(obj) {
        for (var key in obj) {
            var meta = document.createElement('meta');
            meta.setAttribute('og:'+key, obj[key]);
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
    }

    var query = parseQuery(window.location.search.slice(1));
    if (query && query.log) {
        sandbox_thumbnail = 'https://thebookofshaders.com/log/' + query.log + '.png';
        load('https://thebookofshaders.com/log/' + query.log + '.frag');
    }

    if (window.location.hash !== '') {
        var hashes = location.hash.split('&');
        for (var i in hashes) {
            var ext = hashes[i].substr(hashes[i].lastIndexOf('.') + 1);
            var path = hashes[i];

            // Extract hash if is present
            if (path.search('#') === 0) {
                path = path.substr(1);
            }

            if (ext === 'frag') {
                load(path);
            }
            else if (ext === 'png' || ext === 'jpg' || ext === 'PNG' || ext === 'JPG') {
                sandbox.setUniform("u_tex"+texCounter.toString(), path);
                texCounter++;
            }
        }
    }


}//даже не думай


//
//
//
//
//
//
//
//
// works
//
//
//
//
//
//
//
//
//
//
//
const bg = [
    './img/work-1.png',
    './img/work-2.png',
    './img/work-3.jpg',
    './img/work-4.png',
    './img/work-5.png',
]

const slides = document.querySelectorAll(".slide");

slides.forEach((slide, idx) => {
    slide.style.backgroundImage = `url("${bg[idx]}")`;

    slide.addEventListener("click", (e) => {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
    });
});
//
//
//
//
//
//
//
//
// works
//
//
//
//
//
//
//
//
//
//
//
window.scrollTo({
    top: 0,
    behavior: "smooth"
});
gsap.registerPlugin(ScrollTrigger);
let bodyScrollBar = Scrollbar.init(document.body, {
    damping: 0.1,
    delegateTo: document,
});
const firstHeight = $('.first').height();
const contactsHeight = firstHeight + $('#about').height() * 5.5

//nav contacts

$('#to-contacts').click(e =>{
    e.preventDefault();
    bodyScrollBar.scrollTo(0, contactsHeight, 2000)
});
$('#to-works').click(e =>{
    e.preventDefault();
    bodyScrollBar.scrollTo(0, contactsHeight + 2500, 2000)
});
// nav about
$('#to-about').click(e =>{
    e.preventDefault();
    bodyScrollBar.scrollTo(0, firstHeight, 2000)
});
ScrollTrigger.scrollerProxy(".scroller", {
    scrollTop(value) {
        if (arguments.length) {
            bodyScrollBar.scrollTop = value;
        }
        return bodyScrollBar.scrollTop;
    },
});
bodyScrollBar.addListener(ScrollTrigger.update);







gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });

var images = gsap.utils.toArray('.panel:not(.purple)');

images.forEach((image, i) => {

    var tl = gsap.timeline({

        scrollTrigger: {
            trigger: "section#about",
            scroller: ".scroller",
            start: () => "top -" + (window.innerHeight*(i+0.5)),
            end: () => "+=" + window.innerHeight,
            scrub: true,
            toggleActions: "play none reverse none",
            invalidateOnRefresh: false,
        }

    })

    tl
        .to(image, { height: 0 })
    ;

});







gsap.set(".panel-text", { zIndex: (i, target, targets) => targets.length - i });

var texts = gsap.utils.toArray('.panel-text');

texts.forEach((text, i) => {

    var tl = gsap.timeline({

        scrollTrigger: {
            trigger: "section#about",
            scroller: ".scroller",
            start: () => "top -" + (window.innerHeight*i),
            end: () => "+=" + window.innerHeight,
            scrub: true,
            toggleActions: "play none reverse none",
            invalidateOnRefresh: false,
        }

    })

    tl
        .to(text, { duration: 0.33, opacity: 1, y:"50%" })
        .to(text, { duration: 0.33, opacity: 0, y:"0%" }, 0.66)
    ;

});





ScrollTrigger.create({

    trigger: "section#about",
    scroller: ".scroller",
    scrub: true,
    markers: false,
    pin: true,
    start: () => "top top",
    end: () => "+=" + ((images.length + 1) * window.innerHeight),
    invalidateOnRefresh: false,

});
