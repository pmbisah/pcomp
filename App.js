import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function PriceComparisonApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get("https://api.example.com/prices", {
        params: { query: searchQuery, lat: location?.latitude, lon: location?.longitude },
      });
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-2">Find the Best Prices Near You</Text>
      <TextInput
        className="border p-2 rounded-lg w-full mb-2"
        placeholder="Search for an item..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button onClick={handleSearch}>Search</Button>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card>
            <CardContent>
              <Text className="font-bold">{item.name}</Text>
              <Text>Price: ${item.price}</Text>
              <Text>Store: {item.store}</Text>
            </CardContent>
          </Card>
        )}
      />
      <TouchableOpacity className="mt-4 p-2 bg-blue-500 rounded-lg" onPress={pickImage}>
        <Text className="text-white text-center">Upload Receipt</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} className="mt-4 w-full h-40" />}
    </View>
  );
}
