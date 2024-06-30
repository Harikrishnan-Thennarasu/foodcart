import React from "react";
import { Alert, BackHandler, FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Card } from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Divider } from "@rneui/base";
import FoodItem from "../components/FoodItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export const FOODS = [
    {
        "id": 1,
        "title": "Guac da la Costa",
        "description": "corn tortillas, passion fruit, mango",
        "price": 7
    },
    {
        "id": 2,
        "title": "Classic Burger",
        "description": "beef patty, lettuce, tomato, cheese, pickles",
        "price": 10
    },
    {
        "id": 3,
        "title": "Caesar Salad",
        "description": "romaine lettuce, croutons, parmesan cheese, Caesar dressing",
        "price": 8
    },
    {
        "id": 4,
        "title": "Margherita Pizza",
        "description": "tomato sauce, mozzarella cheese, basil",
        "price": 9
    },
    {
        "id": 5,
        "title": "Spaghetti Carbonara",
        "description": "spaghetti, pancetta, egg, parmesan cheese, black pepper",
        "price": 12
    },
    {
        "id": 6,
        "title": "Chicken Tacos",
        "description": "grilled chicken, corn tortillas, avocado, salsa",
        "price": 11
    },
    {
        "id": 7,
        "title": "Vegetable Stir Fry",
        "description": "mixed vegetables, soy sauce, garlic, ginger",
        "price": 9
    },
    {
        "id": 8,
        "title": "Grilled Salmon",
        "description": "salmon fillet, lemon, herbs, steamed vegetables",
        "price": 15
    },
    {
        "id": 9,
        "title": "French Onion Soup",
        "description": "caramelized onions, beef broth, Gruyère cheese, croutons",
        "price": 6
    },
    {
        "id": 10,
        "title": "Chocolate Lava Cake",
        "description": "molten chocolate cake, vanilla ice cream",
        "price": 7
    }
]

const Home = () => {
    const navigation = useNavigation();
    const myCartItems = useSelector(state => state.myCart.items);

    const onExit = () => {
        Alert.alert('Exit', 'Are you sure you want to exit?',
            [
                {
                    text: "No", onPress: () => {
                        console.info('Exit cancelled')
                    }
                },
                {
                    text: "Exit", onPress: () => {
                        BackHandler.exitApp();
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }
    const slectedNoOfFood = myCartItems.filter((item) => item.quantity > 0).length;

    const onGoToCart = () => {
        if (slectedNoOfFood > 0) {
            navigation.navigate('MYCART');
        } else {
            Alert.alert('Info', 'Your cart is empty! Please select some food items to proceed.')
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onExit}>
                        <AntDesign size={40} color={"white"} name={"arrowleft"} />
                    </TouchableOpacity>
                    <View style={styles.headerIcons}>
                        <Ionicons size={40} color={"white"} name={"share-outline"} />
                        <Ionicons style={styles.alertIcon} size={40} color={"white"} name={"alert-circle-outline"} />
                    </View>
                </View>
                <Image
                    resizeMode={"stretch"}
                    source={require('../assets/food.jpg')}
                    style={styles.image}
                />
                <Card containerStyle={styles.card}>
                    <Text style={styles.cardTitle}>Inka Restaurant</Text>
                    <View style={styles.cardRow}>
                        <AntDesign
                            style={styles.starIcon}
                            color={'red'}
                            name={"staro"}
                        />
                        <Text style={styles.cardText}>5.0 (200+) | All days : 09:00 AM - 06:00 PM</Text>
                    </View>
                    <View style={styles.cardRow}>
                        <Feather
                            style={styles.phoneIcon}
                            color={'red'}
                            name={"phone-call"}
                        />
                        <Text style={styles.cardText}>Reach us at : 9854562142</Text>
                    </View>
                    <Button
                        containerStyle={styles.buttonContainer}
                        color={"black"}>BOOK A TABLE</Button>
                </Card>
            </View>

            <FlatList
                style={styles.list}
                ListHeaderComponent={() => {
                    return (
                        <Text style={styles.listHeader}>Starter</Text>
                    )
                }}
                data={FOODS}
                renderItem={({ item }) => {
                    return (
                        <FoodItem
                            item={item}
                        />
                    )
                }}
                ItemSeparatorComponent={() => <Divider />}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                onPress={onGoToCart}
                activeOpacity={0.5}
                style={styles.cartButton}>
                <MaterialCommunityIcons size={20} style={styles.cartIcon} color={"white"} name={"cart-variant"} />
                <Text style={styles.cartText}>VIEW CART ({slectedNoOfFood} ITEMS)</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: "absolute",
        top: 0,
        zIndex: 1,
        width: '100%',
        height: 60,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    headerIcons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    alertIcon: {
        marginTop: 3,
        marginLeft: 10,
    },
    image: {
        width: '100%',
    },
    card: {
        alignItems: "center",
        marginTop: -50,
    },
    cardTitle: {
        marginBottom: 10,
        textAlign: "center",
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    cardRow: {
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    starIcon: {
        fontSize: 17,
        color: "black",
        marginRight: 10,
    },
    phoneIcon: {
        fontSize: 17,
        color: "black",
        marginRight: 10,
    },
    cardText: {
        fontSize: 17,
        color: "black",
    },
    buttonContainer: {
        width: 200,
        alignSelf: "center",
        borderRadius: 10,
    },
    list: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    listHeader: {
        fontWeight: "bold",
        fontSize: 18,
        color: "black",
    },
    cartButton: {
        flexDirection: "row",
        justifyContent: "center",
        height: 60,
        width: "100%",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "black",
    },
    cartIcon: {
        marginRight: 10,
    },
    cartText: {
        color: "white",
        fontSize: 18,
    },
});

export default Home;
