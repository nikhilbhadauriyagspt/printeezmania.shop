import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast, showToast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, scale: 0.95, x: '-50%' }}
          className="fixed bottom-10 left-1/2 z-[1000] min-w-[320px] max-w-md"
        >
          <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 relative overflow-hidden">
            {/* Progress Bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 3, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-1 bg-blue-500"
            />

            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
              toast.type === 'info' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
              }`}>
              {toast.type === 'success' ? <CheckCircle size={20} /> :
                toast.type === 'info' ? <Info size={20} /> : <XCircle size={20} />}
            </div>

            <div className="flex-1 pr-4">
              <p className="text-[11px] font-bold capitalize tracking-widest leading-tight">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => { }} // Context handles closing via state
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
