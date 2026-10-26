import Header from "@/components/Header";
import Products, { ProductItems } from "@/components/Products";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CartItem = ProductItems & {
  quantity: number;
};

const productsData = [
  // Meyvələr
  {
    id: 1,
    name: "Alma",
    price: 2.5,
    category: "Meyvələr",
    imageUrl: "https://files.modern.az/photo/orginal/2017/07/16/268905.jpg",
  },
  {
    id: 2,
    name: "Banan",
    price: 3.2,
    category: "Meyvələr",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0zb0k24ZggO7xvK8pvzfydyZkLbxU2MoyeNmiKYsqw&s=10",
  },
  {
    id: 3,
    name: "Portağal",
    price: 2.8,
    category: "Meyvələr",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFmZ3hTGNpgav3fPRc1sn-_99dkMLOONLQAxmxTmzWgw&s=10",
  },
  {
    id: 4,
    name: "Mandarin",
    price: 2.4,
    category: "Meyvələr",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShTEZ9laUiy947ZNfPuuSomFT9ZJZwxV2xbT_P-RUSyQ&s=10",
  },
  {
    id: 5,
    name: "Armud",
    price: 3.5,
    category: "Meyvələr",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROAbB9c4xTDOvCDj8KB6y4r4Ktt_HAOtqR-PhYFk1qsA&s=10",
  },
  {
    id: 6,
    name: "Üzüm",
    price: 4.2,
    category: "Meyvələr",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROHM7wRYFKy36RRDdy52-bNlbOOTKdmguhsbkwM1ypA5RyXQNJDh1sIQ&s=10",
  },
  {
    id: 7,
    name: "Kivi",
    price: 5.0,
    category: "Meyvələr",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_OAz6vhsmQZImQSYys3LdRnsdqyZic0_sDUjd6MEFAQ&s=10",
  },

  // Ət məhsulları
  {
    id: 8,
    name: "Mal əti",
    price: 18.5,
    category: "Ət məhsulları",
    imageUrl: "https://news.milli.az/media/2018/04/05/et_0256.jpg",
  },
  {
    id: 9,
    name: "Quzu əti",
    price: 21.0,
    category: "Ət məhsulları",
    imageUrl:
      "https://imageproxy.wolt.com/menu/menu-images/64633b27053fa6af1b9663b5/7d6cba82-520a-11ee-9b32-f6eda51f92ef_img_20230911_wa0017.jpg ",
  },
  {
    id: 10,
    name: "Toyuq filesi",
    price: 8.5,
    category: "Ət məhsulları",
    imageUrl:
      "https://www.medicina.az/uploads/news/2020-12-01-16-43-43aaA5F8bRrDSL4Qm2idAx_file.jpg",
  },
  {
    id: 11,
    name: "Toyuq budu",
    price: 5.8,
    category: "Ət məhsulları",
    imageUrl:
      "https://siyazantoyuq.az/uploads/product/7_2019-05-02-12-04-46_5ccaa49e741c5.jpg",
  },
  {
    id: 12,
    name: "Mal qiyməsi",
    price: 16.0,
    category: "Ət məhsulları",
    imageUrl:
      "https://tezbazar.az/uploads/news/1683530268377126458a21c63e11.png",
  },

  // Hazır qidalar
  {
    id: 19,
    name: "Hazır burger",
    price: 6.5,
    category: "Hazır qidalar",
    imageUrl: null,
  },
  {
    id: 20,
    name: "Dondurulmuş kartof fri",
    price: 4.8,
    category: "Hazır qidalar",
    imageUrl: null,
  },
  {
    id: 21,
    name: "Hazır əriştə",
    price: 1.8,
    category: "Hazır qidalar",
    imageUrl: null,
  },

  // Səhər yeməkləri
  {
    id: 22,
    name: "Yumurta",
    price: 0.25,
    category: "Səhər yeməkləri",
    imageUrl: null,
  },
  {
    id: 23,
    name: "Kərə yağı",
    price: 5.5,
    category: "Səhər yeməkləri",
    imageUrl: null,
  },
  {
    id: 24,
    name: "Ağ pendir",
    price: 4.8,
    category: "Səhər yeməkləri",
    imageUrl: null,
  },
  {
    id: 25,
    name: "Holland pendiri",
    price: 6.2,
    category: "Səhər yeməkləri",
    imageUrl: null,
  },
  {
    id: 26,
    name: "Qaymaq",
    price: 3.5,
    category: "Səhər yeməkləri",
    imageUrl: null,
  },
  {
    id: 27,
    name: "Bal",
    price: 9.5,
    category: "Səhər yeməkləri",
    imageUrl: null,
  },
  {
    id: 28,
    name: "Nesquik",
    price: 6.9,
    category: "Səhər yeməkləri",
    imageUrl: null,
  },

  // İçkilər
  {
    id: 29,
    name: "Coca-Cola",
    price: 2.2,
    category: "İçkilər",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg?utm_source=tr.wikipedia.org&utm_campaign=index&utm_content=original",
  },
  {
    id: 30,
    name: "Fanta",
    price: 2.2,
    category: "İçkilər",
    imageUrl:
      "https://strgimgr.umico.az/img/product/280/bb0cc5e8-e912-41d7-9d8c-553cf5202f5e.jpeg",
  },
  {
    id: 34,
    name: "Red Bull",
    price: 3.5,
    category: "İçkilər",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/Redbull_Dose.jpg?utm_source=az.wikipedia.org&utm_campaign=index&utm_content=original",
  },

  // Tütün məmulatları
  {
    id: 40,
    name: "Camel",
    price: 4.8,
    category: "Tütün məmulatları",
    imageUrl: null,
  },
  {
    id: 41,
    name: "Sobranie",
    price: 6.5,
    category: "Tütün məmulatları",
    imageUrl: null,
  },
  {
    id: 42,
    name: "LD",
    price: 3.5,
    category: "Tütün məmulatları",
    imageUrl: null,
  },
];

