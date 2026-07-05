import {
  Cpu,
  ShieldAlert,
  Users,
  Wrench,
  TriangleAlert,
  FileCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  stats: {
    workers: number;
    machines: number;
    incidents: number;
    permits: number;
    maintenance: number;
    alerts: number;
  };
};

export function DashboardCards({
  stats,
}: Props) {
  const cards = [
    {
      title: "Workers",
      value: stats.workers,
      icon: Users,
    },
    {
      title: "Machines",
      value: stats.machines,
      icon: Cpu,
    },
    {
      title: "Incidents",
      value: stats.incidents,
      icon: TriangleAlert,
    },
    {
      title: "Permits",
      value: stats.permits,
      icon: FileCheck,
    },
    {
      title: "Maintenance",
      value: stats.maintenance,
      icon: Wrench,
    },
    {
      title: "Alerts",
      value: stats.alerts,
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">
                {card.title}
              </CardTitle>

              <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold">
                {card.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}