<?php
	require_once('readData.php');
	require_once('addData.php');
	require_once('updateData.php');
	require_once('deleteData.php');

	//Provide Data for the following:
	// Administrators 	-	(admin)
	// Schools			-	(school)
	// Users/Payors		-	(user)

	//Read Data for the following:
	// Users
	// Students
	// Payments
	// Schools
	// Subjects
	// Dependents
	// Accounts

	$userType;
	$dataType;
	$action;
	$data;
	$schoolId;
	$userId;
	$userEmail;

	if (isset($_POST) && !empty($_POST)) {
		debugPrint("POST mode");

		$userType = isset($_POST["utype"]) ? $_POST["utype"] : null;
		$dataType = isset($_POST["dtype"]) ? $_POST["dtype"] : null;
		$action = isset($_POST["action"]) ? $_POST["action"] : null;
		$data = isset($_POST["data"]) ? $_POST["data"] : null;

		$schoolId = isset($_POST["id"]) ? $_POST["id"] : null;
		$userId = isset($_POST["id"]) ? $_POST["id"] : null;

		$userEmail = isset($_POST["email"]) ? $_POST["email"] : null;
		$userPwd = isset($_POST["pwd"]) ? $_POST["pwd"] : null;
	}
	elseif (isset($_GET) && !empty($_GET)) {
		debugPrint("GET mode");

		$userType = isset($_GET["utype"]) ? $_GET["utype"] : null;
		$dataType = isset($_GET["dtype"]) ? $_GET["dtype"] : null;
		$action = isset($_GET["action"]) ? $_GET["action"] : null;
		$data = isset($_GET["data"]) ? $_GET["data"] : null;

		$schoolId = isset($_GET["id"]) ? $_GET["id"] : null;
		$userId = isset($_GET["id"]) ? $_GET["id"] : null;

		$userEmail = isset($_GET["email"]) ? $_GET["email"] : null;
		$userPwd = isset($_GET["pwd"]) ? $_GET["pwd"] : null;
	}
	else {
		echo "Error: No input <Br/>";
	}

	if ( ($dataType == null) && ($action != "login") ) {
		echo "Error: No data type selected <Br/>";
		return http_response_code(400);
	}

	debugPrint("User Type: $userType");
	debugPrint("Data Type: $dataType");
	debugPrint("Action: $action");
	debugPrint("Data: $data");

	if ($action == "login") {
		if ( ($userEmail == null) || ($userPwd == null) ) {
			echo "Error: No Email or Password Input! <Br/>";
			return http_response_code(400);
		}
		else {
			loginValidation ($userEmail, $userPwd);
		}
	}
	elseif ($action == "add") {
		if ($dataType == "users") {
			addUser($data);
		}
		elseif ($dataType == "schools") {
			addSchool($data);
		}
		elseif ($dataType == "students") {
			addStudent($data);
		}
		elseif ($dataType == "subjects") {
			addSubject($data);
		}
		elseif ($dataType == "payments") {
			addPayment($data);
		}
		elseif ($dataType == "accounts") {
			addAccount($data);
		}
	}
	elseif ($action == "update") {
		if ($dataType == "users") {
			updateUser($data);
		}
		elseif ($dataType == "schools") {
			updateSchool($data);
		}
		elseif ($dataType == "students") {
			updateStudent($data);
		}
		elseif ($dataType == "subjects") {
			updateSubject($data);
		}
		elseif ($dataType == "payments") {
			updatePayment($data);
		}
		elseif ($dataType == "accounts") {
			updateAccount($data);
		}
	}
	elseif ($action == "delete") {
		if ($dataType == "users") {
			deleteUser($data);
		}
		elseif ($dataType == "schools") {
			deleteSchool($data);
		}
		elseif ($dataType == "students") {
			deleteStudent($data);
		}
		elseif ($dataType == "subjects") {
			deleteSubject($data);
		}
		elseif ($dataType == "payments") {
			deletePayment($data);
		}
		elseif ($dataType == "accounts") {
			deleteAccount($data);
		}
	}
	else {
		//Default - read action
		if ($userType == null) {
			echo "Error: No user type selected <Br/>";
			return http_response_code(400);
		}
		
		/*****************************************************************************/
		//Administrator Category
		/*****************************************************************************/
		if ($userType == "admin") {
			// Users
			if ($dataType == "users") {
				getAllUsers();
			}
			// Students
			elseif ($dataType == "students") {
				getAllStudents();
			}
			// Payments
			elseif ($dataType == "payments") {
				getAllPayments();
			}
			// Schools
			elseif ($dataType == "schools") {
				getAllSchools();
			}
			// Subjects
			elseif ($dataType == "subjects") {
				getAllSubjects();
			}
			// Bank Accounts
			elseif ($dataType == "accounts") {
				getAllAccounts();
			}
			else {
				echo "Error: Unrecognized Data Type <Br/>";
				return http_response_code(400);
			}
		}
		/*****************************************************************************/
		//School/University Category
		/*****************************************************************************/
		elseif ($userType == "school") {
			if ($schoolId == null) {
				echo "Error: No school id input <Br/>";
				return http_response_code(400);
			}

			// School Info Details
			if ($dataType == "info") {
				getSchoolInfo($schoolId);
			}
			// Student Payments
			elseif ($dataType == "payments") {
				getSchoolViewStudentPayments($schoolId);
			}
			// Subjects
			elseif ($dataType == "subjects") {
				getSchoolViewSubjects($schoolId);
			}
			// Bank Accounts
			elseif ($dataType == "accounts") {
				getAccountsFromUid($schoolId);
			}
			else {
				echo "Error: Unrecognized Data Type <Br/>";
				return http_response_code(400);
			}
		}
		/*****************************************************************************/
		//Users/Payors Category
		/*****************************************************************************/
		elseif ($userType == "user") {
			if ($userId == null) {
				if ($userEmail == null || $dataType != "info") {
					echo "Error: No user id or email input <Br/>";
					return http_response_code(400);
				} else if ($userEmail != null) {
					//try email if data
					getUserInfoByEmail($userEmail);
					return;
				}
			}

			// School Info Details
			if ($dataType == "info") {
				getUserInfo($userId);
			}
			// Student Payments
			elseif ($dataType == "payments") {
				getUserViewPayments($userId);
			}
			// Dependents
			elseif ($dataType == "dependents") {
				getUserStudentDependents($userId);
			}
			// Bank Accounts
			elseif ($dataType == "accounts") {
				getAccountsFromUid($userId);
			}
			else {
				echo "Error: Unrecognized Data Type <Br/>";
				return http_response_code(400);
			}
		}
	}

?>