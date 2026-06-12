import { lazy } from 'react';
import Home from './pages/Home';
import __Layout from './Layout.jsx';

// The landing page (Home) is imported eagerly so it renders immediately.
// Every other route is lazy-loaded, so its JavaScript is only fetched when the
// route is visited. This keeps the initial bundle small for faster FCP/LCP and
// less main-thread work on load (better INP/FID).
const About = lazy(() => import('./pages/About'));
const Auth = lazy(() => import('./pages/Auth'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Contact = lazy(() => import('./pages/Contact'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Courses = lazy(() => import('./pages/Courses'));
const Enroll = lazy(() => import('./pages/Enroll'));
const Gallery = lazy(() => import('./pages/Gallery'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Returns = lazy(() => import('./pages/Returns'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Shop = lazy(() => import('./pages/Shop'));
const Terms = lazy(() => import('./pages/Terms'));

export const PAGES = {
    "About": About,
    "Auth": Auth,
    "Cart": Cart,
    "Checkout": Checkout,
    "Contact": Contact,
    "CookiePolicy": CookiePolicy,
    "Courses": Courses,
    "Enroll": Enroll,
    "Gallery": Gallery,
    "Home": Home,
    "PrivacyPolicy": PrivacyPolicy,
    "ProductDetail": ProductDetail,
    "Returns": Returns,
    "Shipping": Shipping,
    "Shop": Shop,
    "Terms": Terms,
};

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};

export default pagesConfig;
