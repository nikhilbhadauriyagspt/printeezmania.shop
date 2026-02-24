import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import local assets
import mid1 from "@/assets/middle-imges/1.png";
import mid2 from "@/assets/middle-imges/2.png";
import mid3 from "@/assets/middle-imges/3.png";

export const MiddleBannerOne = () => (
  <section className="px-6 md:px-10 lg:px-12 py-12 bg-white">
    <div className="max-w-[1920px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-[3rem] border border-gray-100 shadow-sm group"
      >
        <img src={mid1} alt="Promo" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />

        <div className="absolute inset-0 flex flex-col justify-center items-start px-12 md:px-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-600 text-white text-[10px] font-bold capitalize tracking-widest mb-6">Limited Edition</span>
            <h3 className="text-4xl md:text-6xl font-bold text-white  capitalize mb-6 leading-none drop-shadow-lg">
              Master your <br /><span className="text-blue-400 italic">Workflow.</span>
            </h3>
            <Button size="xl" className="bg-white text-black hover:bg-blue-600 hover:text-white rounded-2xl px-10 h-14 font-bold text-xs tracking-widest shadow-2xl transition-all">
              CONFIGURE NOW <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export const MiddleBannerTwo = () => (
  <section className="px-6 md:px-10 lg:px-12 py-12 bg-white">
    <div className="max-w-[1920px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-[3rem] border border-gray-100 shadow-sm group"
      >
        <img src={mid2} alt="Promo" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />

        <div className="absolute inset-0 flex flex-col justify-center items-end px-12 md:px-20 text-right">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-purple-600 text-white text-[10px] font-bold capitalize tracking-widest mb-6">New in Stock</span>
            <h3 className="text-4xl md:text-6xl font-bold text-white  capitalize mb-6 leading-none drop-shadow-lg">
              High Speed <br /><span className="text-purple-400 italic">Precision.</span>
            </h3>
            <div className="flex justify-end">
              <Button size="xl" className="bg-black hover:bg-purple-600 text-white rounded-2xl px-10 h-14 font-bold text-xs tracking-widest shadow-2xl transition-all">
                VIEW PRINTERS <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export const MiddleBannerThree = () => (
  <section className="px-6 md:px-10 lg:px-12 py-12 bg-white">
    <div className="max-w-[1920px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-[3rem] border border-gray-100 shadow-sm group"
      >
        <img src={mid3} alt="Promo" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white  capitalize mb-2 leading-none">
              The Tech <span className="text-blue-400 italic">Vault.</span>
            </h3>
            <p className="text-white/80 font-bold text-sm capitalize tracking-[0.2em]">Curated Accessories for Professionals</p>
          </motion.div>
          <Button size="xl" className="bg-white text-black hover:bg-blue-600 hover:text-white rounded-2xl px-10 h-14 font-bold text-xs tracking-widest shadow-2xl transition-all mb-2">
            EXPLORE NOW
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);
