$('form[name="apiForm"]').submit(onSubmit);
function onSubmit(e) {
	e.preventDefault();
	var $userid = $('input[name="userid"]');
	var $domain = $('input[name="domain"]');
	var userid = $userid.val().trim()
	var domain = $domain.val().trim()
	if(userid === '') {
		return false;
	}
	if(domain === '') {
		return false;
	}
	this.submit();
}
