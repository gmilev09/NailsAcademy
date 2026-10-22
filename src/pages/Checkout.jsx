// RECONSTRUCTED от богатия фрагмент на оригинала (полетата и структурата са 1:1);
// поръчките се записват локално при липса на Netlify API.
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { MapPin, Truck, CreditCard, Package, ShoppingBag, Building2, Home, CheckCircle, LogIn, ImageOff, FileText, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getCartItems, removeCartItem } from "@/lib/cart";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import { COURIERS, OTHER_CITY_OPTION, getCitiesForCourier, getOfficesForCity } from "@/data/delivery";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5;

const selectBaseClass =
  "w-full appearance-none rounded-xl border border-input bg-white px-4 py-2.5 pr-10 text-sm text-gray-700 shadow-xs transition-colors focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60";

function formatItemName(name) {
  return String(name || "").trim();
}

export default function Checkout() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoadingAuth, user, navigateToLogin } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    city: "",
    delivery_type: "office",
    delivery_address: "",
    courier: "econt",
  });
  // Падащи менюта за офиси: избран град и избран офис
  const [officeCity, setOfficeCity] = useState("");
  const [officeChoice, setOfficeChoice] = useState("");
  // Фактура на фирма
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    company_name: "",
    company_eik: "",
    company_vat: "",
    company_mol: "",
    company_address: "",
  });

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch {
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    if (!isLoadingAuth) load();
  }, [isAuthenticated, isLoadingAuth]);

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, customer_email: prev.customer_email || user.email }));
    }
    if (user?.name || user?.user_metadata?.full_name) {
      const name = user.name || user.user_metadata.full_name;
      setFormData((prev) => ({ ...prev, customer_name: prev.customer_name || name }));
    }
  }, [user]);

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.product_price) * item.quantity, 0);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  // Смяна на куриер — нулира избора на офис
  const handleCourierChange = (courier) => {
    setFormData((prev) => ({ ...prev, courier, delivery_address: "" }));
    setOfficeCity("");
    setOfficeChoice("");
  };

  // Смяна на типа доставка — нулира адресните полета
  const handleDeliveryTypeChange = (delivery_type) => {
    setFormData((prev) => ({ ...prev, delivery_type, city: "", delivery_address: "" }));
    setOfficeCity("");
    setOfficeChoice("");
  };

  // Избор на град от падащото меню (или „Друг град" за ръчно въвеждане)
  const handleOfficeCityChange = (value) => {
    setOfficeCity(value);
    setOfficeChoice("");
    setFormData((prev) => ({
      ...prev,
      city: value === OTHER_CITY_OPTION ? "" : value,
      delivery_address: "",
    }));
  };

  // Избор на конкретен офис — записва го като адрес за доставка
  const handleOfficeChoiceChange = (value) => {
    setOfficeChoice(value);
    setFormData((prev) => ({ ...prev, delivery_address: value }));
  };

  const validate = () => {
    const next = {};
    if (!formData.customer_name.trim()) next.customer_name = "Въведете име и фамилия.";
    if (!formData.customer_phone.trim()) next.customer_phone = "Въведете телефон.";
    if (!formData.customer_email.trim()) next.customer_email = "Въведете имейл.";
    if (!formData.city.trim()) next.city = formData.delivery_type === "office" ? "Изберете град." : "Въведете град.";
    if (!formData.delivery_address.trim()) {
      next.delivery_address = formData.delivery_type === "office" ? "Изберете офис на куриера." : "Въведете адрес за доставка.";
    }
    if (wantsInvoice) {
      if (!invoiceData.company_name.trim()) next.company_name = "Въведете име на фирмата.";
      if (!invoiceData.company_eik.trim()) next.company_eik = "Въведете ЕИК/Булстат.";
    }
    if (!agreedToTerms) next.terms = "Задължително съгласие с Общите условия.";
    if (!agreedToPrivacy) next.privacy = "Задължително съгласие с Политиката за лични данни.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) {
      toast.error("Попълнете задължителните полета.");
      return;
    }
    setIsPlacingOrder(true);
    try {
      await base44.entities.Order.create({
        ...formData,
        needs_invoice: wantsInvoice,
        company_name: wantsInvoice ? invoiceData.company_name.trim() : "",
        company_eik: wantsInvoice ? invoiceData.company_eik.trim() : "",
        company_vat: wantsInvoice ? invoiceData.company_vat.trim() : "",
        company_mol: wantsInvoice ? invoiceData.company_mol.trim() : "",
        company_address: wantsInvoice ? invoiceData.company_address.trim() : "",
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          product_name: item.product_name,
          product_price: item.product_price,
          quantity: item.quantity,
        })),
        subtotal: Number(subtotal.toFixed(2)),
        shipping_cost: shippingCost,
        total: Number(total.toFixed(2)),
        payment_method: "cod",
        status: "new",
      });
      await Promise.all(cartItems.map((item) => removeCartItem(item.id).catch(() => {})));
      setOrderPlaced(true);
      window.scrollTo(0, 0);
    } catch {
      toast.error("Поръчката не можа да бъде завършена. Опитайте отново.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isLoadingAuth || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-40 pb-24 px-6 text-center text-gray-500">
        Зареждане...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-40 pb-24 px-6">
        <div className="container mx-auto max-w-md text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-9 h-9 text-rose-500" />
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-4">Необходим е <span className="font-semibold text-rose-500">вход</span></h1>
          <p className="text-gray-500 mb-8">За да завършите поръчката, влезте в профила си.</p>
          <Button onClick={navigateToLogin} className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-10 py-6">
            Вход / Регистрация
          </Button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-40 pb-24 px-6">
        <div className="container mx-auto max-w-lg text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Благодарим за <span className="font-semibold text-rose-500">поръчката!</span>
            </h1>
            <p className="text-gray-500 mb-10">
              Поръчката е приета успешно. Ще се свържем с Вас за потвърждение. Доставка: 5–7 работни дни с наложен платеж.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/Shop">
                <Button variant="outline" className="rounded-full px-8 border-rose-200 text-rose-600 hover:bg-rose-50">
                  Продължи пазаруването
                </Button>
              </Link>
              <Link to="/">
                <Button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-8">
                  Към началото
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-40 pb-24 px-6 text-center">
        <ShoppingBag className="w-14 h-14 text-rose-200 mx-auto mb-6" />
        <h1 className="text-3xl font-light text-gray-900 mb-4">Количката ви е празна</h1>
        <Link to="/Shop">
          <Button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-8 mt-4">
            Към магазина
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 italic">
            Завършване на <span className="font-semibold text-rose-500">поръчката</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <motion.div className="bg-white rounded-2xl p-6 shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-400" />
                Данни за контакт
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Име и фамилия *</Label>
                  <Input
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    className={errors.customer_name ? "border-red-500" : ""}
                    placeholder="Иван Иванов"
                  />
                  {errors.customer_name && <p className="text-red-500 text-sm">{errors.customer_name}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Телефон *</Label>
                  <Input
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                    className={errors.customer_phone ? "border-red-500" : ""}
                    placeholder="+359 888 123 456"
                  />
                  {errors.customer_phone && <p className="text-red-500 text-sm">{errors.customer_phone}</p>}
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label>Имейл *</Label>
                  <Input
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                    className={errors.customer_email ? "border-red-500" : ""}
                    placeholder="email@example.com"
                    readOnly
                  />
                  <p className="text-xs text-gray-400">Използва се имейлът от вашия акаунт.</p>
                  {errors.customer_email && <p className="text-red-500 text-sm">{errors.customer_email}</p>}
                </div>
              </div>
            </motion.div>

            {/* Delivery Info */}
            <motion.div className="bg-white rounded-2xl p-6 shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-rose-400" />
                Доставка
              </h2>
              <div className="space-y-4">
                {/* Тип доставка */}
                <div className="space-y-2">
                  <Label>Тип доставка *</Label>
                  <RadioGroup
                    value={formData.delivery_type}
                    onValueChange={handleDeliveryTypeChange}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="office" id="office" />
                      <Label htmlFor="office" className="flex items-center gap-2 cursor-pointer">
                        <Building2 className="w-4 h-4" /> До офис
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="address" id="address" />
                      <Label htmlFor="address" className="flex items-center gap-2 cursor-pointer">
                        <Home className="w-4 h-4" /> До адрес
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Куриер — офисите зависят от него */}
                <div className="space-y-2">
                  <Label>Куриер *</Label>
                  <RadioGroup
                    value={formData.courier}
                    onValueChange={handleCourierChange}
                    className="flex gap-4"
                  >
                    {COURIERS.map((courier) => (
                      <div key={courier.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={courier.value} id={courier.value} />
                        <Label htmlFor={courier.value} className="cursor-pointer">{courier.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {formData.delivery_type === "office" ? (
                  <>
                    {/* Град — падащо меню */}
                    <div className="space-y-2">
                      <Label>Град *</Label>
                      <div className="relative">
                        <select
                          value={officeCity}
                          onChange={(e) => handleOfficeCityChange(e.target.value)}
                          className={`${selectBaseClass} ${errors.city ? "border-red-500" : ""} ${officeCity ? "" : "text-gray-400"}`}
                        >
                          <option value="" disabled>Изберете град…</option>
                          {getCitiesForCourier(formData.courier).map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                          <option value={OTHER_CITY_OPTION}>Друг град — въвеждам ръчно…</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>

                    {officeCity === OTHER_CITY_OPTION ? (
                      <>
                        {/* Ръчно въвеждане на град */}
                        <div className="space-y-2">
                          <Label>Вашият град *</Label>
                          <Input
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            className={`rounded-xl ${errors.city ? "border-red-500" : ""}`}
                            placeholder="Въведете град"
                          />
                          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Офис на куриера *</Label>
                          <Input
                            value={formData.delivery_address}
                            onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
                            className={`rounded-xl ${errors.delivery_address ? "border-red-500" : ""}`}
                            placeholder="Име/адрес на офиса…"
                          />
                          {errors.delivery_address && <p className="text-red-500 text-sm">{errors.delivery_address}</p>}
                        </div>
                      </>
                    ) : (
                      /* Офис — падащо меню за избрания град */
                      <div className="space-y-2">
                        <Label>Офис на куриера *</Label>
                        <div className="relative">
                          <select
                            value={officeChoice}
                            onChange={(e) => handleOfficeChoiceChange(e.target.value)}
                            disabled={!officeCity}
                            className={`${selectBaseClass} ${errors.delivery_address ? "border-red-500" : ""} ${officeChoice ? "" : "text-gray-400"}`}
                          >
                            <option value="" disabled>
                              {officeCity ? "Изберете офис…" : "Първо изберете град"}
                            </option>
                            {officeCity && getOfficesForCity(formData.courier, officeCity).map((office) => (
                              <option key={office.name} value={office.name}>{office.name}</option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        {errors.delivery_address && <p className="text-red-500 text-sm">{errors.delivery_address}</p>}
                        {officeChoice && (
                          <p className="text-xs text-gray-400 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                            {officeChoice}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Доставка до адрес — свободен текст */}
                    <div className="space-y-2">
                      <Label>Град *</Label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className={`rounded-xl ${errors.city ? "border-red-500" : ""}`}
                        placeholder="София"
                      />
                      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Адрес за доставка *</Label>
                      <Input
                        value={formData.delivery_address}
                        onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
                        className={`rounded-xl ${errors.delivery_address ? "border-red-500" : ""}`}
                        placeholder="ул. Примерна 1, ап. 5"
                      />
                      {errors.delivery_address && <p className="text-red-500 text-sm">{errors.delivery_address}</p>}
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div className="bg-white rounded-2xl p-6 shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-rose-400" />
                Плащане
              </h2>
              <div className="flex items-center gap-3 p-4 bg-rose-50 rounded-xl">
                <Package className="w-6 h-6 text-rose-500" />
                <div>
                  <p className="font-medium text-gray-900">Наложен платеж</p>
                  <p className="text-sm text-gray-500">Плащате при получаване на пратката</p>
                </div>
              </div>
            </motion.div>

            {/* Фактура на фирма */}
            <motion.div className="bg-white rounded-2xl p-6 shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="invoice"
                  checked={wantsInvoice}
                  onCheckedChange={(checked) => setWantsInvoice(Boolean(checked))}
                  className="mt-0.5"
                />
                <div>
                  <Label htmlFor="invoice" className="text-base font-semibold text-gray-900 cursor-pointer inline-flex items-center gap-2">
                    <FileText className="w-5 h-5 text-rose-400" />
                    Желая фактура на фирма
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">Ще издадем фактура към въведените фирмени данни.</p>
                </div>
              </div>

              {wantsInvoice && (
                <div className="mt-5 pt-5 border-t border-gray-100 grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Име на фирмата *</Label>
                    <Input
                      value={invoiceData.company_name}
                      onChange={(e) => setInvoiceData({ ...invoiceData, company_name: e.target.value })}
                      className={`rounded-xl ${errors.company_name ? "border-red-500" : ""}`}
                      placeholder="Фирма ЕООД"
                    />
                    {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>ЕИК / Булстат *</Label>
                    <Input
                      value={invoiceData.company_eik}
                      onChange={(e) => setInvoiceData({ ...invoiceData, company_eik: e.target.value })}
                      className={`rounded-xl ${errors.company_eik ? "border-red-500" : ""}`}
                      placeholder="123456789"
                    />
                    {errors.company_eik && <p className="text-red-500 text-sm">{errors.company_eik}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>№ по ДДС</Label>
                    <Input
                      value={invoiceData.company_vat}
                      onChange={(e) => setInvoiceData({ ...invoiceData, company_vat: e.target.value })}
                      className="rounded-xl"
                      placeholder="BG123456789 (ако е приложимо)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>МОЛ</Label>
                    <Input
                      value={invoiceData.company_mol}
                      onChange={(e) => setInvoiceData({ ...invoiceData, company_mol: e.target.value })}
                      className="rounded-xl"
                      placeholder="Име на управителя"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label>Адрес на фирмата</Label>
                    <Input
                      value={invoiceData.company_address}
                      onChange={(e) => setInvoiceData({ ...invoiceData, company_address: e.target.value })}
                      className="rounded-xl"
                      placeholder="гр. Петрич, ул. Примерна 1"
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Terms */}
            <motion.div className="bg-white rounded-2xl p-6 shadow-sm space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-start space-x-3">
                <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} className={errors.terms ? "border-red-500" : ""} />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  Съгласен/а съм с <Link to="/Terms" className="text-rose-500 hover:underline">Общите условия</Link> *
                </Label>
              </div>
              {errors.terms && <p className="text-red-500 text-sm ml-6">{errors.terms}</p>}

              <div className="flex items-start space-x-3">
                <Checkbox id="privacy" checked={agreedToPrivacy} onCheckedChange={setAgreedToPrivacy} className={errors.privacy ? "border-red-500" : ""} />
                <Label htmlFor="privacy" className="text-sm cursor-pointer">
                  Съгласен/а съм с <Link to="/PrivacyPolicy" className="text-rose-500 hover:underline">Политиката за лични данни</Link> *
                </Label>
              </div>
              {errors.privacy && <p className="text-red-500 text-sm ml-6">{errors.privacy}</p>}
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div className="bg-white rounded-2xl p-6 shadow-sm sticky top-32" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-rose-400" />
                Вашата поръчка
              </h2>

              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      {item.product_image ? (
                        <img src={item.product_image} alt={formatItemName(item.product_name)} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ImageOff className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{formatItemName(item.product_name)}</p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{(item.product_price * item.quantity).toFixed(2)}€</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <p className="flex justify-between text-sm text-gray-600">
                  <span>Междинна сума</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </p>
                <p className="flex justify-between text-sm text-gray-600">
                  <span>Доставка</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                    {shippingCost === 0 ? "Безплатна" : `${shippingCost.toFixed(2)}€`}
                  </span>
                </p>
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-rose-500">
                    Още {(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}€ за безплатна доставка!
                  </p>
                )}
                <p className="flex justify-between font-semibold text-gray-900 border-t pt-2">
                  <span>Общо</span>
                  <span className="text-rose-500 text-lg">{total.toFixed(2)}€</span>
                </p>
              </div>

              <Button
                className="w-full mt-6 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full py-6"
                disabled={isPlacingOrder}
                onClick={handlePlaceOrder}
              >
                {isPlacingOrder ? "Изпращане..." : "Потвърди поръчката"}
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
                <Truck className="w-4 h-4 text-rose-400" />
                Доставка: 5–7 работни дни
              </p>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
