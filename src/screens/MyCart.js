import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox, Divider } from "@rneui/base";
import FoodItem from "../components/FoodItem";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { onDeliveryOptionChange, resetAllData } from '../redux/cartSlice';
import { FOODS } from "./Home";
import { onDisplayNotification } from "../utilities/functions";

const MyCart = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [showAll, setShowAll] = useState(false);
    let myCartItems = useSelector(state => state.myCart.items);
    const deliveryOption = useSelector(state => state.myCart.deliveryOption);

    const onGoBack = () => {
        navigation.pop()
    }

    const allSelectedItems = useMemo(() => {
        const result = [];
        for (let i = 0; i < myCartItems.length; i++) {
            let item = myCartItems[i];
            if (item.quantity !== 0) {
                const slectedFood = FOODS.find((food) => food.id == item.id)
                result.push(slectedFood);
            }
        }
        return result;
    }, [showAll, myCartItems]);

    const itemsToShow = showAll ? allSelectedItems : allSelectedItems.slice(0, 2);

    useEffect(() => {
        const slectedFood = myCartItems.some((item) => item.quantity > 0);
        if (!slectedFood) {
            onGoBack();
        }
    }, [myCartItems])

    const totalPrice = myCartItems.reduce((total, item) => total + item.price, 0);

    const OnPlaceOrder = () => {

        let body = '';
        if (deliveryOption === 'DINE_IN') {
            body = "Success! Your order has been successfully placed. We look forward to serving you shortly. Please make yourself comfortable."
        } else {
            body = "Success! Your order has been successfully placed for takeaway. We will notify you when it's ready for pickup. Thank you for choosing us!"
        }
        Alert.alert('', 'Your order placed', [
            {
                text: "OK",
                onPress: () => {
                    dispatch(resetAllData())
                    onDisplayNotification({
                        title: "FoodCart",
                        body: body
                    })
                    navigation.pop();
                }
            }
        ])
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={onGoBack}>
                        <AntDesign size={40} color={"white"} name={"arrowleft"} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Cart</Text>
                </View>
                <View style={styles.totalCostContainer}>
                    <View style={styles.totalCostBox}>
                        <Text style={styles.totalCostLabel}>Total Cost</Text>
                        <Text style={styles.totalCostValue}>€{totalPrice}.00</Text>
                    </View>
                </View>
            </View>
            <FlatList
                style={styles.flatList}
                ListHeaderComponent={() => {
                    return (
                        <Text style={styles.reviewOrdersTitle}>Review Orders</Text>
                    )
                }}
                ListFooterComponent={() => {
                    return (
                        <View>
                            {!showAll && allSelectedItems.length > 2 && (
                                <TouchableOpacity onPress={() => setShowAll(true)}>
                                    <Text style={styles.showMoreText}>Show More</Text>
                                </TouchableOpacity>
                            )}
                            <Text style={styles.deliveryOptionsTitle}>Delivery Options</Text>
                            <View style={styles.deliveryOptionsContainer}>
                                <TouchableOpacity onPress={() => { dispatch(onDeliveryOptionChange('DINE_IN')) }} style={styles.deliveryOption}>
                                    <MaterialIcons size={20} color={'black'} name={"fastfood"} />
                                    <Text style={styles.deliveryOptionText}>Dine-In</Text>
                                    <CheckBox
                                        checked={deliveryOption === 'DINE_IN'}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        checkedColor={"orange"}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { dispatch(onDeliveryOptionChange('TAKE_WAY')) }} style={styles.deliveryOption}>
                                    <MaterialCommunityIcons size={20} color={'black'} name={"truck-delivery-outline"} />
                                    <Text style={styles.deliveryOptionText}>Take way</Text>
                                    <CheckBox
                                        checked={deliveryOption === 'TAKE_WAY'}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        checkedColor={"orange"}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
                data={itemsToShow}
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
                onPress={OnPlaceOrder}
                activeOpacity={0.5}
                style={styles.placeOrderButton}>
                <Text style={styles.placeOrderText}>PLACE ORDER</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    header: {
        backgroundColor: "black"
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15
    },
    headerTitle: {
        color: "white",
        marginLeft: 20,
        fontSize: 20
    },
    totalCostContainer: {
        height: 250,
        justifyContent: "center",
        alignItems: "center"
    },
    totalCostBox: {
        paddingHorizontal: 50,
        paddingVertical: 25,
        backgroundColor: "white",
        borderRadius: 15
    },
    totalCostLabel: {
        color: "orange",
        fontSize: 18,
        textAlign: "center"
    },
    totalCostValue: {
        textAlign: "center",
        fontSize: 18,
        color: "black"
    },
    flatList: {
        paddingHorizontal: 20,
        marginTop: 20
    },
    reviewOrdersTitle: {
        fontWeight: "500",
        fontSize: 18,
        color: "black"
    },
    showMoreText: {
        textAlign: "right",
        textDecorationLine: "underline",
        color: "black",
        fontSize: 18
    },
    deliveryOptionsTitle: {
        fontWeight: "500",
        fontSize: 18,
        color: "black",
        marginTop: 15
    },
    deliveryOptionsContainer: {
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    deliveryOption: {
        flexDirection: "row",
        alignItems: "center"
    },
    deliveryOptionText: {
        color: "black",
        marginLeft: 15
    },
    placeOrderButton: {
        flexDirection: "row",
        justifyContent: "center",
        height: 60,
        width: "100%",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "black"
    },
    placeOrderText: {
        color: "white",
        fontSize: 18
    }
});

export default MyCart
