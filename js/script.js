var default_transform;
var eid_inner = '.inner';

const gd = new GitDown('#wrapper', {
    title: 'Downslide',
    content: 'README.md',
    merge_gists: true,
    callback: done
});

const eid = gd.eid;
let timeout;
let events_registered = false;

function done() {

    // load svg file to populate svg-filter list
    if ( $('#svg').length < 1 ) extract_svg('filters.svg');

    // wrap .inner with an fx div
    if ( $('.fx').length < 1 ) {
        $(eid_inner).wrap('<div class="fx">');
        $('#wrapper').append('<div id="vignette"></div>');
    }
    
    var v = $('.info .field.slider.vignette input').val();
    vignette(v);

    $('.info .field.select.highlight select').change();

    var x = $('.info .slider.offsetX input').val();
    var y = $('.info .slider.offsetY input').val();
    $(eid_inner).attr( 'data-x' , x );
    $(eid_inner).attr( 'data-y' , y );

    if ( !events_registered ) register_events();
    // update outer-space option to configure  dimensions
    $('.info .field.outer-space input').change();
    center_view();
}

function vignette(v) {
    var bg = `radial-gradient(ellipse at center,`;
    bg += `rgba(0,0,0,0) 0%,`;
    bg += `rgba(0,0,0,${v/6}) 30%,`;
    bg += `rgba(0,0,0,${v/3}) 60%,`;
    bg += `rgba(0,0,0,${v}) 100%)`;
    var s = '';
    var vignette = document.querySelector( eid + ' #vignette' );
    if ( vignette !== null ) {
        vignette.style.backgroundImage = bg;
    }
}

function extract_svg(filename) {
    let svg_filter = gd.settings.get_param_value('svg-filter');
    if ( svg_filter === undefined ) svg_filter = 'none';
    $.get( filename, function(data) {
        // add svg filters to body
        var div = document.createElement("div");
        div.id = 'svg';
        div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
        document.body.insertBefore(div, document.body.childNodes[0]);

        var $select = $('.info .field.select.svg-filter select');
        if ( $select.length > 0 ) {
            // $select exists, so lets add the imported filters
            $('#svg defs filter').each(function() {
                var id = $(this).attr('id');
                var name = $(this).attr('inkscape:label');
                //$select.append(`<option>${name}-${id}</option>`);
                $select.append(`<option>${name}-${id}</option>`);
            });
        }

        // we'll update svg-filter url parameter now that svg is loaded
        var $select = $('.info .select.svg-filter select');
        $select.val(svg_filter);
        $select.change();
    });
}

function update_slider_value( name, value ) {
    var slider = document.querySelector( `.info .slider.${name} input` );
    slider.value = value;
    slider.setAttribute( 'value', value );
}

// center view by updating translatex and translatey
function center_view() {
    const $ = document.querySelector.bind(document);
    let $s = $('.section.current');
    let $fx = $('.fx');
    let $inner = $('.inner');
    
    // store $inner dimensions for use later, if not already set
    if( $inner.getAttribute('data-width') === null ) {
        $inner.setAttribute('data-width', $inner.offsetWidth);
        $inner.setAttribute('data-height', $inner.offsetHeight);
    }

    let inner_space = parseInt( $('.field.inner-space input').value );
    let outer_space = parseInt( $('.field.outer-space input').value );

    const maxw = window.innerWidth;
    const maxh = window.innerHeight;

    // start by setting the scale
    let scale = Math.min(
        maxw / ( $s.offsetWidth + inner_space ),
        maxh / ( $s.offsetHeight + inner_space )
    );

    // setup positions for transform
    let x = $s.offsetLeft - ( maxw - $s.offsetWidth ) / 2;
    let y = $s.offsetTop - ( maxh - $s.offsetHeight ) / 2;

    x -= parseInt( $('.field.offsetX input').value );
    y -= parseInt( $('.field.offsetY input').value );

    // initiate transform
    const transform = `
        translateX(${-x}px)
        translateY(${-y}px)
        scale(${scale})
    `;
    let w = Number($inner.getAttribute('data-width'));
    let h = Number($inner.getAttribute('data-height'));
    $inner.style.width = w + outer_space + 'px';
    $inner.style.height = h + outer_space + 'px';
    $fx.style.width = $inner.offsetWidth + 'px';
    $fx.style.height = $inner.offsetHeight + 'px';
    $fx.style.transform = transform;
}

