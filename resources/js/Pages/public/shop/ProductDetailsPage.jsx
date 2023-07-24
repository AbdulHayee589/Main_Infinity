import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Container from "../../../components/ui/Container";
import ImagesDisplayContainer from "../../../components/product/ImagesDisplayContainer";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

const details = [
  "100% Airlume combed and ringspun cotton (fiber content may vary for different colors)",
  "Light fabric (4.2 oz/yd² (142 g/m²))",
  "Retail fit",
  "Tear away label",
  "Runs true to size",
];

export default function ProductDetailsPage() {
  const { props } = usePage();
  const bp = props.blueprints;
  const [modalOpen, setModalOpen] = useState(false);
  const [providerTitle, setProviderTitle] = useState("");
  const [variants, setVariants] = useState([]);

  useEffect(() => {
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
          <ImagesDisplayContainer className="" images={bp.images} />
          <div className="grid gap-4">
            <div>
              <span className="text-gray-400 text-sm">
                t-shirt
              </span>
              <h1 className="text-2xl md:text-3xl font-semibold">
                {bp.title}
              </h1>
            </div>

            <Link href="/" className="hover:text-gold-main">
              {bp.brand} {bp.model}
            </Link>

            <div className="grid">
              {details.map((detail) => (
                <div key={detail} className="flex gap-2">
                  <span className="h-full">&#x2022;</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <Link href="/" className="text-gray-500">Read more</Link>
          </div>
        </div>

        <div className="grid gap-6">
          {props.providers.map((el) => (
            <div key={el.id} className="flex gap-6">
              <span>{el.title}</span>
              <Link
                href={`/shop/products/${bp.id}?provider=${el.id}`}
                only={["variants"]}
              >
                <Button size="sm">Get Variants</Button>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
