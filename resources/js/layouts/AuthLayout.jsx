import Button from "../components/ui/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { v4 as uuidv4 } from "uuid";
import { router } from "@inertiajs/react";

const authProviders = [
  { id: uuidv4(), name: "facebook", img: "facebook" },
  { id: uuidv4(), name: "google", img: "google" },
  { id: uuidv4(), name: "instagram", img: "instagram" },
  { id: uuidv4(), name: "discord", img: "discord" },
];

const AuthLayout = ({ children }) => {
  const authClickHandler = (method) => {
    window.location.href = `/oauth/make/${method}`;
  };

  return (
    <div className="relative grid items-center grid-cols-7">
      <div className="lg:grid items-center min-h-screen bg-white px-6 py-16 w-full max-w-[520px] mx-auto lg:mx-0 lg:max-w-none col-span-full lg:col-span-3 xl:col-span-2 xl:px-12">
        <div>
          {children}

          <div className="mt-8 mb-4 w-full flex items-center gap-4">
            <div className="h-[0.1px] grow bg-slate-300"></div>
            <div className="text-slate-500">Or continue with</div>
            <div className="h-[0.1px] grow bg-slate-300"></div>
          </div>

          <div className="flex items-center justify-center gap-4">
            {authProviders.map((provider) => (
              <Button
                key={provider.id}
                variant="outlined"
                className="border-0 grid items-center justify-center max-w-fit"
                onClick={() => authClickHandler(provider.name)}
              >
                <div className="max-h-[28px] max-w-[28px]">
                  <LazyLoadImage
                    src={`/logo/${provider.img}.svg`}
                    alt={provider.name}
                    width={28}
                    height={28}
                    effect="blur"
                  />
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="-z-10 fixed top-0 left-0 right-0 bottom-0 bg-white hidden lg:block">
        <div className="max-h-screen">
          <LazyLoadImage
            src="/auth-banner.webp"
            alt="banner"
            width="100%"
            effect="blur"
            className="min-h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
