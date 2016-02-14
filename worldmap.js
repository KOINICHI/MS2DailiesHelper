
var mapIdx = 0;
var mapTypes = ['victoria', 'karkar'];
var mapNames = ['빅토리아 아일랜드', '카르카르 아일랜드'];
var mapDisplayed = [false, false];
var mapTileSize = 256;
var mapDims = [[11,16],[5,5]]
	
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
				if (id[3] != mapIdx) {
					$('img[name=' + id + ']').hide();
					$('ul[name=' + id + ']').hide();
				}
				else {
					$('img[name=' + id + ']').show();
					$('ul[name=' + id + ']').show();
				}
            }
        }
    }
}

var handleMove = function(x, y) {
    if (isMapDragged) {
        var worldmap = $('#worldmap-' + mapTypes[mapIdx]);

        var t = y-startY;
        t = Math.min(t, 0);
		//t = Math.min(t, mapDims[idx][0]*mapTileSize);
        var l = x-startX;
        l = Math.min(l, 0);
		//l = Math.min(l, mapDims[idx][1]*mapTileSize);
        worldmap.css('top', t + 'px');
        worldmap.css('left', l + 'px');
        showExcl(t, l);
    }
}

var displayMap = function(idx) {
	mapIdx = idx;
	var type = mapTypes[idx];
	var worldmap = $('#worldmap-' + type);
	if (!mapDisplayed[idx]) {
		mapDisplayed[idx] = true;
		var dimX = mapDims[idx][0];
		var dimY = mapDims[idx][1];
		for (var i=0; i<dimX; i++) {
			for (var j=0; j<dimY; j++) {
				var img = '<img src="./' + type + '/' + i + ' ' + j + '.png"' +
							'style="position: absolute; top:' + i*mapTileSize + 'px; left:' + j*mapTileSize + 'px" />';
				worldmap.append(img);
			}
		}
	}
	for (var i=0; i<mapTypes.length; i++) {
		$('#worldmap-' + mapTypes[i]).hide();
	}
	$('#worldmap-toggle').text(mapNames[idx]);
	worldmap.show();
}

$('body').ready( function(e) {
    isMapDragged = false;
    $('#worldmap-victoria').css('top', -(mapDims[0][0]/2.5 * mapTileSize) + 'px');
    $('#worldmap-victoria').css('left', -(mapDims[0][1]/4 * mapTileSize) + 'px');
    $('#worldmap-karkar').css('top', -(mapDims[1][0]/4 * mapTileSize) + 'px');
    $('#worldmap-karkar').css('left', -(mapDims[1][1]/4 * mapTileSize) + 'px');
	displayMap(0);
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
    var worldmap = $('#worldmap-' + mapTypes[mapIdx]);
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
    var worldmap = $('#worldmap-' + mapTypes[mapIdx]);
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


var handleToggle = function() {
	mapIdx += 1;
	mapIdx %= mapTypes.length;
	displayMap(mapIdx);
	var worldmap = $('#worldmap-' + mapTypes[mapIdx]);
	showExcl(worldmap.css('top'), worldmap.css('left'));
}
$('#worldmap-toggle').on('touchstart', function(e) {
	handleToggle();
});
$('#worldmap-toggle').on('click', function(e) {
	handleToggle();
});