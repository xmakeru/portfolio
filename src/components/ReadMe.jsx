 "use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { README_CONTENT } from "@/config/readmeContent";

export default function ReadMe() {
   const pathname = usePathname();
  const content = README_CONTENT[pathname] || "Контент не найден";
  const [open, setOpen] = useState(false);
  const ref = useRef(null);      
  const buttonRef = useRef(null); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current && 
        !ref.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative overflow-x-hidden">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="flex justify-center items-center bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 px-4 py-2 rounded-sm text-white"
      >
        READ ME
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "65vw" }}
            animate={{ x: 0 }}
            exit={{ x: "65vw" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-[72px] right-0 h-[calc(100vh-72px)] w-[40%] bg-gradient-to-br from-gray-900 to-black border-l border-white/20 backdrop-blur-sm z-50"
            ref={ref}
          >
            <div className="p-6 text-white h-full overflow-y-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="whitespace-normal break-words text-white leading-relaxed">{content}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
