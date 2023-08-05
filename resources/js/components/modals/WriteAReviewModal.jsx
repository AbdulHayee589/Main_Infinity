import Modal from "../ui/Modal";
import WriteAReviewForm from "../forms/WriteAReviewForm";

const WriteAReviewModal = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Write a Review"
      className="max-w-2xl"
      bodyClassName=""
    >
      {/* <h1 className="text-4xl font-semibold mb-12">Write a Review</h1> */}
      <WriteAReviewForm />
    </Modal>
  );
};
export default WriteAReviewModal;
