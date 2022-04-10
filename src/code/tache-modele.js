import { bdFirestore } from "./init";
import { getDocs, collection, addDoc, Timestamp, getDoc } from "firebase/firestore";

/**
 * Obtenir toutes les tâches d'un utilisateur
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecté
 * @returns {Promise<any[]>} Promesse avec le tableau des tâche lorsque complétée
 */
export async function lireTout(idUtilisateur) {
    return getDocs(collection(bdFirestore, 'memo', idUtilisateur, 'taches')).then(
        res => res.docs.map(doc => ({id: doc.id, ...doc.data()}))
    );
}

/**
 * Ajouter une tâche pour un utilisateur
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecté
 * @param {object} tache Objet représentant la tâche à ajouter 
 * @returns 
 */
export async function creer(idUtilisateur, tache) {
    // On ajoute dateModif à l'objet tache
    tache.dateModif = Timestamp.now();
    // Référence à la collection dans laquelle on veut ajouter la tâche
    let coll = collection(bdFirestore, 'memo', idUtilisateur, 'taches');
    // Ajout de la tâche avec addDoc : retourne une promesse contenant une "référence" Firestore au document ajouté
    let refDoc = await addDoc(coll, tache);
    // On utilise la référence pour obtenir l'objet représentant le document ajouté grâce à la fonction getDoc: 
    // cette fonction retourne une promesse, d'où l'utilisation de 'await'...
    return await getDoc(refDoc);
}