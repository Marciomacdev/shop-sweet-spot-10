import type { Product } from "@/types/product";
import headphonesImg from "@/assets/products/headphones.jpg";
import smartwatchImg from "@/assets/products/smartwatch.jpg";
import backpackImg from "@/assets/products/backpack.jpg";
import lampImg from "@/assets/products/lamp.jpg";
import mugImg from "@/assets/products/mug.jpg";
import keyboardImg from "@/assets/products/keyboard.jpg";
import toteImg from "@/assets/products/tote.jpg";
import speakerImg from "@/assets/products/speaker.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Fone Wireless Pro",
    description: "Áudio imersivo com cancelamento de ruído ativo.",
    detailedDescription:
      "Experimente o som de alta fidelidade com o Fone Wireless Pro. Equipado com cancelamento de ruído ativo avançado, drivers de 40mm e até 30 horas de bateria. Almofadas de couro sintético ultramacias para conforto prolongado. Conexão Bluetooth 5.3 estável e microfone integrado para chamadas cristalinas.",
    price: 899.9,
    image: headphonesImg,
  },
  {
    id: "2",
    name: "Smartwatch Elite",
    description: "Elegância e tecnologia no seu pulso.",
    detailedDescription:
      "O Smartwatch Elite combina design sofisticado com funcionalidades avançadas. Tela AMOLED de 1.4 polegadas, monitoramento cardíaco 24h, GPS integrado, resistência à água 5ATM e mais de 100 modos de exercício. Bateria que dura até 7 dias com uso normal.",
    price: 1299.9,
    image: smartwatchImg,
  },
  {
    id: "3",
    name: "Mochila Urban Couro",
    description: "Couro legítimo com design minimalista.",
    detailedDescription:
      "Feita artesanalmente em couro legítimo premium, a Mochila Urban oferece 25L de capacidade, compartimento acolchoado para notebook de até 15 polegadas, bolsos internos organizadores e alças ergonômicas ajustáveis. Perfeita para o dia a dia ou viagens curtas.",
    price: 649.9,
    image: backpackImg,
  },
  {
    id: "4",
    name: "Luminária Nordic",
    description: "Iluminação aconchegante para seu espaço.",
    detailedDescription:
      "A Luminária Nordic traz design escandinavo com base em madeira de bambu e cúpula de metal ajustável. Lâmpada LED de 8W com temperatura de cor regulável (2700K-5000K). Braço articulado permite direcionar a luz com precisão. Ideal para mesa de trabalho ou leitura.",
    price: 349.9,
    image: lampImg,
  },
  {
    id: "5",
    name: "Set Canecas Artesanais",
    description: "Cerâmica artesanal em trio elegante.",
    detailedDescription:
      "Conjunto de 3 canecas feitas à mão em cerâmica de alta temperatura. Cada peça é única, com acabamento acetinado e capacidade de 350ml. Resistentes a microondas e lava-louças. Embalagem especial para presente. Toque orgânico e atemporal para sua cozinha.",
    price: 189.9,
    image: mugImg,
  },
  {
    id: "6",
    name: "Teclado Mecânico Studio",
    description: "Precisão e conforto para longas sessões.",
    detailedDescription:
      "Teclado mecânico com switches Cherry MX Brown, ideal para digitação e jogos. Layout ABNT2, retroiluminação RGB personalizável por tecla, keycaps PBT double-shot e construção em alumínio anodizado. Conexão USB-C com cabo destacável. Apoio de pulso magnético incluso.",
    price: 799.9,
    image: keyboardImg,
  },
  {
    id: "7",
    name: "Bolsa Tote Canvas",
    description: "Praticidade sustentável para o dia a dia.",
    detailedDescription:
      "Bolsa tote confeccionada em canvas orgânico de alta gramatura (16oz). Alças reforçadas com costura dupla, bolso interno com zíper e fundo estruturado. Capacidade de 20L, perfeita para compras, praia ou uso diário. Lavável na máquina. Produção ética e sustentável.",
    price: 129.9,
    image: toteImg,
  },
  {
    id: "8",
    name: "Caixa de Som Portátil",
    description: "Som potente que cabe na palma da mão.",
    detailedDescription:
      "Caixa de som Bluetooth 5.2 com 20W de potência e radiador passivo para graves profundos. Certificação IPX7 contra água, bateria de 12 horas e microfone para chamadas. Pareamento de duas caixas para som estéreo. Design compacto com alça de transporte integrada.",
    price: 449.9,
    image: speakerImg,
  },
];
