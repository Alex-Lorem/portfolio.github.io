
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
    grained("#wrapper", options);
//preloader
    setTimeout(function () {

        $('.preloader').addClass('preloader-disactive');

        setTimeout(function () {

            $('.preloader').addClass('preloader-display');

        },2000);

    },3500);


// nav skills

$('#to-skills').click( e=> {
    e.preventDefault();
    $('.skills').addClass('section-active');
});

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
    $('#close-contacts').click( e=> {
        e.preventDefault();
        $('.contacts').removeClass('contacts-active');

    });
//close

    $('.close').click( e=> {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const curSection = $this.closest("section");
        curSection.addClass('section-disactive');
        setTimeout(function () {
            curSection.removeClass('section-active');},1000)
        setTimeout(function () {
            curSection.removeClass('section-disactive');},1000)
    });

//to-about

    const firstHeight = document.querySelector('.first').scrollHeight;
    $('#to-about').click(e =>{
        e.preventDefault();
        $('html,body').animate({scrollTop:firstHeight},3000);
    });
    $('#to-return').click(e =>{
        e.preventDefault();
        $('html,body').animate({scrollTop:0},1500);
    });

}//даже не думай
