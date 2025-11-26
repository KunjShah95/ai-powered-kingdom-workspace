import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, Users, ScrollText, Sparkles, Shield, BookOpen } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroMountains from "@/assets/hero-mountains.png";
import councilTable from "@/assets/council-table.png";
import { Navbar } from "@/components/Navbar";
import { KingdomMap } from "@/components/KingdomMap";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect for mountain background
    if (mountainRef.current) {
      gsap.to(mountainRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Fade in sections on scroll
    gsap.utils.toArray<HTMLElement>(".fade-section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  const councilRoles = [
    {
      icon: Crown,
      title: "The King",
      role: "Final Authority",
      description: "Synthesizes all counsel into the Royal Decree",
    },
    {
      icon: Shield,
      title: "The Senapati",
      role: "Military Commander",
      description: "Strategic defense and tactical operations",
    },
    {
      icon: BookOpen,
      title: "The Guru",
      role: "Wisdom Keeper",
      description: "Philosophy, ethics, and long-term vision",
    },
    {
      icon: Sparkles,
      title: "The Mantri",
      role: "Chief Minister",
      description: "Governance, diplomacy, and administration",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden pt-16 sm:pt-20">
        <div
          ref={mountainRef}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroMountains})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
                The Kingdom
                <br />
                <span className="text-primary">Council Awaits</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Seek guidance from the multi-agent council. Each advisor brings unique wisdom to
                forge the Royal Decree that guides your path.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/council">
                    <Crown className="mr-2 h-5 w-5" />
                    Enter the Council Hall
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <a href="#how-it-works">
                    <ScrollText className="mr-2 h-5 w-5" />
                    See How It Works
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src={councilTable}
                alt="Council Chamber"
                className="rounded-lg shadow-2xl border-2 border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 fade-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 hover-lift">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-serif font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Present Your Question</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bring your challenge to the Council Hall. Whether strategy, ethics, or planning—they
                listen.
              </p>
            </Card>

            <Card className="p-8 hover-lift">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-serif font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Hear Each Voice</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each council member responds with their unique perspective, from military tactics to
                philosophical wisdom.
              </p>
            </Card>

            <Card className="p-8 hover-lift">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-serif font-bold text-gold">3</span>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Receive the Decree</h3>
              <p className="text-muted-foreground leading-relaxed">
                The King synthesizes all counsel into a unified Royal Decree—your path forward.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Council */}
      <section className="py-24 bg-secondary/30 fade-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
            Meet the Council
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Each advisor embodies a distinct domain of expertise, together forming a complete
            perspective.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {councilRoles.map((member, index) => (
              <Card key={index} className="p-6 hover-lift text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <member.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2">{member.title}</h3>
                <p className="text-sm text-accent font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Explore the Realm Section */}
      <section className="py-24 fade-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
            Explore the Realm
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Your kingdom spans four distinct regions, each with its own unique characteristics and challenges. 
            Hover over each region to learn more about the land you govern.
          </p>
          <KingdomMap />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary/30 fade-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Your Kingdom Awaits
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the council chamber where AI agents collaborate to solve your toughest challenges.
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link to="/council">
              <Users className="mr-2 h-5 w-5" />
              Begin Your Consultation
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AI Kingdom Council. Built with wisdom from the mountains.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
