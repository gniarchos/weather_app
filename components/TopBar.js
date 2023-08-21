import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import React from "react"
import { Styles } from "../Styles.js"
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons"

export default function TopBar(props) {
  return (
    <View style={Styles.topBar}>
      <AntDesign name="github" size={25} color="white" />
      <View style={Styles.date_localTimeContainer}>
        <Text style={Styles.dayDateText}>
          {props.day !== undefined &&
            `${props.day}, ${props.date} ${props.month}`}
          {/* {props.day}, {props.date} {props.month} */}
        </Text>
        <Text style={Styles.localTimeText}>{props.localTime}</Text>
      </View>

      {!props.isCustomLocation && (
        <TouchableOpacity onPress={props.updateWeather}>
          {!props.loading ? (
            <Ionicons name="ios-reload-sharp" size={25} color="white" />
          ) : (
            <ActivityIndicator size="small" color="#ffffff" />
          )}
        </TouchableOpacity>
      )}

      {props.isCustomLocation && (
        <TouchableOpacity onPress={props.updateWeatherCurrentLocation}>
          {!props.loading ? (
            <FontAwesome name="location-arrow" size={25} color="white" />
          ) : (
            <ActivityIndicator size="small" color="#ffffff" />
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}