export default function TabLayout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductItems[]>(productsData);
  const [search, setSearch] = useState<string>("");

  const productFiltering = products.filter((value) => {
    const name = value.name.trim().toLocaleLowerCase("az");
    const query = search.trim().toLocaleLowerCase("az");

    return name.includes(query);
  });

  const categoryList = (category: string) => {
    productFiltering.find((item) => {
      const categories = item.category.trim().toLocaleLowerCase("az");
      const query = category.trim().toLocaleLowerCase("az");

      return categories.includes(query);
    });
    console.log(productFiltering);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleAdd = (data: ProductItems) => {
    setCart((prev) => {
      const product = cart.find((item) => item.id === data.id);

      if (product) {
        return prev.map((item) =>
          item.id == data.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...prev, { ...data, quantity: 1 }];
    });
  };

  const handleRemove = () => {};

  const handleReset = () => {
    setCart([]);
  };

  return (
    <View style={styles.container}>
      <Header search={search} setSearch={setSearch} category={categoryList} />
      <TouchableOpacity
        style={{
          position: "absolute",
          top: "70%",
          left: "83%",
          zIndex: 10,
        }}
        onLongPress={handleReset}
      >
        {cartCount > 0 && <Text style={styles.cartBadge}>{cartCount}</Text>}

        <Ionicons
          name="cart"
          size={22}
          color="#0F172A"
          style={{
            backgroundColor: "#00E676",
            padding: 15,
            borderRadius: 50,
          }}
        />
      </TouchableOpacity>
      {productFiltering.length != 0 ? (
        <FlatList
          data={productFiltering}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{ gap: 5 }}
          contentContainerStyle={styles.productContainer}
          renderItem={({ item }) => (
            <Products
              item={item}
              onAdd={handleAdd}
              handleRemove={handleRemove}
            />
          )}
          numColumns={2}
        />
      ) : (
        <View style={styles.notfound}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            Məlumat tapılmadı
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  cartBadge: {
    width: "auto",
    position: "absolute",
    backgroundColor: "#FF3B30",
    zIndex: 11,
    left: "60%",
    top: "-10%",
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    borderRadius: 50,
    padding: 5,
    paddingHorizontal: 6,
    minWidth: 23,
    justifyContent: "center",
    textAlign: "center",
  },
  productContainer: {
    paddingBottom: 150,
    width: "100%",
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 10,

    gap: 10,
  },
  notfound: {
    paddingBottom: 700,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 125,
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
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
  },
  text: {
    color: "black",
  },
  textContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
});
