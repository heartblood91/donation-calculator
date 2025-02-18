import { FC } from 'react';
import { ArrowLeft, CheckSquare, Square, Mail } from 'lucide-react';
import { useActionTable } from '../hooks/useActionTable';

interface ActionTableProps {
  onBack: () => void;
}

export const ActionTable: FC<ActionTableProps> = ({ onBack }) => {
  const { categories, toggleAction, handleEmailShare } = useActionTable();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Retour à la calculette"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                Actions pour optimiser la collecte
              </h1>
            </div>
            <button
              onClick={handleEmailShare}
              className="px-4 py-2 bg-[#E84E10] text-white rounded-lg hover:bg-[#d64600] transition-colors flex items-center"
            >
              <Mail size={20} className="mr-2" />
              Partager par email
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {category.title}
                </h2>
                <div className="space-y-3">
                  {category.actions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => toggleAction(categoryIndex, action.id)}
                      className="w-full flex items-start space-x-3 p-2 hover:bg-gray-100 rounded transition-colors text-left"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {action.checked ? (
                          <CheckSquare className="w-5 h-5 text-[#E84E10]" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <span className="text-gray-700">{action.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};