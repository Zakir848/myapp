import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    Button,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ProductItems } from "./Products";

type Product = {
  setProducts: (
    value: ProductItems[] | ((prev: ProductItems[]) => ProductItems[]),
  ) => void;
  setOpen: (value: boolean) => void;
};

type Form = {
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
};

export default function CreateForm({ setProducts, setOpen }: Product) {
  const [form, setForm] = useState<Form>({
    name: "",
    price: 0,
    category: "",
    imageUrl: "",
  });

  const submit = () => {
    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !Number.isFinite(form.price) ||
      form.price < 0
    ) {
      Alert.alert("Warning", "Please enter valid product information");
      return;
    }

    setProducts((prev) => [
      ...prev,
      {
        ...form,
        id: Math.max(0, ...prev.map((p) => p.id)) + 1,
        imageUrl: form.imageUrl || null,
      },
    ]);

    setForm({
      name: "",
      price: 0,
      category: "",
      imageUrl: "",
    });

    Alert.alert("Success", "Product created successfully");
  };

  return (
    <View>
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{ borderRadius: 50, backgroundColor: "red", padding: 2 }}
          onPress={() => setOpen(false)}
        >
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Product name"
        value={form?.name}
        onChangeText={(text) =>
          setForm((prev) => ({
            ...prev,
            name: text,
          }))
        }
        style={styles.inpit}
      />
      <TextInput
        placeholder="Product price"
        keyboardType="numeric"
        value={form?.price.toString()}
        onChangeText={(price) =>
          setForm((prev) => ({
            ...prev,
            price: Number(price),
          }))
        }
        style={styles.inpit}
      />
      <TextInput
        placeholder="Product Image"
        value={form?.imageUrl?.toString()}
        onChangeText={(image) =>
          setForm((prev) => ({
            ...prev,
            imageUrl: image,
          }))
        }
        style={styles.inpit}
      />
      <TextInput
        placeholder="Product category"
        value={form?.category}
        onChangeText={(category) =>
          setForm((prev) => ({
            ...prev,
            category: category,
          }))
        }
        style={styles.inpit}
      />
      <Button title="Submit" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  inpit: {
    backgroundColor: "d3d3d3",
  },
});
