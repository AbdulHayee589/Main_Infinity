import { useContext, useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import ProductShowcase from "../../components/product/ProductShowcase";
import { FavouritesContext } from "../../Wrapper";

const FavouriteProductsPage = () => {
    const { favourites, setFavourites} = useContext(FavouritesContext);

    return (
        <Container className="py-12">
            <div className="w-full grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favourites.map((product) => (
                    <ProductShowcase key={product.id} product={product} />
                ))}
            </div>
        </Container>
    );
};
export default FavouriteProductsPage;
