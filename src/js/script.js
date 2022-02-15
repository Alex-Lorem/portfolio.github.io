window.scrollTo({
    top: 0,
    behavior: "smooth"
});
window.onload = function () {

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
    grained("wrapper", options);
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

