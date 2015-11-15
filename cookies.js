function setCookie(key, val, days) {
	if (days) { days=365; }
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = key.toString() + "=" + val.toString() + ";" + expires + "; path=/";
}

var getCookie = function(key) {
	var cs = document.cookie.split('; ');
	key = key.toString();
	for (var i=0; i<cs.length; i++) {
		var c = cs[i].split('=')
		if (key === c[0]) {
			return c[1];
		}
	}
	return 0;
}