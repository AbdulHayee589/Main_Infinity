<?php

namespace App\Services;

use Illuminate\Support\Facades\Session;

class CartService
{
    public static function addToCart($mockupId, $quantity = 1)
    {
        $cart = self::getCart();

        if (isset($cart[$mockupId])) {
            $cart[$mockupId] += $quantity;
        } else {
            $cart[$mockupId] = $quantity;
        }

        self::saveCart($cart);
        return $cart;
    }

    public static function removeFromCart($mockupId)
    {
        $cart = self::getCart();

        if (isset($cart[$mockupId])) {
            unset($cart[$mockupId]);
            self::saveCart($cart);
            return $cart;
        }

        return null;
    }

    public static function updateQuantity($mockupId, $quantity)
    {
        $cart = self::getCart();

        if (isset($cart[$mockupId])) {
            $cart[$mockupId] = $quantity;
            self::saveCart($cart);
            return $cart;
        }

        return null;
    }

    public static function getCart()
    {
        return Session::get('cart', []);
    }

    public static function clearCart()
    {
        Session::forget('cart');
    }

    protected static function saveCart($cart)
    {
        Session::put('cart', $cart);
    }
}
