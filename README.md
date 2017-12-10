# Xmaaps

Xmaaps is an open-source web application written in React.js where all the location in the .csv file can be marked on the google map.

#  Installation
1. Download or clone the repository
2. Open the folder in command prompt or terminal
3. run npm install (to download all the modules)
4. Make sure you have install [CORS extension](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) and enable it

# Run
1. run npm start
2. Make sure you run localhost:3000 or it will show authentication problem in console
3. Their is default Hamilton waterfall map, below it their is upload button
4. Click upload button and select a .csv data which has Name, long and latitude of the locations
5. You will see the table after you upload the data
6. Select the Name, long and latitude column in order and click submit
7. You will see the google map below the table, with all the marker
8. Click on the marker, too see more details about the location. Which would be below the google map

# Data Tested
1. [Hamiton Waterfall](http://opendata.hamilton.ca/CSV/CITY_WATERFALLS.csv)
2. [Hamilton Beaches](http://opendata.hamilton.ca/CSV/BEACHES.csv)

# Coming
1. User can manually enter the data and make the list of the locations to be marked on the map
2. Different type of markers can be used instead of the default

# !This application will be updated quite often!
