
var mapContainer = document.getElementById('map'),
mapOption = {
center: new kakao.maps.LatLng(37.381282869618, 126.92872052667),
level: 3

};

var map = new kakao.maps.Map(mapContainer, mapOption);

var mapTypeControl = new kakao.maps.MapTypeControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);