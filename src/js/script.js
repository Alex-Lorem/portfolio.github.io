window.onload = function () {
    const toAbout = document.getElementById('to-about');
    const toWorks = document.getElementById('to-works');
    const toContacts = document.getElementById('to-contacts');
    const ar = [];
    ar.push(toAbout)
    ar.push(toWorks)
    ar.push(toContacts)



    $('#to-about').hover(
        function(){ //in
            toAbout.classList.toggle('link-active');
            toAbout.classList.remove('link-disactive');
            toAbout.classList.add('before-active');
        },
        function(){ //out
            toAbout.classList.remove('before-active');
            toAbout.classList.toggle('link-active');
            toAbout.classList.add('link-disactive');
        }
    );
    $('#to-works').hover(
        function(){ //in
            toWorks.classList.toggle('link-active');
            toWorks.classList.remove('link-disactive');
            toWorks.classList.add('before-active');
        },
        function(){ //out
            toWorks.classList.remove('before-active');
            toWorks.classList.toggle('link-active');
            toWorks.classList.add('link-disactive');
        }
    );
    $('#to-contacts').hover(
        function(){ //in
            toContacts.classList.toggle('link-active');
            toContacts.classList.remove('link-disactive');
            toContacts.classList.add('before-active');
        },
        function(){ //out
            toContacts.classList.remove('before-active');
            toContacts.classList.toggle('link-active');
            toContacts.classList.add('link-disactive');
        }
    );


}//даже не думай
