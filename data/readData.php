<?php
	require_once('connectDB.php');

	//Read Data for the following:
	// Users (ok)
	// Students (ok)
	// Payments (ok)
	// Schools (ok)
	// Subjects (ok)

/*****************************************************************************/
//Read Functions for Administrators
/*****************************************************************************/

	//Get all users
	function getAllUsers () {
		$query = "SELECT users.*, schools.name as schoolName
					FROM users
					LEFT JOIN schools ON
						users.sid = schools.sid";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	//Get all students
	function getAllStudents () {
		$query = "SELECT students.*, users.email as userEmail
					FROM students
					LEFT JOIN users ON
						students.uid = users.uid";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	//Get all schools
	//	can also be used by user
	function getAllSchools () {
		$query = "SELECT * FROM schools";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	//Get all subjects
	function getAllSubjects () {
		$query = "SELECT subjects.*, schools.name as schoolName
					FROM subjects
					LEFT JOIN schools ON
						subjects.sid = schools.sid";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	//Get subjects list from a json input
	//	We expect a string input since this will be called from the frontend
	//	Assumes the format: "2,4,5,6,7" (numbers separated by commas)
	function getSubjectsFromList ($SubjIds) {
		$query = "SELECT * FROM subjects WHERE subid in ($SubjIds)";
		$allRows = executeQuery($query);

		return $allRows;
	}

	//Get all payments
	function getAllPayments () {
		$query = "SELECT 
						pid, 
					    CONCAT(users.firstname, ' ', users.middlename, ' ', users.lastname) as payor,
					    CONCAT(students.firstname, ' ', students.middlename, ' ', students.lastname) as studentEnrolled, 
					    schools.name as school,
					    timestamp, schoolperiod, educlevel, subids, totalunits, fee 
					FROM 
						payments, students, users, schools
					WHERE 
						payments.studid = students.studid
					AND
						students.uid = users.uid
					AND
						schools.sid = payments.sid
					ORDER BY pid";

		$allRows = executeQuery($query);

		//convert the subject ids into the subjects' details
		for ($i=0; $i < count($allRows); $i++) { 
			// echo "<Br/>Count: $i";
			$allRows[$i]['subids'] = getSubjectsFromList($allRows[$i]['subids']);
		}

		echo json_encode($allRows);
	}

/*****************************************************************************/
//Read Functions for Schools
//	Uses school id as a variable
/*****************************************************************************/

	//Get school information
	function getSchoolInfo ($sid) {
		$query = "SELECT * FROM schools
					WHERE sid = $sid";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	// Payments made for the school of interest
	// Shows the Payor and Students
	function getSchoolViewStudentPayments ($sid) {
		$query = "SELECT 
						pid, 
					    CONCAT(users.firstname, ' ', users.middlename, ' ', users.lastname) as payor,
					    CONCAT(students.firstname, ' ', students.middlename, ' ', students.lastname) as studentEnrolled, 
					    schools.name as school,
					    timestamp, schoolperiod, educlevel, subids, totalunits, fee 
					FROM 
						payments, students, users, schools
					WHERE 
						payments.studid = students.studid
					AND
						students.uid = users.uid
					AND
						schools.sid = payments.sid
					AND
						schools.sid = $sid
					ORDER BY pid";

		$allRows = executeQuery($query);

		//convert the subject ids into the subjects' details
		for ($i=0; $i < count($allRows); $i++) { 
			// echo "<Br/>Count: $i";
			$allRows[$i]['subids'] = getSubjectsFromList($allRows[$i]['subids']);
		}

		echo json_encode($allRows);
	}

	// Subjects under the school of interest
	// Can be used by the user too for enrolment
	function getSchoolViewSubjects ($sid) {
		$query = "SELECT * FROM subjects
					WHERE sid = $sid";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	// TODO: Get the default curriculum for the school of interest

/*****************************************************************************/
//Read Functions for Clients
//	Uses user id as a variable
/*****************************************************************************/

	//Read the account info of the user
	//Or use loginValidation instead
	function getUserInfo ($uid) {
		$query = "SELECT * FROM users
					WHERE uid = $uid";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	//Read the account info of the user
	function getUserInfoByEmail ($userEmail) {
		$query = "SELECT * FROM users
					WHERE email = '$userEmail'";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	//Student dependents enroled under the user
	function getUserStudentDependents ($uid) {
		$query = "SELECT 
						students.studid as studid, 
					    students.firstname as firstname, 
					    students.middlename as middlename, 
					    students.lastname as lastname, 
					    birthdate
					FROM 
						students, users
					WHERE 
						students.uid = users.uid
					AND
						users.uid = $uid
					ORDER BY studid";

		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	//Payments made by the user
	function getUserViewPayments ($uid) {
		$query = "SELECT 
						pid, 
					    CONCAT(students.firstname, ' ', students.middlename, ' ', students.lastname) as studentEnrolled, 
					    schools.name as school,
					    timestamp, schoolperiod, educlevel, subids, totalunits, fee 
					FROM 
						payments, students, users, schools
					WHERE 
						payments.studid = students.studid
					AND
						students.uid = users.uid
					AND
						schools.sid = payments.sid
					AND
						users.uid = $uid
					ORDER BY pid";

		$allRows = executeQuery($query);

		//convert the subject ids into the subjects' details
		for ($i=0; $i < count($allRows); $i++) { 
			$allRows[$i]['subids'] = getSubjectsFromList($allRows[$i]['subids']);
		}

		echo json_encode($allRows);
	}

/*****************************************************************************/

	//Login Validation
	//Returns:
	//	False - email address and password didn't match
	//	User Info Details - if email and pwd matched
	function loginValidation ($email=null, $pwd=null) {
		//TODO: some alphanumeric validation of email and pwd

		debugPrint("email: $email, pwd: $pwd");

		$query = "SELECT * FROM users WHERE email = '$email' AND password = '$pwd'";
		$accountInfo = executeQuery($query);

		if (empty($accountInfo)) {
			debugPrint("Error: Email and Password did not match");
			echo "false";
		}
		else {
			echo json_encode($accountInfo);
		}
	}

	//Returns:
	//	True - email has not been used for registration yet
	//	False - email is already taken
	function checkUniqueEmail ($email=null) {
		//TODO: some alphanumeric validation of email

		debugPrint("email: $email");

		$query = "SELECT * FROM users WHERE email = '$email'";
		$accountInfo = executeQuery($query);

		if (!empty($accountInfo)) {
			debugPrint("Error: Email is already taken");
			return false;
		}
		else {
			return true;
		}
	}

	//Returns:
	//	True - uid exists
	//	False - uid does not exist
	function doesUserExist ($uid=null) {
		debugPrint("uid: $uid");

		$query = "SELECT * FROM users WHERE uid = $uid";
		$doesUidExist = executeQuery($query);

		if (empty($doesUidExist)) {
			debugPrint("Error: uid does not exist");
			return false;
		}
		else {
			return true;
		}
	}

	//Returns:
	//	True - uid exists
	//	False - uid does not exist
	function doesSchoolExist ($sid=null) {
		debugPrint("sid: $sid");

		$query = "SELECT * FROM schools WHERE sid = $sid";
		$doesSidExist = executeQuery($query);

		if (empty($doesSidExist)) {
			debugPrint("Error: sid does not exist");
			return false;
		}
		else {
			return true;
		}
	}

	//Returns:
	//	True - studid exists
	//	False - studid does not exist
	function doesStudentExist ($studid=null) {
		debugPrint("studid: $studid");

		$query = "SELECT * FROM students WHERE studid = $studid";
		$doesStudidExist = executeQuery($query);

		if (empty($doesStudidExist)) {
			debugPrint("Error: studid does not exist");
			return false;
		}
		else {
			return true;
		}
	}

	//Returns:
	//	True - Subject name is unique for school
	//	False - Subject name already exists in the school registry
	function checkUniqueSubnameInSchool ($sid=null, $subname=null) {
		debugPrint("sid: $sid");

		$query = "SELECT * FROM subjects WHERE sid = $sid and subname = '$subname'";
		$subjectExistence = executeQuery($query);

		if (!empty($subjectExistence)) {
			debugPrint("Error: Subject Name already exists");
			return false;
		}
		else {
			return true;
		}
	}

?>