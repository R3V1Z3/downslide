/* global jQuery, $ */
jQuery(document).ready(function() {

    // attach the plugin to an element
    $('#wrapper').gitdown( {    'title': 'DownSlide',
                                'content': 'README.md',
                                'callback': main
    } );
    var $gd = $('#wrapper').data('gitdown');

    function main() {
        
        register_events();
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

        $(document).keyup(function(e) {
            if( e.which == 37 || e.which == 100 ) {
                var $prev = $('.toc a.current').prev()[0];
                if (typeof $prev === "undefined") {
                    $('.toc a:last-child')[0].click();
                } else $prev.click();
            } else if (e.keyCode === 39 || e.which == 102 ) {
                var $next = $('.toc a.current').next()[0];
                if (typeof $next === "undefined") {
                    $('.toc a:first-child')[0].click();
                } else $next.click();
            }
        })

    }

});