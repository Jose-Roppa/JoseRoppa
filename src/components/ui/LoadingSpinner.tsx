import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-50">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-purple-500 mx-auto" />
        <p className="mt-4 text-lg text-white">Carregando...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 