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

	$temp = '{"sid":1}';
	deleteSchool($temp);

	//Update Student Information
	//Expects a JSON input for the data with the following info:
	// studid (required)
	// uid
	// firstname
	// middlename
	// lastname
	// birthdate
	function deleteStudent ($data=null) {

	}

	// $temp = '{"studid":1,"firstname":"Septa","middlename":"Hexa",
	// 		"lastname":"Octa","birthdate":"2000-06-04"}';
	// updateStudent($temp);

	//Update Subject Information
	//Expects a JSON input for the data with the following info:
	// sid - need to verify that sid exists
	// subname - subname should always be unique per school
	// subdesc (optional) - 0b0001
	// units
	// priceperunit
	function deleteSubject ($data=null) {

	}

	// $temp = '{"subid":1,"sid":1,"subname":"Math 114","subdesc":"Matrix Manipulation",
	// 		"units":5,"priceperunit":1328.56}';
	// updateSubject($temp);

	//Update Payment Information
	// Expects a JSON input for the data with the following info:
	// pid (required)
	// studid - need to verify that studid exists
	// sid - need to verify that sid exists
	// timestamp
	// schoolperiod (Year, Semester/Quarter)
	// educlevel
	// subids (comma separated value; verification of subjects should be done on the front end)
	// totalunits (pre computed)
	// fee (pre computed)
	// pstatus (payment status)
	function deletePayment ($data=null) {

	}

	// $temp = '{"pid":1,"pstatus":"paid","tids":"45621586","tidff":"9821366"}';
	// updatePayment($temp);

/*****************************************************************************/

?>