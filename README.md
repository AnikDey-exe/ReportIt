# ReportIt

Report It is a child labor reporting app where users can file reports by inputting the necessary information needed. NGO accounts can view active reports and pursue them. They
can search through reports and view details about them. Both users and NGOs can view report details. NGOs can view all their pursued reports on a map.

## Running the app

Download the file and extract it. You will need to have your react native environment set up, for more information visit https://reactnative.dev/docs/environment-setup. Open 
your terminal and run npm install. 

DISCLAIMER: You will need your own google cloud console map api key, geoapify api key, and your own atlas cluster with realm sync setup. Paste your google cloud console map api key in android/app/src/main/AndroidManifest.xml and in /screens/FileScreen.js in the appropriate places (paste it in the urls that contain map.googleapis.com). Paste your geoapify api key in /screens/FileScreen.js in the appropriate places (paste it in the api.geoapify.com url). Paste your realm app id in each of the files in /database in the spot marked xxxx and in /screens/FileScreen.js and /screens/ReportMapsScreen.js (paste it in the xxxx spot in the Realm.app function).

Once you have followed the directions above, open android studio and in the terminal run, npx react-native run-android.
