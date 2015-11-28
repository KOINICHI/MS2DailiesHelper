$('body').ready( function(e) {
	$('#worldmap-zoom').hide();
});

$('#worldmap-wrap').mouseenter( function(e) {
	$('#worldmap-zoom').show();
	$('.worldmap-quest-excl').css('visibility','visible');
});
$('#worldmap-wrap').mousemove( function(e) {
	var worldmap = $('#worldmap');
	var worldmap_zoom = $('#worldmap-zoom');
	var offset = worldmap.offset();
	var x = e.pageX - offset.left;
	var y = e.pageY - offset.top;
	var w = worldmap.width();
	var h = worldmap.height();
	var z_w = worldmap_zoom.width();
	var z_h = worldmap_zoom.height();
	var r_w = z_w/w;
	var r_h = z_h/h;
	
	var t = -y*r_h + h/3;
	t = Math.min(t, 0);
	t = Math.max(t, -z_h+h);
	var l = -x*r_w + w/2;
	l = Math.min(l, 0);
	l = Math.max(l, -z_w+w);
	worldmap_zoom.css('top', t + 'px');
	worldmap_zoom.css('left', l + 'px');
	
	
	var Scope = angular.element('[ng-controller=ArikkariHelperCtrl]').scope();
	var Maps = [];
	for (i=0; i<Scope.Quests.length; i++) {
		if (Scope.Quests[i].status == 1) {
			for (j=0; j<Scope.Quests[i].map.length; j++) {
				if (Maps.indexOf(Scope.Quests[i].map[j]) < 0) {
					Maps.push(Scope.Quests[i].map[j]);
				}
			}
		}
	}
	for (i=0; i<Maps.length; i++) {
		var m = Scope.Maps[Maps[i]];
		$('img[name=' + Maps[i] + ']').css('left', (m.x + l - 9) + 'px')
									  .css('top',  (m.y + t - 14) + 'px');
	}
});

$('#worldmap-wrap').mouseleave( function(e) {
	$('#worldmap-zoom').hide();
	$('.worldmap-quest-excl').css('visibility','hidden');
});
