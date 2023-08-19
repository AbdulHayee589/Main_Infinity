import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import "react-lazy-load-image-component/src/effects/blur.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import AccountLayout from "./layouts/AccountLayout";
import EditorLayout from "./layouts/EditorLayout";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

createInertiaApp({
  remember: (key, value) => {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    }
  },
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
    let page = pages[`./Pages/${name}.jsx`];

    if (name.startsWith("user/"))
      page.default.layout = (page) => (
        <AppLayout>
          <AccountLayout children={page} />
        </AppLayout>
      );
    else if (name.startsWith("auth/"))
      page.default.layout = (page) => <AuthLayout children={page} />;
    else if (name.startsWith("shop/editor/"))
      page.default.layout = (page) => <EditorLayout children={page} />;
    else page.default.layout = (page) => <AppLayout children={page} />;
    // else if(name.startsWith('/dashboard'))
    //   page.default.layout = page => <DashboardLayout children={page} />

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <I18nextProvider i18n={i18n}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          limit={3}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="hidden md:block"
        />

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="md:hidden w-full px-12"
        />
        <App {...props} />
      </I18nextProvider>
    );
  },
  // ...
});
