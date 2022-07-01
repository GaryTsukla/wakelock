const stat=document.querySelector('.status');
const info=document.querySelector('.info');
const wakeButton=document.querySelector('.button');
let wake={
	wakeLock:null,
	wakeAllowed:true,
	// Checks if wakelock is available and then starts the wakelock
	activeLock:function(text){
		wakeButton.style.display='block';
		wakeButton.innerText='Disable Wakelock';
		document.title = 'Active - Wakelock';
		stat.innerText='Active';
		info.innerText=text;
		document.body.style.backgroundImage='radial-gradient(circle,#05056e,#23098C)';
	},
	disableLock:function(text){
		document.title = 'Disabled - Wakelock';
		stat.innerText='Disabled';
		info.innerText=text;
		document.body.style.backgroundImage='radial-gradient(circle,#540202,#720620)';
	},
	startWakeLock:async function(){
		if(!wake.wakeAllowed){return;}
		try{
			wake.wakeLock = await navigator.wakeLock.request('screen');
			wake.activeLock('Your computer will not activate screensaver or automatically lock. Keep this window in view to keep your computer awake');
		}catch(e){
			// the wake lock request fails, unsupported browser or battery is low
			wake.wakeLock=null;
			wakeButton.style.display='none';
			document.removeEventListener('visibilitychange',wake.handleVisibilityChange,false);
			wake.disableLock('Wakelock is not available in your browser or battery is low. Please use Google Chrome for the best experience.');
		}
	},
	// When screen changes from visible to not visible or vice versa,
	// it restarts the wakelock or changes the message to show wakelock is disabled
	handleVisibilityChange:function(){
		if(!wake.wakeAllowed){return;}
		if(wake.wakeLock !== null){
			document.title = 'Starting - Wakelock';
			stat.innerText='Activating...';
			document.body.style.backgroundImage='radial-gradient(circle,#4a054a,#680968)';
			if(document.visibilityState === 'visible'){
				wake.startWakeLock();
			}else{
				wake.disableLock('This window must be activated to enable wakelock');
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
			wake.disableLock('Click button to enable');
		}else{
			wake.wakeAllowed=true;
			wakeButton.innerText='Disable Wakelock';
			wake.startWakeLock();
		}
	}
};
document.addEventListener('visibilitychange',wake.handleVisibilityChange,false);
wake.startWakeLock();
wakeButton.addEventListener('click',wake.disableEnableWakeLock,false);