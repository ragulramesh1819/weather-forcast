import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import searchlogo from './assest/seo.png';
import rainy from './assest/rainy.png';
import humimg from './assest/humididty-removebg-preview.png';
import windimg from './assest//wind-removebg-preview.png';
import cloud from './assest/rainandmoon.png'
import rain from './assest/rainy.png';
import snow from './assest/snow.png';
import sun from './assest/clear weather.jpg';
// import 
// const handlecity=(e)=>{
//   setLocation(e.target.value);
// }
const Weatherdetails= ({image,loc,con,temp,lat,long,hum,wind})=>{
  return (
    <>
    <div className="picture">
        <img id= "weather-img" src={image} alt="" />
    </div>
    <div className="location" >
    <h1>{temp}°C</h1>
      <h2 id="loc">{loc}</h2>
      <h2>{con}</h2>
    </div>
    <div className="latlong">
      <div className="lat">
        <span>lattitude</span>
        <span>{lat}</span>
      </div>
      <div className="long">
      <span>longitude</span> 
        <span>{long}</span>
      </div>
    </div>
    <div className="humwind">
      <div className="hum">
        <img id="humimg" src={humimg} alt="" />
        <h4>{hum}%</h4>
        <span>Humidity</span>
      </div>
      <div className="wind">
        <img id="humimg"src={windimg} alt="" />
        <h4>{wind}km/h</h4>
        <span> Wind Speed</span>
       
      </div>
    </div>
    <h4 id="opc">Art by RAGUL</h4>
    </> 
  );

}

function App() {
  const [weatherimg,setWeatherimg]=useState(cloud);
  const [text,setText]=useState("");
  const [location,setLocation]=useState();
  const [temp,setTemp]=useState(0);
  const [country,setCountry]=useState();
  const [lattitude,setLattitude]=useState(0);
  const [longitude,setLongitude]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);
  const [citynotfound,setCitynotfound]=useState(false);
  const [loading,setLoading]=useState(false);

  const getdata =async()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=a09e5746adb44f11103306e99cca9894&units=metric`;
    try{
      let res=await fetch(url);
      let data=await res.json();
      console.log(data);
      if(data.cod =="404"){
      setCitynotfound(true);
      setLoading(true);
      setLocation("CITY NOT FOUND")
      setTemp()
      setCountry()
      setLattitude()
      setLongitude()
      setHumidity();
      setWind();
      return;
      }
      else{
        setLocation(data.name)
        setTemp(data.main.temp)
        setCountry(data.sys.country)
        setLattitude(data.coord.lat)
        setLongitude(data.coord.lon)
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        let d=data.weather[0].main;
        console.log(d);
        if(d=='Sun'){
          setWeatherimg(sun);
        }
        else if(d=='Mist'){
          setWeatherimg(snow);
        }
        else if(d=='Rain'){
          setWeatherimg(rain);
        }
        else if(d=='Clouds'){
          setWeatherimg(cloud);
        }
        // console.log(data);
      }
     
    }catch(error)
    {
      // console.error("An error occuerd :",error.message);
     
      setLocation("CITY NOT FOUND")
      setTemp()
      setCountry()
      setLattitude()
      setLongitude()
      setHumidity();
      setWind();
      alert("enter the valid location");
      // console.log(data);
      
    }finally{
      setLoading(false);
    }
  }
  const newcity=(e)=>{
    setText(e.target.value);
  };
  const keydown=(e)=>{
    if(e.key==="Enter")
      {
        getdata();
      }
  }
  return (
      <div className="dup-body">
        <div className="tot-box">
        <div className="input-box">
          <input id="inp" type="text" placeholder="   SEARCH   " onChange={newcity} value={text} onKeyDown={keydown}/>
              <div className="search">
                      <img id="search-logo" src={searchlogo} alt="search"  onClick={getdata}/>
              </div>
        </div>
        <Weatherdetails image={weatherimg} loc={location} con={country} temp={temp} lat={lattitude} long={longitude} hum={humidity} wind={wind}/>
        </div>
      </div>
  );
}

export default App;
