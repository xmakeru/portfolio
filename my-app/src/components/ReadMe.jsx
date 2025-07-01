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
        className="flex justify-center items-center bg-[#FFA552] px-4 py-2 rounded-sm text-black"
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
            className="fixed top-[72px] right-0 h-[calc(100vh-72px)] w-[40%] bg-[#FFA552] z-50"
            ref={ref}
          >
            <div className="p-4 text-white">
              <p className="whitespace-normal break-words text-black">{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
