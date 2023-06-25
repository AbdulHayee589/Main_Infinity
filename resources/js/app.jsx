import { createInertiaApp } from '@inertiajs/inertia-react'
import { createRoot } from 'react-dom/client'
import PublicLayout from './layouts/PublicLayout'
import AuthLayout from './layouts/AuthLayout'
import 'react-lazy-load-image-component/src/effects/blur.css';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    let page = pages[`./Pages/${name}.jsx`]

    if(name.startsWith('public/'))
      page.default.layout = page => <PublicLayout children={page} />
    else if(name.startsWith('auth/'))
      page.default.layout = page => <AuthLayout children={page} />

    // page.default.layout = name.startsWith('public/') ? page => <PublicLayout children={page} /> : undefined;
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
},
  // ...
})