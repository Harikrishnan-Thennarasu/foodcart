import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';

const FoodItem = ({ item }) => {

    const onAdd = () => {
        onCartChange('ADD', item);
    }

    const onRemove = () => {
        onCartChange('REMOVE', item);
    }

    const onCartChange = () => {

    }

    return (
        <View style={{ marginTop: 20, marginBottom: 10, flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ rowGap: 5, flex: 8 }}>
                <Text style={{ color: "black", fontSize: 16 }}>{item.title}</Text>
                <Text numberOfLines={1} style={{ color: "black", fontSize: 15 }}>{item.description}</Text>
                <Text style={{ color: "orange", fontSize: 16 }}>{item.price}</Text>
            </View>
            <View
                style={{
                    flex: 2,
                    justifyContent: "center", alignItems: "center",
                }}
            >
                <View
                    style={{
                        borderColor: "orange",
                        borderWidth: 1,

                        flexDirection: "row",
                        alignSelf: "flex-end",
                        justifyContent: "center", alignItems: "center"
                    }}
                >
                    <TouchableOpacity onPress={onAdd} style={{ height: "100%", width: "30%", padding: 5, }}>
                        <Entypo name={"minus"} />
                    </TouchableOpacity>
                    <Text style={{ width: "30%", textAlign: "center" }}>1</Text>
                    <TouchableOpacity onPress={onRemove} style={{ height: "100%", width: "30%", padding: 5, }}>
                        <Entypo name={"plus"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default FoodItem;