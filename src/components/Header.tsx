import { FC } from 'react';
import { Mail, CheckSquare, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  progress: number;
  onShare: () => void;
  onNavigate: () => void;
  isCalculator: boolean;
}

export const Header: FC<HeaderProps> = ({ 
  title, 
  progress, 
  onShare, 
  onNavigate,
  isCalculator 
}) => {
  return (
    <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 rounded-t-xl">
      <div className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 space-y-3 sm:space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onNavigate}
                className="flex items-center gap-2 bg-[#2DA4A8] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#259397] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2DA4A8] focus:ring-offset-2 text-sm sm:text-base w-fit"
              >
                {isCalculator ? (
                  <>
                    <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Accéder aux actions recommandées</span>
                  </>
                ) : (
                  <>
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Accéder à la calculette</span>
                  </>
                )}
              </button>
              <div className="hidden sm:block h-8 w-px bg-gray-200" />
              <h1 className="text-lg sm:text-xl font-bold text-[#1B3168]">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32 sm:w-[200px] bg-[#E5F5F5] rounded-full h-1">
                <div
                  className="bg-gradient-to-r from-[#2DA4A8] to-[#259397] h-1 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#1B3168] whitespace-nowrap">
                {progress}% complété
              </span>
            </div>
          </div>
          <button
            onClick={onShare}
            className="text-[#2DA4A8] hover:text-[#259397] px-2 py-1 sm:px-3 sm:py-1.5 hover:bg-[#E5F5F5] rounded-lg transition-colors flex items-center gap-1.5 text-xs sm:text-sm w-fit ml-auto sm:ml-0"
            aria-label="Partager par email"
          >
            <span>Partager</span>
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}; 