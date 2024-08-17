import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  isInCart: {},
};

// Thunk pour ajouter un produit au panier
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    userId,
    productId,
    productTitle,
    productImage,
    productPrice,
    productDiscountedPrice,
    productStock,
    quantity,
  }) => {
    const response = await axios.post("/api/cart", {
      userId,
      productId,
      productTitle,
      productImage,
      productPrice,
      productDiscountedPrice,
      productStock,
      quantity,
    });
    return response.data;
  }
);

// Thunk pour récupérer les articles du panier
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(`/api/cart?userId=${userId}`);
    return response.data;
  }
);

// Thunk pour supprimer un produit du panier
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }) => {
    const response = await axios.delete("/api/cart", {
      data: { userId, productId },
    });
    return response.data;
  }
);

// Thunk pour incrémenter la quantité d'un produit dans le panier
export const incrementQuantity = createAsyncThunk(
  "cart/incrementQuantity",
  async ({ userId, productId }) => {
    const response = await axios.patch("/api/cart/increment", {
      userId,
      productId,
    });
    return response.data;
  }
);

// Thunk pour décrémenter la quantité d'un produit dans le panier
export const decrementQuantity = createAsyncThunk(
  "cart/decrementQuantity",
  async ({ userId, productId }) => {
    const response = await axios.patch("/api/cart/decrement", {
      userId,
      productId,
    });
    return response.data;
  }
);

// Thunk pour vider le panier
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async ({ userId }) => {
    const response = await axios.delete("/api/cart/clearCart", {
      data: { userId },
    });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          state.items = action.payload.items || [];
          state.isInCart = action.payload.isInCart || {};
        } else {
          state.items = [];
          state.isInCart = {};
        }
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload.items || [];
          state.isInCart = action.payload.isInCart || {};
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.items = action.payload.items || [];
          state.isInCart = action.payload.isInCart || {};
        }
      })

      .addCase(incrementQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })

      .addCase(decrementQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })

      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = [];
        state.isInCart = {};
      });
  },
});

export default cartSlice.reducer;
