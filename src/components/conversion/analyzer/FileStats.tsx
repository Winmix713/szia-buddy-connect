
import { Card } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

interface FileStatsProps {
  totalFiles: number;
  nextComponents: number;
  apiRoutes: number;
  dataFetching: number;
}

export function FileStats({ totalFiles, nextComponents, apiRoutes, dataFetching }: FileStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
      <StatCard label="Total Files" value={totalFiles} />
      <StatCard label="Next.js Components" value={nextComponents} />
      <StatCard label="API Routes" value={apiRoutes} />
      <StatCard label="Data Fetching" value={dataFetching} />
    </div>
  );
}

