import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";
import Table from "./Components/Table";
import LineGraph from "./Components/LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countryData, setCountryData] = useState([]);

  function numberWithCommas(x) {
    if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return x;
  }

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((data) => data.json())
      .then((data) => setCountryInfo(data));
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        var countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));

        countries = countries.filter((c) => c.value !== null);

        setCountries(countries);
        setCountryData(data);
      });
  }, []);

  const onCountryChange = async (countryCode) => {
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl>
            <Select
              variant="outlined"
              value={country}
              onChange={(e) => onCountryChange(e.target.value)}
            >
              <MenuItem value={"worldwide"}>worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={numberWithCommas(countryInfo.todayCases)}
            total={numberWithCommas(countryInfo.cases)}
          />
          <InfoBox
            title="Recovered"
            cases={numberWithCommas(countryInfo.todayRecovered)}
            total={numberWithCommas(countryInfo.recovered)}
          />
          <InfoBox
            title="Deaths"
            cases={numberWithCommas(countryInfo.todayDeaths)}
            total={numberWithCommas(countryInfo.deaths)}
          />
        </div>

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table data={countryData} />
          <h3>Worldwide new cases</h3>
          {/* Graph */}
          <LineGraph casesType="cases" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
