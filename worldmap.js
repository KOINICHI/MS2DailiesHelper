var curCont = 0;
var conts = ['victoria', 'darkness', 'karkar'];
var contNames = ['빅토리아 아일랜드', '다크니스 아일랜드', '카르카르 아일랜드'];
var contLoaded = [false, false, false];
var mapTileSize = 256;
var mapDims = [[12,16],[9,15],[5,5]]
var isMapDragged = false;
var startX, startY;
var baseurl = "https://koinichi.github.io/MS2DailiesHelper";

var showExcl = function() {
    var Scope = angular.element('[ng-controller=ArikkariHelperCtrl]').scope();       
    var Maps = {};
    var worldmap = $("#worldmap-" + conts[curCont]);

    var t = parseInt(worldmap.css('top'));
    var l = parseInt(worldmap.css('left'));

    for (i=0; i<Scope.Quests.length; i++) {
        if (Scope.Quests[i].status == 1) {
            for (j=0; j<Scope.Quests[i].map.length; j++) {
                var id = Scope.Quests[i].map[j];
                var m = Scope.Maps[id];
                if (Maps[id] == undefined) {
                    Maps[id] = 1;
                    var img = $('img[name=' + id + ']');
                    var ul = $('ul[name=' + id + ']');
                    if (m.cont != curCont) {
                        img.hide();
                        continue;
                    }
                    img.css('left', (m.x + l - 9) + 'px')
                       .css('top',  (m.y + t - 14) + 'px')
                       .show();
                    ul.css('left', (m.x + l - 9) + 'px')
                      .css('top',  (m.y + t + 14) + 'px');
                }
            }
        }
    }
}

var handleMove = function(x, y) {
    if (isMapDragged) {
        var worldmap = $('#worldmap-' + conts[curCont]);

        var t = y-startY;
        t = Math.min(t, 0);
        var l = x-startX;
        l = Math.min(l, 0);
        worldmap.css('top', t + 'px');
        worldmap.css('left', l + 'px');
        showExcl();
    }
}

var showCont = function(idx) {
	curCont = idx;
	var type = conts[idx];
	var worldmap = $('#worldmap-' + type);
	if (!contLoaded[idx]) {
		contLoaded[idx] = true;
		var dimX = mapDims[idx][0];
		var dimY = mapDims[idx][1];
		for (var i=0; i<dimX; i++) {
			for (var j=0; j<dimY; j++) {
				var img = '<img src="' + baseurl + '/' + type + '/' + i + ' ' + j + '.png"' +
							'style="position: absolute; top:' + i*mapTileSize + 'px; left:' + j*mapTileSize + 'px" />';
				worldmap.append(img);
			}
		}
	}
	for (var i=0; i<conts.length; i++) {
		$('#worldmap-' + conts[i]).hide();
	}
	worldmap.show();
    showExcl();
}

$('body').ready( function(e) {
    isMapDragged = false;
    $('#worldmap-victoria').css('top', -(mapDims[0][0]/3 * mapTileSize) + 'px');
    $('#worldmap-victoria').css('left', -(mapDims[0][1]/3.5 * mapTileSize) + 'px');
    $('#worldmap-darkness').css('top', -(mapDims[1][0]/3 * mapTileSize) + 'px');
    $('#worldmap-darkness').css('left', -(mapDims[1][1]/6 * mapTileSize) + 'px');
    $('#worldmap-karkar').css('top', -(mapTileSize) + 'px');
    $('#worldmap-karkar').css('left', -(mapTileSize) + 'px');
	showCont(0);
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
    var worldmap = $('#worldmap-' + conts[curCont]);
    var offsetX = parseInt(worldmap.css('left'));
    var offsetY = parseInt(worldmap.css('top'));
    startX = e.pageX - offsetX;
    startY = e.pageY - offsetY;
});





$('#worldmap-wrap').mousemove( function(e) {
    handleMove(e.pageX,e.pageY);
});





$('#worldmap-wrap').on('touchstart', function(e) {
    e.preventDefault();
    isMapDragged = true;
    var worldmap = $('#worldmap-' + conts[curCont]);
    var offsetX = parseInt(worldmap.css('left'));
    var offsetY = parseInt(worldmap.css('top'));
    var pos = e.originalEvent.touches[0];
    startX = pos.pageX - offsetX;
    startY = pos.pageY - offsetY;
    if (!tappedOnExcl) {
        $('.worldmap-quest-list').css('visibility', 'hidden');
    }
});
$('#worldmap-wrap').on('touchmove', function(e) {
    var pos = e.originalEvent.touches[0];
    handleMove(pos.pageX, pos.pageY);
});
$('#worldmap-wrap').on('touchend', function(e) {
    isMapDragged = false;
    tappedOnExcl = false;
});



$('#worldmap-toggle').on('mouseenter', function(e) {
    $(this).css('height', '100px');
    $(this).children().each(function() {
        $(this).show();
    });
});
$('#worldmap-toggle').on('mouseleave', function(e) {
    $(this).css('height', '30px');
    $(this).children().each(function() {
        if ($(this).is('[selected]')) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
});
$('#worldmap-toggle > li').on('click', function(e) {
    $(this).siblings().each(function() {
        $(this).removeAttr('selected');
        $(this).hide();
    });
    $(this).attr('selected', '');
    $(this).show();
    $(this).parent().css('height', '30px');
    showCont($(this).index());
});
