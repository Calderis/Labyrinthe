/************************* GENERATION DU LABYRNTHE **********************/
/*
Préparation du tableau LABYRINTHE. Boolean sur 5 valeurs :
Case vierge ---> vierge = n'est jamais passé dessus
Porte Nord
Porte Est
Porte Sud
Porte Ouest
*/

function LabyReset(){
    for(i=0 ; i<WIDTH ;i++) {
        LABYRINTHE[i] = new Array();
            for(j=0 ; j<HEIGHT;j++) {
                LABYRINTHE[i][j] = new Array(True,False,False,False,False);
            }
    }
    LABYRINTHE[0][0][0] = false;
    posx = 1;
    posy = 1;
}
/*
Ouverture des portes pour générer un Labyrinthe
Ne se termine seulement quand le tableau est rempli
*/
function OuvrirPortes(){
    while(DetectDone()) PorteAlea();
}
/*
Selection d'une porte de  manière aléatoire Nord-Est-Sud-Ouest
*/
function PorteAlea(){
    var PAlea = 0;
    var n = 0;
    var CoorPiege = 0;
    DoneDone = false;
    do{
        if(VerifVoisin(CreaX,CreaY)){
            // on tire un chiffre aléa entre 1 et 4
            PAlea = Math.floor((4)*Math.random()+1);
            error1 = false;
            switch(PAlea){
                case 1://Nord
                    NextCreaX = parseInt(CreaX)-1;
                    NextCreaY = parseInt(CreaY);
                    break;
                case 2://Est
                    NextCreaX = parseInt(CreaX);
                    NextCreaY = parseInt(CreaY)+1;
                    break;
                case 3://Sud
                    NextCreaX = parseInt(CreaX)+1;
                    NextCreaY = parseInt(CreaY);
                    break;
                case 4://Ouest
                    NextCreaX = parseInt(CreaX);
                    NextCreaY = parseInt(CreaY)-1;
                    break;
            }

            //gestion des cases en dehors du plateau
            if(NextCreaX<0){
                NextCreaX++;
                error1=true;
            }
            else if(NextCreaX == WIDTH){
                NextCreaX--;
                error1 = true;
            }
            else if(NextCreaY<0){
                NextCreaY++;
                error1=true;
            }
            else if(NextCreaY == HEIGHT){
                NextCreaY--;
                error1 = true;
            }

            //Si la case tirée est bien dans le tableau
            if(error1 == false){
                //Si la case est vierge
                if(LABYRINTHE[NextCreaX][NextCreaY][0]==true){
                    LABYRINTHE[NextCreaX][NextCreaY][0] = false;
                    
                    DoneDone = true; // CONDITION DE SORTIE DE LA BOUCLE
                    
                    //La case précédente devient l'actuelle
                    PrevCreaX = CreaX;
                    PrevCreaY = CreaY;

                    //La case actuelle devient la nouvelle
                    CreaX = NextCreaX;
                    CreaY = NextCreaY;
                    switch(PAlea){
                        case 1://Nord
                            //Si on ouvre la case Nord da la case suivante alors il faut ouvrir la case Sud de la case précédente
                            LABYRINTHE[CreaX][CreaY][3] = true;
                            LABYRINTHE[PrevCreaX][PrevCreaY][1] = true;

                            break;
                        case 2://Est
                            //Si on ouvre la case Est da la case suivante alors il faut ouvrir la case Ouest de la case précédente
                            LABYRINTHE[CreaX][CreaY][4] = true;
                            LABYRINTHE[PrevCreaX][PrevCreaY][2] = true;

                            break;
                        case 3://Sud
                            //Si on ouvre la case Sud da la case suivante alors il faut ouvrir la case Nord de la case précédente
                            LABYRINTHE[CreaX][CreaY][1] = true;
                            LABYRINTHE[PrevCreaX][PrevCreaY][3] = true;
                            break;
                        case 4://Ouest
                            //Si on ouvre la case Ouest da la case suivante alors il faut ouvrir la case Est de la case précédente
                            LABYRINTHE[CreaX][CreaY][2] = true;
                            LABYRINTHE[PrevCreaX][PrevCreaY][4] = true;

                            break;
                    }
                }
            }
        }
        else{//Il s'agit d'un cul de sac, nous allons alors créer une case piège à cet endroit
            if((Math.floor((3)*Math.random()+1))==1){//une chance sur trois de créer une case piège
                if(CreaX<10 || CreaY<10){
                    if(CreaY<10) CoorPiege = "0"+CreaY+""+CreaX;
                    if(CreaX<10) CoorPiege = CreaY+"0"+CreaX;
                    if(CreaY<10 && CreaX<10) CoorPiege = "0"+CreaY+"0"+CreaX;
                } else CoorPiege = CreaY+""+CreaX;
                CULDESAC[nbCDS] = CoorPiege;
                nbCDS++;
            }
            TeleporEscargot();
        }
    }while(DoneDone==false);//On sort de la boucle SSI la case a été crée dans les bonnes conditions
}
/*
Function vérifiant qu'il existe bien AU MOINS une case vierge autour de la case ciblée. Si toutes les cases sont soit non-vierges soit en dehors du tableau alors la fonction renvoit false.
*/
function VerifVoisin(VoisinX,VoisinY){
    
    //Vérification de la virginité des cases voisines
    
    // la case Nord est vierge
    if(VoisinY>0 && LABYRINTHE[VoisinX][VoisinY-1][0]==true){
        return true;}
    
    // la case Est est vierge
    if(VoisinX<(WIDTH-1) && LABYRINTHE[VoisinX+1][VoisinY][0]==true){
        return true;}
    
    // la case Sud est vierge
    if(VoisinY<(HEIGHT-1) && LABYRINTHE[VoisinX][VoisinY+1][0]==true){
        return true;}
    
    // la case Ouest est vierge
    if(VoisinX>0 && LABYRINTHE[VoisinX-1][VoisinY][0]==true){
        return true;}
    
    return false;
}
/*
Le but de cette function est de trouver les dernières cases vierges. Voici comment nous allons fonctionner :
Premièrement nous allons tirer une case au hasard avec MatchA et MatchB puis nous allons balayer le tableau de gauche à droite et changeant de ligne une fois arrivé au but.
Dès qu'une case vierge sera détecté nous allons renvoyer les coordonnées pour CreaX et CreaY afin que l'algorithe poursuive son cours. 
*/
function TeleporEscargot(){
    MatchA = Math.floor((WIDTH-1)*Math.random());
    MatchB = Math.floor((HEIGHT-1)*Math.random());
    var CaseTrouvee = false;
    do{
        if(LABYRINTHE[MatchA][MatchB][0] == false){ // On vérifie que la case piochée est bien dans le circuit
            if(VerifVoisin(MatchA,MatchB)){// On vérifie si elle à des voisins
                CreaX = MatchA;
                CreaY = MatchB;
                CaseTrouvee = true;
            }
            else{//Si pas de voisin on passe à la prochaine case
                MatchA++;
                if(MatchA == WIDTH){
                    MatchA = 0;
                    MatchB++;
                    if(MatchB == HEIGHT) MatchB = 0;
                }
            }
        }
        else{//Si pas dans le circuit on passe à la prochaine case
            MatchA++;
            if(MatchA == WIDTH){
                MatchA = 0;
                MatchB++;
                if(MatchB == HEIGHT) MatchB = 0;
            }
        }
    }while(CaseTrouvee == false);
}
/*
Définit une case arrivée
*/
function Arrive() {

    widthp = WIDTH * 0.4;
    widthm = WIDTH - widthp;

    xarrive = Math.floor((Math.random() * (WIDTH - widthm)) + widthm + 1);

    heightp = HEIGHT * 0.4;
    heightm = HEIGHT - heightp;

    yarrive = Math.floor((Math.random() * (HEIGHT - heightm)) + heightm + 1);
}
/*
Cette fonction permet de déterminer si la génération du Labyrinthe est fini ou pas (en regardant s'il reste des cases vierges ou non)
*/
function DetectDone(){
    for(i=0 ; i<WIDTH ;i++) {
            for(j=0 ; j<HEIGHT;j++) {
                if(LABYRINTHE[i][j][0] == true) return true; // il y a encore une case à remplir
            }
    }
    return false;
}
/*
Fonction qui va chercher dans le tableau chaque case et va créer une div avec les class correspondant aux portes

Si par exemple LABYRINTHE[2][7] = true false false true true
Alors l'algo va créer une div avec les portes Nord et Est de fermée et Sud et Ouest d'ouverte soit un div avec pour class Nord Est (on indique en class les portes fermées)
*/
function AfficherLaby(){
    var Game = document.getElementById("Game");
    var PlaceGame = document.getElementById("PlaceGame");
    document.getElementById('personnage').style.top = 32 +"px";
    document.getElementById('personnage').style.left = 32 +"px";
    PlaceGame.innerHTML ="";
    Game.style.height = (HEIGHT)*32+"px";
    Game.style.width = (WIDTH)*32+"px";
    var RandomMap = Math.floor((4)*Math.random()+1);
    for(i=0 ; i<WIDTH ;i++) {
            for(j=0 ; j<HEIGHT;j++) {
                var div = document.createElement('div');
                var Class = "";
                div.style.left = CreaX*32+"px";
                div.style.top = CreaY*32+"px";
                if(LABYRINTHE[i][j][1]==false){
                    Class +=" Nord";
                }
                if(LABYRINTHE[i][j][2]==false){
                    Class +=" Est";
                }
                if(LABYRINTHE[i][j][3]==false){
                    Class +=" Sud";
                }
                if(LABYRINTHE[i][j][4]==false){
                    Class +=" Ouest";
                }
                div.className = "Case"+Class;
                
                if(RandomMap==1){
                    div.style.backgroundImage="url('./images/cases/Case1.png')";
                }
                else if(RandomMap==2){
                    div.style.backgroundImage="url('./images/cases/Case2.png')";
                }
                else if(RandomMap==3){
                    div.style.backgroundImage="url('./images/cases/Case3.png')";
                }
                else if(RandomMap==4){
                    div.style.backgroundImage="url('./images/cases/Case4.png')";
                }
                
                PlaceGame.appendChild(div);
                var Cross = document.createElement('div');
                Cross.style.height = "100%";
                Cross.style.width = "100%";
                Cross.style.display = "block";
                if(j<10 || i<10){
                    if(j<10) Cross.id = "0"+j+""+i;
                    if(i<10) Cross.id = j+"0"+i;
                    if(j<10 && i<10) Cross.id = "0"+j+"0"+i;
                } else Cross.id = j+""+i;
                div.appendChild(Cross);
                if(xarrive == j && yarrive == i){
                    var numArtefact = Math.floor((8)*Math.random()+1);
                    var artefact = document.createElement('div');
                    var artVict = document.getElementById("ArtefactVictoire");
                    artefact.style.height = "100%";
                    artefact.style.width = "100%";
                    artefact.style.display = "block";
                    switch(numArtefact){
                            case 1:
                                artefact.style.backgroundImage = "url('./images/Artefacts/Bougie.png')";
                                artVict.style.backgroundImage = "url('./images/Artefacts/Bougie.png')";
                            break;
                            case 2:
                                artefact.style.backgroundImage = "url('./images/Artefacts/GameCube.png')";
                                artVict.style.backgroundImage = "url('./images/Artefacts/GameCube.png')";
                            break;
                            case 3:
                                artefact.style.backgroundImage = "url('./images/Artefacts/Statue.png')";
                                artVict.style.backgroundImage = "url('./images/Artefacts/Statue.png')";
                            break;
                            case 4:
                                artefact.style.backgroundImage = "url('./images/Artefacts/Pierre1.png')";
                                artVict.style.backgroundImage = "url('./images/Artefacts/Pierre1.png')";
                            break;
                            case 5:
                                artefact.style.backgroundImage = "url('./images/Artefacts/Pierre2.png')";
                                artVict.style.backgroundImage = "url('./images/Artefacts/Pierre2.png')";
                            break;
                            case 6:
                                artefact.style.backgroundImage = "url('./images/Artefacts/Pierre3.png')";
                                artVict.style.backgroundImage = "url('./images/Artefacts/Pierre3.png')";
                            break;
                            case 7:
                                artefact.style.backgroundImage = "url('./images/Artefacts/Pierre4.png')";
                                artVict.style.backgroundImage = "url('./images/Artefacts/Pierre4.png')";
                            break;
                            case 8:
                                artefact.style.backgroundImage = "url('./images/Artefacts/Coffre.png')";
                                artVict.style.backgroundImage = "url('./images/Artefacts/Coffre.png')";
                            break;
                    }
                    Cross.appendChild(artefact);
                }
            }
    }
}
/* Fonction générant des cases pièges de manière aléatoire*/
function CreerPieges(){
    var numPiege = 0;
    for(i=0;i<CULDESAC.length;i++){
        numPiege = Math.floor((5)*Math.random()+1);
        switch(numPiege){
            case 1:
                document.getElementById(CULDESAC[i]).className ="Piege";
                PIEGE[i] = 1;
                break;
            case 2:
                document.getElementById(CULDESAC[i]).className ="Piege";
                PIEGE[i] = 2;
                break;
            case 3:
                document.getElementById(CULDESAC[i]).className ="Piege";
                PIEGE[i] = 3;
                break;
            case 4:
                document.getElementById(CULDESAC[i]).className ="Piege";
                PIEGE[i] = 4;
                break;
            case 5:
                document.getElementById(CULDESAC[i]).className ="Piege";
                PIEGE[i] = 5;
                break;
        }
    }
}
/* Vérifie que la case sur laquel on va marcher contient une case piege ou non*/
function Piege(pos_x,pos_y){

    if(pos_x<10 || pos_y<10){
        if(pos_x<10) CoorPerso = "0"+pos_x+""+pos_y;
        if(pos_y<10) CoorPerso = pos_x+"0"+pos_y;
        if(pos_x<10 && pos_y<10) CoorPerso = "0"+pos_x+"0"+pos_y;
    } else CoorPerso = pos_x+""+pos_y;
    
    
    for(i=0;i<CULDESAC.length;i++){
        if (CoorPerso == CULDESAC[i]) {
            console.log(MASK);
            if(PIEGE[i] == 1) {
                PiegeCross = true;
                setTimeout("PiegeCross = false;",20000);
                document.getElementById("PiegeA").innerHTML ="<div class='VignetteA' title='Impossible de poser des repères !'></div>"
                setTimeout("document.getElementById('PiegeA').innerHTML ='';",8000);
                PIEGE[i] = 0;
                document.getElementById(CULDESAC[i]).className ="";
                CULDESAC[i] = 0;
            }
            if(PIEGE[i] == 2){
               PiegeInversion = true;
               setTimeout("PiegeInversion = false;",10000);
                document.getElementById("PiegeB").innerHTML ="<div class='VignetteB' title='Les axes sont inversés !'></div>"
                setTimeout("ocument.getElementById('PiegeB').innerHTML ='';",8000);
                PIEGE[i] = 0;
                document.getElementById(CULDESAC[i]).className ="";
                CULDESAC[i] = 0;
            }
            if(PIEGE[i] == 3){
                PiegeVisuPlus = true;
                setTimeout("PiegeVisuPlus = false;",8000);
                document.getElementById("PiegeC").innerHTML ="<div class='VignetteC' title='Une meilleure visu s'offre à vous !'></div>"
                MASK.className = "MaskTypeA";
                setTimeout("MASK.className = 'MaskTypeB';document.getElementById('PiegeC').innerHTML ='';",8000);
                PIEGE[i] = 0;
                document.getElementById(CULDESAC[i]).className ="";
                CULDESAC[i] = 0;
            }
            if(PIEGE[i] == 4){
                PiegeVisuMoins = true;
                setTimeout("PiegeVisuMoins = false;",8000);
                document.getElementById("PiegeD").innerHTML ="<div class='VignetteD'  title='Vous avez surement un truc dans l'oeil, vous avez une visu moins bonne...'></div>"
                MASK.className = 'MaskTypeC';
                setTimeout("MASK.className = 'MaskTypeB';document.getElementById('PiegeD').innerHTML ='';",8000);
                PIEGE[i] = 0;
                document.getElementById(CULDESAC[i]).className ="";
                CULDESAC[i] = 0;
            }
            if(PIEGE[i] == 5){
                PiegeVisuNoir = true;
                setTimeout("PiegeVisuNoir = false;",8000);
                document.getElementById("PiegeE").innerHTML ="<div class='VignetteE' title='Qui à éteint la lumière ?'></div>"
                MASK.className = 'MaskTypeNoir';
                setTimeout("MASK.className = 'MaskTypeB';document.getElementById('PiegeE').innerHTML ='';",8000);
                PIEGE[i] = 0;
                document.getElementById(CULDESAC[i]).className ="";
                CULDESAC[i] = 0;
            }
            if(PIEGE[i] == 6){
                OR += 100;
                PIEGE[i] = 0;
                document.getElementById(CULDESAC[i]).className ="";
                CULDESAC[i] = 0;
            }
            if(PIEGE[i] == 7){
                xp += 150;
                PIEGE[i] = 0;
                document.getElementById(CULDESAC[i]).className ="";
                CULDESAC[i] = 0;
            }
        }
    }
}


