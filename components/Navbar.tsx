import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full py-4 px-6 bg-stakeDark">
      <AnimatedText text="Nahoule Casino" />
      <motion.div
        className="space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/schedule">Schedule</Link>
        <Link href="/media">Media</Link>
        <Link href="/contact">Contact</Link>
        {/* Admin login */}
        <Link href="/admin/login">Admin</Link>
      </motion.div>
    </nav>
  );
}
