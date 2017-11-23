const gd = new GitDown('#wrapper', {
    title: 'DownSlide',
    content: 'README.md',
    callback: done
});

function done() {
    // LEFT and RIGHT arrows
    document.addEventListener('keyup', (event) => {
        var key = event.key;
        if ( key === 'ArrowLeft' ) {
            var $prev = $('.toc a.current').prev()[0];
            if (typeof $prev === "undefined") {
                $('.toc a:last-child')[0].click();
            } else $prev.click();
        } else if ( key === 'ArrowRight' ) {
            var $next = $('.toc a.current').next()[0];
            if (typeof $next === "undefined") {
                $('.toc a:first-child')[0].click();
            } else $next.click();
        }
        }, false);
}
