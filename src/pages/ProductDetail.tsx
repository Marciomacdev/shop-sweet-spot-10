import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container flex flex-col items-center justify-center py-32 text-center">
          <h1 className="font-display text-2xl">Produto não encontrado</h1>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/products")}>
            Voltar à listagem
          </Button>
        </div>
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
          onClick={() => navigate("/products")}
          className="mb-6 text-muted-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Voltar
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden rounded-lg border bg-muted"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <h1 className="font-display text-3xl lg:text-4xl text-foreground">
              {product.name}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {product.detailedDescription}
            </p>

            <p className="mt-6 font-display text-3xl text-primary">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>

            <Button size="lg" className="mt-8 w-full sm:w-auto">
              Adicionar ao carrinho
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
