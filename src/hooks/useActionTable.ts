import { useState, useEffect } from 'react';
import type { Action, ActionGroups } from '../types/action.types';

const STORAGE_KEY = 'collecte-actions';

export const initialGroups: ActionGroups = [
  {
    "title": "Organiser le lancement de la collecte",
    "subGroups": [
      {
        "title": "Préparer la collecte",
        "actions": [
          { "id": "p1", "text": "Constituer une équipe d'animation", "checked": false },
          { "id": "p2", "text": "Écrire l'histoire et le storytelling du projet", "checked": false },
          { "id": "p3", "text": "Suivre les 5 conseils clés", "checked": false },
          { "id": "p4", "text": "Établir une stratégie de démarchage des entreprises locales", "checked": false },
          { "id": "p5", "text": "Transmettre les éléments pour la publication de la page projet", "checked": false }
        ]
      },
      {
        "title": "Communiquer sur le lancement",
        "actions": [
          { "id": "l1", "text": "Déposer des bulletins de dons dans les boîtes aux lettres", "checked": false },
          { "id": "l2", "text": "Afficher chez les commerçants de la collectivité", "checked": false },
          { "id": "l3", "text": "Utiliser et distribuer des supports papiers", "checked": false },
          { "id": "l4", "text": "Communiquer par e-mail ou créer une newsletter", "checked": false },
          { "id": "l5", "text": "Réaliser des posts sur les réseaux sociaux", "checked": false },
          { "id": "l6", "text": "Envoyer un communiqué de presse et inviter la presse", "checked": false },
          { "id": "l7", "text": "Distribuer activement des bulletins de dons", "checked": false }
        ]
      },
      {
        "title": "Le jour du lancement",
        "actions": [
          { "id": "j1", "text": "Organiser un événement de lancement", "checked": false },
          { "id": "j2", "text": "Prévoir la présence ou le parrainage d'une personnalité", "checked": false },
          { "id": "j3", "text": "Appeler aux dons dans les prises de paroles", "checked": false },
          { "id": "j4", "text": "Collecter sur site (SumUp, urne, dons par SMS)", "checked": false }
        ]
      }
    ]
  },
  {
    "title": "Animer la collecte pendant les travaux",
    "subGroups": [
      {
        "title": "Trouver des relais et optimiser les dons",
        "actions": [
          { "id": "o1", "text": "Démarcher les entreprises locales", "checked": false },
          { "id": "o2", "text": "Penser au produit partage comme levier de communication", "checked": false },
          { "id": "o3", "text": "Proposer des contreparties aux donateurs", "checked": false },
          { "id": "o4", "text": "Investiguer un possible abondement de collecte", "checked": false },
          { "id": "o5", "text": "Nouer des partenariats locaux", "checked": false }
        ]
      },
      {
        "title": "Communiquer sur les médias et réseaux sociaux",
        "actions": [
          { "id": "d1", "text": "Négocier des partenariats presse ou publicité", "checked": false },
          { "id": "d2", "text": "Produire et réaliser de belles photos ou vidéos", "checked": false },
          { "id": "d3", "text": "Transmettre des actualités sur la page du site", "checked": false },
          { "id": "d4", "text": "Envoyer régulièrement des e-mails ou newsletters", "checked": false },
          { "id": "d5", "text": "Poster sur les réseaux sociaux", "checked": false },
          { "id": "d6", "text": "Utiliser un bandeau de signature e-mail", "checked": false },
          { "id": "d7", "text": "Remercier les donateurs de façon personnalisée", "checked": false },
          { "id": "d8", "text": "Relancer les donateurs avec des appels à dons", "checked": false },
          { "id": "d9", "text": "Penser aux applications mobiles des collectivités", "checked": false },
          { "id": "d10", "text": "Promouvoir le projet sur divers supports (IFI, Noël, JEP)", "checked": false }
        ]
      },
      {
        "title": "Communiquer sur le terrain",
        "actions": [
          { "id": "t1", "text": "Distribuer des bulletins de dons dans les boîtes aux lettres", "checked": false },
          { "id": "t2", "text": "Diffuser des affiches", "checked": false },
          { "id": "t3", "text": "Utiliser ou distribuer des supports papiers", "checked": false },
          { "id": "t4", "text": "Distribuer activement des bulletins de dons", "checked": false },
          { "id": "t5", "text": "Mener du porte-à-porte par des bénévoles ou associations locales", "checked": false }
        ]
      },
      {
        "title": "Communiquer sur site",
        "actions": [
          { "id": "s1", "text": "Utiliser des supports (bâches, kakémono)", "checked": false },
          { "id": "s2", "text": "Organiser des événements d'animation", "checked": false },
          { "id": "s3", "text": "Appeler aux dons dans les prises de paroles", "checked": false },
          { "id": "s4", "text": "Collecter sur site (SumUp, urne, dons par SMS)", "checked": false },
          { "id": "s5", "text": "Utiliser des goodies pour inciter à donner plus", "checked": false },
          { "id": "s6", "text": "Afficher sur le site", "checked": false },
          { "id": "s7", "text": "Organiser des visites pour accueillir des visiteurs", "checked": false }
        ]
      }
    ]
  },
  {
    "title": "Clôturer la collecte et inaugurer le site",
    "subGroups": [
      {
        "title": "Communiquer sur le succès",
        "actions": [
          { "id": "c1", "text": "Produire des photos ou vidéos avant/après les travaux", "checked": false },
          { "id": "c2", "text": "Envoyer des e-mails ou newsletters", "checked": false },
          { "id": "c3", "text": "Poster sur les réseaux sociaux", "checked": false },
          { "id": "c4", "text": "Envoyer un communiqué de presse et inviter la presse", "checked": false }
        ]
      },
      {
        "title": "Le jour de l'inauguration",
        "actions": [
          { "id": "i1", "text": "Organiser un événement d'inauguration", "checked": false },
          { "id": "i2", "text": "Diffuser des bulletins d'adhésion ou de dons pour un projet similaire", "checked": false },
          { "id": "i3", "text": "Appeler aux adhésions et aux dons", "checked": false },
          { "id": "i4", "text": "Collecter sur site (urne, TPE, dons par SMS)", "checked": false }
        ]
      }
    ]
  }
];

