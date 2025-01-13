import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
}

export default function AnimatedText({ text }: AnimatedTextProps) {
  return (
    <motion.h1
      className="text-2xl font-casino text-stakeAccent"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {text}
    </motion.h1>
  );
}
