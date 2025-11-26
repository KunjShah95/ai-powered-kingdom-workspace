import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Crown, Users, Shield, Coins, TrendingUp, MapPin } from "lucide-react";
import kingdomNight from "@/assets/kingdom-night.png";

const Kingdom = () => {
  const stats = [
    {
      icon: Users,
      label: "Citizen Happiness",
      value: 87,
      color: "text-accent",
    },
    {
      icon: Coins,
      label: "Treasury",
      value: 12500,
      suffix: " gold",
      color: "text-gold",
    },
    {
      icon: Shield,
      label: "Army Readiness",
      value: 92,
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Economic Growth",
      value: 15,
      suffix: "%",
      color: "text-accent",
    },
  ];

  const regions = [
    { name: "Northern Highlands", status: "Secure", population: 2500 },
    { name: "Eastern Valleys", status: "Prosperous", population: 3200 },
    { name: "Southern Plains", status: "Growing", population: 4100 },
    { name: "Western Peaks", status: "Fortified", population: 1800 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-serif font-bold flex items-center gap-3">
            <Crown className="h-8 w-8 text-gold" />
            Kingdom Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Overview of your realm's prosperity</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Image */}
        <Card className="overflow-hidden">
          <img
            src={kingdomNight}
            alt="Kingdom at Night"
            className="w-full h-64 object-cover"
          />
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-3xl font-bold">
                  {stat.value}
                  {stat.suffix}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                {typeof stat.value === "number" && stat.value <= 100 && (
                  <Progress value={stat.value} className="h-2" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Regions */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6">Kingdom Regions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {regions.map((region, index) => (
              <Card key={index} className="p-6 hover-lift">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif font-semibold text-lg mb-2 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-accent" />
                      {region.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      Status: <span className="text-foreground">{region.status}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Population: <span className="text-foreground">{region.population}</span>
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-2xl font-serif font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="w-2 h-2 rounded-full bg-accent mt-2" />
              <div>
                <p className="text-sm">New trade agreement signed with Eastern merchants</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="w-2 h-2 rounded-full bg-gold mt-2" />
              <div>
                <p className="text-sm">Military drills completed in Northern Highlands</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="text-sm">Council convened on infrastructure improvements</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Kingdom;
