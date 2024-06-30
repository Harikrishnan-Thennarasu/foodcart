import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { onCartItemChange } from "../redux/cartSlice";

const FoodItem = ({ item }) => {
    let myCartItems = useSelector(state => state.myCart.items);

    const dispatch = useDispatch();

    const onChange = (type, data) => {
        dispatch(onCartItemChange({ type, data }));
    }

    const selectedFoodInfo = myCartItems.find((cartItem) => cartItem.id === item.id);
    return (
        <View style={styles.container}>
            <View style={styles.itemInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text numberOfLines={1} style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>€{item.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <View style={styles.quantityControl}>
                    <TouchableOpacity onPress={() => { onChange('REMOVE', item) }} style={styles.controlButton}>
                        <Entypo name={"minus"} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{selectedFoodInfo?.quantity || 0}</Text>
                    <TouchableOpacity onPress={() => { onChange('ADD', item) }} style={styles.controlButton}>
                        <Entypo name={"plus"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemInfo: {
        rowGap: 5,
        flex: 8,
    },
    title: {
        color: "black",
        fontSize: 16,
    },
    description: {
        color: "black",
        fontSize: 15,
    },
    price: {
        color: "orange",
        fontSize: 16,
    },
    quantityContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    quantityControl: {
        borderColor: "orange",
        borderWidth: 1,
        flexDirection: "row",
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
    },
    controlButton: {
        height: "100%",
        width: "30%",
        padding: 5,
    },
    quantityText: {
        width: "30%",
        textAlign: "center",
    },
});

export default FoodItem;
