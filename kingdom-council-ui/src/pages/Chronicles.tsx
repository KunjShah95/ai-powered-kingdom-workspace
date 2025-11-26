import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollText, Calendar, Crown, Shield } from "lucide-react";
import kingdomCeremony from "@/assets/kingdom-ceremony.png";

const Chronicles = () => {
  const sessions = [
    {
      id: 1,
      title: "Military Defense Strategy",
      date: "2025-01-20",
      outcome: "Approved new fortification plan",
      icon: Shield,
      participantCount: 4,
    },
    {
      id: 2,
      title: "Trade Route Expansion",
      date: "2025-01-18",
      outcome: "Diplomatic mission authorized",
      icon: Crown,
      participantCount: 3,
    },
    {
      id: 3,
      title: "Citizen Welfare Initiative",
      date: "2025-01-15",
      outcome: "Budget allocated for healthcare",
      icon: Crown,
      participantCount: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="relative border-b bg-card overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${kingdomCeremony})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.08,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-6">
          <h1 className="text-4xl font-serif font-bold flex items-center gap-3">
            <ScrollText className="h-8 w-8 text-primary" />
            Chronicles
          </h1>
          <p className="text-muted-foreground mt-2">
            History of council deliberations and royal decrees
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4 max-w-4xl">
          {sessions.map((session) => (
            <Card
              key={session.id}
              className="p-6 hover-lift cursor-pointer transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <session.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif font-bold text-xl">{session.title}</h3>
                    <Badge variant="secondary" className="ml-2">
                      {session.participantCount} advisors
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-3">
                    <p className="text-sm">
                      <span className="font-semibold">Royal Decree:</span> {session.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {sessions.length === 0 && (
          <Card className="p-12 text-center">
            <ScrollText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-serif font-semibold mb-2">No Chronicles Yet</h3>
            <p className="text-muted-foreground">
              Your council sessions will be recorded here for future reference
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Chronicles;
