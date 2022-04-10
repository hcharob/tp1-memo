import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';

export default function AjoutDossier({ ouvert, setOuvert, gererAjoutTache }) {
    const [texteTache, setTexteTache] = useState('');

    const gererOuvrir = () => {
        setOuvert(true);
    };

    const gererFermer = () => {
        // Il faut réinitialiser les états des valeurs de formulaire car sinon 
        // les dernières valeurs saisies seront sauvegardées dans les 'états'
        // du composant
        setTexteTache('');
        setOuvert(false);
    };

		function gererSoumettre() {
			// Code qui gère l'ajout dans Firestore
            if(titre.search(/[a-z]{2,}/i) != -1) {
                gererAjoutDossier(texteTache);
                gererFermer();
            }
		}

    return (
        <div>
            <Dialog open={ouvert} onClose={gererFermer}>
                <DialogActions>
                    <Button onClick={gererFermer}>Annuler</Button>
                    <Button onClick={gererSoumettre}>Soumettre</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
