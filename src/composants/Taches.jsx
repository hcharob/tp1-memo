import Tache from './Tache';
import './Taches.scss';
import { useEffect } from 'react';
import * as tacheModele from '../code/tache-modele';
import { useState } from 'react';

export default function Taches({utilisateur, taches, setTaches}) {
  const [texteTache, setTexteTache] = useState('');

  // Lire les dossiers (de l'utilisateur connecté) dans Firestore
  useEffect(
    () => tacheModele.lireTout(utilisateur.uid).then(
      lesTaches => setTaches(lesTaches) 
    )
    , [utilisateur, setTaches]
  );

// Fonction qui gère l'ajout des tâches
  function gererAjoutTache(texteTache) {
    tacheModele.creer(utilisateur.uid, {
      texteTache: texteTache
      
    }).then(
      doc => setTaches([{id: doc.id, ...doc.data()}, ...taches])
    );
  }

  return (
    <section className="Taches">
      <form onSubmit={e => {gererAjoutTache(texteTache); e.preventDefault(); setTexteTache('');} } >
        <input 
          type="text"   
          placeholder="Ajoutez une tâche ..." 
          name="texteTache"
          autoComplete="off" 
          autoFocus
          id="texteTache"
          variant="standard"
          onChange={e => setTexteTache(e.target.value)}
        />
      </form>
      <div className="liste-taches">
      {
        taches.map( 
          tache =>  <li key={tache.texteTache} >
          <Tache {...tache} /> </li>
        )
      }
      </div>
    </section>
    
  );
}