/*
Function permettant de centrer l'écran sur le personnage.
*/
function CentrerEcran(){
    EcranX = screen.width;
    EcranY = screen.height;
    Game.style.marginLeft = (EcranX/2.1)+"px";
    Game.style.marginTop = (EcranY/2.8)+"px";
}





/************************* FONCTIONNEMENT DU JEU **********************/

/***********  FONCTIONS LIEES AU CHRONO ***********/
/* Fonction enclenchant le chrono, il passe à +1 minute toutes les 60 secondes et +1 heure toutes les 60 minutes.*/
function chrono(){
    ChronoIsRunning = true;
    centi++; //incrémentation des dixièmes de 1
    if (centi>9){//si les dixièmes > 9, réinitialise à 0 et on incrémente les secondes de 1
        centi=0;
        secon++;
    } 
    if (secon>59){//si les secondes > 59, on les réinitialise à 0 et on incrémente les minutes de 1
        secon=0;
        minu++;
    }
    if(centi!=0) document.getElementById("TimeC").innerHTML=centi+""; //on affiche les dixièmes
    if(secon!=0) document.getElementById("TimeB").innerHTML=secon+"s "; //on affiche les secondes
    if(minu!=0) document.getElementById("TimeA").innerHTML=minu+"m "; //on affiche les minutes
    compte=setTimeout('chrono()',100); //la fonction est relancée tous les 10° de secondes
}
function rasee(){ //fonction qui remet les compteurs à 0
    clearTimeout(compte); //arrête la fonction chrono()
    centi=0;
    secon=0;
    minu=0;
    document.getElementById("TimeC").innerHTML=" ";
    document.getElementById("TimeB").innerHTML=" ";
    document.getElementById("TimeA").innerHTML=" ";
}
function Pause(){
    if(ChronoIsRunning){
        $('#ChronoSymbole').attr('src', './images/play.png');
        MsgInGame.innerHTML = "<h1 id='Pause'>PAUSE</1>";
        clearTimeout(compte);
        ChronoIsRunning = false;
    }
    else{
        MsgInGame.innerHTML = "<h1 id='Reprendre'>REPRISE DE LA PARTIE</1>";
        $('#ChronoSymbole').attr('src', './images/pause.png');
        chrono();
    }
}

