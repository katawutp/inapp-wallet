import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FAQ() {
  const faqs = [
    {
      question: "¿Qué son los NFTs de cartas de fútbol?",
      answer:
        "Los NFTs de cartas de fútbol son tokens no fungibles que representan cartas digitales coleccionables de jugadores de fútbol. Cada carta es única y está registrada en la blockchain, garantizando su autenticidad y propiedad.",
    },
    {
      question: "¿Cómo puedo obtener un NFT de carta de fútbol?",
      answer:
        "Puedes obtener un NFT de carta de fútbol reclamándolo en nuestra página de 'Claim NFT' cuando estén disponibles, o comprándolo en el mercado secundario de nuestra plataforma.",
    },
    {
      question: "¿Qué puedo hacer con mis NFTs de cartas de fútbol?",
      answer:
        "Puedes coleccionar, intercambiar o vender tus NFTs de cartas de fútbol. En el futuro, también podrás usarlos en juegos y otras experiencias interactivas dentro de nuestra plataforma.",
    },
    {
      question: "¿Cómo se determina la rareza de una carta?",
      answer:
        "La rareza de una carta se determina por varios factores, incluyendo el rendimiento del jugador en la vida real, logros históricos y la cantidad de cartas emitidas. Las cartas más raras suelen tener ediciones más limitadas.",
    },
    {
      question: "¿Necesito una wallet de criptomonedas para usar la Dapp?",
      answer:
        "Sí, necesitarás una wallet compatible con Ethereum, como MetaMask, para reclamar, comprar, vender o transferir NFTs en nuestra plataforma.",
    },
    {
      question: "¿Qué pasa si pierdo el acceso a mi wallet?",
      answer:
        "Si pierdes el acceso a tu wallet, lamentablemente no podremos recuperar tus NFTs. Es crucial que guardes de forma segura tu frase semilla y claves privadas.",
    },
  ];

  return (
    <div className="flex items-center justify-center bg-gradient-to-br py-10 from-black to-[#1c1c24] p-4">
      <Card className="w-full xl:max-w-7xl text-white shadow-xl p-10 bg-black">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            Preguntas Frecuentes
          </CardTitle>
          <CardDescription>
            Todo lo que necesitas saber sobre nuestros NFTs de cartas de fútbol
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
