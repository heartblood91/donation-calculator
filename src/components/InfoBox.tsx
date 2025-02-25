import { FC, ReactNode } from 'react';
import { ExpandMore, ExpandLess, Help } from '@mui/icons-material';

interface InfoBoxProps {
  isExpanded: boolean;
  onClick: () => void;
  children: ReactNode;
}

export const InfoBox: FC<InfoBoxProps> = ({ isExpanded, onClick, children }) => (
  <div className="mt-2 text-sm">
    <button
      onClick={onClick}
      className="flex items-center text-[#2DA4A8] hover:text-[#259397] focus:outline-none focus:ring-2 focus:ring-[#2DA4A8] focus:ring-offset-2 rounded-md"
    >
      <Help fontSize="small" className="mr-1" />
      {isExpanded ? 'Masquer les informations' : "Plus d'informations"}
      {isExpanded ? (
        <ExpandLess fontSize="small" className="ml-1" />
      ) : (
        <ExpandMore fontSize="small" className="ml-1" />
      )}
    </button>
    {isExpanded && (
      <div className="mt-2 p-4 bg-[#E5F5F5] rounded border border-[#2DA4A8]/20">
        {children}
      </div>
    )}
  </div>
);