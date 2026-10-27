import CardList from "@/components/CardList";
import CreateForm from "@/components/CreateForm";
import Header from "@/components/Header";
import Products, { ProductItems } from "@/components/Products";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type CartItem = ProductItems & {
  quantity: number;
};

const categoriesObject = [
  { id: 1, name: "Hamısı" },
  { id: 2, name: "Meyvələr" },
  { id: 3, name: "Ət məhsulları" },
  { id: 4, name: "Hazır qidalar" },
  { id: 5, name: "Səhər yeməkləri" },
  { id: 6, name: "İçkilər" },
  { id: 7, name: "Tütün məmulatları" },
];

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
    imageUrl: "https://b7x9kq.arazmarket.az/storage/products/1000013596.png",
  },
  {
    id: 26,
    name: "Qaymaq",
    price: 3.5,
    category: "Səhər yeməkləri",
    imageUrl: "https://b7x9kq.arazmarket.az/storage/products/1000003191.png",
  },
  {
    id: 27,
    name: "Bal",
    price: 9.5,
    category: "Səhər yeməkləri",
    imageUrl:
      "https://www.bingoldenbal.com/idea/hr/28/myassets/blogs/bal.jpg?revision=1610369068",
  },
  {
    id: 28,
    name: "Nesquik",
    price: 6.9,
    category: "Səhər yeməkləri",
    imageUrl:
      "https://www.nestle-cereals.com/global/sites/g/files/qirczx806/files/styles/1_1_768px_width/public/2025-02/The%20pack%203D%20768x1006.png.webp?itok=yGI1AJ84",
  },

  // İçkilər
  {
    id: 29,
    name: "Coca-Cola",
    price: 2.2,
    category: "İçkilər",
    imageUrl: "https://b7x9kq.arazmarket.az/storage/products/1000012445.png",
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
      "https://minuman.com/cdn/shop/files/REDBULL_1200x.jpg?v=1738743145",
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
    imageUrl:
      "https://www.avteon.com/WebImages/ProductImages/b5bd166a-7279-4216-8a4b-883c8a70e8c7.webp",
  },
  {
    id: 42,
    name: "LD",
    price: 3.5,
    category: "Tütün məmulatları",
    imageUrl:
      "https://www.avteon.com/WebImages/ProductImages/d1f2a813-eca5-402c-9a58-b6da5e3140f5.jpeg",
  },
];

export default function TabLayout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductItems[]>(productsData);
  const [search, setSearch] = useState<string>("");
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openCreateCard, setOpenCreateCard] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");

  const productFiltering = products.filter((value) => {
    const name = value.name.trim().toLocaleLowerCase("az");
    const query = search.trim().toLocaleLowerCase("az");

    const category = value.category.trim().toLocaleLowerCase("az");
    const selectCategory = selected.trim().toLocaleLowerCase("az");

    const matchesName = name.includes(query);

    const matchesCategory = selected === "" || category === selectCategory;

    return matchesName && matchesCategory;
  });

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

  const handleRemove = (id: number) => {
    setCart((prev) => {
      const product = prev.find((item) => item.id === id);

      if (!product) return prev;

      if (product?.quantity > 1) {
        return prev.map((item) =>
          item.id == id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  const handleRemoveProduct = (id: number) => {
    Alert.alert("Warning", "Are your sure? ", [
      {
        text: "YES",
        onPress: () =>
          setProducts((prev) => prev.filter((item) => item.id !== id)),
      },
      {
        text: "NO",
      },
    ]);
  };

  const handleReset = () => {
    setCart([]);
  };
  const { width, height } = useWindowDimensions();

  const isPortait = height > width;

  return (
    <View style={styles.container}>
      <Header
        search={search}
        setSearch={setSearch}
        setSelect={setSelected}
        categoriesObject={categoriesObject}
      />
      <Text style={{ paddingLeft: 15, fontSize: 24, fontWeight: "bold" }}>
        {selected || "Hamısı"}
      </Text>
      <View
        style={[
          styles.cart,
          {
            display: openCart ? "flex" : "none",
          },
        ]}
      >
        <CardList data={cart} setOpen={setOpenCart} isPotriat={isPortait} />
      </View>
      <View
        style={[
          styles.createForm,
          {
            display: openCreateCard ? "flex" : "none",
          },
        ]}
      >
        <CreateForm setProducts={setProducts} setOpen={setOpenCreateCard} />
      </View>

      <View
        style={{
          position: "absolute",
          zIndex: 50,
          top: isPortait ? "60%" : "40%",
          left: "83%",
          gap: 5,
          flexDirection: "column",
        }}
      >
        <TouchableOpacity style={{}} onPress={() => setOpenCreateCard(true)}>
          <Ionicons
            name="add"
            size={24}
            color="#0F172A"
            style={{
              backgroundColor: "#00E676",
              padding: 15,
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setOpenCart(true)}
          onLongPress={handleReset}
        >
          {cart.length > 0 && (
            <Text style={styles.cartBadge}>{cart.length}</Text>
          )}

          <Ionicons
            name="cart"
            size={24}
            color="#0F172A"
            style={{
              backgroundColor: "#00E676",
              padding: 15,
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
      </View>
      {productFiltering.length != 0 ? (
        <FlatList
          key={isPortait ? "landscape" : "portrait"}
          data={productFiltering}
          numColumns={isPortait ? 2 : 4}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 14,
          }}
          contentContainerStyle={[
            styles.productContainer,
            { paddingRight: isPortait ? 10 : 45 },
          ]}
          renderItem={({ item }) => (
            <Products
              item={item}
              quantity={cart.find((x) => x.id === item.id)?.quantity ?? 0}
              isPortrait={isPortait}
              onAdd={handleAdd}
              handleRemove={handleRemove}
              handleRemoveProduct={handleRemoveProduct}
            />
          )}
        />
      ) : (
        // )
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
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 250,
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
  createForm: {
    position: "absolute",
    backgroundColor: "#ffffff",
    top: "20%",
    left: "10%",
    zIndex: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    width: "80%",
  },

  cart: {
    position: "absolute",
    top: "20%",
    left: "10%",
    zIndex: 40,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    width: "80%",
  },
});
