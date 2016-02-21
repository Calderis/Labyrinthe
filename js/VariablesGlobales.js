/****** VARIABLE GLOBALES ******/

//PROPRIETE LABYRINTHE
var HEIGHT = 20; // Nombre de case en hauteur
var WIDTH = 20; // Nombre de case en largeur

//LABYRINTHE
var LABYRINTHE = new Array();
var CaseX = new Array();
var Game = document.getElementById("Game");
var MsgInGame = document.getElementById("MsgInGame");
var MASK = document.getElementById("MASK");
var Fin = false;

//LE MECHANT
var MechantX = 0;
var MechantY = 0;
var mechant = document.getElementById("mechant");


//Position concernant la création du Labyrinthe
var CreaX = 0;
var CreaY = 0;

var NextCreaX;
var NextCreaY;

var PrevCreaX = 0;
var PrevCreaY = 0;

var xarrive = 0;
var yarrive = 0;

//Positionnement du tableau
var EcranX = 0;
var EcranY = 0;

//Deplacement du plateau
var posx = 0;
var posy = 0;

var centi=0 // initialise les dixtièmes
var secon=0 //initialise les secondes
var minu=0 //initialise les minutes
var compte;

var etape;
var step = 0;

var ORGains = 0;


/*DEPLACEMENTS*/
var personnage = document.getElementById("personnage");
var terrain = document.getElementById("Game");
var allow = true;

/*VARIABLES CRAIE*/
var CoorCross = "";


/*VARIABLES PERSONNAGE*/
var OR = 0;
var science = 0;
var level = 1;
var xp = 0;
var xp_LvUp = 50;

//VARIABLES GENERATION CASES SPECIALES
var CULDESAC = new Array();//Contient les emplacements des pieges = l'emplacements des culs de sac
var PIEGE = new Array();// Contient la valeur des pièges.
var nbCDS = 0;
var CoorPerso = 0;
var PiegeCross = false;
var PiegeInversion = false;
var PiegeVisuPlus = false;
var PiegeVisuMoins = false;
var PiegeVisuNoir = false;


//Chrono
var ChronoIsRunning = false;
var ChronoSymbole = document.getElementById("containerChrono");

//Erreurs
var error1 = false; //True si la case tiré est en dehors du tableau
var L = 0; //Anti boucle infini
var True = true;
var False = false;
var DoneDone;
var allowB = true;


