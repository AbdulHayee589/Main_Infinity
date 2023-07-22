import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Container from "../../../components/ui/Container";
import ImagesDisplayContainer from "../../../components/product/ImagesDisplayContainer";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

export default function ProductDetailsPage() {
  const { props } = usePage();
  const bp = props.blueprints;
  const [modalOpen, setModalOpen] = useState(false);

  const getProviderVariants = (id) => {
    router.reload({
      method: "post",
      only: ["variants"],
      preserveState: true,
      preserveScroll: true,
      onSuccess() {
        console.log(props.blueprints);
      },
    });
  };

  useEffect(() => {
    console.log(props);
  }, []);

  useEffect(() => {
    setModalOpen(!!props?.variants.variants.length);
  }, [props]);

  return (
    <>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title={`${props?.variants.title}'s variants`}
      >
        <div className="overflow-auto h-96">
        <pre>{JSON.stringify(props?.variants.variants, null, 4) || []}</pre>
        </div>
      </Modal>

      <Container className="flex flex-col gap-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-12">
          <ImagesDisplayContainer />
          <div className="grid gap-4 border border-red-500">
            <div>
              <h1 className="text-xl font-semibold">
                {bp.title}
              </h1>
              <span className="text-sm text-gray-500">
                By{" "}
                <Link href="/" className="hover:text-gold-main">
                  {bp.brand} {bp.model}
                </Link>
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {props.providers.map((el) => (
            <div key={el.id} className="flex gap-6">
              <span>{el.title}</span>
              <Link href={`/shop/products/${bp.id}?provider=${el.id}`} only={['variants']}>
                <Button size="sm">Get Variants</Button>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
