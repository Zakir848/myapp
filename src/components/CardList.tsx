import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ProductItems } from "./Products";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CartItem = ProductItems & {
  quantity: number;
};

type Props = {
  data: CartItem[];
  setOpen: (value: boolean) => void;
};

export default function CardList({ data, setOpen }: Props) {
  const total = data.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setOpen(false)}
      >
        <MaterialCommunityIcons name="close" size={23} color="#EF4444" />
      </TouchableOpacity>

      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.nameCol, styles.headerText]}>Name</Text>

        <Text style={[styles.priceCol, styles.headerText, styles.center]}>
          Price
        </Text>

        <Text style={[styles.quantityCol, styles.headerText, styles.center]}>
          Quantity
        </Text>

        <Text style={[styles.totalCol, styles.headerText, styles.center]}>
          Total
        </Text>
      </View>

      <FlatList
        data={data}
        style={{ maxHeight: 320 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.row, styles.productRow]}>
            <Text style={styles.nameCol} numberOfLines={2}>
              {item.name}
            </Text>

            <Text style={[styles.priceCol, styles.center]}>
              {item.price.toFixed(2)} $
            </Text>

            <Text style={[styles.quantityCol, styles.center]}>
              {item.quantity}
            </Text>

            <Text style={[styles.totalCol, styles.center]}>
              {(item.price * item.quantity).toFixed(2)} $
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Səbət boşdur</Text>}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: {total.toFixed(2)} $</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    maxWidth: 520,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 12,
  },

  closeButton: {
    alignSelf: "flex-end",
    marginRight: 12,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  headerRow: {
    backgroundColor: "#F1F5F9",
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
  },

  productRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  nameCol: {
    flex: 2,
    minWidth: 0,
  },

  priceCol: {
    flex: 1.2,
    minWidth: 0,
  },

  quantityCol: {
    flex: 1.3,
    minWidth: 0,
  },

  totalCol: {
    flex: 1.5,
    minWidth: 0,
  },

  headerText: {
    color: "#1D4ED8",
    fontWeight: "700",
    fontSize: 12,
  },

  center: {
    textAlign: "center",
  },

  footer: {
    padding: 15,
    alignItems: "flex-end",
    backgroundColor: "#F8FAFC",
  },

  totalText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#16A34A",
  },

  emptyText: {
    textAlign: "center",
    padding: 25,
    color: "#64748B",
  },
});
