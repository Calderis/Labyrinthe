	<?php 
	########## MySql details (Replace with yours) #############
$username = "magnhetic_fr"; //mysql username
$password = "K3teEUau"; //mysql password
$hostname = "magnhetic.fr.mysql"; //hostname
$databasename = 'magnhetic_fr'; //databasename
 

$connecDB = mysql_connect($hostname, $username, $password);

 
// Check connection
if (!$connecDB) {
  	die('Could not connect: ' . mysql_error());
  }
 
$db_selected = mysql_select_db($databasename,$connecDB);
 
// Check DB
if (!$db_selected) {
  die ('Can\'t use  : ' . mysql_error());
  }
 
 
	?>