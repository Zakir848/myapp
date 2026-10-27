import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
  quantity: number;
  isPortrait: boolean;
  onAdd: (item: ProductItems) => void;
  handleRemove: (item: number) => void;
  handleRemoveProduct: (id: number) => void;
};

export default function Products({
  item,
  quantity,
  onAdd,
  handleRemove,
  handleRemoveProduct,
  isPortrait,
}: Props) {
  return (
    <View style={[styles.card, { width: isPortrait ? "48.5%" : "24%" }]}>
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noImage}>
            <MaterialCommunityIcons
              name="image-outline"
              size={42}
              color="#A9B9A7"
            />

            <Text style={styles.noImageText}>Şəkil yoxdur</Text>
          </View>
        )}
        <View
          style={[
            styles.categoryBadgeContainer,
            { width: "100%", flexDirection: "row" },
          ]}
        >
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText} numberOfLines={1}>
              {item.category}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{ backgroundColor: "#ccc", borderRadius: 50, padding: 5 }}
              onPress={() => handleRemoveProduct(item.id)}
            >
              <MaterialCommunityIcons name="delete" size={18} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price.toFixed(2)}</Text>

          <Text style={styles.currency}>$</Text>
        </View>

        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={() => onAdd(item)}
          >
            <MaterialCommunityIcons
              name="cart-plus"
              size={20}
              color="#237B29"
            />

            <Text style={styles.addButtonText}>Səbətə əlavə et</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              activeOpacity={0.7}
              onPress={() => handleRemove(item.id)}
            >
              <Ionicons name="remove" size={20} color="#237B29" />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButtonActive}
              activeOpacity={0.7}
              onPress={() => onAdd(item)}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d3d3d3",

    shadowColor: "#1D5026",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 3,
  },

  imageContainer: {
    width: "100%",
    height: 145,
    position: "relative",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    overflow: "hidden",
    backgroundColor: "#F1F7EF",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  noImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F7EF",
    gap: 6,
  },

  noImageText: {
    fontSize: 11,
    color: "#9AAA99",
    fontWeight: "500",
  },

  categoryBadgeContainer: {
    position: "absolute",
    top: 10,
    left: 9,
    maxWidth: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
  },

  categoryBadge: {
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
  },

  categoryText: {
    fontSize: 10,
    color: "#237B29",
    fontWeight: "700",
  },

  content: {
    paddingHorizontal: 12,
    paddingTop: 13,
    paddingBottom: 13,
    gap: 11,
  },

  productName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#24352A",
    lineHeight: 20,
    minHeight: 40,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },

  price: {
    fontSize: 22,
    fontWeight: "800",
    color: "#23953C",
    letterSpacing: -0.6,
  },

  currency: {
    fontSize: 14,
    fontWeight: "700",
    color: "#23953C",
  },

  addButton: {
    width: "100%",
    minHeight: 43,
    backgroundColor: "#E8F7E5",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    gap: 5,
  },

  addButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#237B29",
    flexShrink: 1,
  },

  quantityContainer: {
    width: "100%",
    height: 43,
    backgroundColor: "#F0F8EE",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },

  quantityButton: {
    width: 35,
    height: 35,
    borderRadius: 9,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DEEBDB",
  },

  quantityButtonActive: {
    width: 35,
    height: 35,
    borderRadius: 9,
    backgroundColor: "#43B929",
    justifyContent: "center",
    alignItems: "center",
  },

  quantityText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#24352A",
    textAlign: "center",
  },
});
