$('.bt-token').click(onGetToken);
$('.bt-data').click(onGetData);

var token = null;
let userid = 'booldook';
let apikey = '54352b15-7581-419d-985d-2dbf61e7c4a8';
let tokenURL = 'http://127.0.0.1:3100/api/sign';
let dataURL = 'http://127.0.0.1:3100/api';

function onGetToken() {
	var data = { userid: userid, apikey: apikey } 
	axios.post(tokenURL, data).then(getToken).catch(onError);

	function getToken(r) {
		token = r.data.token;
		console.log(token);
	}
}

function onGetData() {
	let headers = { authorization: token }
	axios.get(dataURL, { headers }).then(getData).catch(onError);

	function getData(r) {
		console.log(r.data)
	}
}


function onError(err) {
	console.log(err);
}