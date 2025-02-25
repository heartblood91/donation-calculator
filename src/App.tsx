import { FC } from 'react';
import { ActionTable } from './components/ActionTable';
import { InfoBox } from './components/InfoBox';
import { Header } from './components/Header';
import { useCalculator } from './hooks/useCalculator';
import { useActionTable } from './hooks/useActionTable';
import type { TownType } from './hooks/useCalculator';

const App: FC = () => {
  const { groups, toggleAction, handleEmailShare: handleActionEmailShare } = useActionTable();

  const {
    showActionTable,
    setShowActionTable,
    firstCircle,
    setFirstCircle,
    secondCircle,
    setSecondCircle,
    townType,
    setTownType,
    thirdCircle,
    setThirdCircle,
    potentialRange,
    handleEmailShare,
    calculateActionsProgress,
  } = useCalculator(groups);

  if (showActionTable) {
    return (
      <ActionTable 
        onBack={() => setShowActionTable(false)} 
        groups={groups}
        toggleAction={toggleAction}
        handleEmailShare={handleActionEmailShare}
      />
    );
  }

  const townOptions: { value: TownType; label: string }[] = [
    {
      value: 'smallTown',
      label: "Petite commune (jusqu'à 2.000 habitants)",
    },
    {
      value: 'mediumTown',
      label: 'Commune de taille moyenne (8.000 à 10.000 habitants)',
    },
    {
      value: 'largeCity',
      label: 'Agglomération importante',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 antialiased">
      <div className="max-w-[1400px] mx-auto py-4 px-4 md:py-8">
        <div className="bg-white rounded-xl shadow-xl">
          <Header
            title="Calculette de Potentiel de Collecte"
            progress={calculateActionsProgress()}
            onShare={handleEmailShare}
            onNavigate={() => setShowActionTable(true)}
            isCalculator={true}
          />

          <div className="p-4 md:p-6">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-8">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#2DA4A8] text-white flex items-center justify-center text-sm">
                    !
                  </div>
                </div>
                <p className="text-gray-700">
                  La calculette est d'abord un outil pour obtenir un ordre de
                  grandeur du potentiel de la collecte, qu'il faudra affiner en
                  fonction de la capacité à animer la collecte et des actions que
                  vous avez envisagez de mener.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* First Circle */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-[#2DA4A8] text-white flex items-center justify-center">
                    1
                  </div>
                  <h2 className="text-xl font-medium text-gray-800">
                    Premier cercle et ambassadeurs
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de donateurs potentiels
                    </label>
                    <p className="text-sm text-gray-600 italic mb-2">
                      Reportez ici le nombre de personnes concernées
                    </p>
                    <input
                      type="number"
                      min="0"
                      value={firstCircle.people}
                      onChange={(e) =>
                        setFirstCircle({
                          ...firstCircle,
                          people: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DA4A8] focus:border-[#2DA4A8] transition-shadow"
                    />
                    <InfoBox
                      isExpanded={firstCircle.isExpanded}
                      onClick={() =>
                        setFirstCircle({
                          ...firstCircle,
                          isExpanded: !firstCircle.isExpanded,
                        })
                      }
                    >
                      <p className="mb-2">
                      Le 1er cercle regroupe les personnes concernées ou en proximité directe avec le projet
                      </p>
                      <p className="mb-2">
                        Il peut s'agir par exemple des paroissiens d'une église,
                        d'une communauté sportive ou culturelle, du cercle de
                        personnes le plus proche du porteur de projet ou
                        l'association animatrice
                      </p>
                      <p className="mb-2">
                        Parmi eux, se trouvent certainement les meilleurs
                        ambassadeurs du projet.
                      </p>
                      <p>
                        Cette première cible peut également comprendre les
                        personnes ayant un lien « affectif » avec le projet, sans
                        pour autant être en proximité géographique. Par exemple,
                        les « passionnés » d'une thématique propre au projet ou
                        les anciens vacanciers d'une station de ski de village.
                      </p>
                    </InfoBox>
                  </div>
                </div>
              </div>

              {/* Second Circle */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-[#2DA4A8] text-white flex items-center justify-center">
                    2
                  </div>
                  <h2 className="text-xl font-medium text-gray-800">
                    Deuxième cercle, les sensibilisés
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de donateurs potentiels
                    </label>
                    <p className="text-sm text-gray-600 italic mb-2">
                      Reportez ici le nombre de personnes concernées
                    </p>
                    <input
                      type="number"
                      min="0"
                      value={secondCircle.people}
                      onChange={(e) =>
                        setSecondCircle({
                          ...secondCircle,
                          people: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DA4A8] focus:border-[#2DA4A8] transition-shadow"
                    />
                    <InfoBox
                      isExpanded={secondCircle.isExpanded}
                      onClick={() =>
                        setSecondCircle({
                          ...secondCircle,
                          isExpanded: !secondCircle.isExpanded,
                        })
                      }
                    >
                      <p className="mb-2">
                        Le 2e cercle, les sensibilisés, est composé des habitants
                        de la région ou des environs, non directement concernés
                        par le projet mais accessibles, adressables, par exemple
                        les lecteurs de journaux locaux, les membres
                        d'associations tierces, etc.
                      </p>
                      <p>
                        Pour évaluer le nombre de personnes concernées, évaluer le
                        nombre d'habitants alentour, selon votre commune,
                        communauté ou agglomération.
                      </p>
                    </InfoBox>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sélectionnez s'il s'agit des habitants :
                    </label>
                    <div className="space-y-2">
                      {townOptions.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="townType"
                            value={option.value ?? ''}
                            checked={townType === option.value}
                            onChange={(e) => setTownType(e.target.value as TownType)}
                            className="text-[#2DA4A8] focus:ring-[#2DA4A8] h-5 w-5"
                          />
                          <span className="ml-3">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Circle */}
              <div className="p-6 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-[#2DA4A8] text-white flex items-center justify-center">
                    3
                  </div>
                  <h2 className="text-xl font-medium text-gray-800">
                    Troisième cercle, les inconnus
                  </h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Les visiteurs (y compris en ligne)
                    </label>
                    <p className="text-sm text-gray-600 italic mb-2">
                      Reportez ici le nombre de personnes concernées
                    </p>
                    <input
                      type="number"
                      min="0"
                      value={thirdCircle.visitors.people}
                      onChange={(e) =>
                        setThirdCircle({
                          ...thirdCircle,
                          visitors: {
                            ...thirdCircle.visitors,
                            people: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DA4A8] focus:border-[#2DA4A8] transition-shadow"
                    />
                    <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                      Les visiteurs accueillis et sollicités lors de leur visite
                    </label>
                    <p className="text-sm text-gray-600 italic mb-2">
                      Reportez ici le nombre de personnes concernées
                    </p>
                    <input
                      type="number"
                      min="0"
                      value={thirdCircle.onSiteVisitors.people}
                      onChange={(e) =>
                        setThirdCircle({
                          ...thirdCircle,
                          onSiteVisitors: {
                            ...thirdCircle.onSiteVisitors,
                            people: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2DA4A8] focus:border-[#2DA4A8] transition-shadow"
                    />
                    <InfoBox
                      isExpanded={thirdCircle.onSiteVisitors.isExpanded}
                      onClick={() =>
                        setThirdCircle({
                          ...thirdCircle,
                          onSiteVisitors: {
                            ...thirdCircle.onSiteVisitors,
                            isExpanded: !thirdCircle.onSiteVisitors.isExpanded,
                          },
                        })
                      }
                    >
                      <p className="mb-2">
                        Ces potentiels donateurs, sans attaches locales
                        particulières, sont d'abord attirés par l'intérêt patrimonial
                        et la renommée du site. Ils découvrent ou visitent le site
                        sans avoir de lien particulier avec celui-ci.
                      </p>
                      <p className="mb-2">
                        Ce cercle inclut les potentiel « visiteurs » sur Internet
                        qui découvrent et soutiennent le projet lors de campagnes
                        de communication.
                      </p>
                      <p>
                        Dans cette catégorie, on évaluera à part les visiteurs du
                        site lorsqu'ils sont accueillis sur place (entrée payante
                        ou non), ou lors d'un événement particulier, s'il y a
                        lieu, ces visiteurs pouvant faire l'objet d'une
                        sollicitation particulière pour effectuer un don lors de
                        leur visite.
                      </p>
                    </InfoBox>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="p-6 bg-[#2DA4A8] rounded-lg text-white">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      Estimation du potentiel de collecte
                    </h2>
                    <div className="text-3xl font-bold mt-2">
                      {potentialRange.min.toLocaleString('fr-FR')}€ -{' '}
                      {potentialRange.max.toLocaleString('fr-FR')}€
                    </div>
                  </div>
                </div>
                <div className="text-sm opacity-90">
                  <p>
                    L'atteinte du potentiel de collecte est fortement liée aux
                    actions d'animation qui seront réalisées.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
