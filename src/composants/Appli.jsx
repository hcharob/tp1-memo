import './Appli.scss';
import logo from '../images/memo-logo.png';
import Controle from './Controle';
import Taches from './Taches';
import AjoutTache from './AjoutTache';
import Accueil from './Accueil';
import Utilisateur from './Utilisateur';
import { useState, useEffect } from 'react';
import * as tacheModele from '../code/tache-modele';
import { observerEtatConnexion } from '../code/utilisateur-modele';

export default function Appli() {
  
  const [utilisateur, setUtilisateur] = useState(null);
  // État des 'dossiers' de l'utilisateur connecté
  const [taches, setTaches] = useState([]);
  
  useEffect(() => observerEtatConnexion(setUtilisateur),[]);
  // État du formulaire d'ajout de dossier
  const [ouvert, setOuvert] = useState(false);

   // Gérer l'ajout d'un dossier
   function gererAjoutTache(texteTache) {
    tacheModele.creer(utilisateur.uid, {
      texteTache: texteTache
    }).then(
      doc => setTaches([{id: doc.id, ...doc.data()}, ...taches])
    );
  }

  return (
    // 1)  Si un utilisateur est connecté : 
    utilisateur ?
      <div className="Appli"> 
        <header className="appli-entete">
          <img src={logo} className="appli-logo" alt="Memo" />
          <Utilisateur utilisateur={utilisateur} />
        </header>
        <Taches utilisateur={utilisateur} taches={taches} setTaches={setTaches} />
        <AjoutTache ouvert={ouvert} setOuvert={setOuvert} gererAjoutTache={gererAjoutTache} />
        <Controle />
      </div>

    // 2) Par contre si aucun utilisateur n'est connecté, on affiche plutôt le composant suivant : 
      :
        <Accueil />
  );
}
