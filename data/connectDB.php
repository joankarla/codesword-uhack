<?php
	$mysql_host = "localhost";
	$mysql_database = "onlinetuition";
	$mysql_user = "uhack";
	$mysql_password = "unionbank";

	$debug = true;

	function isDebugMode() {
		return $GLOBALS["debug"];
	}

	//Debug Print
	function debugPrint($string = null) {
		if (isDebugMode()) {
			echo "$string <Br/><Br/>";
		}
	}

	if (isDebugMode()) {
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
	}
	else {
		error_reporting(0);
	}

	function initSqlConnection ($host, $db, $user, $pass) {
		// Create connection
		$con=mysqli_connect($host, $user, $pass, $db);
		
		// Check connection
		if (mysqli_connect_errno()) {
		  echo "Failed to connect to MySQL: " . mysqli_connect_error();
		  return false;
		}

		// Return the connection object
		return $con;
	}

	//Execute query
	function executeQuery ($query = null) {
		if ($query == null) {
			echo "Error: No query detected<Br/><Br/>";
			return false;
		}
		else {
			debugPrint("query: $query");
		}

		$conn = initSqlConnection($GLOBALS["mysql_host"], 
								$GLOBALS["mysql_database"],  
								$GLOBALS["mysql_user"],  
								$GLOBALS["mysql_password"]);
		$result = mysqli_query($conn, $query);

		if (!$result) {
			echo("Error description: " . mysqli_error($conn));
			mysqli_close($conn);
			return false;
		}

		$allRows = mysqli_fetch_all($result, MYSQLI_ASSOC);
		mysqli_close($conn);
		return $allRows;
	}


?>		