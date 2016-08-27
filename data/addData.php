<?php
	require_once('connectDB.php');
	require_once('readData.php');

	//Add Data for the following:
	// Users (ok)
	// Students (ok)
	// Payments (ok)
	// Schools (ok)
	// Subjects (ok)

/*****************************************************************************/
//Add Data Functions
/*****************************************************************************/

	//Add user
	//Expects a JSON input for the data with the following info:
	// password 
	// firstname
	// middlename (optional) - 0b0001
	// lastname
	// address
	// mobile (optional) - 0b0010
	// landline (optional) - 0b0100
	// email
	// usertype
	// sid (optional) - 0b1000

	//This function will be called by addUserSchoolType() function
	function addUser ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		//Optional Inputs Bit Mask
		$opMask = 0b0;
		$opMiddlename = 0b0001;
		$opMobile = 0b0010;
		$opLandline = 0b0100;
		$opSid = 0b1000;

		//Initialize Column Variables
		$columns = "";
		$colValues = "";

		$password = isset($dataDecode->password) ? $dataDecode->password : null;
		$firstname = isset($dataDecode->firstname) ? $dataDecode->firstname : null;
		$middlename = isset($dataDecode->middlename) ? $dataDecode->middlename : null;
		$lastname = isset($dataDecode->lastname) ? $dataDecode->lastname : null;
		$address = isset($dataDecode->address) ? $dataDecode->address : null;
		$mobile = isset($dataDecode->mobile) ? $dataDecode->mobile : null;
		$landline = isset($dataDecode->landline) ? $dataDecode->landline : null;
		$email = isset($dataDecode->email) ? $dataDecode->email : null;
		$usertype = isset($dataDecode->usertype) ? $dataDecode->usertype : null;
		$sid = isset($dataDecode->sid) ? $dataDecode->sid : null;

		//Required Inputs: Verify if inputs exist
		if ($password == null) {
			echo "Error: No password Input! <Br/>";
			return http_response_code(400);
		}
		if ($firstname == null) {
			echo "Error: No firstname Input! <Br/>";
			return http_response_code(400);
		}
		if ($lastname == null) {
			echo "Error: No lastname Input! <Br/>";
			return http_response_code(400);
		}
		if ($address == null) {
			echo "Error: No address Input! <Br/>";
			return http_response_code(400);
		}
		if ($email == null) {
			echo "Error: No email Input! <Br/>";
			return http_response_code(400);
		}
		else {
			if(!checkUniqueEmail($email)) {
				echo "Error: Email is already registered! <Br/>";
				return http_response_code(400);
			}
		}
		if ($usertype == null) {
			echo "Error: No usertype Input! <Br/>";
			return http_response_code(400);
		}

		//Optional Inputs
		if ($middlename) {
			debugPrint("middlename: " . $middlename);
			$opMask = $opMask | $opMiddlename;
		}
		if ($mobile) {
			debugPrint("mobile: " . $mobile);
			$opMask = $opMask | $opMobile;
		}
		if ($landline) {
			debugPrint("landline: " . $landline);
			$opMask = $opMask | $opLandline;
		}
		if ($sid) {
			debugPrint("sid: " . $sid);
			$opMask = $opMask | $opSid;

			//TODO: Verify if the sid selected exists
		}

		debugPrint("opMask: $opMask");

		//Compose the required inputs
		$columns = "password,firstname,lastname,address,email,usertype";
		$colValues = "'$password','$firstname','$lastname','$address','$email','$usertype'";

		//Compose the optional inputs
		if ($opMask & $opMiddlename) {
			$columns = $columns . ",middlename";
			$colValues = $colValues . ",'$middlename'";
		}
		if ($opMask & $opMobile) {
			$columns = $columns . ",mobile";
			$colValues = $colValues . ",'$mobile'";
		}
		if ($opMask & $opLandline) {
			$columns = $columns . ",landline";
			$colValues = $colValues . ",'$landline'";
		}
		if ($opMask & $opSid) {
			$columns = $columns . ",sid";
			$colValues = $colValues . ",'$sid'";
		}

		$query = "INSERT INTO users ($columns) VALUES ($colValues)";

		executeQuery($query);
		debugPrint("Added New User! <Br/>");

		$query = "SELECT * FROM users
					WHERE uid = (SELECT MAX(uid) from users)";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}


/*****************************************************************************/

?>