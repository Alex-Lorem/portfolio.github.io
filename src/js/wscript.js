require('./gsap.min.js');
require('./noise.js');
require('./ScrollTrigger.min.js');
let GlslCanvas = require('./moon.js');
let Scrollbar = require('node_modules/smooth-scrollbar/dist/smooth-scrollbar.js');
let $ = require('jquery');


window.onload = function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    window.scrollTo(0,0);
    const options = {
        "animate": true,
        "patternWidth": 285.56,
        "patternHeight": 285.56,
        "grainOpacity": 0.05,
        "grainDensity": 1,
        "grainWidth": 1,
        "grainHeight": 1

    }

    if(window.innerWidth > 1300) {
        grained("#first", options);
        grained("#about", options);
    } else{
        grained("#scroller", options);
    }



    //mars
    let canvas = document.getElementById("glslCanvas");
    let sandbox = new GlslCanvas(canvas);
    let texCounter = 0;
    let sandbox_content = "";
    let sandbox_thumbnail = "";
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.backgroundColor = 'rgb(7,7,7)';

    function parseQuery (qstr) {
        let query = {};
        let a = qstr.split('&');
        for (let i in a) {
            let b = a[i].split('=');
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


            })
    }



    let query = parseQuery(window.location.search.slice(1));
    if (query && query.log) {
        sandbox_thumbnail = 'https://thebookofshaders.com/log/' + query.log + '.png';
        load('https://thebookofshaders.com/log/' + query.log + '.frag');
    }

    if (window.location.hash !== '') {
        let hashes = location.hash.split('&');
        for (let i in hashes) {
            let ext = hashes[i].substr(hashes[i].lastIndexOf('.') + 1);
            let path = hashes[i];

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
    const slides = document.querySelectorAll(".slide");

    slides.forEach((slide, idx) => {
        slide.addEventListener("click", (e) => {
            slides.forEach((slide) => {
                slide.classList.remove("active");
            });
            if(window.innerWidth > 768) {
                e.currentTarget.classList.add("active");
            }
        });
    });
}//даже не думай


const firstHeight = $('.first').height();
const contactsTop = firstHeight + $('#about').height() * 6.5

if(window.innerWidth > 1300) {

    let bodyScrollBar = Scrollbar.init(document.body, {
        damping: 0.1,
        delegateTo: document,
    });

    //nav contacts

    $('#to-contacts').click(e => {
        e.preventDefault();
        bodyScrollBar.scrollTo(0, contactsTop, 3000)
    });

    $('#to-works').click(e => {
        e.preventDefault();
        bodyScrollBar.scrollIntoView(document.getElementById('works'));
    });
// nav about
    $('#to-about').click(e => {
        e.preventDefault();
        bodyScrollBar.scrollIntoView(document.getElementById('about'));
    });
    gsap.registerPlugin(ScrollTrigger);






    ScrollTrigger.scrollerProxy(".scroller", {
        scrollTop(value) {
            if (arguments.length) {
                bodyScrollBar.scrollTop = value;
            }
            return bodyScrollBar.scrollTop;
        },
    });
    bodyScrollBar.addListener(ScrollTrigger.update);


    gsap.set(".panel", {zIndex: (i, target, targets) => targets.length - i});

    let images = gsap.utils.toArray('.panel:not(.purple)');

    images.forEach((image, i) => {

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "section#about",
                scroller: ".scroller",
                start: () => "top -" + (window.innerHeight * (i + 0.5)),
                end: () => "+=" + window.innerHeight,
                scrub: true,
                toggleActions: "play none reverse none",
                invalidateOnRefresh: false,
            }

        })

        tl
            .to(image, {height: 0})
        ;

    });


    gsap.set(".panel-text", {zIndex: (i, target, targets) => targets.length - i + 1});

    let texts = gsap.utils.toArray('.panel-text');

    texts.forEach((text, i) => {

        let tl = gsap.timeline({

            scrollTrigger: {
                trigger: "section#about",
                scroller: ".scroller",
                start: () => "top -" + (window.innerHeight * i),
                end: () => "+=" + window.innerHeight,
                scrub: true,
                toggleActions: "play none reverse none",
                invalidateOnRefresh: false,
            }

        })

        tl
            .to(text, {duration: 0.33, opacity: 1, y: "50%"})
            .to(text, {duration: 0.33, opacity: 0, y: "0%"}, 0.66)
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

} else{
    Scrollbar.destroyAll();


    const ulHeight = document.querySelector('.panel').scrollHeight;

    document.documentElement.style.setProperty('--ul-height', ulHeight + 'px');
    const columnHeight = document.querySelector('.p-wrap').scrollHeight;
    document.documentElement.style.setProperty('--column-height', columnHeight + 'px');

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
}
