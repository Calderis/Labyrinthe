function LancerJeu(Lvl){
    
    if(Lvl==1){
        HEIGHT = 20;
        WIDTH = 20;
    }
    else if(Lvl==2){
        HEIGHT = 50;
        WIDTH = 50;
    }
    else if(Lvl==3){
        HEIGHT = 100;
        WIDTH = 100; 
    }
    document.getElementById("ChxLevel").className = "Fermer";
    LabyReset();// Préparation du Labyrinthe
    OuvrirPortes(); // Faire le chemin
    Arrive();
    AfficherLaby();
    CentrerEcran();
    CreerPieges();
    rasee();
    chrono();
    ChronoIsRunning = true;
    document.location.href="index.php#Jouer";
    document.getElementById("Reprise").className="Ouvert";
    RunMechant();
}
function ChargerJeu(map){
    document.getElementById("ChxLevel").className = "Fermer";
    LABYRINTHE = map;
    console.log(LABYRINTHE);
    /*AfficherLaby();
    CentrerEcran();
    CreerPieges();
    rasee();
    chrono();
    ChronoIsRunning = true;
    document.location.href="index.php#Jouer";
    document.getElementById("Reprise").className="Ouvert";*/
}
document.getElementById("Reprise").className="Ferme";