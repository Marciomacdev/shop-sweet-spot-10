import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <h1 className="font-display text-3xl text-foreground">Carrinho</h1>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/40" />
            <p className="mt-4 text-lg text-muted-foreground">Seu carrinho está vazio</p>
            <Button variant="outline" className="mt-6" onClick={() => navigate("/products")}>
              Explorar produtos
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map(({ product, quantity }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    className="flex gap-4 rounded-lg border bg-card p-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-24 w-24 flex-shrink-0 rounded-md object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-display text-base text-foreground">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-sm font-medium">
                            {quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => removeItem(product.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {fmt(product.price * quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="h-fit rounded-lg border bg-card p-6">
              <h2 className="font-display text-xl text-foreground">Resumo</h2>
              <div className="mt-4 space-y-2 text-sm">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-muted-foreground">
                    <span>
                      {product.name} × {quantity}
                    </span>
                    <span>{fmt(product.price * quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t pt-4 flex justify-between text-lg font-semibold text-foreground">
                <span>Total</span>
                <span>{fmt(totalPrice)}</span>
              </div>
              <Button className="mt-6 w-full" size="lg" onClick={() => navigate("/checkout")}>
                Finalizar compra
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
