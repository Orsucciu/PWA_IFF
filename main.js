
console.log('hello da u main');

var map = L.map( 'map', {
    center: [0, 0],
    minZoom: 2,
    zoom: 2
});

L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( map );

	
if(navigator.serviceWorker) {
	// Enregistrement du service worker
    navigator.serviceWorker
    .register('sw.js')

    .then(registration =>{
    
        // tentative d'obtention d'une souscription
        // public vapid key générée par web-push, en prod appel d'api via fetch plutôt que static
        const publicKey = "BDlztZ20vFjfX29BXlkwUDBLkCMwAJsFk3UV8-rWVW_aG1EgAU1tvWOiAnLIlfth5WIlY7vO3Cignm_aLuShNIA";
        registration.pushManager.getSubscription().then(subscription => {
        
            // Déjà une souscription, on l'affiche
            if(subscription){
                console.log("subscription", subscription);
                extractKeysFromArrayBuffer(subscription);
                return subscription;
            }
            
            // Pas de souscription
            else{
                // demande de souscription (clef convertie en buffer pour faire la demande)
                const convertedKey = urlBase64ToUint8Array(publicKey);
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedKey
                })
                .then(newSubscription => {
                    // Affiche le résultat pour vérifier
                    console.log('newSubscription', newSubscription);
                    extractKeysFromArrayBuffer(newSubscription);
                    return newSubscription;
                })

            }
        })
    })
    .catch(err => console.error('service worker NON enregistré', err));
}

navigator.serviceWorker.addEventListener('message', function handler (event) { //gets a message from the sw !
    loadSnaps();
});

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


loadSnaps();
