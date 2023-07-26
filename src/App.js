import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";

function App() {
  const [city, setCity] = useState("");

  const [loader, setLoader] = useState(false);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [data, setData] = useState();
  const [weatherData, setWeatherData] = useState();
  const [apikey, setApikey] = useState("a8f7e8e86492753cfe3b7a7ab9b3ea51");

  useEffect(() => {
    getDataFromWeatherAPI();
  }, [lat, lon]);

  useEffect(() => {
    showData();
  }, [data]);

  function getDataFromWeatherAPI() {
    console.log("weather forecast data");
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&cnt=5`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("weather forecast data", data.list);
        setLoader(false);
        setData(data.list);
      })
      .catch((err) => console.log(err));
  }

  function showData() {
    let finalData = [];
    let dateValues = [];
    let updatedArrayOfObjects = [];
    finalData = data?.map((item) => {
      return item.main;
    });

    dateValues = data?.map((item) => {
      formatDate(item.dt_txt);
    });

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      updatedArrayOfObjects = finalData?.map((obj, index) => {
        return { ...obj, date: `${day}/${month}/${year}` };
      });
    }
    setWeatherData(updatedArrayOfObjects);
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  function handleClick() {
    console.log("button clicked!", city);
    if (city !== "") {
      setLoader(true);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("lan and lon data", data);
          setLoader(false);
          setLat(data.coord.lat);
          setLon(data.coord.lon);
        })
        .catch((err) => {
          alert("Please enter valid city name");
          console.log(err);
        });
    } else {
      alert("Please enter city name before searching");
    }
  }

  return (
    <div className="App m-3">
      <div className="row mt-2">
        <div className="col-12 col-md-4">
          <h3 className="pt-2" style={{ color: "orange" }}>
            Weather in your city
          </h3>
        </div>
        <div className="col-12 col-md-4 col-offset-4">
          <div className="row">
            <div className="col-12 col-md mt-3">
              <input type="text" value={city} onChange={handleChange}></input>
            </div>
            <div className="col-12 col-md">
              <button className="btn btn-warning m-3" onClick={handleClick}>
                Search
              </button>
              {loader ? <span className="pt-4">Loading...</span> : ""}
            </div>
          </div>
        </div>
      </div>
      <div>{weatherData ? <DataTable data={weatherData} /> : ""}</div>
    </div>
  );
}

export default App;
