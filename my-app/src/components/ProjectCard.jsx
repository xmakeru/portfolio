"use client";
import { motion } from "framer-motion";
import Link from "next/link";


function ProjectCard({link, title}) {
  return(
    <Link href={link}>
      <motion.article
        whileHover={{ scale: 1.05 }}
        className="w-64 h-40 bg-[#BA5624] rounded-md cursor-pointer flex items-center justify-center"
      >
        <div className="text-white text-lg font-semibold">{title}</div>
      </motion.article>
    </Link>
  )
}

export default ProjectCard