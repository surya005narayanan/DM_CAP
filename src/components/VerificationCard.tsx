import { CheckCircle, XCircle } from 'lucide-react';
import type { VerificationResult } from '../logic';

interface VerificationCardProps {
  result: VerificationResult | null;
}

export function VerificationCard({ result }: VerificationCardProps) {
  if (!result) return null;

  const isVerified = result.verified;

  return (
    <div className={`mt-8 rounded-2xl border p-6 flex items-start gap-4 shadow-lg backdrop-blur-md transition-all duration-500 ${
      isVerified 
        ? 'bg-green-950/20 border-green-500/30 shadow-green-900/10' 
        : 'bg-red-950/20 border-red-500/30 shadow-red-900/10'
    }`}>
      <div className={`mt-1 shrink-0 ${isVerified ? 'text-green-400' : 'text-red-400'}`}>
        {isVerified ? <CheckCircle size={28} /> : <XCircle size={28} />}
      </div>
      
      <div>
        <h3 className={`text-lg font-bold mb-1 tracking-wide ${isVerified ? 'text-green-400' : 'text-red-400'}`}>
          {isVerified ? 'VERIFIED' : 'VERIFICATION FAILED'}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          {result.message}
        </p>
      </div>
    </div>
  );
}
