import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Settings as SettingsIcon, Moon, Sun } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [showIndividualReplies, setShowIndividualReplies] = useState(true);
  const [autonomyLevel, setAutonomyLevel] = useState([50]);
  const [messageDensity, setMessageDensity] = useState([1]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-serif font-bold flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">Customize your council experience</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-serif font-semibold mb-4">Appearance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="theme">Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark mode
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <Switch id="theme" />
                <Moon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-serif font-semibold mb-4">Council Behavior</h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="replies">Show Individual Model Replies</Label>
                <Switch
                  id="replies"
                  checked={showIndividualReplies}
                  onCheckedChange={setShowIndividualReplies}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Display each advisor's response separately before the final decree
              </p>
            </div>

            <div className="space-y-3">
              <Label>Autonomy Level</Label>
              <Slider
                value={autonomyLevel}
                onValueChange={setAutonomyLevel}
                max={100}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Manual</span>
                <span>Semi-Auto</span>
                <span>Full Auto</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Control how much the council acts independently vs. waiting for your input
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-serif font-semibold mb-4">Message Display</h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Message Density</Label>
              <Slider
                value={messageDensity}
                onValueChange={setMessageDensity}
                max={2}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Compact</span>
                <span>Cozy</span>
                <span>Spacious</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Adjust spacing and size of message bubbles
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-serif font-semibold mb-4">About</h2>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>AI Kingdom Council v1.0</p>
            <p>
              Inspired by the wisdom of the Himalayas and the collaborative intelligence of
              multi-agent systems.
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
