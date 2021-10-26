window.onload = function () {

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
