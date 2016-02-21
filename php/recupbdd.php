	<?php 

	    session_start();


		include_once("config.php");
 
				if($_POST)
				{

	 				$pseudo=$_POST['pseudo'];

					$valeurs = mysql_query("SELECT * FROM sauvegarde WHERE pseudo = '".$pseudo."'");
					
					while ($row = mysql_fetch_assoc($valeurs)) {
					    $rows[] = $row;
					}					

					echo json_encode($rows);

				} else { 
 
					header('HTTP/1.1 500 Looks like mysql error, could not insert record!');
					exit();
				}
 
		?>