import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { UIMessage, DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Send, Crown, Map, BarChart3, Eye } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import CouncilRoster from "@/components/CouncilRoster";
import strategyRoom from "@/assets/strategy-room.png";

const CouncilHall = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:3001/api/ai/chat",
    }),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage({ text: input });
    setInput("");
  };

  const getMessageContent = (msg: UIMessage) => {
    return msg.parts
      .filter((part) => part.type === "text")
      .map((part) => (part as any).text)
      .join("");
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
          {messages.length === 0 && (
             <div className="text-center text-muted-foreground mt-10">
               <p>The Council is assembled. Speak your mind.</p>
             </div>
          )}
          {messages.map((msg: UIMessage) => (
            <div key={msg.id}>
              {msg.role === "user" ? (
                <ChatMessage
                  role="user"
                  content={getMessageContent(msg)}
                />
              ) : (
                <ChatMessage
                  role="agent"
                  content={getMessageContent(msg)}
                  agentName="The Council"
                  agentRole="Collective Wisdom"
                  icon={Crown}
                />
              )}
            </div>
          ))}
        </div>

        <div className="border-t p-4 bg-card">
          <form onSubmit={handleSubmit} className="flex gap-3 items-end max-w-4xl mx-auto">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Present your question to the council..."
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button type="submit" size="lg">
              <Send className="h-5 w-5" />
            </Button>
          </form>
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
