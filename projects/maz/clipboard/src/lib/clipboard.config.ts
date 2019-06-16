/**
 * Interface de configuration pour la confirmation de la copie dans le presse-papier.
 * @example
 * { message: 'Copié' }
 * @example
 * { message: 'Copié', duree: 10 }
 *
 * @param message Le message à afficher
 * @param [duree=2] La durée d'affichage du message (en secondes)
 */
export interface ClipboardConfig {
  message: string;
  duree?: number;
}