/*********** FONCTION LIEES AU GAMEPLAY ***********/

/* Gère l'expérience du personnage - Algorithme de passage de niveau*/
function character(OR){
    $('.credit').text(OR);
    $('.test').text(science);
    if ( level < 30 )
    {
        while ( xp >= xp_LvUp )
        {
        xp = xp - xp_LvUp;
        xp_LvUp = xp_LvUp + Math.floor( xp_LvUp / 4 );
        level++;
        $('.level').text("LV " + level);
        }
    }
}


/*
Le joueur a perdu
*/
/*
Vérifie si l'on est sur la case d'arrivée
*/
function VerifArrive() {

    x=parseInt(personnage.style.left);
    y=parseInt(personnage.style.top);

    pos_x = Math.floor(x/32);
    pos_y = Math.floor(y/32);

    if (xarrive == pos_x && yarrive == pos_y) {
        Gagner();
        Fin = true;
    }

}
/*
Gestion du panneau de victoire
*/
function Gagner() {
    document.getElementById("Reprise").className = "Ferme";
    BonusA = 0;
    BonusB = 0;
    BonusC = 0;
    ORGains = ((HEIGHT*WIDTH)*0.5);
    xp = xp + Math.floor( xp_LvUp / ( level ) + 1 );
    
    clearTimeout(compte);
    Pause();
    document.location="#Results";
    if(centi!=0) document.getElementById("TEMPSC").innerHTML=centi+" centièmes "; //on affiche les dixièmes
    if(secon!=0) document.getElementById("TEMPSB").innerHTML=secon+" secondes "; //on affiche les secondes
    if(minu!=0) document.getElementById("TEMPSA").innerHTML=minu+" minutes "; //on affiche les minutes
    if(minu<((WIDTH+HEIGHT)*2.5)){
        BonusA = 150;
        BonusB = 15;
        document.getElementById("BonusA").innerHTML= "\n(Réussi en moins de "+((WIDTH+HEIGHT)*2.5)+" sec) : <span class='Gold'>"+BonusA+"</span> coins";
        document.getElementById("BonusB").innerHTML= "\n(Réussi en moins de "+((WIDTH+HEIGHT)*2.5)+" sec) : <span class='Science'>"+BonusB+"</span> science";
    }
    OR = parseInt(OR) + parseInt(ORGains) + parseInt(BonusA) + parseInt(BonusC);
    console.log(OR);
    science = parseInt(science) + parseInt(BonusB);
    character(OR);
    xp_level();
}
function xp_level(){
    value_xp = Math.floor((xp/xp_LvUp)*100);

    if (value_xp <10)  {
       $('.barreLV').css('background', 'url(./images/xp0.png) no-repeat');
    }
    else if (value_xp <26) {
        $('.barreLV').css('background', 'url(./images/xp1.png) no-repeat');
    }
    else if (value_xp <51) {
        $('.barreLV').css('background', 'url(./images/xp2.png) no-repeat');
    }
    else if (value_xp <76) {
        $('.barreLV').css('background', 'url(./images/xp3.png) no-repeat');
    }
}
/*
Séries de fonction permettant de poser des croix au sol
*/
function CrossUp(){
    if(pos_x<10 || pos_y<10){
        if(pos_x<10) CoorCross = "0"+pos_x+""+pos_y;
        if(pos_y<10) CoorCross = pos_x+"0"+pos_y;
        if(pos_x<10 && pos_y<10) CoorCross = "0"+pos_x+"0"+pos_y;
    } else CoorCross = pos_x+""+pos_y;
    document.getElementById(CoorCross).style.backgroundImage = "url(./images/cases/CrossN.png)";
}
function CrossRight(){
    if(pos_x<10 || pos_y<10){
        if(pos_x<10) CoorCross = "0"+pos_x+""+pos_y;
        if(pos_y<10) CoorCross = pos_x+"0"+pos_y;
        if(pos_x<10 && pos_y<10) CoorCross = "0"+pos_x+"0"+pos_y;
    } else CoorCross = pos_x+""+pos_y;
    document.getElementById(CoorCross).style.backgroundImage = "url(./images/cases/CrossE.png)";
}
function CrossDown(){
    if(pos_x<10 || pos_y<10){
        if(pos_x<10) CoorCross = "0"+pos_x+""+pos_y;
        if(pos_y<10) CoorCross = pos_x+"0"+pos_y;
        if(pos_x<10 && pos_y<10) CoorCross = "0"+pos_x+"0"+pos_y;
    } else CoorCross = pos_x+""+pos_y;
    document.getElementById(CoorCross).style.backgroundImage = "url(./images/cases/CrossS.png)";
}
function CrossLeft(){
    if(pos_x<10 || pos_y<10){
        if(pos_x<10) CoorCross = "0"+pos_x+""+pos_y;
        if(pos_y<10) CoorCross = pos_x+"0"+pos_y;
        if(pos_x<10 && pos_y<10) CoorCross = "0"+pos_x+"0"+pos_y;
    } else CoorCross = pos_x+""+pos_y;
    document.getElementById(CoorCross).style.backgroundImage = "url(./images/cases/CrossO.png)";
}




