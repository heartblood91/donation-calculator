import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckSquare, Square, Mail } from 'lucide-react';

interface Action {
  id: string;
  text: string;
  checked: boolean;
}

interface ActionCategory {
  title: string;
  actions: Action[];
}

interface ActionTableProps {
  onBack: () => void;
}

const STORAGE_KEY = 'collecte-actions';

const initialCategories: ActionCategory[] = [
  {
    title: "Valoriser les atouts du projet",
    actions: [
      { id: "v1", text: "Découper le projet en étapes", checked: false },
      { id: "v2", text: "Travailler l'histoire, le \"story telling\"", checked: false },
      { id: "v3", text: "Proposer des contreparties aux donateurs", checked: false },
      { id: "v4", text: "Avoir une stratégie pour démarcher les entreprises", checked: false },
      { id: "v5", text: "Ouvertures / visites organisées pour le public (gratuites ou payantes)", checked: false },
      { id: "v6", text: "Avoir une urne sur le lieu de visite", checked: false },
      { id: "v7", text: "Nouer des partenariats (associations, institutions, mécènes..)", checked: false },
      { id: "v8", text: "Préparer un calendrier de collecte", checked: false },
    ]
  },
  {
    title: "Communiquer sur la collecte",
    actions: [
      { id: "c1", text: "Affichage dans la commune ou chez les commerçants", checked: false },
      { id: "c2", text: "Affichage sur le site", checked: false },
      { id: "c3", text: "Publicités ou articles dans la presse locale & les magazines institutionnels", checked: false },
      { id: "c4", text: "Produire de \"beaux\" visuels", checked: false },
      { id: "c5", text: "Présence sur les réseaux sociaux (posts réguliers, page dédiée, etc.)", checked: false },
      { id: "c6", text: "Communiquer régulièrement sur la vie du chantier ou du projet", checked: false },
      { id: "c7", text: "Mise à jour régulière de la page du site de la fondation", checked: false },
      { id: "c8", text: "Organiser des concours pour valoriser le projet", checked: false },
    ]
  },
  {
    title: "Engager directement chaque donateur",
    actions: [
      { id: "e1", text: "Remercier les donateurs", checked: false },
      { id: "e2", text: "Solliciter les contacts par mail", checked: false },
      { id: "e3", text: "Solliciter les contacts par courrier", checked: false },
      { id: "e4", text: "Enrichir la liste de contacts avec des partenaires", checked: false },
      { id: "e5", text: "Relancer la liste de contact (actus projets, anniversaire du don..)", checked: false },
      { id: "e6", text: "Personnaliser le discours lors des envois", checked: false },
    ]
  },
  {
    title: "Organiser un événement de collecte",
    actions: [
      { id: "o1", text: "Organiser un événement de lancement", checked: false },
      { id: "o2", text: "Organiser plusieurs événements en cours de collecte", checked: false },
      { id: "o3", text: "Inviter l'entourage des organisateurs", checked: false },
      { id: "o4", text: "Inviter les commerçants de la commune", checked: false },
      { id: "o5", text: "Inviter et annoncer l'événement avec la presse régionale", checked: false },
      { id: "o6", text: "Distribuer des invitations dans la commune & alentours", checked: false },
      { id: "o7", text: "Discours ou présence d'une personnalité", checked: false },
      { id: "o8", text: "Organiser des conférences d'experts lors de l'événement", checked: false },
      { id: "o9", text: "Avoir une équipe d'animateurs de collecte sur place", checked: false },
      { id: "o10", text: "Créer des goodies", checked: false },
      { id: "o11", text: "Disposer des outils de collecte : stand, bulletins de dons, terminal de paiement (avec l'aide de la Fondation)", checked: false },
    ]
  }
];

function ActionTable({ onBack }: ActionTableProps) {
  const [categories, setCategories] = useState<ActionCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialCategories;
    } catch (error) {
      console.error('Error loading saved actions:', error);
      return initialCategories;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving actions:', error);
    }
  }, [categories]);

  const toggleAction = (categoryIndex: number, actionId: string) => {
    const newCategories = [...categories];
    const category = newCategories[categoryIndex];
    const actionIndex = category.actions.findIndex(a => a.id === actionId);
    category.actions[actionIndex].checked = !category.actions[actionIndex].checked;
    setCategories(newCategories);
  };

  const getSelectedActionsText = () => {
    let text = "Actions recommandées pour optimiser la collecte\n\n";
    
    let hasCheckedActions = false;
    categories.forEach(category => {
      const selectedActions = category.actions.filter(action => action.checked);
      const remainingActions = category.actions.filter(action => !action.checked);
      
      if (selectedActions.length > 0 || remainingActions.length > 0) {
        hasCheckedActions = true;
        text += `${category.title} :\n\n`;
        
        if (selectedActions.length > 0) {
          text += "✅ Actions déjà planifiées :\n";
          selectedActions.forEach(action => {
            text += `- ${action.text}\n`;
          });
          text += "\n";
        }
        
        if (remainingActions.length > 0) {
          text += "📋 Actions à considérer :\n";
          remainingActions.forEach(action => {
            text += `- ${action.text}\n`;
          });
          text += "\n";
        }
      }
    });

    if (!hasCheckedActions) {
      text += "Aucune action n'a encore été sélectionnée. Nous vous recommandons de planifier quelques actions pour maximiser votre potentiel de collecte.\n";
    }

    return text;
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Plan d'actions pour la collecte");
    const body = encodeURIComponent(getSelectedActionsText());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

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
}

export default ActionTable;