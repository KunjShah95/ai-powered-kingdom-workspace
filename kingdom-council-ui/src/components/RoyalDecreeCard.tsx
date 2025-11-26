import { Card } from "@/components/ui/card";
import { Crown } from "lucide-react";
import { motion } from "framer-motion";

interface RoyalDecreeCardProps {
  content: string;
}

const RoyalDecreeCard = ({ content }: RoyalDecreeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex justify-center my-8"
    >
      <Card className="royal-decree max-w-3xl w-full p-8 relative overflow-hidden">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/30 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold/30 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/30 rounded-br-lg" />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Crown className="h-6 w-6 text-gold" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gold">Royal Decree</h3>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-center leading-relaxed text-foreground/90 italic">
              "{content}"
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gold/20 text-center">
            <p className="text-sm text-muted-foreground font-serif">
              — By order of The King, synthesizing all counsel
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default RoyalDecreeCard;
