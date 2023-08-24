import Container from "../../components/ui/Container";

const RefundPage = () => {
    return (
        <Container className="text-slate-600 text px-4 py-16">
            <h4 className="text-xl font-semibold text-center pb-8">
                INFINITY CUSTOMS - REFUND POLICY
            </h4>
            <p>Last updated: April 2023</p>

            <br />

            <p>
                <strong> Infinity Custom </strong>is a company that prints
                various products according to the customer’s wishes, which means
                that all products are unique and produced only once ordered.
                This also means that
                <strong> exchanges are not supported</strong> if you order the
                wrong size, color, or simply change your mind.
            </p>
            <br />
            <p>
                However, in the case of a damaged product or a manufacturing
                error, Infinity Custom offers a free replacement or a refund if
                you contact us within 30 days of product delivery. Please get in
                touch with our team using the
                <a
                    href="submit_issue.html"
                    rel="external nofollow noopener"
                    target="_blank"
                    className="text-blue-400 hover:underline"
                >
                    Submit issue
                </a>
                form and provide a clear photo showing the issue.
            </p>
            <br />
            <p>
                If there’s an issue affecting multiple products that use the
                same design, an additional photo (or video) of all affected
                items visible in one frame will be required for confirmation
                purposes.
            </p>
            <br />
            <p>
                Please note that Infinity Custom will not be held responsible
                and will not offer replacements or refunds if the customer
                orders the wrong size or color. In case of an unsuccessful
                delivery, a partial refund will be issued.
            </p>
        </Container>
    );
};
export default RefundPage;
