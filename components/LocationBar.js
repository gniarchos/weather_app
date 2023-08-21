import { View, Text } from "react-native"
import React from "react"
import { Styles } from "../Styles.js"

export default function LocationBar(props) {
  // console.log("RECIEVED:", props.city[0].city)
  return (
    <View>
      {/* {props.city === "Loading..." ? (
        <Text style={Styles.logoTitle}>
          Loading...
        </Text>
      ) : (
        <Text style={Styles.logoTitle}>
          {props.city}, {props.country}
        </Text>
      )} */}
    </View>
  )
}
