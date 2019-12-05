#!/bin/bash

#echo "{'lat': 42.$RANDOM, 'lng': 9.$RANDOM, 'date': 1575406699080, 'resource': "1.mp4"}"

curl -X POST -d '{"lat": 42.'$RANDOM', "lng": 9.'$RANDOM', "date": 1575406699080, "resource": "1.mp4"}' 'https://pwa-iff-70a4f.firebaseio.com/snaps.json';

node pushServer;
