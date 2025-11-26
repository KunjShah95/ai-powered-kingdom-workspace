import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Send, Crown, Shield, BookOpen, Sparkles, Map, BarChart3, Eye } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import CouncilRoster from "@/components/CouncilRoster";
import RoyalDecreeCard from "@/components/RoyalDecreeCard";
import strategyRoom from "@/assets/strategy-room.png";

interface Message {
  id: string;
  role: "user" | "agent" | "king";
  content: string;
  agentName?: string;
  agentRole?: string;
  icon?: any;
}

const CouncilHall = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "agent",
      content:
        "Welcome to the Council Hall. I am the Senapati, commander of the kingdom's defenses. How may the council serve you today?",
      agentName: "The Senapati",
      agentRole: "Military Commander",
      icon: Shield,
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    const councilResponses: Message[] = [
      {
        id: Date.now() + 1 + "",
        role: "agent",
        content: "From a military perspective, we must consider defensive positioning and resource allocation...",
        agentName: "The Senapati",
        agentRole: "Military Commander",
        icon: Shield,
      },
      {
        id: Date.now() + 2 + "",
        role: "agent",
        content: "The philosophical implications suggest we must balance immediate action with long-term wisdom...",
        agentName: "The Guru",
        agentRole: "Wisdom Keeper",
        icon: BookOpen,
      },
      {
        id: Date.now() + 3 + "",
        role: "agent",
        content: "For governance and diplomacy, I recommend a measured approach that considers all stakeholders...",
        agentName: "The Mantri",
        agentRole: "Chief Minister",
        icon: Sparkles,
      },
    ];

    const decree: Message = {
      id: Date.now() + 4 + "",
      role: "king",
      content:
        "Having heard all counsel, the Royal Decree is thus: We shall proceed with caution and wisdom, balancing military readiness with diplomatic grace. Let the council's collective wisdom guide our path forward.",
      agentName: "The King",
      agentRole: "Final Authority",
      icon: Crown,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, userMsg, ...councilResponses, decree]);
    }, 500);

    setInputValue("");
  };

  return (
    <div className="h-screen flex bg-background">
      <CouncilRoster />

      <div className="flex-1 flex flex-col">
        <header className="relative border-b p-4 bg-card overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${strategyRoom})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.08,
            }}
          />
          <div className="relative z-10">
            <h1 className="text-2xl font-serif font-bold flex items-center gap-2">
              <Crown className="h-6 w-6 text-gold" />
              Council Hall
            </h1>
            <p className="text-sm text-muted-foreground">
              Seek wisdom from the kingdom's advisors
            </p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "king" ? (
                <RoyalDecreeCard content={msg.content} />
              ) : (
                <ChatMessage
                  role={msg.role}
                  content={msg.content}
                  agentName={msg.agentName}
                  agentRole={msg.agentRole}
                  icon={msg.icon}
                />
              )}
            </div>
          ))}
        </div>

        <div className="border-t p-4 bg-card">
          <div className="flex gap-3 items-end max-w-4xl mx-auto">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Present your question to the council..."
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button onClick={handleSend} size="lg">
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex gap-2 mt-3 max-w-4xl mx-auto">
            <Badge variant="outline" className="cursor-pointer hover:bg-accent/10">
              Military strategy
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent/10">
              Ethical dilemma
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent/10">
              Resource planning
            </Badge>
          </div>
        </div>
      </div>

      <div className="w-80 border-l bg-card hidden xl:block overflow-y-auto">
        <Tabs defaultValue="stats" className="h-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
            <TabsTrigger value="map">
              <Map className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart3 className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="intel">
              <Eye className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="p-4">
            <h3 className="font-serif font-semibold mb-4">Kingdom Map</h3>
            <Card className="aspect-square bg-muted flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Map visualization</p>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="p-4 space-y-4">
            <h3 className="font-serif font-semibold mb-4">Kingdom Stats</h3>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Citizen Happiness</div>
              <div className="text-2xl font-bold">87%</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Treasury</div>
              <div className="text-2xl font-bold">12,500</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-1">Army Readiness</div>
              <div className="text-2xl font-bold">92%</div>
            </Card>
          </TabsContent>

          <TabsContent value="intel" className="p-4 space-y-3">
            <h3 className="font-serif font-semibold mb-4">Intelligence</h3>
            <Card className="p-3">
              <div className="text-sm font-medium mb-1">Northern Border Activity</div>
              <p className="text-xs text-muted-foreground">
                Scouts report increased movements...
              </p>
            </Card>
            <Card className="p-3">
              <div className="text-sm font-medium mb-1">Trade Route Status</div>
              <p className="text-xs text-muted-foreground">All routes secure and flowing...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CouncilHall;
