import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);
export const FavouritesContext = createContext(null);

const Wrapper = ({ children }) => {
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("fav-products") || "[]"));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
  
  useEffect(() => {
    console.log('favourites');
    console.log(favourites);
    localStorage.setItem("fav-products", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    console.log('cart');
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      <CartContext.Provider value={{cart, setCart}}>
        {children}
      </CartContext.Provider>
    </FavouritesContext.Provider>
  )
}
export default Wrapper