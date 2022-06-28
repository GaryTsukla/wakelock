const stat=document.querySelector('.status');
const info=document.querySelector('.info');
let wakeLock;
let startWakeLock=async function(){
	try{
		wakeLock = await navigator.wakeLock.request('screen');
		document.title = 'Active - Wakelock';
		stat.innerText='Active';
		info.innerText='Your computer will not activate screensaver or automatically lock. Keep this window in view to keep your computer awake';
	}catch(e){
		// the wake lock request fails - usually system related, such being low on battery
		wakeLock=null;
		document.title = 'Disabled - Wakelock';
		stat.innerText='Disabled';
		info.innerText='Wakelock is not available in your browser or battery is low. Please use Google Chrome for the best experience.'
	}
}
const handleVisibilityChange = async function(){
	document.title = 'Starting - Wakelock';
	stat.innerText='Activating...';
	if (wakeLock !== null){
		if(document.visibilityState === 'visible') {
			startWakeLock();
		}else{
			document.title = 'Disabled - Wakelock';
			stat.innerText='Disabled';
			info.innerText='This window must be activated to enable wakelock';
		}
	}
};
document.addEventListener('visibilitychange', handleVisibilityChange);
startWakeLock();