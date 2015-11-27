$('body').ready( function(e) {
	$('#worldmap-zoom').hide();
});

$('#worldmap-wrap').mouseenter( function(e) {
	$('#worldmap-zoom').show();
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
	
	var t = -y*(z_h/h) + h/2;
	t = Math.min(t, 0);
	t = Math.max(t, -z_h+h);
	var l = -x*(z_w/w) + w/2;
	l = Math.min(l, 0);
	l = Math.max(l, -z_w+w);
	worldmap_zoom.css('top', t + 'px');
	worldmap_zoom.css('left', l + 'px');
});

$('#worldmap-wrap').mouseleave( function(e) {
	$('#worldmap-zoom').hide();
});
