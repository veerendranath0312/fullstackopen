# Countries

In this exercise, we create an application, in which one can look at data of various countries. The countries data will be fetched from `https://studies.cs.helsinki.fi/restcountries/api/all`, that provides a lot data for different countries in a machine readable format, a so-called REST API.

The user interface is very simple and below are the features of the application.

- The country to be shown is found by typing a search query into the search field.
- If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific.
- If there are ten or fewer countries, but more than one, then all countries matching the query are shown along with a button next to the name of the country, which when pressed shows the view for that country.
- When there is only one country matching the query, then the basic data of the country (eg. capital and area), its flag and the languages spoken, the weather data of the country's capital are shown.
- The weather data will be fetched from `https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}`

## Start the application

To start an application, do the following :

```bash
# Install dependancies
$ yarn install

# create a .env.local file and put the API KEY to retrieve weather data
$ echo "VITE_OPENWEATHER_API_KEY=<YOUR-API-KEY>" > .env.local

# Start the application
$ yarn run dev
```

You can then access the app on : [http://localhost:5173/](http://localhost:5173/)
