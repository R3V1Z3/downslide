/* global jQuery, $ */
jQuery(document).ready(function() {

    // attach the plugin to an element
    $('#wrapper').gitdown( {    'title': 'DownSlide',
                                'file': 'README.md',
                                'callback': main
    } );
    var $gd = $('#wrapper').data('gitdown');

    function main() {
        
        if ( !$gd.settings.loaded ) {
            register_events_onstartup();
        }
        find_video_references();

    }
    
    function find_video_references() {
        $('.section a img').each(function(){
            var alt = $(this).attr('alt');
            if ( alt === 'bg-video') {
                var url = $(this).parent().attr('href');
                var id = '';
                if(url.match('http://(www.)?youtube|youtu\.be')){
                    id = url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
                }
                var iframe = '<iframe id="player" class="bg-video muted" ';
                iframe += 'src="//www.youtube.com/embed/' + id;
                iframe += '?playlist=' + id + '&';
                iframe += 'version=3&';
                iframe += 'loop=1&';
                iframe += 'autoplay=1&';
                iframe += 'rel=0&';
                iframe += 'showinfo=0&';
                iframe += 'controls=0&';
                iframe += 'autohide=1&';
                iframe += '" frameborder="0" allowfullscreen></iframe>';
                $('.inner').append(iframe);
            }
            // now remove original link
            $(this).parent().remove();
        });
    }
    
    function register_events() {
    }

    // events to be loaded only at startup
    function register_events_onstartup() {
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

});