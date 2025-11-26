import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Region {
  id: string;
  name: string;
  path: string;
  status: string;
  population: string;
  color: string;
  hoverColor: string;
}

const regions: Region[] = [
  {
    id: "northern",
    name: "Northern Highlands",
    path: "M150,50 L250,30 L320,60 L300,120 L220,140 L180,110 Z",
    status: "Peaceful",
    population: "45,000",
    color: "hsl(var(--muted))",
    hoverColor: "hsl(var(--accent))",
  },
  {
    id: "eastern",
    name: "Eastern Valleys",
    path: "M320,60 L400,80 L420,160 L380,200 L300,180 L300,120 Z",
    status: "Prosperous",
    population: "62,000",
    color: "hsl(var(--muted))",
    hoverColor: "hsl(var(--accent))",
  },
  {
    id: "southern",
    name: "Southern Plains",
    path: "M180,200 L300,180 L320,260 L240,280 L160,260 Z",
    status: "Growing",
    population: "58,000",
    color: "hsl(var(--muted))",
    hoverColor: "hsl(var(--accent))",
  },
  {
    id: "western",
    name: "Western Peaks",
    path: "M80,100 L180,110 L180,200 L160,260 L60,220 L50,140 Z",
    status: "Remote",
    population: "28,000",
    color: "hsl(var(--muted))",
    hoverColor: "hsl(var(--accent))",
  },
];

export const KingdomMap = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative">
        <svg
          viewBox="0 0 500 320"
          className="w-full h-auto"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
        >
          <rect
            width="500"
            height="320"
            fill="hsl(var(--background))"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            rx="8"
          />

          <g transform="translate(225, 140)">
            <circle cx="0" cy="0" r="15" fill="hsl(var(--gold))" opacity="0.2" />
            <polygon
              points="0,-10 -8,5 8,5"
              fill="hsl(var(--gold))"
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
            />
            <rect x="-6" y="0" width="12" height="10" fill="hsl(var(--gold))" />
            <circle cx="0" cy="-12" r="2" fill="hsl(var(--foreground))" />
          </g>

          {regions.map((region) => (
            <motion.path
              key={region.id}
              d={region.path}
              fill={hoveredRegion === region.id ? region.hoverColor : region.color}
              stroke="hsl(var(--border))"
              strokeWidth="2"
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => setSelectedRegion(region)}
              className="cursor-pointer transition-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            />
          ))}

          {regions.map((region, index) => {
            const positions = [
              { x: 235, y: 85 },
              { x: 360, y: 130 },
              { x: 250, y: 230 },
              { x: 120, y: 160 },
            ];
            return (
              <text
                key={`label-${region.id}`}
                x={positions[index].x}
                y={positions[index].y}
                textAnchor="middle"
                fill="hsl(var(--foreground))"
                fontSize="12"
                fontWeight="600"
                className="pointer-events-none select-none"
                opacity={hoveredRegion === region.id ? 1 : 0.7}
              >
                {region.name}
              </text>
            );
          })}
        </svg>

        {hoveredRegion && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4"
          >
            <Card className="p-3 bg-background/95 backdrop-blur-sm border-border">
              <div className="text-sm">
                <p className="font-semibold text-foreground">
                  {regions.find((r) => r.id === hoveredRegion)?.name}
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  Status: {regions.find((r) => r.id === hoveredRegion)?.status}
                </p>
                <p className="text-muted-foreground text-xs">
                  Population: {regions.find((r) => r.id === hoveredRegion)?.population}
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card className="p-6 bg-parchment border-gold/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {selectedRegion.name}
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Status:</span> {selectedRegion.status}
                  </p>
                  <p>
                    <span className="font-medium">Population:</span>{" "}
                    {selectedRegion.population}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
