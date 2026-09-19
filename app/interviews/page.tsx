import { InterviewPrep } from "@/components/interview-prep";

export default function InterviewsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Interview prep</h1>
        <p className="text-sm text-faint mt-0.5">
          Question bank and frameworks tailored for each scheduled round.
        </p>
      </div>
      <InterviewPrep />
    </div>
  );
}
