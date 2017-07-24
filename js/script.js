function getTime() {
    var thyme = new Date(),
		hr = thyme.getHours(),
		min = thyme.getMinutes(),
		sec = thyme.getSeconds(),
        r = Math.round(hr * 11.087).toString(16),
		g = Math.round(min * 4.32).toString(16),
		b = Math.round(sec * 4.32).toString(16);

    if(r.length === 1) { r='0'+r; }
    if(g.length === 1) { g='0'+g; }
    if(b.length === 1) { b='0'+b; }
    if(hr < 10) {hr='0'+hr}
    if(min < 10) {min='0'+min}
    if(sec < 10) {sec='0'+sec}
    
	return [hr,min,sec,r,g,b];
};

// Functions to convert the text color if it is a dark background color
function hexToRGB(hex) {
    var hex = hex.split('#').join(''),
        r = parseInt(hex.slice(0,2), 16),
        g = parseInt(hex.slice(2,4), 16),
        b = parseInt(hex.slice(4,6), 16);
    
    return [r,g,b];
}
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    return [h, s, l];
};
function isDark(hex) {
    var a = hexToRGB(hex), // returns [r,g,b]
        b = rgbToHsl(a[0],a[1],a[2])[2];
    
    return (b <= 0.6);
}

var app = new Vue({
    el: '#app',
    data: { info: '', white: '' },
    computed: {
        rgb: function() { return this.info[3]+this.info[4]+this.info[5] },
        time: function() { return this.info[0]+':'+this.info[1]+':'+this.info[2] },
    },
    methods: {
        update: function() { 
            this.info = getTime(); 
            this.white = ((isDark(this.rgb))?'white':'');
        }
    }
});

app.update();
window.setInterval(app.update, 1000);