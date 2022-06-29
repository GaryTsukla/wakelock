const stat=document.querySelector('.status');
const info=document.querySelector('.info');
const wakeButton=document.querySelector('.button');
let wake={
	wakeLock:null,
	wakeAllowed:true,
	// Checks if wakelock is available and then starts the wakelock
	startWakeLock:async function(){
		if(!wake.wakeAllowed){return;}
		try{
			wake.wakeLock = await navigator.wakeLock.request('screen');
			wakeButton.style.display='block';
			wakeButton.innerText='Disable Wakelock';
			document.title = 'Active - Wakelock';
			stat.innerText='Active';
			info.innerText='Your computer will not activate screensaver or automatically lock. Keep this window in view to keep your computer awake';
		}catch(e){
			// the wake lock request fails, unsupported browser or battery is low
			wake.wakeLock=null;
			wakeButton.style.display='none';
			document.title = 'Disabled - Wakelock';
			stat.innerText='Disabled';
			info.innerText='Wakelock is not available in your browser or battery is low. Please use Google Chrome for the best experience.'
		}
	},
	// When screen changes from visible to not visible or vice versa,
	// it restarts the wakelock or changes the message to show wakelock is disabled
	handleVisibilityChange:function(){
		if(!wake.wakeAllowed){return;}
		document.title = 'Starting - Wakelock';
		stat.innerText='Activating...';
		if (wake.wakeLock !== null){
			if(document.visibilityState === 'visible'){
				wake.startWakeLock();
			}else{
				document.title = 'Disabled - Wakelock';
				stat.innerText='Disabled';
				info.innerText='This window must be activated to enable wakelock';
			}
		}
	},
	disableEnableWakeLock:function(){
		if(wake.wakeAllowed){
			wake.wakeAllowed=false;
			wakeButton.innerText='Enable Wakelock';
			if(wake.wakeLock===null){
				return;
			}
			wake.wakeLock.release();
			document.title = 'Disabled - Wakelock';
			stat.innerText='Disabled';
			info.innerText='Click button to enable';
		}else{
			wake.wakeAllowed=true;
			wakeButton.innerText='Disable Wakelock';
			wake.startWakeLock();
			
		}
	}
}
document.addEventListener('visibilitychange',wake.handleVisibilityChange,false);
wake.startWakeLock();
wakeButton.addEventListener('click',wake.disableEnableWakeLock,false);