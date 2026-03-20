import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { products } from "@/data/products";
import type { Product } from "@/types/product";

const Products = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(products);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        <h1 className="font-display text-3xl text-foreground">Nossos Produtos</h1>
        <p className="mt-1 text-muted-foreground">
          Explore nossa curadoria de itens premium
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : items.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
