import { createContext, useContext, useState } from "react";
const CartContext = createContext(null);
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.name === product.name
      );

      if (existing) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "NutButters must be rendered inside CartProvider. Check App.jsx."
    );
  }

  return context;
}

