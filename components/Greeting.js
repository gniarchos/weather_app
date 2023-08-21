import { View, Text } from "react-native"
import React, { useEffect, useState, useRef } from "react"
import { Styles } from "../Styles.js"
import { Entypo } from "@expo/vector-icons"
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown"

export default function Greeting(props) {
  const [greetingMessage, setGreetingMessage] = useState()
  const [searchInput, setSearchInput] = useState("")
  const [apiSearchData, setApiSearchData] = useState({})
  const [runApi, setRunApi] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState([])
  const dropdownController = useRef(null)
  const [cityCountry, setCityCountry] = useState(["--"])

  useEffect(() => {
    if (props.hour >= 12 && props.hour < 21) {
      setGreetingMessage("Good Evening!")
    } else if (props.hour >= 21) {
      setGreetingMessage("Good Night!")
    } else {
      setGreetingMessage("Good Morning!")
    }
    dropdownController.current.clear()

    setCityCountry([`${props.city}`, `${props.region}`, `${props.country}`])
  }, [props.city])

  const [selectedItem, setSelectedItem] = useState(null)

  async function runApiSearch(value) {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=10&language=en&format=json`
    )
    const items = await response.json()
    const suggestions = items.results
      .filter((item) => item.name.includes(value))
      .map((item) => ({
        id: item.id,
        title:
          item.admin2 !== undefined
            ? item.country !== undefined
              ? `${item.name}, ${item.admin1}, ${item.country}`
              : `${item.name}, ${item.country}`
            : item.country !== undefined
            ? `${item.name}, ${item.country}`
            : `${item.name}`,
      }))
    setSuggestionsList(suggestions)
  }

  function clearSuggestionsList() {
    setSuggestionsList(null)
  }

  useEffect(() => {
    if (selectedItem !== null) {
      props.findNewCityData(selectedItem)
      const cityArray = selectedItem.title.split(", ")
      setCityCountry(cityArray)
      setRunApi(true)
      dropdownController.current.clear()
    }
    clearSuggestionsList()
  }, [selectedItem])

  return (
    <View>
      <Text style={Styles.greetingText}>{greetingMessage}</Text>
      <View style={Styles.locationInfoContainer}>
        <Entypo name="location-pin" size={50} color="white" />
        <View style={Styles.locationInfoText}>
          <Text style={Styles.locationCity}>{cityCountry[0]}</Text>
          <Text style={Styles.locationCountry}>
            {cityCountry[1] !== undefined
              ? cityCountry[2] !== undefined
                ? `${cityCountry[1]}, ${cityCountry[2]}`
                : `${cityCountry[1]}`
              : " "}
          </Text>
        </View>
      </View>
      <View style={Styles.autocompleteContainer}>
        <AutocompleteDropdown
          inputContainerStyle={Styles.autocomplete}
          clearOnFocus={true}
          closeOnBlur={true}
          closeOnSubmit={false}
          useFilter={false}
          dataSet={suggestionsList}
          textInputProps={{
            placeholder: "Search a city",
            keyboardType: "web-search",
            style: {
              color: "white",
            },
          }}
          onChangeText={(value) => runApiSearch(value)}
          onClear={clearSuggestionsList}
          onSelectItem={setSelectedItem}
          showClear={false}
          controller={(controller) => {
            dropdownController.current = controller
          }}
        />
      </View>
    </View>
  )
}
