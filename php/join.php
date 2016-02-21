	<?php 

	    session_start();

        try
        {
            $bdd = new PDO('mysql:host=magnhetic.fr.mysql;dbname=magnhetic_fr', 'magnhetic_fr', 'K3teEUau');
        }
        catch(Exception $e)
        {
            die('Erreur : '.$e->getMessage());
        }

		/* join.php */
 
		//include db configuration file
		include_once("config.php");
 
				if($_POST)
				{
				/* VALUES */
				$position_end_x=$_POST['position_end_x'];
				$position_end_y=$_POST['position_end_y'];
				$map=$_POST['map'];
				$or=$_POST['or'];
				$niveau=$_POST['niveau'];
				$experience=$_POST['experience'];
				$objets=$_POST['objets'];
 				$pseudo=$_POST['pseudo'];
 				$craie=$_POST['craie'];
 				$skin=$_POST['skin3'];
 				$lampe=$_POST['lampe1'];
				$datetime = date('Y-m-d H:i:s');

	            $query=$bdd->prepare('SELECT id FROM sauvegarde WHERE pseudo = :pseudo');
	            $query->bindValue(':pseudo',$pseudo, PDO::PARAM_STR);
	            $query->execute();
	            $data=$query->fetch();

	            var_dump($data);

	            if(!empty($data['id'])) {
	            	mysql_query("DELETE FROM sauvegarde WHERE id = '".$data['id']."' ");
	            }


				mysql_query("INSERT INTO sauvegarde (position_end_x, position_end_y, map, niveau, experience, objets, created, pseudo, gold, craie, skin2, lampe) VALUES ( '".utf8_decode($position_end_x)."', '".utf8_decode($position_end_y)."', '".utf8_decode($map)."', '".utf8_decode($niveau)."', '".utf8_decode($experience)."', '".utf8_decode($objets)."',  '".$datetime."', '".utf8_decode($pseudo)."', '".utf8_decode($or)."', '".utf8_decode($craie)."', '".utf8_decode($skin)."', '".utf8_decode($lampe)."')");
				
				} else { 
 
						header('HTTP/1.1 500 Looks like mysql error, could not insert record!');
						exit();
				}
 
		?>