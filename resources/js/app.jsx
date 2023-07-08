import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import "react-lazy-load-image-component/src/effects/blur.css";

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

    if (name.startsWith("public/"))
      page.default.layout = (page) => <PublicLayout children={page} />;
    else if (name.startsWith("auth/"))
      page.default.layout = (page) => <AuthLayout children={page} />;
    // else if(name.startsWith('/dashboard'))
    //   page.default.layout = page => <DashboardLayout children={page} />

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  // ...
});
