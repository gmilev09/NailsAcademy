import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import Enroll from './pages/Enroll';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProductDetail from './pages/ProductDetail';
import Returns from './pages/Returns';
import Shipping from './pages/Shipping';
import Shop from './pages/Shop';
import Terms from './pages/Terms';
import __Layout from './Layout.jsx';

export const PAGES = {
    "About": About,
    "Cart": Cart,
    "Checkout": Checkout,
    "Contact": Contact,
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