const isLocalStorageAvailable = () => {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export const useActionTable = () => {
  const [groups, setGroups] = useState<ActionGroups>(() => {
    if (isLocalStorageAvailable()) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : initialGroups;
      } catch (error) {
        console.error('Error loading saved actions:', error);
        return initialGroups;
      }
    }
    return initialGroups;
  });

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
      } catch (error) {
        console.error('Error saving actions:', error);
      }
    }
  }, [groups]);

  const toggleAction = (groupIndex: number, subGroupIndex: number, actionId: string) => {
    setGroups(prevGroups => {
      if (!prevGroups[groupIndex]) {
        console.error(`Group at index ${groupIndex} does not exist`);
        return prevGroups;
      }

      const group = prevGroups[groupIndex];
      if (!group.subGroups[subGroupIndex]) {
        console.error(`SubGroup at index ${subGroupIndex} in group ${groupIndex} does not exist`);
        return prevGroups;
      }

      const newGroups = JSON.parse(JSON.stringify(prevGroups));
      const subGroup = newGroups[groupIndex].subGroups[subGroupIndex];
      
      const actionIndex = subGroup.actions.findIndex((action: Action) => action.id === actionId);
      if (actionIndex === -1) {
        console.error(`Action with id ${actionId} not found in subGroup ${subGroupIndex} of group ${groupIndex}`);
        return prevGroups;
      }

      subGroup.actions[actionIndex].checked = !subGroup.actions[actionIndex].checked;
      return newGroups;
    });
  };

  const getSelectedActionsText = () => {
    let text = "Actions recommandées pour optimiser la collecte\n\n";
    
    let hasCheckedActions = false;
    groups.forEach(group => {
      text += `${group.title} :\n\n`;
      
      group.subGroups.forEach(subGroup => {
        const selectedActions = subGroup.actions.filter(action => action.checked);
        const remainingActions = subGroup.actions.filter(action => !action.checked);
        
        if (selectedActions.length > 0 || remainingActions.length > 0) {
          hasCheckedActions = true;
          text += `${subGroup.title} :\n\n`;
          
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

  return {
    groups,
    toggleAction,
    handleEmailShare,
  };
};