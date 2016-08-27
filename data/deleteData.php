<?php
	require_once('connectDB.php');
	require_once('readData.php');

	//Update Data for the following:
	// Users (ok)
	// Students (ok)
	// Payments (ok)
	// Schools (ok)
	// Subjects (ok)

/*****************************************************************************/
//Delete Data Functions
/*****************************************************************************/

	//Delete user
	//Expects a JSON input for the data with the following info:
	// uid (required)

	function deleteUser ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
			return http_response_code(400);
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);


		$uid = isset($dataDecode->uid) ? $dataDecode->uid : null;

		//Required Inputs: Verify if inputs exist
		if ($uid == null) {
			//TODO: uid verification

			echo "Error: No uid Input! <Br/>";
			return http_response_code(400);
		}

		//Compose delete query
		$query = "DELETE FROM users WHERE uid = $uid";

		executeQuery($query);
		debugPrint("Deleted user: $uid! <Br/>");
	}

	// $temp = '{"uid":1}';
	// deleteUser($temp);

	//Delete School Information
	//Expects a JSON input for the data with the following info:
	// sid (required)
	function deleteSchool ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
			return http_response_code(400);
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		$sid = isset($dataDecode->sid) ? $dataDecode->sid : null;

		//Required Inputs: Verify if inputs exist
		if ($sid == null) {
			//TODO: uid verification

			echo "Error: No sid Input! <Br/>";
			return http_response_code(400);
		}

		//Compose delete query
		$query = "DELETE FROM schools WHERE sid = $sid";

		executeQuery($query);
		debugPrint("Deleted school: $sid! <Br/>");
	}

	// $temp = '{"sid":1}';
	// deleteSchool($temp);

	//Update Student Information
	//Expects a JSON input for the data with the following info:
	// studid (required)
	function deleteStudent ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
			return http_response_code(400);
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		$studid = isset($dataDecode->studid) ? $dataDecode->studid : null;

		//Required Inputs: Verify if inputs exist
		if ($studid == null) {
			//TODO: uid verification

			echo "Error: No studid Input! <Br/>";
			return http_response_code(400);
		}

		//Compose delete query
		$query = "DELETE FROM students WHERE studid = $studid";

		executeQuery($query);
		debugPrint("Deleted student: $studid! <Br/>");
	}

	// $temp = '{"studid":1}';
	// deleteStudent($temp);

	//Update Subject Information
	//Expects a JSON input for the data with the following info:
	// subid (required)
	function deleteSubject ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
			return http_response_code(400);
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		$subid = isset($dataDecode->subid) ? $dataDecode->subid : null;

		//Required Inputs: Verify if inputs exist
		if ($subid == null) {
			//TODO: uid verification

			echo "Error: No subid Input! <Br/>";
			return http_response_code(400);
		}

		//Compose delete query
		$query = "DELETE FROM subjects WHERE subid = $subid";

		executeQuery($query);
		debugPrint("Deleted subject: $subid! <Br/>");
	}

	// $temp = '{"subid":7}';
	// deleteSubject($temp);

	//Update Payment Information
	// Expects a JSON input for the data with the following info:
	// pid (required)
	function deletePayment ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
			return http_response_code(400);
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		$pid = isset($dataDecode->pid) ? $dataDecode->pid : null;

		//Required Inputs: Verify if inputs exist
		if ($pid == null) {
			//TODO: uid verification

			echo "Error: No pid Input! <Br/>";
			return http_response_code(400);
		}

		//Compose delete query
		$query = "DELETE FROM payments WHERE pid = $pid";

		executeQuery($query);
		debugPrint("Deleted payment: $pid! <Br/>");
	}

	// $temp = '{"pid":2}';
	// deletePayment($temp);

/*****************************************************************************/

?>