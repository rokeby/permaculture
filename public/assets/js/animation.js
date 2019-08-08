function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



async function runMainLoop(){
	console.log('running!')
	while(true){

		$('.water').each( function() {
			var wave = $( this ).html() === "~" ? '≈' : "~"
			$( this ).html(wave);
		})
		await sleep(1000);

	}

}



export default {runMainLoop};