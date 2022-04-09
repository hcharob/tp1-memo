import './Tache.scss';
import { formaterDate } from '../code/helper';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Tache({texteTache, dateModif}) {
  return (
    <div className="Tache">
      <IconButton className="checkVert" size="small">
      <CheckIcon className="signePositif"/>
      </IconButton>
      <span className="texte">{texteTache}</span>
      <span className="date">{formaterDate(dateModif.seconds)}</span>
      <IconButton className="checkRouge" size="small">
      <RemoveIcon className="signeNegatif"/>
      </IconButton>
    </div>
  );
}