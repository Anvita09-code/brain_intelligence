import { Loader } from "@/components/feedback/Loader";

export default function RootLoading() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-screen bg-industrial-bg-dark">
      <Loader text="LOADING ENTERPRISE SYSTEM BOOTLOADER..." size="lg" />
    </div>
  );
}
