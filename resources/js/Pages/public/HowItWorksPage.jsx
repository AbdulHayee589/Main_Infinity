import Button from "../../components/ui/Button";
import { FaChevronRight } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Container from "../../components/ui/Container";

const steps = [
  {
    id: uuidv4(),
    title: "Create your design",
    img: "create-product.webp",
    desc: "Use our easy-to-use design tool to create your own custom design or upload your existing artwork.",
  },
  {
    id: uuidv4(),
    title: "Choose your product",
    img: "choose-product.webp",
    desc: "Select from our wide variety of products, including t-shirts, hats, mugs, and more.",
  },
  {
    id: uuidv4(),
    title: "Receive your products",
    img: "recieve-product.webp",
    desc: "Once your order is placed, we'll print and ship your products directly to your door.",
  },
];

const HowItWorksPage = () => {
  return (
    <div className="bg-blue-50">
      <div className="bg-gray-900 px-4 py-16">
        <div className="mx-auto w-fit text-white text-center grid gap-6">
          <h1 className="font-bold text-xl md:text-2xl capitalize">
            How customizing works?
          </h1>
          <h1 className="font-bold text-2xl xs:text-3xl sm:text-4xl capitalize">
            Get your custom products in 3 ease steps
          </h1>

          <p className="mt-2 text-gold-main font-semibold max-w-2xl mx-auto text-base md:text-lg">
            Infinity Custom makes it easy to create custom products
            for your business or personal use. Follow these simple
            steps to get started today!
          </p>

          <Button className="flex justify-center items-center gap-2 md:w-fit md:mx-auto">
            Get Started <FaChevronRight />
          </Button>
        </div>
      </div>

      <Container className="px-4 md:px-6 py-16 flex justify-between items-center flex-col-reverse gap-y-12 text-center lg:flex-row lg:text-left lg:gap-x-12">
        <div className="max-w-4xl">
          <div className="grid justify-center lg:justify-start gap-3 mb-10">
            <h1 className="text-3xl font-bold capitalize text-center">
              What Meets the Standard?
            </h1>
            <div className="flex lg:hidden justify-center items-center">
              <div className="rounded-full w-2 h-1 bg-gold-dark"></div>
              <div className="rounded-full w-2 h-1 bg-blue-50"></div>
              <div className="rounded-full w-12 h-1 bg-gold-dark"></div>
            </div>
          </div>
          <div className="grid gap-6 text-base md:text-lg">
            <p>
              At Infinity Custom, we have a rigorous quality
              control process to ensure that every product meets
              our high standards. Our team carefully inspects each
              item before it is shipped to our customers. We only
              work with the best print providers in the industry,
              who share our commitment to quality and customer
              satisfaction.
            </p>

            <p>
              When you order from Infinity Custom, you can rest
              assured that you are getting a high-quality product
              that has been carefully crafted and inspected to
              meet our standards.
            </p>
          </div>
        </div>
        <div className="hidden lg:block w-full max-w-[96px] xs:max-w-[128px] md:max-w-[164px] lg:max-w-[240px] mx-auto">
          <img
            src="/checked.webp"
            width={512}
            height={512}
            alt="quality-shield.webp"
          />
        </div>
      </Container>

      <Container className="px-4 py-16">
        <div className="grid justify-center gap-3 mb-10 lg:mb-16">
          <h1 className="text-3xl font-bold capitalize text-center">
            Our steps for you
          </h1>
          <div className="flex justify-center items-center">
            <div className="rounded-full w-2 h-1 bg-gold-dark"></div>
            <div className="rounded-full w-2 h-1 bg-blue-50"></div>
            <div className="rounded-full w-12 h-1 bg-gold-dark"></div>
          </div>
        </div>

        <div className="grid gap-8 lg:flex justify-center lg:justify-between">
          {steps.map(({ id, title, img, desc }) => (
            <div
              key={id}
              className="w-full xl:max-w-md flex items-start justify-center gap-6"
            >
              <div className="max-w-[64px] xl:max-w-[96px]">
                <img
                  src={`/${img}`}
                  width={512}
                  height={512}
                  alt={img}
                />
              </div>
              <div>
                <h1 className="text-base md:text-lg xl:text-xl font-bold capitalize">
                  {title}
                </h1>
                <p className="text-sm md:text-base text-gray-500">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default HowItWorksPage;