function remove_class_by_prefix( element, prefix ) {
    const el = document.querySelector(element);
    var classes = el.classList;
    for( var c of classes ) {
        if ( c.startsWith(prefix) ) el.classList.remove(c);
    }
}

function update_class(type) {
    var v = $(`.info .field.select.${type} select`).val().toLowerCase();
    // remove existing classes first
    remove_class_by_prefix( gd.eid + ' .code', type );
    remove_class_by_prefix( gd.eid + ' .code-overlay', type );
    if ( v !== 'none' || v !== null ) {
        $('.code').addClass(`${type}-${v}`);
        $('.code-overlay').addClass(`${type}-${v}`);
    }
}

function register_events() {

    events_registered = true;

    window.addEventListener('resize', function(event){
        center_view();
    });

    $('.info .collapsible.perspective .field.slider input').on('input change', function(e) {
        center_view();
    });

    $('.info .collapsible.dimensions .field.slider input').on('input change', function(e) {
        center_view();
    });

    // vignette effect
    $('.info .field.slider.vignette input').on('input change', function(e) {
        var v = $(this).val();
        vignette(v);
    });

    $('.info .field.select.svg-filter select').change(e => {
        let fx = document.querySelector('.fx');
        if ( fx === null ) return;

        let style = `
            brightness(var(--brightness))
            contrast(var(--contrast))
            grayscale(var(--grayscale))
            hue-rotate(var(--hue-rotate))
            invert(var(--invert))
            saturate(var(--saturate))
            sepia(var(--sepia))
            blur(var(--blur))
        `;

        let svg = e.target.value;
        let url = '';
        svg = svg.split('-');
        if ( svg.length > 1 ) url = ` url(#${svg[1].trim()})`;
        style += url;
        fx.style.filter = style;
    });

    $('.info .field.select.tiltshift select').change(function() {
        update_class('tiltshift');
    });

    $('.info .field.select.font-effect select').change(function() {
        update_class('font-effect');
    });

    // mousewheel zoom handler
    $('.inner').on('wheel', function(e){
        // disallow zoom within parchment content so user can safely scroll text
        let translatez = document.querySelector('.info .slider.translateZ input');
        if ( translatez === null ) return;
        var v = Number( translatez.value );
        if( e.originalEvent.deltaY < 0 ) {
            v += 10;
            if ( v > 500 ) v = 500;
        } else{
            v -= 10;
            if ( v < -500 ) v = -500;
        }
        gd.settings.set_value('translateZ', v);
        gd.update_field(translatez, v);
        center_view();
    });

    interact(eid_inner)
    .gesturable({
        onmove: function (event) {
            var $translatez = $('.info .slider.translatez input');
            var scale = Number( $translatez.val() );
            scale = scale * (5 + event.ds);
            // update inner with new scale
            update_slider_value( 'translateZ', scale );
            $translatez.change();
            dragMoveListener(event);
        }
    })
    .draggable({ onmove: dragMoveListener });

    // LEFT and RIGHT arrows
    document.addEventListener('keyup', e => {
        var key = e.key;
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

function dragMoveListener (event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    
    if ( target.classList.contains('inner') ) {
        update_slider_value( 'offsetX', x );
        update_slider_value( 'offsetY', y );
        var $offsetX = $('.info .slider.offsetX input');
        var $offsetY = $('.info .slider.offsetY input');
        $offsetX.change();
        $offsetY.change();
        center_view();
    }
    
    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}
