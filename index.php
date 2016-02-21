<?php 

    session_start();

    if (isset($_POST['inscription'])) { 
        if(!empty($_POST['pseudo']) && !empty($_POST['pass']) && !empty($_POST['passconf']) && !empty($_POST['email']))
        {
            try
            {
                $bdd = new PDO('mysql:host=magnhetic.fr.mysql;dbname=magnhetic_fr', 'magnhetic_fr', 'K3teEUau');
            }
            catch(Exception $e)
            {
                die('Erreur : '.$e->getMessage());
            }

            $pass = htmlspecialchars($_POST['pass']);
            $passconf = htmlspecialchars($_POST['passconf']);
            $pseudo = htmlspecialchars($_POST['pseudo']);
            $email = htmlspecialchars($_POST['email']);


            $query=$bdd->prepare('SELECT pseudo FROM membres WHERE pseudo = :pseudo');
            $query->bindValue(':pseudo',$_POST['pseudo'], PDO::PARAM_STR);
            $query->execute();
            $data=$query->fetch();

            if ($data['pseudo'] == $pseudo) 
            {
                $error = "Ce pseudo est déjà utilisé";
            }
            else if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                $error = "Veuillez rentrer une adresse e-mail valide";
            }
            else if($pass != $passconf)
            {
                $error = "Les mots de passe ne correspondent pas";
            }

            if(empty($error)) {
                $passe = sha1($pass);

                $req = $bdd->prepare('INSERT INTO membres(id, pseudo, passe, email) VALUES("", :login, :passe, :email)');
            
                $req->execute(array(
                ':login' => $pseudo,
                ':passe' => $passe,
                ':email' => $email ));

                $_SESSION['PSEUDO'] = $_POST['pseudo'];
                $_SESSION['EMAIL'] = $_POST['email'];

                header('Location: index.php#Match');

            }
        }
        else {
            $error = "Vous devez remplir tous les champs";
        }
    }
?>


<?php 

    if (isset($_POST['connexion'])) { 
        if(!empty($_POST['pseudo']) && !empty($_POST['pass']))
        {
            $pseudo = htmlspecialchars($_POST['pseudo']);
            try
            {
                $bdd = new PDO('mysql:host=magnhetic.fr.mysql;dbname=magnhetic_fr', 'magnhetic_fr', 'K3teEUau');
            }
            catch(Exception $e)
            {
                die('Erreur : '.$e->getMessage());
            }

            $query=$bdd->prepare('SELECT pseudo, passe FROM membres WHERE pseudo = :pseudo');
            $query->bindValue(':pseudo',$_POST['pseudo'], PDO::PARAM_STR);
            $query->execute();
            $data=$query->fetch();

            if ($data['passe'] == sha1($_POST['pass']))
            {
                $_SESSION['PSEUDO'] = $data['pseudo'];
                $_SESSION['EMAIL'] = $data['email'];
                header('Location: index.php#Match');  


            }
            else {
                echo "Mauvais identifiants";
            }

        }
        else {
            $error = "Vous devez remplir tous les champs";
        }
    }
?>



<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Projet Labyrinthe</title>
    <meta name="description" content="Un jeu HTML CSS JS qui n'a rien à envier à personne. Le projet sera mis en open source très prochainement.">
    <link rel="icon" type="image/png" href="images/favicon.png" />
	<link rel="stylesheet" type="text/css" href="css/reset.css">
	<link rel="stylesheet" type="text/css" href="css/styles.css">
    <link rel="stylesheet" type="text/css" href="css/Game.css">
    <script src="js/jquery.js"></script>
    <script src="js/keyboard.js"></script>
