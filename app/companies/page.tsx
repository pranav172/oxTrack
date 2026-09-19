import { Companies } from "@/components/companies";

export default function CompaniesPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Companies</h1>
        <p className="text-sm text-faint mt-0.5">
          Every company you've applied to, aggregated with application counts and highest stage.
        </p>
      </div>
      <Companies />
    </div>
  );
}
