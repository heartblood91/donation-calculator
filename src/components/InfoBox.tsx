import { FC, ReactNode } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface InfoBoxProps {
  isExpanded: boolean;
  onClick: () => void;
  children: ReactNode;
}

export const InfoBox: FC<InfoBoxProps> = ({ isExpanded, onClick, children }) => (
  <div className="mt-2 text-sm">
    <button
      onClick={onClick}
      className="flex items-center text-[#E84E10] hover:text-[#c23c06] focus:outline-none focus:ring-2 focus:ring-[#E84E10] focus:ring-offset-2 rounded-md"
    >
      <HelpCircle size={16} className="mr-1" />
      {isExpanded ? 'Masquer les informations' : "Plus d'informations"}
      {isExpanded ? (
        <ChevronUp size={16} className="ml-1" />
      ) : (
        <ChevronDown size={16} className="ml-1" />
      )}
    </button>
    {isExpanded && (
      <div className="mt-2 p-4 bg-gray-50 rounded border border-gray-200">
        {children}
      </div>
    )}
  </div>
);