import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: Props) => {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      onClick={() => navigate(`/products/${product.id}`)}
      className="group cursor-pointer overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg text-foreground">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <p className="mt-3 text-lg font-semibold text-primary">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </motion.article>
  );
};

export default ProductCard;
