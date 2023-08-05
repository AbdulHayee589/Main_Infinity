import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight, HiPencilSquare } from "react-icons/hi2";
import Button from "../ui/Button";
import HeaderText from "../ui/HeaderText";
import ProductReview from "../product/ProductReview";

const ProductReviewsListing = ({ openReviewModal, review = [] }) => {
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePreviousClick = () => {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        if (currentPage === totalPages) return;
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        if (review.length === 0) setTotalPages(0);
        else setTotalPages(Math.ceil(review.length / 5));
    }, [review]);

    const indexOfLastItem = currentPage * 5;
    const indexOfFirstItem = indexOfLastItem - 5;
    let currentData = review?.slice(indexOfFirstItem, indexOfLastItem);

    if (currentPage === totalPages && review?.length % 5 !== 0) {
        currentData = review?.slice(indexOfFirstItem);
    }

    const prevBtnDisabled = currentPage === 1;
    const nextBtnDisabled =
        currentPage === totalPages && review?.length % 5 !== 0;

    return (
        <div>
            <div className="flex justify-between items-center gap-2">
                <HeaderText className="mb-0">Reviews</HeaderText>
                <Button
                    onClick={openReviewModal}
                    size="sm"
                    variant="outlined"
                    className="flex justify-center items-center gap-2"
                >
                    Write a Review
                    <HiPencilSquare className="text-xl" />
                </Button>
            </div>

            {!!review.length && (
                <div className="flex justify-end items-center gap-2 my-6">
                    <button
                        onClick={handlePreviousClick}
                        disabled={prevBtnDisabled}
                        className="p-2 border border-slate-200 text-2xl text-slate-500 disabled:text-slate-200"
                    >
                        <HiChevronLeft />
                    </button>

                    <button
                        onClick={handleNextClick}
                        disabled={nextBtnDisabled}
                        className="p-2 border border-slate-200 text-2xl text-slate-500 disabled:text-slate-200"
                    >
                        <HiChevronRight />
                    </button>
                </div>
            )}

            <div className="max-w-full overflow-auto grid">
                {currentData.map((review) => (
                    <ProductReview key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
};
export default ProductReviewsListing;
