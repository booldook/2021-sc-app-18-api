$('.bt-data').click(onGetData);

var token = null;
let apikey = '54352b15-7581-419d-985d-2dbf61e7c4a8';
let dataURL = 'http://127.0.0.1:3100/api2';


function onGetData() {
	axios.get(dataURL + '?apikey='+apikey).then(getData).catch(onError);

	function getData(r) {
		console.log(r.data)
	}
}


function onError(err) {
	console.log(err);
}