import mongoose from "mongoose";
import Cart from "@/backend/models/cart";
import Product from "@/backend/models/product";
import { NextResponse } from "next/server";

// Fonction pour ajouter un produit au panier
export const addToCart = async (request) => {
  try {
    const { userId, productId, quantity } = await request.json();

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return NextResponse.json(
        { message: "Invalid user ID or product ID format" },
        { status: 400 }
      );
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Vérifiez si le produit existe
    const product = await Product.findById(productObjectId);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Cherchez le panier de l'utilisateur
    let cart = await Cart.findOne({ userId: userObjectId });

    if (cart) {
      // Si le panier existe, cherchez l'élément du produit
      const itemIndex = cart.items.findIndex((item) =>
        item.productId.equals(productObjectId)
      );

      if (itemIndex > -1) {
        // Si le produit existe dans le panier, mettez à jour la quantité
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Sinon, ajoutez le nouveau produit au panier avec les informations supplémentaires
        cart.items.push({
          productId: productObjectId,
          productTitle: product.title,
          productImage: product.images[0].secondary,
          productPrice: product.price,
          productDiscountedPrice: product.discountedPrice,
          productStock: product.stock,
          quantity,
        });
      }
    } else {
      // Si le panier n'existe pas, créez un nouveau panier avec le produit et les informations supplémentaires
      cart = new Cart({
        userId: userObjectId,
        items: [
          {
            productId: productObjectId,
            productTitle: product.title,
            productImage: product.images[0].secondary,
            productPrice: product.price,
            productDiscountedPrice: product.discountedPrice,
            productStock: product.stock,
            quantity,
          },
        ],
      });
    }

    await cart.save();

    const isInCart = cart.items.reduce((acc, item) => {
      acc[item.productId.toString()] = true;
      return acc;
    }, {});

    return NextResponse.json({ items: cart.items, isInCart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { message: "Error adding product to cart" },
      { status: 500 }
    );
  }
};

// Fonction pour récupérer les éléments du panier
export const getCartItems = async (request) => {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const cart = await Cart.findOne({ userId: userObjectId });

    if (!cart) {
      return NextResponse.json({ items: [], isInCart: {} });
    }

    const isInCart = cart.items.reduce((acc, item) => {
      acc[item.productId.toString()] = true;
      return acc;
    }, {});

    return NextResponse.json({ items: cart.items, isInCart });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { message: "Error fetching cart items" },
      { status: 500 }
    );
  }
};

// Fonction pour incrémenter la quantité d'un produit dans le panier
export const incrementQuantity = async (request) => {
  try {
    const { userId, productId } = await request.json();
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (item) {
      item.quantity += 1;
      await cart.save();
      return NextResponse.json(cart);
    } else {
      return NextResponse.json(
        { message: "Product not found in cart" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error incrementing item quantity:", error);
    return NextResponse.json(
      { message: "Error incrementing item quantity" },
      { status: 500 }
    );
  }
};

// Fonction pour décrémenter la quantité d'un produit dans le panier
export const decrementQuantity = async (request) => {
  try {
    const { userId, productId } = await request.json();
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== productId
        );
      }
    }
    await cart.save();

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error decrementing item quantity:", error);
    return NextResponse.json(
      { message: "Error decrementing item quantity" },
      { status: 500 }
    );
  }
};

// Fonction pour supprimer un produit du panier
export const removeFromCart = async (request) => {
  try {
    const { userId, productId } = await request.json();
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    if (cart.items.length === 0) {
      // Supprimer le panier si aucun produit n'est présent
      await Cart.deleteOne({ userId });
      return NextResponse.json({ items: [], isInCart: {} });
    } else {
      // Sinon, sauvegarder le panier mis à jour
      await cart.save();
      const isInCart = cart.items.reduce((acc, item) => {
        acc[item.productId.toString()] = true;
        return acc;
      }, {});
      return NextResponse.json({ items: cart.items, isInCart });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { message: "Error removing item from cart" },
      { status: 500 }
    );
  }
};

// Fonction pour vider le panier d'un utilisateur
export const clearCart = async (request) => {
  try {
    const { userId } = await request.json();
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    // Vider le tableau items
    cart.items = [];

    // Sauvegarder ou supprimer le panier si c'est nécessaire
    await cart.save();

    return NextResponse.json({ items: [], isInCart: {} });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { message: "Error clearing cart" },
      { status: 500 }
    );
  }
};