</head>
    <body>
        <?php
             if(!empty($_SESSION['PSEUDO'])) {
        ?>
        <script>
            var valeurs = "";
            //ITEM

            craie = false;
            skin2 = false;
            lampe = false;

            $(function () {

                    var pseudo = "<?php echo $_SESSION['PSEUDO']; ?>";

                    /* DATASTRING */
                    var dataString = '&pseudo=' + pseudo;
                    console.log(dataString);



                    $.ajax({
                        type: "POST",
                        url: "php/recupbdd.php",
                        data: dataString,
                        success: function (valeurs) {
                            valeurs1 = JSON.parse(valeurs);
                           
                            OR = valeurs1[0].gold;
                            var xp = valeurs1[0].experience;
                            var lvl = valeurs1[0].niveau;
                            var Objets = valeurs1[0].objets;
                            craie = valeurs1[0].craie;
                            skin2 = valeurs1[0].skin2;
                            lampe = valeurs1[0].lampe;
                            console.log(OR);
                            console.log(xp);
                            console.log(lvl);
                            console.log(Objets);
                            document.getElementById("GOLD").innerHTML = OR;
                            document.getElementById("GOLD2").innerHTML = OR;
                            $('.level').text('LV ' + lvl);
                        }
                    });
                
            });
            function bought(){
                if(craie == true){
                    $('#buy_1').css({
                            'display': 'none'
                        });
                        $('#bought_1').css({
                            'display': 'block'
                        })
                }
                if(skin2 == true){
                    $('#skin_2').html("<img src='images/skin2.png'>");
                    $('#buy_2').css({
                        'display': 'none'
                    });
                    $('#bought_2').css({
                        'display': 'block'
                    })
                }
            }
            bought();
        </script>
        <?php 
            }
        ?>

        <section id="Menu">
            <ul id="Social">
                <li><a href="https://www.facebook.com/ProjeLabyrinthe?fref=ts" id="Facebook"></a></li>
                <li><a href="#" id="Twitter"></a></li>
                <li><a href="#" id="Google"></a></li>
            </ul>
            <ul id="Navigation">
                <li><a href="#Accueil" id="MenuAccueil">Accueil</a></li>
                <li><li><span>|</span></li></li>
                <li><a href="#Regles" id="MenuRegles">Règles</a></li>
                <li><li><span>|</span></li></li>
                <li><a href="#Accueil" id="LogoMenu"></a></li>
                <li><li><span class="Separateur">|</span></li></li>
                <?php 
                    if (empty($_SESSION['PSEUDO'])) { 
                ?>
                    <li><a href="#Connexion" id="MenuHero">Héros</a></li>
                <?php 
                   } else {
                ?>
                    <li><a href="#Match" id="MenuHero">Héros</a></li>
                <?php
                    }
                ?>                             <li><span></span>|</li>
                <?php 
                    if (empty($_SESSION['PSEUDO'])) { 
                ?>
                    <li><a href="#Connexion" id="MenuJouer" class="recup" onclick="redirect()">Jouer</a></li>
                <?php 
                   } else {
                ?>
                    <li><a href="#MenuGame" id="MenuJouer" class="recup" onclick="redirect()">Jouer</a></li>
                <?php
                    }
                ?>   
            </ul>
        </section>
        <section id="Accueil" class="">
            <img src="images/Logo.png" height="200px" width="200px">
            <h2>Bienvenue sur notre jeu :</h2>
            <h1>PROJET LABYRINTHE</h1>
            <h3>Rémi Wetteren - Swann Sare - Matthieu Tourdes - Guillaume Merlini</h3>
        </section>
        <section id="Regles" class="">
            <div id="reglo">
            <p>Dirigez-vous grâce aux touches <span class="blue">Z S Q D</span>, respectivement en haut, en bas, à gauche, à droite pour essayer de quitter ce terrifiant labyrinthe ! Vous pouvez vous aider des <span class="blue">flèches directionnelles</span> de votre clavier pour marquer les chemins que vous avez empruntés si vous posséder une craie, cela vous aidera à vous diriger dans le jeu et à sortir au plus vite.</br> <span class="blue">Bon courage, et bon jeu !</span></p>
            </div>
        </section>
        <section id="Credits">
            <div id="slide1">
                <div class="slide_inside" id="non">
                    <h1 class="nomprenom">Guillaume Merlini</h1>
                    <p class="poste">Développeur</p>
                </div>
            </div>
            <div id="slide2">
                <div class="slide_inside">
                    <h1 class="nomprenom">Rémi Wetteren</h1>
                    <p class="poste">Développeur / Designer</p>
                </div>
            </div>
            <div id="slide3">
                <div class="slide_inside">
                    <h1 class="nomprenom">Matthieu Tourdes</h1>
                    <p class="poste">Développeur / Designer</p>
                </div>
            </div>
            <div id="slide4">
                <div class="slide_inside">
                    <h1 class="nomprenom">Swann Saré</h1>
                    <p class="poste">Community Manager</p>
                </div>
            </div>
        </section>
        <section id="Hero" class="">
            <section id="Connexion">
                <section class="Login">
                    <?php 
                        if (empty($_SESSION['PSEUDO'])) {

                            if(!empty($error)) {
                                echo $error;
                            }
                    ?>
                    <form action="index.php" method="post">
                        <div class="ContourBlanc">
                            <div class="BordBleu">
                                <label for="identifiants">Pseudo</label>
                                <input type="text" id="user" name="pseudo"/>
                            </div>
                        </div>
                        <div class="ContourBlanc">
                            <div class="BordBleu">
                                <label for="password">MDP</label>
                                <input type="password" id="text" name="pass"/>
                            </div>
                        </div>
                        <input type="submit" value="" id="SubmitConnexion" name="connexion"/>
                    </form>

                    <?php

                        } else {
                            echo "Vous êtes déjà connecté";
                        }

                    ?>
                    <p class="Grey Bold" id="InscriptionForget">PAS ENCORE <a href="#Register" class="Blue">INSCRIT</a>?
