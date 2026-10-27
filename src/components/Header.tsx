import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Categories = {
  id: number;
  name: string;
};

type Header = {
  search: string;
  setSearch: (value: string) => void;
  setSelect: (value: string) => void;
  categoriesObject: Categories[]
};



export default function Header({categoriesObject, search, setSearch, setSelect }: Header) {
  const [categories, setCategories] = useState<Categories[]>(categoriesObject);
  const [activeCategory, setActiveCategory] = useState<string>("Hamısı");

  const handleSelectCategory = (name: string) => {
    setActiveCategory(name);

    setSelect(name === "Hamısı" ? "" : name);
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons name="cart" size={25} color="#fff" />
          <Text style={styles.headerText}>Mobile Market App Store</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 50,
            paddingLeft: 10,
            paddingRight: 5,
            borderWidth: 1,
          }}
        >
          <Ionicons name="search" size={22} />
          <TextInput
            placeholder="Məhsulu axtarın...."
            onChangeText={setSearch}
            value={search}
            style={{
              width: "90%",
              paddingLeft: 10,
            }}
          />
        </View>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isActive = activeCategory === item.name;
          return (
            <TouchableOpacity
              style={[styles.card, isActive && styles.activeCard]}
              onPress={() => handleSelectCategory(item.name)}
            >
              {isActive && (
                <Ionicons name="checkmark" size={22} color="#ffffff" />
              )}
              <Text style={[styles.textCard, isActive && styles.activeText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
  },

  header: {
    width: "100%",
    marginBottom: 10,
    paddingTop: 45,
    paddingBottom: 10,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#59C923",
    gap: 5,
  },

  headerText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },

  listContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingBottom: 5,
    gap: 5,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 5,
  },

  textCard: {
    fontSize: 13,
    fontWeight: "600",
    color: "#526458",
  },

  activeCard: {
    backgroundColor: "#237B29",
    borderColor: "#237B29",
    alignItems: "center",
    gap: 5,
  },

  activeText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
