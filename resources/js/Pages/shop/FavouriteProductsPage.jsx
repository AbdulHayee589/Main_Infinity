import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import ProductShowcase from "../../components/product/ProductShowcase";

const FavouriteProductsPage = () => {
    const [favProducts, setFavProducts] = useState([]);

    useEffect(() => {
        const jsonFavProducts = localStorage.getItem("fav-products");

        if (jsonFavProducts) setFavProducts(JSON.parse(jsonFavProducts));
    }, []);

    return (
        <Container className="py-12">
            <div className="w-full grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favProducts.map((product) => (
                    <ProductShowcase key={product.id} product={product} />
                ))}
            </div>
        </Container>
    );
};
export default FavouriteProductsPage;
