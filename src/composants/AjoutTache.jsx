import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function AjoutTache({ ouvert, setOuvert, gererAjoutTache }) {
    const [titre, setTitre] = useState('');
    const [texteTache, setTexteTache] = useState('');

    const gererOuvrir = () => {
        setOuvert(true);
    };

    const gererFermer = () => {
        // Il faut réinitialiser les états des valeurs de formulaire car sinon 
        // les dernières valeurs saisies seront sauvegardées dans les 'états'
        // du composant
        setTitre('');
        setTexteTache('');
        setOuvert(false);
    };

		function gererSoumettre() {
			// Code qui gère l'ajout dans Firestore
            if(titre.search(/[a-z]{2,}/i) != -1) {
                gererAjoutTache(titre, texteTache);
                gererFermer();
            }
		}

    return (
        <div>
            <Dialog open={ouvert} onClose={gererFermer}>
                <DialogTitle>Ajouter une tâche</DialogTitle>
                <DialogContent>
                    {/* Titre de la tâche */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="titre"
                        label="Titre de la tâche"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={e => setTitre(e.target.value)}
                    />
                    {/* URL de l'image */}
                    <TextField
                        margin="dense"
                        id="texteTache"
                        label="Description de la tâche"
                        type="url"
                        fullWidth
                        variant="standard"
                        style={{ marginBottom: "1.5rem" }}
                        onChange={e => setTexteTache(e.target.value)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
