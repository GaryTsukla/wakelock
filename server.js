const express = require('express');
const app = express();
const path = require('path');
const addPath=function(p){
	return path.join(__dirname,p);
};

// Send requested page, h=header&request,r=response
app.get('/',(h,r)=>{
	r.sendFile(addPath('/wakelock.html'));
});
app.get('/wake.js',(h,r)=>{
	r.sendFile(addPath('/wake.js'));
});
app.get('/wake.css',(h,r)=>{
	r.sendFile(addPath('/wake.css'));
});

// Throw 404 if no page found
app.use((h,r)=>{
	r.status(404).sendFile(addPath('/wakelock.html'));
	/* r.status(404).sendFile(addPath('/404.html')); */
});
const PORT = process.env.PORT || 8080;
app.listen(PORT);