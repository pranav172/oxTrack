import { Analytics } from "@/components/analytics";
import { AppForm } from "@/components/app-form";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-faint mt-0.5">
          Real-time metrics and funnel conversion across your active job search.
        </p>
      </div>
      <Analytics />
      <AppForm />
    </div>
  );
}
