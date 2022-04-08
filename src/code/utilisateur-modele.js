import { authFirebase, authGoogle, bdFirestore } from './init';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

/**
 * @param {Function} mutateurEtatUtilisateur 
 */
 export function observerEtatConnexion(mutateurEtatUtilisateur) {
    onAuthStateChanged(authFirebase, 
        util => {
            // S'il y a un utilisateur autre que 'null', on sauvegarde dans Firestore
            if(util) {
                sauvegarderProfil(util);
            }
            mutateurEtatUtilisateur(util);
        }
    )
}

/**
 * Ouvre une connexion Firebase (avec Google)
 */
export function connexion() {
    signInWithPopup(authFirebase, authGoogle);
}

/**
 * Ferme la connexion Firebase Auth
 */
export function deconnexion() {
    authFirebase.signOut();
}


/**
 * Sauvegarder le profil de l'utilisateur connecté dans Firestore
 * 
 * @param {Object} util Objet du profil de l'utilisateur connecté retourné par 
 * le fournisseur Google Auth
 */
function sauvegarderProfil(util) {
    setDoc(
        doc(bdFirestore, 'memo', util.uid), 
        {nom: util.displayName, courriel: util.email}, 
        {merge: true}
    );
}