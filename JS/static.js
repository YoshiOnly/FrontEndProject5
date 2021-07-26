// Fichier js des fonctions static

/** transformation des données numérique en écriture de monnaie
 * @param {float} value - valeur numérique du prix ( 12,50 euros = 1250).
 */
export class currencyDisplay {
    static currencyInEUR(value) {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value/100);
    }
}