$('.bt-token').click(onGetToken)
function onGetToken() {
	let userid = 'booldook';
	let apikey = '54352b15-7581-419d-985d-2dbf61e7c4a8';
	let apiURL = 'http://127.0.0.1:3100/api/sign';
	var data = { userid: userid, apikey: apikey } 
	axios.post(apiURL, data).then(onResult).catch(onError);

	function onResult(r) {
		console.log(r.data);
	}

	function onError(err) {
		console.log(err);
	}
}