/****************** PARTIE FONCTIONS SITE *******************/
/*
Mini fonction dont le but est de faire apparaitre le sous menu dans le menu choix du jeu
*/
$(document).ready(function() {
    $('#GenLab').mouseup(function(){
        var is = $('#ChxLevel').attr('class');
        $('#ChxLevel').toggleClass("SsMenu", is == "Fermer");
    });
});
// Fonction JQuery pour le slide des informations du compte de la page héros

$(document).ready(function() {
	$('.informations h2').each(function() {
		var tis = $(this), state = false, info = tis.next('div').slideUp();
		tis.click(function() {
			state = !state;
			info.slideToggle(state);
			tis.toggleClass('active',state);
		});
	});
});

//Modification de CSS pour permettre le scroll de la page crédits. 

$('#menuCredit').mouseup(function(){
    $('#svg').css({
        'display': 'none'
    });
    $('body').css({
        'position': 'inherit'
    })
})

$('#MenuJouer').mouseup(function(){
    $('#svg').css({
        'display': 'block'
    });
    $('body').css({
        'position': 'fixed'
    })
})

$('#MenuHero').mouseup(function(){
    $('#svg').css({
        'display': 'block'
    });
    $('body').css({
        'position': 'fixed'
    })
})

$('#MenuRegles').mouseup(function(){
    $('#svg').css({
        'display': 'block'
    });
    $('body').css({
        'position': 'fixed'
    })
})

$('#MenuAccueil').mouseup(function(){
    $('#svg').css({
        'display': 'block'
    });
    $('body').css({
        'position': 'fixed'
    })
})

//Affichage sauvegarder déconnexion 

$(document).ready(function() {
    $('#cogsJouer').each(function() {
        var tis = $(this), state = false, info = $('.cogsOptionsJouer').slideUp();
        tis.click(function() {
            state = !state;
            info.slideToggle(state);
            tis.toggleClass('active',state);
        });
    });
});

$(document).ready(function() {
    $('#cogsHeros').each(function() {
        var tis = $(this), state = false, info = $('.cogsOptionsHeros').slideUp();
        tis.click(function() {
            state = !state;
            info.slideToggle(state);
            tis.toggleClass('active',state);
        });
    });
});
