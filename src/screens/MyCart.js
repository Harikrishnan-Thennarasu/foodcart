import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FOODS } from "./RestaurantItems";
import { CheckBox, Divider } from "@rneui/base";
import FoodItem from "../components/FoodItem";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MyCart = () => {
    const [showAll, setShowAll] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState('DINE_IN');

    const onGoBack = () => {

    }

    const itemsToShow = showAll ? FOODS : FOODS.slice(0, 2);

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
                        <Text style={styles.totalCostValue}>€30.00</Text>
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
                            {!showAll && FOODS.length > 3 && (
                                <TouchableOpacity onPress={() => setShowAll(true)}>
                                    <Text style={styles.showMoreText}>Show More</Text>
                                </TouchableOpacity>
                            )}
                            <Text style={styles.deliveryOptionsTitle}>Delivery Options</Text>
                            <View style={styles.deliveryOptionsContainer}>
                                <TouchableOpacity onPress={() => { setDeliveryOption('DINE_IN') }} style={styles.deliveryOption}>
                                    <MaterialIcons size={20} color={'black'} name={"fastfood"} />
                                    <Text style={styles.deliveryOptionText}>Dine-In</Text>
                                    <CheckBox
                                        checked={deliveryOption === 'DINE_IN'}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        checkedColor={"orange"}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setDeliveryOption('TAKE_AWAY') }} style={styles.deliveryOption}>
                                    <MaterialCommunityIcons size={20} color={'black'} name={"truck-delivery-outline"} />
                                    <Text style={styles.deliveryOptionText}>Take away</Text>
                                    <CheckBox
                                        checked={deliveryOption === 'TAKE_AWAY'}
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
