import { useState } from "react";
import Modal from "../ui/Modal";

const VariantsInfoModal = ({ open, setOpen, provider = null }) => {
  console.log(provider);
  const [showBy, setShowBy] = useState(0);
  console.log(provider);
  const objsMap =
    showBy === 0
      ? provider?.sizes?.map((size) =>
        provider?.provider.variants.variants.filter(
          (obj) => obj.options.size === size
        )
      )
      : [];

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={`${provider.provider?.title || "test"}'s variants`}
      className="max-w-4xl"
    >
      <div className="overflow-auto h-96">
        <pre>{JSON.stringify(objsMap, null, 4)}</pre>
      </div>
    </Modal>
  );
};
export default VariantsInfoModal;
