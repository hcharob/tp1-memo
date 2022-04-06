import './Appli.scss';
import logo from '../images/memo-logo.png';
import Controle from './Controle';
import Taches from './Taches';
import Accueil from './Accueil';
import Utilisateur from './Utilisateur';

export default function Appli() {

  return (
    // 1)  Si un utilisateur est connecté : 
      <div className="Appli">
        <header className="appli-entete">
          <img src={logo} className="appli-logo" alt="Memo" />
          <Utilisateur />
        </header>
        <Taches />
        <Controle />
      </div>

    // 2) Par contre si aucun utilisateur n'est connecté, on affiche plutôt le composant suivant : 
      // <Accueil />
  );
}
