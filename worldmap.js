
var isMapDragged = false;
var startX, startY;

var showExcl = function(t, l) {
    var Scope = angular.element('[ng-controller=ArikkariHelperCtrl]').scope();       
    var Maps = {};

    t = parseInt(t);
    l = parseInt(l);
    for (i=0; i<Scope.Quests.length; i++) {
        if (Scope.Quests[i].status == 1) {
            for (j=0; j<Scope.Quests[i].map.length; j++) {
                var id = Scope.Quests[i].map[j];
                var m = Scope.Maps[id];
                if (Maps[id] == undefined) {
                    Maps[id] = 1;
                    $('img[name=' + id + ']').css('left', (m.x + l - 9) + 'px')
                                             .css('top',  (m.y + t - 14) + 'px');
                    $('ul[name=' + id + ']').css('left', (m.x + l - 9) + 'px')
                                            .css('top',  (m.y + t + 14) + 'px');
                }
            }
        }
    }
}

var handleMove = function(x, y) {
    if (isMapDragged) {
        var worldmap_wrap = $('#worldmap-wrap');
        var worldmap_zoom = $('#worldmap-zoom');

        var t = y-startY;
        t = Math.min(t, 0);
        t = Math.max(t, worldmap_wrap.height() - worldmap_zoom.height());
        var l = x-startX;
        l = Math.min(l, 0);
        l = Math.max(l, worldmap_wrap.width() - worldmap_zoom.width());
        worldmap_zoom.css('top', t + 'px');
        worldmap_zoom.css('left', l + 'px');
        showExcl(t, l);
    }
}

$('body').ready( function(e) {
    isMapDragged = false;
    $('#worldmap-zoom').css('top', '0px');
    $('#worldmap-zoom').css('left','0px');
});


$('#worldmap-wrap').mouseleave( function(e) {
    isMapDragged = false;
});
$('#worldmap-wrap').mouseup( function(e) {
    isMapDragged = false;
});
$('#worldmap-wrap').mousedown( function(e) {
    e.preventDefault();
    isMapDragged = true;
    var worldmap_zoom = $('#worldmap-zoom');
    var offsetX = parseInt(worldmap_zoom.css('left'));
    var offsetY = parseInt(worldmap_zoom.css('top'));
    startX = e.pageX - offsetX;
    startY = e.pageY - offsetY;
});





$('#worldmap-wrap').mousemove( function(e) {
    handleMove(e.pageX,e.pageY);
});





$('#worldmap-wrap').on('touchstart', ( function(e) {
    e.preventDefault();
    isMapDragged = true;
    var worldmap_zoom = $('#worldmap-zoom');
    var offsetX = parseInt(worldmap_zoom.css('left'));
    var offsetY = parseInt(worldmap_zoom.css('top'));
    var pos = e.originalEvent.touches[0];
    startX = pos.pageX - offsetX;
    startY = pos.pageY - offsetY;
}));
$('#worldmap-wrap').on('touchmove', ( function(e) {
    var pos = e.originalEvent.touches[0];
    handleMove(pos.pageX, pos.pageY);
}));
$('#worldmap-wrap').on('touchend', ( function(e) {
    isMapDragged = false;
}));
