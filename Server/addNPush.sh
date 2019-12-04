#!/bin/bash

lat = $(( ( RANDOM % 40 )  + 1 ));
long = $(( ( RANDOM % 30 )  + 1 ));

curl -X POST -d '{"lat": 42.${lat}, "lng": 9.${long}, "date": 1575406699080, "resource": "1.mp4"}' 'https://pwa-iff-70a4f.firebaseio.com/snaps.json';

node pushServer;
