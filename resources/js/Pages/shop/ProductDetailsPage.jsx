import { usePage } from "@inertiajs/react";
import { useState } from "react";
import Container from "../../components/ui/Container";
import ProductProvidersListing from "../../components/product/ProductProvidersListing";
import ProductImagesAndDetails from "../../components/product/ProductImagesAndDetails";
import useOpenState from "../../components/hooks/useOpenState";
import ProductDescription from "../../components/product/ProductDescription";
import ProductRatingsListing from "../../components/product/ProductRatingsListing";
import WriteAReviewModal from "../../components/modals/WriteAReviewModal";
import VariantsInfoModal from "../../components/modals/VariantsInfoModal";

const ProductDetailsPage = () => {
  const { props } = usePage();
  const { open: openReviewModal, setOpen: setOpenReviewModal } =
    useOpenState(false);
  const { open: openVariantsModal, setOpen: setOpenVariantsModal } =
    useOpenState(false);

  const [activeProvider, setActiveProvider] = useState({});

  const onMoreDetailsClickHandler = (provider) => {
    setActiveProvider(provider);
    setOpenVariantsModal(true);
  };

  const onOpenReviewModalHandler = () => {
    setOpenReviewModal(true);
  };

  console.log(props);
  const { blueprints: product } = props;

  return (
    <>
      <WriteAReviewModal
        open={openReviewModal}
        setOpen={setOpenReviewModal}
      />

      <VariantsInfoModal
        open={openVariantsModal}
        setOpen={setOpenVariantsModal}
        provider={activeProvider}
      />

      <Container className="flex flex-col gap-8 py-16 pb-24">
        <ProductImagesAndDetails product={product} />

        <div className="flex flex-col gap-y-12 mt-12">
          <ProductProvidersListing
            onMoreDetailsClickHandler={onMoreDetailsClickHandler}
            providers={props.providers}
          />

          <ProductDescription description={product.description} />

          <ProductRatingsListing
            openReviewModal={onOpenReviewModalHandler}
            ratings={product.ratings}
          />
        </div>
      </Container>
    </>
  );
};
export default ProductDetailsPage;
