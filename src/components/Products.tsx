import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type ProductItems = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string | null;
};

type Props = {
  item: ProductItems;
  onAdd: (item: ProductItems) => void;
  handleRemove: () => void;
};

export default function Products({ item, onAdd, handleRemove }: Props) {
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <View key={item.id} style={styles.card}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <MaterialCommunityIcons
            name="image-broken-variant"
            size={45}
            color="black"
          />
          <Text>No Image</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <View style={{ width: "50%" }}>
          <Text style={[styles.text, { fontWeight: "bold" }]}>
            {item.name}{" "}
          </Text>
          <Text style={[styles.text, { fontSize: 22, color: "green" }]}>
            {item.price} $
          </Text>
        </View>
        {quantity == 0 ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#DFF7D9",
              padding: 5,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 25,
            }}
            onPress={() => onAdd(item)}
          >
            <MaterialCommunityIcons name="cart" size={22} />
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => setQuantity(quantity - 1)}>
              <MaterialCommunityIcons
                name="minus-circle"
                size={22}
                color="red"
              />
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Ionicons name="add-circle" size={22} color="green" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 125,
    objectFit: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  noImage: {
    width: "100%",
    height: 125,
    objectFit: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bcbcbc",
  },
  card: {
    width: "50%",
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    boxShadow: "0px 0px 12px rgba(0,0,0,0.15)",
  },
  text: {
    fontWeight: "bold",
  },
  textContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  quantityContainer: {
    position: "absolute",
    left: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginRight: 15,
  },
  quantityBtnIcon: {},
  quantityBtn: {},
});
