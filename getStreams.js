function getStreams(id){

	var status = 'offline';
	var thumbnail;

	let uri = 'https://api.twitch.tv/helix/streams' + '?user_id=' + id;

	let request = new XMLHttpRequest();

	request.open('get',uri,true);
	request.dataType = 'json';
	request.responseType = 'json';
	request.setRequestHeader('Client-ID','kspag9hdl5zkpy6j9oczwkg9t4n6fm');
	request.onerror = function(){
		console.log("oops. stream request failed");
	};

	request.onload = function(){
		let response = this.response;


		if (response.data[0]){
			let data = response.data[0];
			status = data.type;
			thumbnail = data.thumbnail_url;
		}
		console.log('status from within getStreams= '+status);
		updateCard([id,status,thumbnail]);
	};

	request.send();

}
