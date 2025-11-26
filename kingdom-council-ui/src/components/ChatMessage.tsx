import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  role: "user" | "agent";
  content: string;
  agentName?: string;
  agentRole?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const ChatMessage = ({ role, content, agentName, agentRole, icon: Icon }: ChatMessageProps) => {
  if (role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end"
      >
        <Card className="max-w-[80%] p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="leading-relaxed">{content}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="h-4 w-4 text-primary" />
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex justify-start"
    >
      <Card className="max-w-[80%] p-4 bg-card">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            {Icon && <Icon className="h-5 w-5 text-accent" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif font-semibold">{agentName}</span>
              {agentRole && (
                <Badge variant="secondary" className="text-xs">
                  {agentRole}
                </Badge>
              )}
            </div>
            <p className="leading-relaxed text-sm">{content}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ChatMessage;
