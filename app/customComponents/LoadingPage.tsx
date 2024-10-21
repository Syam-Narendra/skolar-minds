import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500">
        <Loader2 className="h-16 w-16 text-blue-500" />
      </div>
    </div>
  );
}
