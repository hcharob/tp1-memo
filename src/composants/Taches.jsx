import Tache from './Tache';
import './Taches.scss';
import { useEffect } from 'react';
import * as tacheModele from '../code/tache-modele';

export default function Taches({utilisateur, taches, setTaches}) {
  // Lire les dossiers (de l'utilisateur connecté) dans Firestore
  useEffect(
    () => tacheModele.lireTout(utilisateur.uid).then(
      lesTaches => setTaches(lesTaches)
    )
    , [utilisateur, setTaches]
  );

  function gererAjoutTache(titre, texteTache) {
    tacheModele.creer(utilisateur.uid, {
      titre: titre,
      texteTache: texteTache
    }).then(
      doc => setTaches([{id: doc.id, ...doc.data()}, ...taches])
    );
  }

  return (
    <section className="Taches">
      <form onSubmit={e => setOuvert(true)}>
        <input 
          type="text"   
          placeholder="Ajoutez une tâche ..." 
          name="texteTache"
          autoComplete="off" 
        />
      </form>
      <div className="liste-taches">
      <Tache />
      {
        taches.map( 
          // Remarquez l'utilisation du "spread operator" pour "étaler" les 
          // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
          // fléchée dans les props du composant 'Dossier' !!
          tache =>  <li key={tache.titre}>
            <Tache {...tache} /></li>
        )
      }
      </div>
    </section>
  );
}