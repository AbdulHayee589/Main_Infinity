import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Container from "../../../components/ui/Container";
import ImagesDisplayContainer from "../../../components/product/ImagesDisplayContainer";
import Modal from "../../../components/ui/Modal";
import ProductInformation from "../../../components/product/ProductInformation";
import ProductProvider from "../../../components/product/ProductProvider";

const ProductDetailsPage = () => {
  const { props } = usePage();
  const [modalOpen, setModalOpen] = useState(false);
  const [providerTitle, setProviderTitle] = useState("");
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    try {
      props.providers.forEach(
        (el) => (el.variants = JSON.parse(el.variants))
      );
    } catch (err) { }

    console.log(props);
  }, []);

  useEffect(() => {
    setModalOpen(props.variants != null);

    if (props.variants != null) {
      setProviderTitle(props.variants.title);
      setVariants(props.variants.variants);
    }
  }, [props]);

  return (
    <>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title={`${providerTitle}'s variants`}
      >
        <div className="overflow-auto h-96">
          <pre>{JSON.stringify(variants, null, 4)}</pre>
        </div>
      </Modal>

      <Container className="flex flex-col gap-8 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-y-6 gap-x-24">
          <ImagesDisplayContainer
            className=""
            images={props.blueprints.images}
          />
          <ProductInformation blueprint={props.blueprints} />
        </div>

        <div>
          <h1 className="text-2xl font-bold my-6">
            Available print providers
          </h1>
          <div className="grid gap-5">
            {props.providers.length > 0 &&
              props.providers.map((el) => (
                <ProductProvider key={el.id} provider={el} />
              ))}
          </div>
        </div>
      </Container>
    </>
  );
};
export default ProductDetailsPage;
