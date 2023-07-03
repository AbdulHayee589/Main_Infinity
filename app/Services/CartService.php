<?php
namespace App\Services;

class CartService {
    /**
     * Add an item to the cart.
     *
     * @param int $blueprintId
     * @param int $quantity
     * @return void
     */
    public static function addItem($product, $quantity = 1)
    {
        $cart = CartService::getCart();

        for($i = 0; $i < sizeof($cart); $i++) {
            if($cart[$i]['id'] == $product['id']) {
                $cart[$i]['quantity'] = $quantity;
                CartService::updateCart($cart);
                return;
            }
        }

        $product['quantity'] = $quantity;
        $cart = array_push($cart, $product);
        CartService::updateCart($cart);
    }

    /**
     * Add an item to the cart.
     *
     * @param int $blueprintId
     * @param int $quantity
     * @return void
     */
    public static function rmItem($productId)
    {
        $cart = CartService::getCart();
        $cart = array_filter($cart, function ($item) use ($productId) {
            return $item['id'] !== $productId;
        });

        CartService::updateCart($cart);
    }



    /**
     * Returns the cart
     *
     * @return array
     */
    public static function getCart() {
        return session()->get('cart', []);
    }

    /**
     * Update the cart
     *
     * @param array cart
     * @return array
     */
    public static function updateCart($cart) {
         session()->put('cart', $cart);
         return CartService::getCart();
    }
}
