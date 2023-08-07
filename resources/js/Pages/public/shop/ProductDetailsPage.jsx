import { usePage } from "@inertiajs/react";
import { useState } from "react";
import Container from "../../../components/ui/Container";
import Modal from "../../../components/ui/Modal";
import ProductProvidersListing from "../../../components/product/ProductProvidersListing";
import ProductImagesAndDetails from "../../../components/product/ProductImagesAndDetails";
import useOpenState from "../../../components/hooks/useOpenState";
import ProductDescription from "../../../components/product/ProductDescription";
import ProductReviewsListing from "../../../components/product/ProductReviewsListing";
import { v4 as uuidv4 } from "uuid";
import WriteAReviewModal from "../../../components/modals/WriteAReviewModal";

const rats = Array.from({ length: 11 }, (_, index) => ({
  id: uuidv4(),
  isMockup: 0,
  star_rating: 3,
  message: "hello",
  isApproved: 1,
  created_at: null,
  updated_at: null,
  user: {
    name: "Admin",
    email: "test@abv.bg",
  },
}));

const ProductDetailsPage = () => {
  const { props } = usePage();
  const { open, setOpen } = useOpenState(false);
  const { open: openReviewModal, setOpen: setOpenReviewModal } =
    useOpenState(false);
  const [activeProvider, setActiveProvider] = useState({});

  const onMoreDetailsClickHandler = (provider) => {
    setActiveProvider(provider);
    setOpen(true);
  };

  console.log(props);
  const { blueprints: product } = props;

  return (
    <>
      <WriteAReviewModal
        open={openReviewModal}
        setOpen={setOpenReviewModal}
      />

      <Modal
        open={open}
        setOpen={setOpen}
        title={`${activeProvider?.provider?.title || "test"}'s variants`}
      >
        <div className="overflow-auto h-96">
          <pre>{JSON.stringify(activeProvider, null, 4)}</pre>
        </div>
      </Modal>

      <Container className="flex flex-col gap-8 py-16 pb-24">
        <ProductImagesAndDetails product={product} />

        <div className="flex flex-col gap-y-12 mt-12">
          <ProductProvidersListing
            onMoreDetailsClickHandler={onMoreDetailsClickHandler}
            providers={props.providers}
          />

          <ProductDescription description={product.description} />

          <ProductReviewsListing
            openReviewModal={() => setOpenReviewModal(true)}
            review={rats}
          />
        </div>
      </Container>
    </>
  );
};
export default ProductDetailsPage;
