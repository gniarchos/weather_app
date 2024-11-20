import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import React, { useEffect, useState } from "react"
import { Styles } from "../Styles.js"
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons"
import Images from "./Images.js"
import appJson from "../app.json"

export default function CurrentWeather(props) {
  const [showFeelsLike, setShowFeelsLike] = useState(false)

  const timePrediction = props.hourlyPredictionTime?.map((time, index) => {
    let timeCondition = (
      <MaterialCommunityIcons name="cloud-question" size={30} color="white" />
    )
    // console.log("=====CODE=====", props.hourlyPredictionCode)
    if (props.hourlyPredictionCode[index] === 0) {
      //clear
      timeCondition =
        props.hourlyIsDay[index] === 1 ? (
          <Ionicons name="sunny" size={30} color="white" />
        ) : (
          <Ionicons name="moon" size={30} color="white" />
        )
    } else if (props.hourlyPredictionCode[index] === 1) {
      //Mainly Clear
      timeCondition =
        props.hourlyIsDay[index] === 1 ? (
          <Ionicons name="sunny" size={30} color="white" />
        ) : (
          <Ionicons name="moon" size={30} color="white" />
        )
    } else if (props.hourlyPredictionCode[index] === 2) {
      //partly sunny
      timeCondition = timeCondition =
        props.hourlyIsDay[index] === 1 ? (
          <Ionicons name="partly-sunny" size={30} color="white" />
        ) : (
          <Ionicons name="cloudy-night-sharp" size={30} color="white" />
        )
    } else if (props.hourlyPredictionCode[index] === 3) {
      //cloudy
      timeCondition = <Entypo name="cloud" size={30} color="white" />
    } else if (
      props.hourlyPredictionCode[index] === 45 ||
      props.hourlyPredictionCode[index] === 48
    ) {
      //fog
      timeCondition = (
        <MaterialCommunityIcons name="weather-fog" size={30} color="white" />
      )
    } else if (
      props.hourlyPredictionCode[index] === 51 ||
      props.hourlyPredictionCode[index] === 53 ||
      props.hourlyPredictionCode[index] === 55 ||
      props.hourlyPredictionCode[index] === 56 ||
      props.hourlyPredictionCode[index] === 57 ||
      props.hourlyPredictionCode[index] === 80 ||
      props.hourlyPredictionCode[index] === 81 ||
      props.hourlyPredictionCode[index] === 82
    ) {
      //drizzle
      timeCondition = <FontAwesome5 name="cloud-rain" size={29} color="white" />
    } else if (
      props.hourlyPredictionCode[index] === 61 ||
      props.hourlyPredictionCode[index] === 63 ||
      props.hourlyPredictionCode[index] === 65 ||
      props.hourlyPredictionCode[index] === 66 ||
      props.hourlyPredictionCode[index] === 67
    ) {
      //rainy
      timeCondition = <Ionicons name="rainy-sharp" size={30} color="white" />
    } else if (
      props.hourlyPredictionCode[index] === 71 ||
      props.hourlyPredictionCode[index] === 73 ||
      props.hourlyPredictionCode[index] === 75 ||
      props.hourlyPredictionCode[index] === 77
    ) {
      //snow
      timeCondition = <Ionicons name="snow" size={30} color="white" />
    } else if (
      props.hourlyPredictionCode[index] === 85 ||
      props.hourlyPredictionCode[index] === 86
    ) {
      //Snow Showers
      timeCondition = <Ionicons name="snow" size={30} color="white" />
    } else if (
      props.hourlyPredictionCode[index] === 95 ||
      props.hourlyPredictionCode[index] === 96 ||
      props.hourlyPredictionCode[index] === 99
    ) {
      //Thunderstorm
      timeCondition = (
        <Ionicons name="ios-thunderstorm" size={30} color="white" />
      )
    }

    if (`${time}:00` <= props.sunrise) {
      if (time === props.sunrise.slice(0, 2)) {
        timeCondition = <Feather name="sunrise" size={30} color="white" />
        time = props.sunrise
      }
    }

    if (`${time}:00` <= props.sunset) {
      if (time === props.sunset.slice(0, 2)) {
        timeCondition = <Feather name="sunset" size={30} color="white" />
        time = props.sunset
      }
    }

    return (
      <View key={index} style={Styles.hourlyConditionsContainer}>
        <Text style={Styles.hourlyConditionsContainerTextTime}>
          {index === 0 ? "Now" : time}
        </Text>
        {timeCondition}
        <Text style={Styles.hourlyConditionsContainerText}>
          {`${props.hourlyPredictionTemp[index]}°`}
        </Text>
      </View>
    )
  })

  const forecast = props.daily?.time.map((day, index) => {
    let timeConditionForecast = (
      <MaterialCommunityIcons name="cloud-question" size={25} color="white" />
    )

    if (props.daily?.weathercode[index] === 0) {
      //clear
      timeConditionForecast = <Ionicons name="sunny" size={25} color="white" />
    } else if (props.daily?.weathercode[index] === 1) {
      //Mainly Clear
      timeConditionForecast = <Ionicons name="sunny" size={25} color="white" />
    } else if (props.daily?.weathercode[index] === 2) {
      //partly sunny
      timeConditionForecast = (
        <Ionicons name="partly-sunny" size={25} color="white" />
      )
    } else if (props.daily?.weathercode[index] === 3) {
      //cloudy
      timeConditionForecast = <Entypo name="cloud" size={25} color="white" />
    } else if (
      props.daily?.weathercode[index] === 45 ||
      props.daily?.weathercode[index] === 48
    ) {
      //fog
      timeConditionForecast = (
        <MaterialCommunityIcons name="weather-fog" size={25} color="white" />
      )
    } else if (
      props.daily?.weathercode[index] === 51 ||
      props.daily?.weathercode[index] === 53 ||
      props.daily?.weathercode[index] === 55 ||
      props.daily?.weathercode[index] === 56 ||
      props.daily?.weathercode[index] === 57 ||
      props.daily?.weathercode[index] === 80 ||
      props.daily?.weathercode[index] === 81 ||
      props.daily?.weathercode[index] === 82
    ) {
      //drizzle
      timeConditionForecast = (
        <FontAwesome5 name="cloud-rain" size={25} color="white" />
      )
    } else if (
      props.daily?.weathercode[index] === 61 ||
      props.daily?.weathercode[index] === 63 ||
      props.daily?.weathercode[index] === 65 ||
      props.daily?.weathercode[index] === 66 ||
      props.daily?.weathercode[index] === 67
    ) {
      //rainy
      timeConditionForecast = (
        <Ionicons name="rainy-sharp" size={25} color="white" />
      )
    } else if (
      props.daily?.weathercode[index] === 71 ||
      props.daily?.weathercode[index] === 73 ||
      props.daily?.weathercode[index] === 75 ||
      props.daily?.weathercode[index] === 77
    ) {
      //snow
      timeCondition = <Ionicons name="snow" size={25} color="white" />
    } else if (
      props.daily?.weathercode[index] === 85 ||
      props.daily?.weathercode[index] === 86
    ) {
      //Snow Showers
      timeConditionForecast = <Ionicons name="snow" size={25} color="white" />
    } else if (
      props.daily?.weathercode[index] === 95 ||
      props.daily?.weathercode[index] === 96 ||
      props.daily?.weathercode[index] === 99
    ) {
      //Thunderstorm
      timeConditionForecast = (
        <Ionicons name="ios-thunderstorm" size={25} color="white" />
      )
    }

    var dt = new Date(day)

    let dayName = ""

    if (dt.getDay() === 0) {
      if (index === 0) {
        dayName = "Today"
      } else {
        dayName = "Sunday"
      }
    } else if (dt.getDay() === 1) {
      if (index === 0) {
        dayName = "Today"
      } else {
        dayName = "Monday"
      }
    } else if (dt.getDay() === 2) {
      if (index === 0) {
        dayName = "Today"
      } else {
        dayName = "Tuesday"
      }
    } else if (dt.getDay() === 3) {
      if (index === 0) {
        dayName = "Today"
      } else {
        dayName = "Wednesday"
      }
    } else if (dt.getDay() === 4) {
      if (index === 0) {
        dayName = "Today"
      } else {
        dayName = "Thursday"
      }
    } else if (dt.getDay() === 5) {
      if (index === 0) {
        dayName = "Today"
      } else {
        dayName = "Friday"
      }
    } else if (dt.getDay() === 6) {
      if (index === 0) {
        dayName = "Today"
      } else {
        dayName = "Saturday"
      }
    }

    return (
      <View style={Styles.forecastContainer}>
        <Text style={Styles.dayOfTheWeek}>{dayName}</Text>
        {timeConditionForecast}
        <Text style={{ marginBottom: -5 }}>
          <View style={Styles.lowMaxForecastContainer}>
            <View style={Styles.lowMaxWrapper}>
              <Ionicons name="caret-down" size={24} color="white" />
              <Text style={Styles.lowMaxText}>
                {Math.round(props.daily.temperature_2m_min[index])}
              </Text>
            </View>
            <View style={Styles.lowMaxWrapper}>
              <Ionicons name="caret-up" size={24} color="white" />
              <Text style={Styles.lowMaxText}>
                {Math.round(props.daily.temperature_2m_max[index])}
              </Text>
            </View>
          </View>
        </Text>
      </View>
    )
  })

  function switchCurrTempFeelsLike() {
    setShowFeelsLike(!showFeelsLike)
  }

  return (
    <View style={{ height: "100%", marginBottom: 10 }}>
      <ScrollView
        style={{ height: "100%", marginBottom: 250 }}
        // style={Styles.scrollViewConditions}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      >
        <View style={Styles.currentWeatherContainer}>
          <View style={Styles.currentTemp}>
            <Text style={Styles.feelsLikeText}>
              {showFeelsLike ? "Feels Like:" : " "}
            </Text>
            <TouchableOpacity
              onPress={switchCurrTempFeelsLike}
              // activeOpacity={1}
            >
              <Text style={Styles.currentTempText}>
                {isNaN(props.currTemp)
                  ? "--"
                  : showFeelsLike
                  ? `${props.hourlyFeelsLike[0]}°C`
                  : `${props.currTemp}°C`}
              </Text>
            </TouchableOpacity>

            <View style={Styles.currentConditions}>
              {props.currConditionImage}
              <Text style={Styles.currentConditionsText}>
                {props.currCondition}
              </Text>
            </View>

            <View style={Styles.lowMaxCurrContainer}>
              <View style={Styles.lowMaxWrapper}>
                {/* <Ionicons name="caret-down" size={24} color="white" /> */}
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="white"
                />
                <Text style={Styles.lowMaxText}>
                  {isNaN(props.lowCurrDayTemp) ? "-" : props.lowCurrDayTemp}
                </Text>
              </View>
              <View style={Styles.lowMaxWrapper}>
                {/* <Ionicons name="caret-up" size={24} color="white" /> */}
                <MaterialIcons
                  name="keyboard-arrow-up"
                  size={24}
                  color="white"
                />
                <Text style={Styles.lowMaxText}>
                  {isNaN(props.maxCurrDayTemp) ? "-" : props.maxCurrDayTemp}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={Styles.currentCondInfos}
        >
          {timePrediction}
        </ScrollView>

        <View style={Styles.nextDaysForecastContainer}>
          <Text style={Styles.forecastTitle}>14 DAYS FORECAST</Text>
          {forecast}
        </View>

        <View style={Styles.footer}>
          <Text style={Styles.footerText}>Powered by:</Text>
          <Image
            style={{ width: 20, height: 20, borderRadius: 5 }}
            source={Images.openMeteo}
          />
          <Text style={Styles.footerText}>Open Meteo API</Text>
        </View>
        <Text style={Styles.versionText}>Version {appJson.expo.version}</Text>
      </ScrollView>
    </View>
  )
}