<!--                        MOT DE PASSE <a href="#" class="Blue">PERDU</a> ?-->
                    </p>
                </section>
            </section>
            
            
            <section id="Register">
                <section class="Login">
                    <?php 
                        if (empty($_SESSION['PSEUDO'])) {

                            if(!empty($error)) {
                                echo $error;
                            }
                    ?>
                    <form action="index.php" method="post">
                        <div class="ContourBlanc">
                            <div class="BordBleu">
                                <label for="identifiants">Pseudo</label>
                                <input type="text" id="user" name="pseudo"/>
                            </div>
                        </div>
                        <div class="ContourBlanc">
                            <div class="BordBleu">
                                <label for="password">MDP</label>
                                <input type="password" id="text" name="pass"/>
                            </div>
                        </div>
                        <div class="ContourBlanc">
                            <div class="BordBleu">
                                <label for="user">MDP conf</label>
                                <input type="password" name="passconf" id="text" />
                            </div>
                        </div>
                        <div class="ContourBlanc">
                            <div class="BordBleu">
                                <label for="user">Email</label>
                                <input type="text" name="email" id="text"/>
                            </div>
                        </div>
                        <input type="submit" value="" id="SubmitConnexion" name="inscription"/>
                    </form>
                    <?php
                        } else {
                            echo "Vous êtes déjà connecté";
                        }

                    ?>
                </section>
            </section>


            <section id="Match">

                <?php 
                    if (empty($_SESSION['PSEUDO'])) {

                ?>                        
                <p>Vous devez être connecté pour acceder à cette page</p>
                <?php
                    } else {
                ?>
                <div class="cogsOptionsHeros">
                    <ul>
                        <li><a class="sauvegarder">Sauvegarder</a></li>
                        <li><a class="deconnexion" href="php/deconnexion.php">Déconnexion</a></li>
                    </ul>
                </div>
                <section class="barre-top">
                    <img id="cogsHeros" class="cogs" src="images/cogs.png">
                    <img class="volume" src="images/volume.png">
                    <img class="volumemuted" src="images/volumemuted.png">
                    <div class="border-tmp"></div>
                    <img  class="avatar" src="images/perso.png">
                    <div class="barreLV">
                        <p class="pseudo"><?php echo $_SESSION['PSEUDO']?></p>
                        <p class="level">LV 1</p>
                    </div>
                    <div class="border-lvl"></div>
                    <div class="ressources">
                        <img class="creditcard" src="images/credit.png">
                        <p class="credit" id ="GOLD"></p>
                        <img class="erlenmeyer" src="images/lab.png">
                        <p class="test">0</p>
                    </div>
                </section>
                <section id="sous-menu">
                    <div id="align-center"> 
                        <div id="inventaire" class="parent">    
                            <img class="bouton-menu" src="images/chest.png">
                        </div><!--
                        --><div id="profil" class="parent"><img class="bouton-menu" src="images/profil.png"></div><!--
                        --><div id="boutique" class="parent"><img class="bouton-menu" src="images/cointest.png"></div>       
                    </div>
                </section>
                <div id="contentHeros">
                    <section id="infos">
                        <div class="informations">
                            <h2 class="barrebleu" onclick="">Détails du compte</h2>
                            <div id="infos_1">
                                <h4 class="soustitre_profil">Nom du compte</h4>
                                <p class="infos_profil"><?php echo $_SESSION['EMAIL']?></p>
                                <h4 class="soustitre_profil">Pseudo</h4>
                                <p class="infos_profil"><?php echo $_SESSION['PSEUDO']?></p>
                                <h4 class="soustitre_profil">Mot de passe</h4>
                                <p class="infos_profil">********<a>[?]</a></p>
                            </div>
                        </div>
                        <div class="informations">
                            <h2 class="barrebleu" onclick="">Personnages</h2>
                            <div id="infos_2">
                                <p><?php echo $_SESSION['PSEUDO']?></p>
                            </div>
                        </div>
                        <div class="informations" onclick="">
                            <h2 class="barrebleu">Progression</h2>
                            <div id="infos_3">
                                <p><?php echo $_SESSION['PSEUDO']?></p>
                            </div>
                        </div>
                        <div class="informations" onclick="">
                            <h2 class="barrebleu">Exploits</h2>
                            <div id="infos_4">
                                <p><?php echo $_SESSION['PSEUDO']?></p>
                            </div>
                        </div>
                    </section>
                    <section id="skins">
                        <h2 id="barreskin">Skins</h2>
                        <div id="garderobe">
                            <div id="skin_1">
                                <img src="images/skin1.png">
                            </div>
                            <div id="skin_2">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_3">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_4">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_5">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_6">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_7">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_8">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_9">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_10">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_11">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_12">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_13">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_14">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_15">
                                <img src="images/lockskin.png">
                            </div>
                            <div id="skin_16">
                                <img src="images/lockskin.png">
                            </div>
                        </div>
                    </section>
                </div>
                <div id="shop">
                    <h1 id="title">BOUTIQUE</h1>
                    <ul id="menu_merchant">
                        <li class="merch">
                            <h1 class="title_obj">Craie</h1>
                            <img class="img_shop" src="images/craie.png">
                            <p class="sum_obj" id="gain">Vous pourrez grâce à cet objet baliser votre chemin pour plus jamais perdre votre chemin !</p>
                            <span class="price">2000</span></br>
                            <button id="buy_1" class="buy" onclick="purchase_item(1)"value="Buy">Acheter</button>
                            <button id="bought_1" class="buy" value="Buy">Possèder</button>
                        </li>
                        <li class="merch">
                            <h1 class="title_obj">Skin RedHair</h1>
                            <img class="img_shop" src="images/skin2shop.png">
                            <p class="sum_obj">Un magnifique skin pour votre personnage</p>
                            <span class ="price">8000</span></br>
                            <button id="buy_2" class="buy" onclick="purchase_item(2)" value="Buy">Acheter</button>
                            <button id="bought_2" class="buy" value="Buy">Possèder</button>
                        </li>
                        <li class="merch">
                            <h1 class="title_obj">Lampe torche</h1>
                            <img class="img_shop" src="images/lampe.png">
                            <p class="sum_obj">Ne craignez plus le noir</p>
                            <span class ="price">12000</span></br>
                            <button id="buy_3" class="buy" onclick="purchase_item(3)" value="Buy">Acheter</button>
                            <button id="bought_3" class="buy" value="Buy">Possèder</button>
                        </li>
                    </ul>
                </div>
            </section>
        <?php 

            }

        ?>

        </section>


                      
        <section id="Unmatch">
            <section class="Login">
                <h1>Erreur</h1>
                <p class="White Bold"> Il semblerait qu'il y ai un erreur. Réessayez de rentrer vos identifiants.</p>
            </section>
        </section>


        <section id="Jouer">
                <?php 
                    if (empty($_SESSION['PSEUDO'])) {

                ?>                        
                <p style="color: white;">Vous devez être connecté pour acceder à cette page</p>
                <?php
                    } else {
                ?>
            <div class="cogsOptionsJouer">
            <ul>
                <li><a class="sauvegarder">Sauvegarder</a></li>
                <li><a class="deconnexion" href="php/deconnexion.php">Déconnexion</a></li>
            </ul>
            </div>
            <section class="barre-top">
                    <div id="Time"><h4 id="timer"><span id="TimeA"></span><span id="TimeB"></span><span id="TimeC"></span></h4></div>
                    <a id="containerChrono" href="javascript:Pause()"><img src="images/pause.png" id="ChronoSymbole"></a>
                    <img id="cogsJouer" class="cogs" src="images/cogs.png">
                    <img class="volume" src="images/volume.png">
                    <img class="volumemuted" src="images/volumemuted.png">
                    <div class="border-tmp"></div>
                    <img  class="avatar" src="images/perso.png">

                    <div class="barreLV">
                        <p class="pseudo"><?php echo $_SESSION['PSEUDO']?></p>
                        <p class="level">LV 1</p>
                    </div>
                    <div class="border-lvl"></div>
                    <div class="ressources">
                        <img class="creditcard" src="images/credit.png">
                        <p class="credit" id="GOLD2"></p>
                        <img class="erlenmeyer" src="images/lab.png">
                        <p class="test">0</p>
                    </div>
                </section>
            <section id="MsgInGame"></section>
            <div id="VignettesPiege"><span id="PiegeA"></span><span id="PiegeB"></span><span id="PiegeC"></span><span id="PiegeD"></span><span id="PiegeE"></span></div>
                
            
            <section id="MASK" class="MaskTypeB"></section>
            
            
            <section id="JouerII" class="instamask">
                
                
                <script language="javascript">
                    document.onkeydown = applyKey;
                </script>
                <script src="js/mousetrap.min.js"></script>

                <section id="Game">
                    <div id="personnage" class="dirBas2" style="top: 32px; left: 32px;"></div>
                    <div id='mechant' class='dirBas2' style='top: 320px; left: 320px;'></div>
                    <span id="PlaceGame"></span>
                </section>
            </section>
         <?php 

            }

        ?>           
        </section>
        <section id="Results">
            <div id="BGResults">
                <div id="InfosVictoire">
                    <h1>VICTOIRE</h1>
                    <h4>TEMPS : <span id="TEMPSA"></span><span id="TEMPSB"></span><span id="TEMPSC"></span></h4>
                    <h4>OR : +<span id="OR" class="Gold"></span></span> coins</h4>
                    <h4>Bonus d'or : <span id="BonusA"></span></h4>
                    <h4>Gain de science : <span id="BonusB"></span></h4>
                </div>
                <div id="PersoVictoire">
                    
                </div>
                <div id="ArtefactVictoire">
                    
                </div>
                <div>
                    <a href="#MenuGame"  id="ValiderMenuGame"></a>
                </div>
            </div>
        </section>
        <section id="MenuGame">
            <ul class="ChxMenu">
                <li class="BoutonChxMenu" id="GenLab"><span class="BoutonPartLeft"><img src="images/cursor.png"></span><h3>Générer Laby</h3></li>
                <ul id="ChxLevel" class="Fermer">
                    <li><a href="javascript:LancerJeu(1)"><h4>Explorateur</h4></a></li>
                    <li><a href="javascript:LancerJeu(2)"><h4>Vétéran</h4></a></li>
                    <li><a href="javascript:LancerJeu(3)"><h4>Démentiel</h4></a></li>
                </ul>
                <div  id="Reprise" class="Ferme">
                    <li class="BoutonChxMenu"><a href="#Jouer"><span class="BoutonPartLeft"><img src="images/cursor.png"></span><h3>Reprendre</h3></a></li>
                </div>
                <li class="BoutonChxMenu" id="menuCredit"><a href="#Credits"><span class="BoutonPartLeft"><img src="images/cursor.png"></span><h3>Crédits</h3></a></li>
            </ul>
        </section>
        <svg id="svg">
          <!-- THE mask -->
          <mask id="mask" maskContentUnits="objectBoundingBox">
            <!-- using an img, but this img is black/transparent so we filter it to make it white -->
            <image xlink:href="http://magnhetic.fr/Projet_Labyrinthe/halo.png" width="1" height="1" preserveAspectRatio="none" filter="url(#filter)"/>
          </mask>

          <!-- the filter to make the image white -->
          <filter id="filter">
            <feFlood flood-color="white" />
            <feComposite in2="SourceAlpha" operator="in" />
          </filter>
        </svg>
    </body>

    <script src="js/VariablesGlobales.js"></script>
    <script src="js/GenerationLaby.js"></script>
    <script src="js/keyboard.js"></script>
    <script src="js/Deplacement.js"></script>
    <script src="js/main.js"></script>
    <script src="js/musique.js"></script>
    <script src="js/shop.js"></script>

        <script>  

        $(function () {
            $(".sauvegarder").click(function () {

                var Xarrive = xarrive;
                var Yarrive = yarrive;
                var PHPLABYRINTHE = LABYRINTHE;
                var niveau = level;
                var or = OR;
                console.log(OR);
                var experience = xp;
                var objets = "[5,5]";

                /* VALUES */
                var position_end_x = Xarrive;
                var position_end_y = Yarrive;
                var map = PHPLABYRINTHE;
                var niveau = niveau;
                var experience = experience;
                var objets = objets;
                var pseudo = "<?php echo $_SESSION['PSEUDO']; ?>";
                var craie1 = craie;
                var skin3 = skin2;
                var lampe1 = lampe;

                /* DATASTRING */
                var dataString = 'position_end_x=' + position_end_x + '&position_end_y=' + position_end_y + '&map=' + map + '&niveau=' + niveau + '&experience=' + experience + '&objets=' + objets + '&pseudo=' + pseudo + '&or=' + or + '&craie=' + craie1 + '&skin3=' + skin2 + '&lampe1=' + lampe;
                console.log(dataString);



                    $.ajax({
                        type: "POST",
                        url: "php/join.php",
                        data: dataString,
                        success: function () {
                            $('.success').fadeIn(200).show();
                        }
                    });
                return false;
            });

        });

        </script>

</html>