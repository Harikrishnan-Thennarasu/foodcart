import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "myCart",
    initialState: {
        items: [],
        deliveryOption: "DINE_IN"
    },
    reducers: {
        onCartItemChange(state, action) {
            let alreadyAddedItems = [...state.items];
            if (action.payload.type === 'ADD') {
                let isAlreadyUsed = alreadyAddedItems.some((item) => item.id === action.payload.data.id);
                if (isAlreadyUsed) {
                    for (let i = 0; i < alreadyAddedItems.length; i++) {
                        const item = alreadyAddedItems[i];
                        let quantity = item.quantity;
                        if (item.id === action.payload.data.id && quantity !== 20) {
                            quantity = quantity + 1
                            alreadyAddedItems[i] = {
                                id: action.payload.data.id,
                                quantity: quantity,
                                price: action.payload.data.price * quantity
                            }
                        }
                    }
                } else {
                    alreadyAddedItems.push({
                        id: action.payload.data.id,
                        quantity: 1,
                        price: action.payload.data.price
                    })
                }
            } else if (action.payload.type === 'REMOVE') {
                let isAlreadyUsed = alreadyAddedItems.some((item) => item.id === action.payload.data.id);
                if (isAlreadyUsed) {
                    for (let i = 0; i < alreadyAddedItems.length; i++) {
                        const item = alreadyAddedItems[i];
                        let quantity = item.quantity;
                        if (item.id === action.payload.data.id) {
                            quantity = quantity > 0 ? quantity - 1 : 0;
                            alreadyAddedItems[i] = {
                                id: action.payload.data.id,
                                quantity: quantity,
                                price: quantity * action.payload.data.price
                            }
                        }
                    }
                } else {
                    alreadyAddedItems.push({
                        id: action.payload.data.id,
                        quantity: 0,
                        price: 0
                    })
                }
            }
            state.items = alreadyAddedItems;
        },
        onDeliveryOptionChange(state, action) {
            state.deliveryOption = action.payload;
        }
    }
})

export const { onCartItemChange, onDeliveryOptionChange } = cartSlice.actions;
export default cartSlice.reducer;