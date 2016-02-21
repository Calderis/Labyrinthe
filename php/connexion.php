<?php 
	if(!empty($_POST['pseudo']))
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

		if($pass == $passconf)
		{
			$pseudo = htmlspecialchars($_POST['pseudo']);
			$email = htmlspecialchars($_POST['email']);

			$passe = sha1($pass);

			$req = $bdd->prepare('INSERT INTO membres(id, pseudo, passe, email) VALUES("", :login, :passe, :email)');
		
			$req->execute(array(
	        ':login' => $pseudo,
	        ':passe' => $passe,
	        ':email' => $email ));

			$_SESSION['PSEUDO'] = $_POST['Pseudo'];

    		header('Location: ../index.php#MenuGame');

		}

		 
		else
		{
			echo 'Les mots de passe ne correspondent pas';
		}
	}
?>