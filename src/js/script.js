

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
    grained("#scroller", options);
//preloader
    setTimeout(function () {

        $('.preloader').addClass('preloader-disactive');

        setTimeout(function () {

            $('.preloader').addClass('preloader-display');

        },2000);

    },3500);



//nav works

    $('#to-works').click( e=> {
        e.preventDefault();
        $('.works').addClass('section-active');
    });

//nav contacts

    $('#to-contacts').click( e=> {
        e.preventDefault();
        $('.contacts').addClass('contacts-active');
    });
//close

//to-about

    const firstHeight = document.querySelector('.first').scrollHeight;
    $('#to-about').click(e =>{
        e.preventDefault();
        $('html,body').animate({scrollTop:firstHeight},2000);
    });

    // scroll animations
}//даже не думай

