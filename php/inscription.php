<?php 

	include_once("config.php");

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

		if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		    $error = "Veuillez rentrer une adresse e-mail valide";
		}

		if($pass != $passconf)
		{
		    $error = "Les mots de passe ne correspondent pas";
		}

		if(empty($error)) {
			mysql_query("INSERT INTO sauvegarde (pseudo) VALUES ('".utf8_decode($pseudo)."')");

			$passe = sha1($pass);

			$req = $bdd->prepare('INSERT INTO membres(id, pseudo, passe, email) VALUES("", :login, :passe, :email)');
		
			$req->execute(array(
	        ':login' => $pseudo,
	        ':passe' => $passe,
	        ':email' => $email ));

			$_SESSION['PSEUDO'] = $_POST['pseudo'];

    		header('Location: ../index.php');

		}
	}
	else {
		$error = "Vous devez remplir tous les champs";
	}
?>