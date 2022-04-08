import './Tache.scss';
import { formaterDate } from '../code/helper';

export default function Tache({id, titre, texteTache, dateModif}) {
  return (
    <div className="Tache">
      Basculer
      <span className="texte">{texteTache}</span>
      <span className="date">Date</span>
      {/* <span className="date">{formaterDate(dateModif.seconds)}</span> */}
      Supprimer
    </div>
  );
}