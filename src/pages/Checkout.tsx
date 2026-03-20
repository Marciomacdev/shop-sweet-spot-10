import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type Step = "form" | "processing" | "success";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");

  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (field === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (field === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (field === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }
    setForm((p) => ({ ...p, [field]: value }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nome é obrigatório";
    if (form.cardNumber.replace(/\s/g, "").length < 16)
      e.cardNumber = "Número do cartão inválido";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "Formato MM/AA";
    if (form.cvv.length < 3) e.cvv = "CVV inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStep("processing");
    await new Promise((r) => setTimeout(r, 2500));
    clearCart();
    setStep("success");
  };

  if (items.length === 0 && step !== "success") {
    navigate("/cart");
    return null;
  }

  if (step === "processing") {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader2 className="h-12 w-12 text-primary" />
          </motion.div>
          <p className="mt-6 font-display text-xl text-foreground">
            Processando pagamento…
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Por favor, aguarde enquanto confirmamos sua compra
          </p>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen">
        <Header />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-32 text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mt-6 font-display text-3xl text-foreground">
            Compra realizada!
          </h1>
          <p className="mt-2 max-w-md text-muted-foreground">
            Seu pedido foi confirmado com sucesso. Você receberá um e-mail com os
            detalhes em breve.
          </p>
          <Button className="mt-8" onClick={() => navigate("/products")}>
            Continuar comprando
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/cart")}
          className="mb-6 text-muted-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Voltar ao carrinho
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-5"
          >
            <h1 className="font-display text-3xl text-foreground">Pagamento</h1>
            <p className="text-sm text-muted-foreground">
              Dados simulados — nenhuma cobrança real será feita
            </p>

            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="flex items-center gap-2 text-foreground">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="font-medium">Cartão de crédito</span>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="name">Nome no cartão</Label>
                <Input id="name" placeholder="João da Silva" value={form.name} onChange={set("name")} />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="card">Número do cartão</Label>
                <Input id="card" placeholder="0000 0000 0000 0000" value={form.cardNumber} onChange={set("cardNumber")} />
                {errors.cardNumber && <p className="text-xs text-destructive">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="expiry">Validade</Label>
                  <Input id="expiry" placeholder="MM/AA" value={form.expiry} onChange={set("expiry")} />
                  {errors.expiry && <p className="text-xs text-destructive">{errors.expiry}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" value={form.cvv} onChange={set("cvv")} />
                  {errors.cvv && <p className="text-xs text-destructive">{errors.cvv}</p>}
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Pagar {fmt(totalPrice)}
            </Button>
          </motion.form>

          <div className="h-fit rounded-lg border bg-card p-6">
            <h2 className="font-display text-xl text-foreground">Resumo</h2>
            <div className="mt-4 space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-foreground">{product.name}</p>
                    <p className="text-muted-foreground">Qtd: {quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {fmt(product.price * quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4 flex justify-between text-lg font-semibold text-foreground">
              <span>Total</span>
              <span>{fmt(totalPrice)}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
