import { StatusBar } from "expo-status-bar"
import { SafeAreaView, View, ImageBackground, Image, Text } from "react-native"
import LocationBar from "./components/LocationBar"
import TopBar from "./components/TopBar"
import Images from "./components/Images.js"
import * as Location from "expo-location"
import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light_Italic,
  Nunito_400Regular_Italic,
  Nunito_500Medium_Italic,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black_Italic,
} from "@expo-google-fonts/nunito"
import { useState, useEffect } from "react"
import { Styles } from "./Styles.js"
import Greeting from "./components/Greeting"
import CurrentWeather from "./components/CurrentWeather"
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons"

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light_Italic,
    Nunito_400Regular_Italic,
    Nunito_500Medium_Italic,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black_Italic,
  })

  const [location, setLocation] = useState()
  const [yourLocation, setYourLocation] = useState([])
  const [apiData, setApiData] = useState({})
  const [update, setUpdate] = useState(true)
  const [date, setDate] = useState()
  const [month, setMonth] = useState()
  const [hours, setHours] = useState()
  const [dayName, setDayName] = useState()
  const [currCondition, setCurrCondition] = useState("--")
  const [currConditionImage, setCurrConditionImage] = useState(
    <MaterialCommunityIcons name="cloud-question" size={30} color="white" />
  )
  const [weatherBackground, setWeatherBackground] = useState(
    Images.clear_day_bg
  )
  const [hourlyPredictionTime, setHourlyPredictionTime] = useState([])
  const [hourlyPredictionTemp, setHourlyPredictionTemp] = useState([])
  const [hourlyPredictionCode, setHourlyPredictionCode] = useState([])
  const [hourlyIsDay, setHourlyIsDay] = useState([])
  const [hourlyFeelsLike, setHourlyFeelsLike] = useState([])
  const [loading, setLoading] = useState(true)
  const [sunrise, setSunrise] = useState()
  const [sunset, setSunset] = useState()
  const [isCustomLocation, setIsCustomLocation] = useState(false)
  const [customLong, setCustomLong] = useState()
  const [customLat, setCustomLat] = useState()

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        console.log("Please grant location permissions")
        return
      }

      if (!isCustomLocation) {
        let currentLocation = await Location.getCurrentPositionAsync({})
        setLocation(currentLocation)
      } else {
        setLocation()
      }
    }

    getPermissions()
    setHourlyPredictionTime([])
    setHourlyPredictionTemp([])
    setHourlyPredictionCode([])
    setCurrCondition("--")
    setCurrConditionImage(
      <MaterialCommunityIcons name="cloud-question" size={30} color="white" />
    )
    setHourlyFeelsLike([])
  }, [update])

  useEffect(() => {
    const reverseGeocode = async () => {
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: location?.coords?.longitude
          ? location?.coords?.longitude
          : null,
        latitude: location?.coords?.latitude
          ? location?.coords?.latitude
          : null,
      })

      setYourLocation(reverseGeocodedAddress)
    }

    if (isCustomLocation === true) {
      console.log("LAT - LON", customLat, customLong)
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${
          customLat ? customLat : null
        }&longitude=${
          customLong ? customLong : null
        }&hourly=temperature_2m,apparent_temperature,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&forecast_days=14&timezone=auto`
      )
        .then((res) => res.json())
        .then((data) => {
          setApiData(data)
        })
    } else {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${
          location?.coords?.latitude ? location?.coords?.latitude : null
        }&longitude=${
          location?.coords?.longitude ? location?.coords?.longitude : null
        }&hourly=temperature_2m,apparent_temperature,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&forecast_days=14&timezone=auto`
      )
        .then((res) => res.json())
        .then((data) => {
          setApiData(data)
        })
    }

    reverseGeocode()

    setDate(new Date().getDate())
    setMonth(new Date().getMonth() + 1)
    setHours(new Date().getHours())

    var d = new Date(date)

    setDayName(days[d.getDate()])
  }, [location, isCustomLocation])

  function updateWeather() {
    setUpdate(!update)
    setLoading(true)
  }

  function updateWeatherCurrentLocation() {
    setIsCustomLocation(false)
    setYourLocation([])
    updateWeather()
  }

  useEffect(() => {
    if (apiData?.current_weather?.weathercode === 0) {
      setCurrCondition("Clear Sky")
      setCurrConditionImage(
        hourlyIsDay[0] === 1 ? (
          <Ionicons name="sunny" size={30} color="white" />
        ) : (
          <Ionicons name="moon" size={30} color="white" />
        )
      )
      if ((hours >= 21 && hours < 24) || (hours >= 0 && hours < 6)) {
        setWeatherBackground(Images.clear_night_bg)
      } else {
        setWeatherBackground(Images.clear_day_bg)
      }
    } else if (apiData?.current_weather?.weathercode === 1) {
      setCurrCondition("Mainly Clear")
      setCurrConditionImage(
        hourlyIsDay[0] === 1 ? (
          <Ionicons name="sunny" size={30} color="white" />
        ) : (
          <Ionicons name="moon" size={30} color="white" />
        )
      )
      if ((hours >= 21 && hours < 24) || (hours >= 0 && hours < 6)) {
        setWeatherBackground(Images.clear_night_bg)
      } else {
        setWeatherBackground(Images.clear_day_bg)
      }
    } else if (apiData?.current_weather?.weathercode === 2) {
      setCurrCondition("Partly Cloudy")
      setCurrConditionImage(
        hourlyIsDay[0] === 1 ? (
          <Ionicons name="partly-sunny" size={30} color="white" />
        ) : (
          <Ionicons name="cloudy-night-sharp" size={30} color="white" />
        )
      )
      if ((hours >= 21 && hours < 24) || (hours >= 0 && hours < 6)) {
        setWeatherBackground(Images.moon_cloudy_bg)
      } else {
        setWeatherBackground(Images.day_cloudy_bg)
      }
    } else if (apiData?.current_weather?.weathercode === 3) {
      setCurrCondition("Cloudy")
      setCurrConditionImage(<Entypo name="cloud" size={30} color="white" />)
      setWeatherBackground(Images.clouds_bg)
    } else if (
      apiData?.current_weather?.weathercode === 45 ||
      apiData?.current_weather?.weathercode === 48
    ) {
      setCurrCondition("Foggy")
      setCurrConditionImage(
        <MaterialCommunityIcons name="weather-fog" size={30} color="white" />
      )
      setWeatherBackground(Images.foggy_bg)
    } else if (
      apiData?.current_weather?.weathercode === 51 ||
      apiData?.current_weather?.weathercode === 53 ||
      apiData?.current_weather?.weathercode === 55 ||
      apiData?.current_weather?.weathercode === 56 ||
      apiData?.current_weather?.weathercode === 57 ||
      apiData?.current_weather?.weathercode === 80 ||
      apiData?.current_weather?.weathercode === 81 ||
      apiData?.current_weather?.weathercode === 82
    ) {
      setCurrCondition("Drizzle")
      setCurrConditionImage(
        <FontAwesome5 name="cloud-rain" size={29} color="white" />
      )
      setWeatherBackground(Images.drizzle_bg)
    } else if (
      apiData?.current_weather?.weathercode === 61 ||
      apiData?.current_weather?.weathercode === 63 ||
      apiData?.current_weather?.weathercode === 65 ||
      apiData?.current_weather?.weathercode === 66 ||
      apiData?.current_weather?.weathercode === 67
    ) {
      setCurrCondition("Rain")
      setCurrConditionImage(
        <Ionicons name="rainy-sharp" size={30} color="white" />
      )
      setWeatherBackground(Images.rainy_bg)
    } else if (
      apiData?.current_weather?.weathercode === 71 ||
      apiData?.current_weather?.weathercode === 73 ||
      apiData?.current_weather?.weathercode === 75 ||
      apiData?.current_weather?.weathercode === 77
    ) {
      setCurrCondition("Snow")
      setCurrConditionImage(<Ionicons name="snow" size={30} color="white" />)
      setWeatherBackground(Images.snow_bg)
    } else if (
      apiData?.current_weather?.weathercode === 85 ||
      apiData?.current_weather?.weathercode === 86
    ) {
      setCurrCondition("Snow Showers")
      setCurrConditionImage(<Ionicons name="snow" size={30} color="white" />)
      setWeatherBackground(Images.snow_bg)
    } else if (
      apiData?.current_weather?.weathercode === 95 ||
      apiData?.current_weather?.weathercode === 96 ||
      apiData?.current_weather?.weathercode === 99
    ) {
      setCurrCondition("Thunderstorm")
      setCurrConditionImage(
        <Ionicons name="ios-thunderstorm" size={30} color="white" />
      )
      setWeatherBackground(Images.thunderstorm_bg)
    }

    let counter = 0
    apiData.hourly?.time.slice(0, 23).map((timeOfDay) => {
      if (
        apiData.current_weather?.time.slice(-5).slice(0, 2) >=
        timeOfDay.slice(-5).slice(0, 2)
      ) {
        counter++
      }
    })

    apiData.hourly?.time.slice(counter - 1, 24 + counter).map((timeOfDay) => {
      setHourlyPredictionTime((prevData) => {
        return [...prevData, timeOfDay.slice(-5).slice(0, 2)]
      })
    })

    apiData.hourly?.temperature_2m
      .slice(counter - 1, 24 + counter)
      .map((timeTemperature) => {
        setHourlyPredictionTemp((prevData) => {
          return [...prevData, parseInt(timeTemperature)]
        })
      })

    apiData.hourly?.weathercode
      .slice(counter - 1, 24 + counter)
      .map((timeWeatherCode) => {
        setHourlyPredictionCode((prevData) => {
          return [...prevData, parseInt(timeWeatherCode)]
        })
      })

    apiData.hourly?.is_day.slice(counter - 1, 24 + counter).map((isDay) => {
      setHourlyIsDay((prevData) => {
        return [...prevData, isDay]
      })
    })

    apiData.hourly?.apparent_temperature
      .slice(counter - 1, 24 + counter)
      .map((feelsLike) => {
        setHourlyFeelsLike((prevData) => {
          return [...prevData, parseInt(feelsLike)]
        })
      })

    setSunrise(apiData.daily?.sunrise[0].slice(-5))
    setSunset(apiData.daily?.sunset[0].slice(-5))

    setLoading(false)
  }, [apiData])

  useEffect(() => {
    if (apiData?.current_weather?.weathercode === 0) {
      setCurrCondition("Clear Sky")
      setCurrConditionImage(
        hourlyIsDay[0] === 1 ? (
          <Ionicons name="sunny" size={30} color="white" />
        ) : (
          <Ionicons name="moon" size={30} color="white" />
        )
      )
      if ((hours >= 21 && hours < 24) || (hours >= 0 && hours < 6)) {
        setWeatherBackground(Images.clear_night_bg)
      } else {
        setWeatherBackground(Images.clear_day_bg)
      }
    } else if (apiData?.current_weather?.weathercode === 1) {
      setCurrCondition("Mainly Clear")
      setCurrConditionImage(
        hourlyIsDay[0] === 1 ? (
          <Ionicons name="sunny" size={30} color="white" />
        ) : (
          <Ionicons name="moon" size={30} color="white" />
        )
      )
      if ((hours >= 21 && hours < 24) || (hours >= 0 && hours < 6)) {
        setWeatherBackground(Images.clear_night_bg)
      } else {
        setWeatherBackground(Images.clear_day_bg)
      }
    } else if (apiData?.current_weather?.weathercode === 2) {
      setCurrCondition("Partly Cloudy")
      setCurrConditionImage(
        hourlyIsDay[0] === 1 ? (
          <Ionicons name="partly-sunny" size={30} color="white" />
        ) : (
          <Ionicons name="cloudy-night-sharp" size={30} color="white" />
        )
      )
      if ((hours >= 21 && hours < 24) || (hours >= 0 && hours < 6)) {
        setWeatherBackground(Images.moon_cloudy_bg)
      } else {
        setWeatherBackground(Images.day_cloudy_bg)
      }
    } else if (apiData?.current_weather?.weathercode === 3) {
      setCurrCondition("Cloudy")
      setCurrConditionImage(<Entypo name="cloud" size={30} color="white" />)
      setWeatherBackground(Images.clouds_bg)
    } else if (
      apiData?.current_weather?.weathercode === 45 ||
      apiData?.current_weather?.weathercode === 48
    ) {
      setCurrCondition("Foggy")
      setCurrConditionImage(
        <MaterialCommunityIcons name="weather-fog" size={30} color="white" />
      )
      setWeatherBackground(Images.foggy_bg)
    } else if (
      apiData?.current_weather?.weathercode === 51 ||
      apiData?.current_weather?.weathercode === 53 ||
      apiData?.current_weather?.weathercode === 55 ||
      apiData?.current_weather?.weathercode === 56 ||
      apiData?.current_weather?.weathercode === 57 ||
      apiData?.current_weather?.weathercode === 80 ||
      apiData?.current_weather?.weathercode === 81 ||
      apiData?.current_weather?.weathercode === 82
    ) {
      setCurrCondition("Drizzle")
      setCurrConditionImage(
        <FontAwesome5 name="cloud-rain" size={29} color="white" />
      )
      setWeatherBackground(Images.drizzle_bg)
    } else if (
      apiData?.current_weather?.weathercode === 61 ||
      apiData?.current_weather?.weathercode === 63 ||
      apiData?.current_weather?.weathercode === 65 ||
      apiData?.current_weather?.weathercode === 66 ||
      apiData?.current_weather?.weathercode === 67
    ) {
      setCurrCondition("Rain")
      setCurrConditionImage(
        <Ionicons name="rainy-sharp" size={30} color="white" />
      )
      setWeatherBackground(Images.rainy_bg)
    } else if (
      apiData?.current_weather?.weathercode === 71 ||
      apiData?.current_weather?.weathercode === 73 ||
      apiData?.current_weather?.weathercode === 75 ||
      apiData?.current_weather?.weathercode === 77
    ) {
      setCurrCondition("Snow")
      setCurrConditionImage(<Ionicons name="snow" size={30} color="white" />)
      setWeatherBackground(Images.snow_bg)
    } else if (
      apiData?.current_weather?.weathercode === 85 ||
      apiData?.current_weather?.weathercode === 86
    ) {
      setCurrCondition("Snow Showers")
      setCurrConditionImage(<Ionicons name="snow" size={30} color="white" />)
      setWeatherBackground(Images.snow_bg)
    } else if (
      apiData?.current_weather?.weathercode === 95 ||
      apiData?.current_weather?.weathercode === 96 ||
      apiData?.current_weather?.weathercode === 99
    ) {
      setCurrCondition("Thunderstorm")
      setCurrConditionImage(
        <Ionicons name="ios-thunderstorm" size={30} color="white" />
      )
      setWeatherBackground(Images.thunderstorm_bg)
    }
  }, [hourlyIsDay])

  function findNewCityData(selection) {
    // console.log(selection)
    setIsCustomLocation(false)

    if (selection !== null) {
      var cityCountryArray = selection.title.split(", ")
      // console.log("ARRAY", cityCountryArray)
    }

    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${
        cityCountryArray === undefined ? "" : cityCountryArray[0]
      }&count=10&language=en&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        data?.results.map((rslt) => {
          if (rslt.id === selection.id) {
            // console.log(rslt)
            setCustomLong(rslt.longitude)
            setCustomLat(rslt.latitude)
            setIsCustomLocation(true)
            setUpdate(!update)
          }
        })
      })
  }

  var days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]
  var allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  if (!fontsLoaded) {
    return (
      <ImageBackground
        source={weatherBackground}
        resizeMode="cover"
        style={Styles.linearGradient}
      >
        <SafeAreaView style={Styles.app}>
          <View style={Styles.loader}>
            <Image
              source={{
                uri: "https://media.giphy.com/media/jYmSnD6aWP477A336n/giphy.gif",
              }}
              style={{ width: 300, height: 200 }}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  } else {
    return (
      <ImageBackground
        source={weatherBackground}
        resizeMode="cover"
        style={Styles.linearGradient}
      >
        <SafeAreaView style={Styles.app}>
          <View style={Styles.appContainer}>
            <View style={Styles.container}>
              <StatusBar style="light" />
              <TopBar
                day={dayName}
                date={date}
                month={allMonths[month - 1]}
                updateWeather={updateWeather}
                localTime={
                  apiData?.current_weather?.time !== undefined &&
                  (apiData?.current_weather?.time).slice(-5)
                }
                loading={loading}
                isCustomLocation={isCustomLocation}
                updateWeatherCurrentLocation={updateWeatherCurrentLocation}
              />
              <Greeting
                hour={hours}
                city={
                  yourLocation.length === 0
                    ? "Please wait"
                    : yourLocation[0]?.city === null
                    ? yourLocation[0]?.name
                    : yourLocation[0]?.city
                }
                country={
                  yourLocation.length === 0
                    ? "is locating you..."
                    : yourLocation[0]?.country
                }
                region={
                  yourLocation.length === 0
                    ? "The app"
                    : yourLocation[0]?.region
                }
                findNewCityData={findNewCityData}
              />
              <CurrentWeather
                currTemp={
                  loading
                    ? "--"
                    : parseInt(apiData?.current_weather?.temperature)
                }
                currCondition={currCondition}
                currConditionImage={currConditionImage}
                localTime={apiData?.current_weather?.time}
                lowCurrDayTemp={
                  loading
                    ? "-"
                    : Math.round(apiData?.daily?.temperature_2m_min[0])
                }
                maxCurrDayTemp={
                  loading
                    ? "-"
                    : Math.round(apiData?.daily?.temperature_2m_max[0])
                }
                hourlyPredictionTime={hourlyPredictionTime}
                hourlyPredictionTemp={hourlyPredictionTemp}
                hourlyPredictionCode={hourlyPredictionCode}
                hourlyIsDay={hourlyIsDay}
                hourlyFeelsLike={hourlyFeelsLike}
                sunrise={sunrise}
                sunset={sunset}
                loading={loading}
                daily={apiData?.daily}
                days={days}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}
