/**
 * urlBase64ToUint8Array
 * 
 * @param {string} base64String a public vavid key
 */
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

console.log('hello da u main');
	
if(navigator.serviceWorker) {
	// Enregistrement du service worker
    navigator.serviceWorker
        .register('sw.js')
        
        .catch(err => console.error('service worker NON enregistré', err));
}

if(window.Notification && window.Notification !== "denied"){

    Notification.requestPermission(perm => {

        if(perm !== "granted"){
            console.log("Notification refusée");
        }
    })
}

if(navigator.geolocation && navigator.geolocation !== "denied"){

    setUserMap();
}

function loadSnaps() {
    fetch('http://localhost:3001/snaps')
        .then(response => {
            response.json()
                .then(snaps => {
                    const allSnaps = snaps.map(t => L.marker( [t.lat, t.lng] )
                    .bindPopup( `<video style="object-fit: fill;" controls><source src="/resources/${t.resource}" type="video/mp4">Your browser does not support the video tag.</video>` )
                    .addTo( map ));
            
                    console.log(allSnaps); 

                });
        })
        .catch(console.error);
}

loadSnaps();


function setUserMap() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geo Location not supported by browser");
    }
  }//function that retrieves the position
  function showPosition(position) {
    var location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }
    map.flyTo(new L.LatLng(location.latitude, location.longitude), 18);
    console.log(location)
}//request for location

function locationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            return "Location information is unavailable."
            break;
        case error.TIMEOUT:
            return "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            return "An unknown error occurred."
            break;
    }
}

function extractKeysFromArrayBuffer(subscription){
    // no more keys proprety directly visible on the subscription objet. So you have to use getKey()
    const keyArrayBuffer = subscription.getKey('p256dh');
    const authArrayBuffer = subscription.getKey('auth');
    const p256dh = btoa(String.fromCharCode.apply(null, new Uint8Array(keyArrayBuffer)));
    const auth = btoa(String.fromCharCode.apply(null, new Uint8Array(authArrayBuffer)));
    console.log('p256dh key', keyArrayBuffer, p256dh);
    console.log('auth key', authArrayBuffer, auth);
    
    // Paramètres nécessaires à l'objet de notification pushSubscription
    console.log('endpoint :');
    console.dir(subscription.endpoint);
    console.log('p256dh key :', p256dh);
    console.log('auth key :', auth);
}