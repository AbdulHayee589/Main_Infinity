import { usePage } from "@inertiajs/react";
import { useState } from "react";
import Container from "../../../components/ui/Container";
import Modal from "../../../components/ui/Modal";
import ProductProvidersListing from "../../../components/sections/ProductProvidersListing";
import ProductImagesAndDetails from "../../../components/sections/ProductImagesAndDetails";
import useOpenState from "../../../components/hooks/useOpenState";
import ProductDescription from "../../../components/product/ProductDescription";

const ProductDetailsPage = () => {
  const { props } = usePage();
  const { open, setOpen } = useOpenState(false);
  const [providerTitle, setProviderTitle] = useState("");
  const [variants, setVariants] = useState([]);

  const onMoreDetailsClickHandler = (provider) => {
    setProviderTitle(provider.variants.title);
    setVariants(provider.variants.variants);
    setOpen(true);
  };

  console.log(props);

  return (
    <>
      <Modal
        open={open}
        setIsOpen={setOpen}
        title={`${providerTitle}'s variants`}
      >
        <div className="overflow-auto h-96">
          <pre>{JSON.stringify(variants, null, 4)}</pre>
        </div>
      </Modal>

      <Container className="flex flex-col gap-8 py-16 pb-24">
        <ProductImagesAndDetails product={props.blueprints} />

        <ProductProvidersListing
          onMoreDetailsClickHandler={onMoreDetailsClickHandler}
          providers={props.providers}
        />

        <ProductDescription description={props.blueprints.description}/>
      </Container>
    </>
  );
};
export default ProductDetailsPage;
