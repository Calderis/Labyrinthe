/*************************************/
/ README - Instructions d'installation/
/*************************************/

Pour faire fonctionner le Projet Labyrinthe sur votre serveur, il vous faudra avoir accès à une base de donnée et un espace sur un serveur suffisant pour la taille du dossier.

1) Copier coller le Projet Labyrinthe à la racine. 
2) Changer le nom de la base de donnée dans les fichiers suivants:
    config.php
    connexion.php
    inscription.php
    join.php
3) Importez dans votre base de donnée les fichier sauvegarde.sql et membre.sql


***** Personnaliser le jeu *****

Pour changer les stats initiaux d'un nouveau joueurs, il faut modifier les variables dans le fichier VariableGlobales.js:
    OR
    science
    level
    xp
    xp_LvUp : pour désigner les tranches de niveaux
    
Pour changer la taille des niveau, modifiez la hauteur et la largeur de chacun des trois niveaux dans le main.js



ETAT DU JEU ACTUEL:
Boutique en développement
Jeu fonctionnel
Cases Fonctionnelles.

Tout fonctionne sans bug apparant. Il doit tout de meme etre spécifié que le projet pourrait encore être amélioré d'un point de vue gameplay et optimisation du programme.

Sources utilisées pour le programme : magnhetic.fr/Zelda, il s'agit en fait de notre projet de deuxième trimestre auquel la parti déplacement est similaire au Projet labyrinthe. Guillaume Merlini et Rémi Wetteren étant les propriétaires de cet algorithme, il n'y a donc aucune reprise ni recopiage.
Le projet entier est créé selon nos propres algorithmes. Aucunes sources extérieures.


Si nous pouvions ajouter quelques choses au labyrinthe, cela auraient étés : 
    _ Un boutique plus complète comprenant d'avantage d'item
    _ Un système pour dépenser les points de savoir pour avoir des pouvoirs
    _ Faire un système de perso unique (un skin = un pouvoir)
    _ Ajouter des événements aléatoires leur du jeu (exemple : le jeu se repli progressivement de lave pour pousser le jouer à accélérer)
    _ Faire en sorte que la lampe soit associé au curseur de la souris
    _ Ajouter un mode multijoueurs avec un joueur désigné comme un chat et un comme une souris
    _ Ajouter un ranking pour pouvoir comparer ses scores
    _ Ajouter un mode défis dans lequel on peut inviter des amis à refaire un labyrinthe que l'on a deja fait en batant le record de temps.
    _ Faire une version adaptable pour tablette