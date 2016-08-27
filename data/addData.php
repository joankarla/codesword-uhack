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

	//Add School Information
	//Expects a JSON input for the data with the following info:
	// name 
	// accountnum
	// defaultpriceperunit
	function addSchool ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		//Optional Inputs Bit Mask
		$opMask = 0b0;
		$opDefaultpriceperunit = 0b0001;

		$name = isset($dataDecode->name) ? $dataDecode->name : null;
		$defaultpriceperunit = isset($dataDecode->defaultpriceperunit) ? $dataDecode->defaultpriceperunit : null;
		$accountnum = isset($dataDecode->accountnum) ? $dataDecode->accountnum : null;

		//Required Inputs: Verify if inputs exist
		if ($name == null) {
			echo "Error: No name Input! <Br/>";
			return http_response_code(400);
		}
		if ($accountnum == null) {
			echo "Error: No accountnum Input! <Br/>";
			return http_response_code(400);
		}
		if ($defaultpriceperunit == null) {
			echo "Error: No defaultpriceperunit Input! <Br/>";
			return http_response_code(400);
		}

		//Optional Inputs
		if ($defaultpriceperunit) {
			debugPrint("defaultpriceperunit: " . $defaultpriceperunit);
			$opMask = $opMask | $opDefaultpriceperunit;
		}

		//Compose the required inputs
		$columns = "name,accountnum";
		$colValues = "'$name','$accountnum'";

		//Compose the optional inputs
		if ($opMask & $opDefaultpriceperunit) {
			$columns = $columns . ",defaultpriceperunit";
			$colValues = $colValues . ",'$defaultpriceperunit'";
		}

		$query = "INSERT INTO schools ($columns) VALUES ($colValues)";

		executeQuery($query);
		debugPrint("Added New School! <Br/>");

		$query = "SELECT * FROM schools
					WHERE sid = (SELECT MAX(sid) from schools)";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	//Add Student Information
	//Expects a JSON input for the data with the following info:
	// uid - need to verify that uid exists
	// firstname
	// middlename (optional) - 0b0001
	// lastname
	// birthdate
	function addStudent ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		//Optional Inputs Bit Mask
		$opMask = 0b0;
		$opMiddlename = 0b0001;

		$uid = isset($dataDecode->uid) ? $dataDecode->uid : null;
		$firstname = isset($dataDecode->firstname) ? $dataDecode->firstname : null;
		$middlename = isset($dataDecode->middlename) ? $dataDecode->middlename : null;
		$lastname = isset($dataDecode->lastname) ? $dataDecode->lastname : null;
		$birthdate = isset($dataDecode->birthdate) ? $dataDecode->birthdate : null;

		//Required Inputs: Verify if inputs exist
		if ($uid == null) {
			echo "Error: No uid Input! <Br/>";
			return http_response_code(400);
		}
		else {
			//Verify if the uid exists already
			if (!doesUserExist($uid)) {
				echo "Error: User's uid does not exist! <Br/>";
				return http_response_code(400);
			}
		}
		if ($firstname == null) {
			echo "Error: No firstname Input! <Br/>";
			return http_response_code(400);
		}
		if ($lastname == null) {
			echo "Error: No lastname Input! <Br/>";
			return http_response_code(400);
		}
		if ($birthdate == null) {
			echo "Error: No birthdate Input! <Br/>";
			return http_response_code(400);
		}

		//Optional Inputs
		if ($middlename) {
			debugPrint("middlename: " . $middlename);
			$opMask = $opMask | $opMiddlename;
		}

		debugPrint("opMask: $opMask");

		//Compose the required inputs
		$columns = "uid,firstname,lastname,birthdate";
		$colValues = "'$uid','$firstname','$lastname','$birthdate'";

		//Compose the optional inputs
		if ($opMask & $opMiddlename) {
			$columns = $columns . ",middlename";
			$colValues = $colValues . ",'$middlename'";
		}

		$query = "INSERT INTO students ($columns) VALUES ($colValues)";

		executeQuery($query);
		debugPrint("Added New Student! <Br/>");

		$query = "SELECT * FROM students
					WHERE studid = (SELECT MAX(studid) from students)";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	//Add Subject Information
	//Expects a JSON input for the data with the following info:
	// sid - need to verify that sid exists
	// subname - subname should always be unique per school
	// subdesc (optional) - 0b0001
	// units
	// priceperunit
	function addSubject ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		//Optional Inputs Bit Mask
		$opMask = 0b0;
		$opSubdesc = 0b0001;

		$sid = isset($dataDecode->sid) ? $dataDecode->sid : null;
		$subname = isset($dataDecode->subname) ? $dataDecode->subname : null;
		$subdesc = isset($dataDecode->subdesc) ? $dataDecode->subdesc : null;
		$units = isset($dataDecode->units) ? $dataDecode->units : null;
		$priceperunit = isset($dataDecode->priceperunit) ? $dataDecode->priceperunit : null;

		//Required Inputs: Verify if inputs exist
		if ($sid == null) {
			echo "Error: No sid Input! <Br/>";
			return http_response_code(400);
		}
		else {
			//Verify if the sid exists already
			if (!doesSchoolExist($sid)) {
				echo "Error: School's sid does not exist! <Br/>";
				return http_response_code(400);
			}
		}
		if ($subname == null) {
			echo "Error: No subname Input! <Br/>";
			return http_response_code(400);
		}
		else {
			//subname has to be unique for every school
			if (!checkUniqueSubnameInSchool($sid, $subname)) {
				echo "Error: subname($subname) already exists in sid($sid):";
				return http_response_code(400);
			}
		}
		if ($units == null) {
			echo "Error: No units Input! <Br/>";
			return http_response_code(400);
		}
		if ($priceperunit == null) {
			echo "Error: No priceperunit Input! <Br/>";
			return http_response_code(400);
		}

		//Optional Inputs
		if ($subdesc) {
			debugPrint("subdesc: " . $subdesc);
			$opMask = $opMask | $opSubdesc;
		}

		debugPrint("opMask: $opMask");

		//Compose the required inputs
		$columns = "sid,subname,units,priceperunit";
		$colValues = "'$sid','$subname','$units','$priceperunit'";

		//Compose the optional inputs
		if ($opMask & $opSubdesc) {
			$columns = $columns . ",subdesc";
			$colValues = $colValues . ",'$subdesc'";
		}

		$query = "INSERT INTO subjects ($columns) VALUES ($colValues)";

		executeQuery($query);
		debugPrint("Added New Subject! <Br/>");

		$query = "SELECT * FROM subjects
					WHERE subid = (SELECT MAX(subid) from subjects)";
		$allRows = executeQuery($query);

		echo json_encode($allRows);
	}

	//Add Payment Information
	// Expects a JSON input for the data with the following info:
	// studid - need to verify that studid exists
	// sid - need to verify that sid exists
	// timestamp
	// schoolperiod (Year, Semester/Quarter)
	// educlevel
	// subids (comma separated value; verification of subjects should be done on the front end)
	// totalunits (pre computed)
	// fee (pre computed)
	// pstatus (payment status)
	function addPayment ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		$studid = isset($dataDecode->studid) ? $dataDecode->studid : null;
		$sid = isset($dataDecode->sid) ? $dataDecode->sid : null;
		$timestamp = isset($dataDecode->timestamp) ? $dataDecode->timestamp : null;
		$schoolperiod = isset($dataDecode->schoolperiod) ? $dataDecode->schoolperiod : null;
		$educlevel = isset($dataDecode->educlevel) ? $dataDecode->educlevel : null;
		$subids = isset($dataDecode->subids) ? $dataDecode->subids : null;
		$totalunits = isset($dataDecode->totalunits) ? $dataDecode->totalunits : null;
		$fee = isset($dataDecode->fee) ? $dataDecode->fee : null;
		$pstatus = isset($dataDecode->pstatus) ? $dataDecode->pstatus : "pending";

		//Required Inputs: Verify if inputs exist
		if ($studid == null) {
			echo "Error: No studid Input! <Br/>";
			return http_response_code(400);
		}
		else {
			//Verify if the studid exists already
			if (!doesStudentExist($studid)) {
				echo "Error: Student's ID does not exist! <Br/>";
				return http_response_code(400);
			}
		}
		if ($sid == null) {
			echo "Error: No sid Input! <Br/>";
			return http_response_code(400);
		}
		else {
			//Verify if the studid exists already
			if (!doesSchoolExist($sid)) {
				echo "Error: School's ID does not exist! <Br/>";
				return http_response_code(400);
			}
		}
		if ($timestamp == null) {
			echo "Error: No timestamp Input! <Br/>";
			return http_response_code(400);
		}
		if ($schoolperiod == null) {
			echo "Error: No schoolperiod Input! <Br/>";
			return http_response_code(400);
		}
		if ($educlevel == null) {
			echo "Error: No educlevel Input! <Br/>";
			return http_response_code(400);
		}
		if ($subids == null) {
			echo "Error: No subids Input! <Br/>";
			return http_response_code(400);
		}
		if ($totalunits == null) {
			echo "Error: No totalunits Input! <Br/>";
			return http_response_code(400);
		}
		if ($fee == null) {
			echo "Error: No fee Input! <Br/>";
			return http_response_code(400);
		}

		//Compose the required inputs
		$columns = "studid,sid,timestamp,schoolperiod,educlevel,subids,
					totalunits,fee,pstatus";
		$colValues = "'$studid','$sid','$timestamp','$schoolperiod',
					'$educlevel','$subids','$totalunits','$fee','$pstatus'";

		$query = "INSERT INTO payments ($columns) VALUES ($colValues)";

		executeQuery($query);
		debugPrint("Added New Payment! <Br/>");

		$query = "SELECT * FROM payments
					WHERE pid = (SELECT MAX(pid) from payments)";
		$allRows = executeQuery($query);

		echo json_encode($allRows);return true;
	}

/*****************************************************************************/

?>