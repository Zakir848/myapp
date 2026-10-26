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

export type Categories = {
  id: number;
  name: string;
};

type Header = {
  search: string;
  setSearch: (value: string) => void;
  category: (category: string) => void;
};

const categoriesObject = [
  { id: 1, name: "Meyvələr" },
  { id: 2, name: "Ət məhsulları" },
  { id: 3, name: "Hazır qidalar" },
  { id: 4, name: "Səhər yeməkləri" },
  { id: 5, name: "İçkilər" },
  { id: 6, name: "Tütün məmulatları" },
];

export default function Header({ search, setSearch, category }: Header) {
  const [categories, setCategories] = useState<Categories[]>(categoriesObject);

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
            placeholder="Məhsulu axtarın....  "
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
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => category(item.name)}
          >
            <Text style={styles.textCard}>{item.name}</Text>
          </TouchableOpacity>
        )}
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
    paddingLeft: 5,
    paddingRight: 5,
    gap: 5,
  },

  card: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 5,
  },

  textCard: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
