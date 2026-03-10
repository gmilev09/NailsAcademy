import { useState, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ShoppingBag, 
  Truck, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Loader2,
  Package,
  Building2,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { toast } from "sonner";

const SHIPPING_COST = 5; // 5 EUR
const FREE_SHIPPING_THRESHOLD = 50; // Free shipping over 50 EUR

export default function Checkout() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    city: "",
    delivery_type: "office",
    delivery_address: "",
    courier: "econt"
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderComplete, setOrderComplete] = useState(false);
  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    base44.auth.me().then((u) => {
      setUser(u);
      setFormData(prev => ({
        ...prev,
        customer_email: u.email || "",
        customer_name: u.full_name || ""
      }));
    }).catch(() => setUser(null));
  }, []);

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: () => base44.entities.CartItem.filter({ user_email: user?.email }),
    enabled: !!user,
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  const createOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      // Create order
      const order = await base44.entities.Order.create(orderData);
      
      // Send email notification to admin
      const itemsList = cartItems.map(item => 
        `- ${item.product_name} x${item.quantity} = ${(item.product_price * item.quantity).toFixed(2)}€`
      ).join("\n");
      
      // Send confirmation to customer
      await base44.integrations.Core.SendEmail({
        to: orderData.customer_email,
        subject: "Потвърждение на поръчката — Nails Academy",
        body: `Здравейте, ${orderData.customer_name}!\n\nВашата поръчка беше получена успешно.\n\nПродукти:\n${itemsList}\n\nОбщо: ${orderData.total.toFixed(2)}€\n\nЩе се свържем с вас до 48 часа.\n\nС уважение,\nNails Academy`
      });

      await base44.integrations.Core.SendEmail({
        to: "bozhinova.nails.academy@gmail.com",
        subject: `Нова поръчка от ${orderData.customer_name}`,
        body: `
Нова поръчка е направена!

Клиент: ${orderData.customer_name}
Имейл: ${orderData.customer_email}
Телефон: ${orderData.customer_phone}

Доставка:
Град: ${orderData.city}
Тип: ${orderData.delivery_type === "office" ? "До офис" : "До адрес"}
Адрес/Офис: ${orderData.delivery_address}
Куриер: ${orderData.courier === "econt" ? "Еконт" : "Спиди"}

Продукти:
${itemsList}

Междинна сума: ${orderData.subtotal.toFixed(2)}€
Доставка: ${orderData.shipping_cost.toFixed(2)}€
ОБЩО: ${orderData.total.toFixed(2)}€

Плащане: Наложен платеж
        `
      });
      
      // Clear cart
      for (const item of cartItems) {
        await base44.entities.CartItem.delete(item.id);
      }
      
      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      base44.analytics.track({ eventName: "purchase_product", properties: { total, items: cartItems.length } });
      setOrderComplete(true);
    },
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customer_name.trim()) newErrors.customer_name = "Въведете име";
    if (!formData.customer_email.trim()) newErrors.customer_email = "Въведете имейл";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer_email)) {
      newErrors.customer_email = "Невалиден имейл";
    }
    if (!formData.customer_phone.trim()) newErrors.customer_phone = "Въведете телефон";
    else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.customer_phone.replace(/\s/g, ''))) {
      newErrors.customer_phone = "Невалиден телефон";
    }
    if (!formData.city.trim()) newErrors.city = "Въведете град";
    if (!formData.delivery_address.trim()) newErrors.delivery_address = "Въведете адрес или офис";
    if (!agreedToTerms) newErrors.terms = "Трябва да се съгласите с общите условия";
    if (!agreedToPrivacy) newErrors.privacy = "Трябва да се съгласите с политиката за лични данни";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Моля, попълнете всички задължителни полета");
      return;
    }
    
    createOrderMutation.mutate({
      ...formData,
      items: cartItems.map(item => ({
        product_id: item.product_id,
        name: item.product_name,
        price: item.product_price,
        quantity: item.quantity
      })),
      subtotal,
      shipping_cost: shippingCost,
      total,
      payment_method: "cod"
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-rose-50/20 pt-32 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <ShoppingBag className="w-16 h-16 text-rose-300 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Моля, влезте в акаунта си</h1>
          <p className="text-gray-500 mb-8">За да завършите поръчката си, трябва да сте влезли в акаунта си.</p>
          <Button 
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-8"
          >
            Вход в акаунт
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-rose-50/20 flex items-center justify-center p-6">
        <motion.div 
          className="bg-white rounded-3xl p-10 shadow-xl border border-pink-100 text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Поръчката е успешно получена ✅</h2>
          <p className="text-rose-500 font-medium mb-4">Заявката е изпратена, очаквайте отговор до 48 часа.</p>
          <p className="text-gray-500 mb-8">
            Благодарим ви за поръчката! Ще получите имейл потвърждение и ще се свържем с вас.
          </p>
          <Link to={createPageUrl("Home")}>
            <Button className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full px-8">
              Към началната страница
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-rose-50/20 pt-32 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <ShoppingBag className="w-16 h-16 text-rose-300 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Количката е празна</h1>
          <p className="text-gray-500 mb-8">Добавете продукти, за да продължите.</p>
          <Link to={createPageUrl("Shop")}>
            <Button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-8">
              Към магазина
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-rose-50/20">
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              Финализиране на <span className="font-semibold text-rose-500">поръчката</span>
            </h1>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Info */}
                <motion.div 
                  className="bg-white rounded-2xl p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
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
                      />
                      {errors.customer_email && <p className="text-red-500 text-sm">{errors.customer_email}</p>}
                    </div>
                  </div>
                </motion.div>

                {/* Delivery Info */}
                <motion.div 
                  className="bg-white rounded-2xl p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-rose-400" />
                    Доставка
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Град *</Label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className={errors.city ? "border-red-500" : ""}
                        placeholder="София"
                      />
                      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Тип доставка *</Label>
                      <RadioGroup 
                        value={formData.delivery_type} 
                        onValueChange={(value) => setFormData({...formData, delivery_type: value})}
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

                    <div className="space-y-2">
                      <Label>{formData.delivery_type === "office" ? "Офис на куриера *" : "Адрес за доставка *"}</Label>
                      <Input
                        value={formData.delivery_address}
                        onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
                        className={errors.delivery_address ? "border-red-500" : ""}
                        placeholder={formData.delivery_type === "office" ? "Офис Еконт/Спиди..." : "ул. Примерна 1, ап. 5"}
                      />
                      {errors.delivery_address && <p className="text-red-500 text-sm">{errors.delivery_address}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Куриер *</Label>
                      <RadioGroup 
                        value={formData.courier} 
                        onValueChange={(value) => setFormData({...formData, courier: value})}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="econt" id="econt" />
                          <Label htmlFor="econt" className="cursor-pointer">Еконт</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="speedy" id="speedy" />
                          <Label htmlFor="speedy" className="cursor-pointer">Спиди</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </motion.div>

                {/* Payment */}
                <motion.div 
                  className="bg-white rounded-2xl p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
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

                {/* Terms */}
                <motion.div 
                  className="bg-white rounded-2xl p-6 shadow-sm space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={setAgreedToTerms}
                      className={errors.terms ? "border-red-500" : ""}
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      Съгласен/а съм с <Link to={createPageUrl("Terms")} className="text-rose-500 hover:underline" target="_blank">Общите условия</Link> *
                    </Label>
                  </div>
                  {errors.terms && <p className="text-red-500 text-sm ml-6">{errors.terms}</p>}
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="privacy" 
                      checked={agreedToPrivacy}
                      onCheckedChange={setAgreedToPrivacy}
                      className={errors.privacy ? "border-red-500" : ""}
                    />
                    <Label htmlFor="privacy" className="text-sm cursor-pointer">
                      Съгласен/а съм с <Link to={createPageUrl("PrivacyPolicy")} className="text-rose-500 hover:underline" target="_blank">Политиката за лични данни</Link> *
                    </Label>
                  </div>
                  {errors.privacy && <p className="text-red-500 text-sm ml-6">{errors.privacy}</p>}
                </motion.div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <motion.div 
                  className="bg-white rounded-2xl p-6 shadow-sm sticky top-32"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-rose-400" />
                    Вашата поръчка
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center">
                        <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          {item.product_image ? (
                            <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.product_name}</p>
                          <p className="text-xs text-gray-500">x{item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{(item.product_price * item.quantity).toFixed(2)}€</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Междинна сума</span>
                      <span>{subtotal.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Доставка</span>
                      <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                        {shippingCost === 0 ? "Безплатна" : `${shippingCost.toFixed(2)}€`}
                      </span>
                    </div>
                    {subtotal < FREE_SHIPPING_THRESHOLD && (
                      <p className="text-xs text-rose-500">
                        Още {(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}€ за безплатна доставка!
                      </p>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold text-gray-900">
                      <span>Общо</span>
                      <span className="text-rose-500 text-lg">{total.toFixed(2)}€</span>
                    </div>
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
                    <Truck className="w-4 h-4 text-rose-400" />
                    Доставка: 1–3 работни дни
                  </p>
                  <Button 
                    type="submit"
                    disabled={createOrderMutation.isPending}
                    className="w-full mt-3 bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full py-6"
                  >
                    {createOrderMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Обработва се...
                      </>
                    ) : (
                      "Завърши поръчката"
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
