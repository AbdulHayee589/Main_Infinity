import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight, HiPencilSquare } from "react-icons/hi2";
import Button from "../ui/Button";
import ProductRating from "./ProductRating";
import { usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const ProductRatingsListing = ({ openReviewModal, ratings = [] }) => {
    const { t } = useTranslation();
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const { props } = usePage();
    console.log(ratings);

    const handlePreviousClick = () => {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        if (currentPage === totalPages) return;
        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        if (ratings.length === 0) setTotalPages(0);
        else setTotalPages(Math.ceil(ratings.length / 7));
    }, [ratings]);

    const indexOfLastItem = currentPage * 7;
    const indexOfFirstItem = indexOfLastItem - 7;
    let displayedRatings = ratings?.slice(indexOfFirstItem, indexOfLastItem);

    if (currentPage === totalPages && ratings?.length % 7 !== 0) {
        displayedRatings = ratings?.slice(indexOfFirstItem);
    }

    const prevBtnDisabled = currentPage === 1;
    const nextBtnDisabled =
        currentPage === totalPages && ratings?.length % 7 !== 0;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                {t("productDetailsPage.ratings.title")}
            </h1>

            <div className="flex items-center justify-between">
                {props.auth.user?.id ? (
                    <Button
                        onClick={openReviewModal}
                        variant="outlined"
                        className="flex justify-center items-center gap-2"
                    >
                        {t("productDetailsPage.ratings.writeAReviewBtn")}
                        <HiPencilSquare className="text-xl" />
                    </Button>
                ) : (
                    <span className="text-slate-500">
                        {t("productDetailsPage.ratings.notLoggedMsg")}
                    </span>
                )}

                {!!ratings.length && totalPages > 1 && (
                    <div className="flex justify-end items-center gap-1">
                        <button
                            onClick={handlePreviousClick}
                            disabled={prevBtnDisabled}
                            className="p-2 border rounded-md border-slate-200 text-2xl text-slate-500 disabled:text-slate-200"
                        >
                            <HiChevronLeft />
                        </button>

                        <button
                            onClick={handleNextClick}
                            disabled={nextBtnDisabled}
                            className="p-2 border rounded-md border-slate-200 text-2xl text-slate-500 disabled:text-slate-200"
                        >
                            <HiChevronRight />
                        </button>
                    </div>
                )}
            </div>

            {displayedRatings.length > 0 ? (
                <div className="max-w-full overflow-auto grid">
                    {displayedRatings.map((rating) => (
                        <ProductRating
                            key={rating.id}
                            rating={rating}
                            className="border-b last:border-b-0 border-slate-100"
                        />
                    ))}
                </div>
            ) : (
                <div className="flex w-full py-8 items-center text-slate-500">
                    No ratings to be displayed
                </div>
            )}
        </div>
    );
};
export default ProductRatingsListing;
