import { StyleSheet } from "react-native"

const Styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },

  app: {
    // flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.80)",
    backgroundColor: "rgba(71, 70, 70, 0.4)",
    // backgroundColor: "rgba(255, 211, 91, 0.8)",
  },

  autocomplete: {
    // backgroundColor: "rgba(71, 70, 70, 0.4)",
    // color: "red",

    // borderColor: "white",
    // borderWidth: 2,
    // height: 50,
    borderRadius: 15,
    // marginTop: 20,
    color: "white",
    paddingLeft: 10,
    fontSize: 17,
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  autocompleteContainer: {
    // borderColor: "white",
    // borderWidth: 2,
    height: 270,
  },

  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // height: 100,
    flex: 1,
  },

  loaderText: {
    fontFamily: "Nunito_500Medium",
    fontSize: 20,
  },

  appContainer: {
    marginLeft: 25,
    marginRight: 25,
  },

  topBar: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  date_localTimeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  dayDateText: {
    fontFamily: "Nunito_500Medium",
    fontSize: 16,
    color: "white",
  },

  localTimeText: {
    fontFamily: "Nunito_500Medium",
    fontSize: 15,
    color: "white",
  },

  greetingText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    marginTop: 30,
    // color: "#333333",
    color: "white",
  },

  locationInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -10,
    marginBottom: 15,
  },

  locationInfoText: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },

  locationCity: {
    fontFamily: "Nunito_700Bold",
    fontSize: 30,
    textWrap: "nowrap",
    marginTop: 10,
    color: "white",
  },

  locationCountry: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 20,
    textWrap: "nowrap",
    // marginTop: 10,
    color: "white",
  },

  inputCitySearch: {
    borderColor: "white",
    borderWidth: 2,
    height: 50,
    borderRadius: 15,
    // marginTop: 20,
    color: "white",
    paddingLeft: 10,
    fontSize: 17,
  },

  currentWeatherContainer: {
    // alignItems: "center",
    marginLeft: 30,
    marginTop: -25,
    // marginTop: 50,
    marginLeft: -13,
    marginRight: -13,
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 20,
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    gap: 100,
    // borderColor: "red",
    // borderWidth: 3,
    borderBottomColor: "white",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderWidth: 2,
  },

  currentTemp: {
    display: "flex",
    flexDirection: "column",
    gap: -8,
    paddingTop: 20,
    // alignItems: "center",
  },

  currentTempText: {
    fontFamily: "Nunito_500Medium",
    fontSize: 100,
    color: "white",
    marginLeft: -10,
  },

  feelsLikeText: {
    fontFamily: "Nunito_700Bold",
    color: "white",
    fontSize: 16,

    //****TESTING****
    // color: "rgb(82, 88, 100)",
  },

  currentConditions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  currentConditionsText: {
    fontFamily: "Nunito_700Bold",
    color: "white",
    fontSize: 20,

    //****TESTING****
    // color: "rgb(82, 88, 100)",
  },

  lowMaxCurrContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  lowMaxWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // paddingBottom: 20,
    // justifyContent: "center",
  },

  lowMaxText: {
    fontFamily: "Nunito_700Bold",
    color: "white",
    fontSize: 15,

    //****TESTING****
    // color: "rgb(82, 88, 100)",
  },

  currentCondInfos: {
    marginTop: 20,
    marginLeft: -13,

    //****TESTING****
    // backgroundColor: "white",
    // borderRadius: 15,
    // shadowColor: "rgba(0, 0, 0, 0.24)",
    // shadowOffset: { width: 3, height: 8 },
    // shadowOpacity: 0.8,
    // shadowRadius: 3,
  },

  hourlyConditionsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 24,
  },

  hourlyConditionsContainerText: {
    fontFamily: "Nunito_700Bold",
    color: "white",
    fontSize: 18,

    //****TESTING****
    // color: "rgb(82, 88, 100)",
  },

  hourlyConditionsContainerTextTime: {
    fontFamily: "Nunito_700Bold",
    color: "white",
    fontSize: 15,

    //****TESTING****
    // color: "rgb(82, 88, 100)",
  },

  nextDaysForecastContainer: {
    borderBottomColor: "transparent",
    borderTopColor: "#ffffff48",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderWidth: 1,
    marginTop: 20,
    paddingTop: 20,
  },

  forecastTitle: {
    fontFamily: "Nunito_700Bold",
    color: "white",
    fontSize: 15,
    marginBottom: 10,
  },

  scrollViewConditions: {
    // paddingBottom: 30,
    marginBottom: 50,
  },

  forecastContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.288)",
    marginBottom: 15,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    padding: 10,
    alignItems: "center",
  },

  dayOfTheWeek: {
    fontFamily: "Nunito_700Bold",
    color: "white",
    fontSize: 18,
    width: 110,
    marginRight: -60,

    // borderColor: "red",
    // borderWidth: 2,
  },

  lowMaxForecastContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    // width: 100,
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    fontFamily: "Nunito_700Bold",
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },

  versionText: {
    fontFamily: "Nunito_700Bold",
    color: "white",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
  },
})

export { Styles }
