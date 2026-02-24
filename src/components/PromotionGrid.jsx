import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Import local assets
import mid1 from "@/assets/middle-imges/1.png";
import mid2 from "@/assets/middle-imges/2.png";
import mid3 from "@/assets/middle-imges/3.png";

export default function PromotionGrid() {
  const promotions = [
    { id: 1, image: mid1, link: "/shop" },
    { id: 2, image: mid2, link: "/printers" },
    { id: 3, image: mid3, link: "/accessories" },
  ];

  return (
    <section className="px-6 md:px-10 lg:px-12 py-12 bg-white">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <motion.div
              key={promo.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
              className="relative group overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all"
            >
              <Link to={promo.link}>
                <img 
                  src={promo.image} 
                  alt={`Promotion ${promo.id}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
