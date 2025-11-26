import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, BookOpen, Sparkles, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const councilMembers = [
  {
    name: "The King",
    role: "Final Authority",
    icon: Crown,
    color: "text-gold",
    description: "Synthesizes all perspectives into the Royal Decree",
  },
  {
    name: "The Senapati",
    role: "Military Commander",
    icon: Shield,
    color: "text-accent",
    description: "Strategic defense, tactics, and resource deployment",
  },
  {
    name: "The Guru",
    role: "Wisdom Keeper",
    icon: BookOpen,
    color: "text-primary",
    description: "Philosophy, ethics, and long-term vision",
  },
  {
    name: "The Mantri",
    role: "Chief Minister",
    icon: Sparkles,
    color: "text-accent",
    description: "Governance, diplomacy, and administration",
  },
];

const CouncilRoster = () => {
  return (
    <aside className="w-72 border-r bg-card hidden lg:flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-serif font-bold text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Council Roster
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Active advisors</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <TooltipProvider>
          {councilMembers.map((member, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Card className="p-4 cursor-pointer hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <member.icon className={`h-5 w-5 ${member.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif font-semibold text-sm truncate">
                        {member.name}
                      </div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p className="text-sm">{member.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          All advisors are active and ready to serve
        </p>
      </div>
    </aside>
  );
};

export default CouncilRoster;
