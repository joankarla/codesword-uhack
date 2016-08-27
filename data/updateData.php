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
//Update Data Functions
/*****************************************************************************/

	//Update user
	//Expects a JSON input for the data with the following info:
	// uid (required)
	// firstname - 0b00000001
	// middlename - 0b00000010
	// lastname - 0b00000100
	// address - 0b00001000
	// mobile - 0b00010000
	// landline - 0b00100000
	// usertype - 0b01000000
	// sid - 0b10000000
	// password - 0b100000000
	// email - 0b1000000000

	//This function will be called by addUserSchoolType() function
	function updateUser ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
			return http_response_code(400);
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		//Optional Inputs Bit Mask
		$opMask = 0b0;
		$opFirstname = 0b00000001;
		$opMiddlename = 0b00000010;
		$opLastname = 0b00000100;
		$opAddress = 0b00001000;
		$opMobile = 0b00010000;
		$opLandline = 0b00100000;
		$opUsertype = 0b01000000;
		$opSid = 0b10000000;
		$opPassword = 0b100000000;
		$opEmail = 0b1000000000;

		//Initialize Column Variables
		$columns = "";
		$colValues = "";

		$uid = isset($dataDecode->uid) ? $dataDecode->uid : null;
		$firstname = isset($dataDecode->firstname) ? $dataDecode->firstname : null;
		$middlename = isset($dataDecode->middlename) ? $dataDecode->middlename : null;
		$lastname = isset($dataDecode->lastname) ? $dataDecode->lastname : null;
		$address = isset($dataDecode->address) ? $dataDecode->address : null;
		$mobile = isset($dataDecode->mobile) ? $dataDecode->mobile : null;
		$landline = isset($dataDecode->landline) ? $dataDecode->landline : null;
		$usertype = isset($dataDecode->usertype) ? $dataDecode->usertype : null;
		$sid = isset($dataDecode->sid) ? $dataDecode->sid : null;
		$password = isset($dataDecode->password) ? $dataDecode->password : null;
		$email = isset($dataDecode->email) ? $dataDecode->email : null;

		//Required Inputs: Verify if inputs exist
		if ($uid == null) {
			//TODO: uid verification

			echo "Error: No uid Input! <Br/>";
			return http_response_code(400);
		}

		//Optional Inputs
		if ($firstname) {
			debugPrint("firstname: " . $firstname);
			$opMask = $opMask | $opFirstname;
		}
		if ($middlename) {
			debugPrint("middlename: " . $middlename);
			$opMask = $opMask | $opMiddlename;
		}
		if ($lastname) {
			debugPrint("lastname: " . $lastname);
			$opMask = $opMask | $opLastname;
		}
		if ($address) {
			debugPrint("address: " . $address);
			$opMask = $opMask | $opAddress;
		}
		if ($mobile) {
			debugPrint("mobile: " . $mobile);
			$opMask = $opMask | $opMobile;
		}
		if ($landline) {
			debugPrint("landline: " . $landline);
			$opMask = $opMask | $opLandline;
		}
		if ($usertype) {
			debugPrint("usertype: " . $usertype);
			$opMask = $opMask | $opUsertype;
		}
		if ($sid) {
			debugPrint("sid: " . $sid);
			$opMask = $opMask | $opSid;

			//TODO: Verify if the sid selected exists
		}
		if ($password) {
			debugPrint("password: " . $password);
			$opMask = $opMask | $opPassword;

			//TODO: Verify if the password selected exists
		}
		if ($email) {
			debugPrint("email: " . $email);
			$opMask = $opMask | $opEmail;

			//TODO: Verify if the email selected exists
		}

		debugPrint("opMask: $opMask");

		//Compose the required inputs
		$setClause = "SET ";
		$whereClause = "WHERE uid=$uid";

		//Compose the optional inputs
		$isFirst = true;
		$ctr = 0;
		if ($opMask & $opFirstname) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "firstname='$firstname'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opMiddlename) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "middlename='$middlename'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opLastname) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "lastname='$lastname'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opAddress) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "address='$address'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opMobile) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "mobile='$mobile'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opLandline) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "landline='$landline'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opUsertype) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "usertype='$usertype'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opSid) {
						if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "sid='$sid'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opPassword) {
						if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "password='$password'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opEmail) {
						if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "email='$email'";
			$isFirst = false;
			$ctr++;
		}

		if ($ctr == 0) {
			echo "Error: No Data Available for Update";
			return http_response_code(400);
		}

		$query = "UPDATE users $setClause $whereClause";

		executeQuery($query);
		debugPrint("Updated user: $uid! <Br/>");
	}

	// $temp = '{"uid":1,"firstname":"Luchador","middlename":"Bot",
	// 		"lastname":"Midg","address":"Akumaba","mobile":"06891562034",
	// 		"landline":"9651223","usertype":"user","sid":null,"password":"newPass",
	// 		"email":"bagongEmail@gmail.com"}';
	// updateUser($temp);

	//Update School Information
	//Expects a JSON input for the data with the following info:
	// name 
	// accountnum
	// defaultpriceperunit
	function updateSchool ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
			return http_response_code(400);
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		//Optional Inputs Bit Mask
		$opMask = 0b0;
		$opName = 0b001;
		$opAccountnum = 0b010;
		$opDefaultpriceperunit = 0b100;

		$sid = isset($dataDecode->sid) ? $dataDecode->sid : null;
		$name = isset($dataDecode->name) ? $dataDecode->name : null;
		$defaultpriceperunit = isset($dataDecode->defaultpriceperunit) ? $dataDecode->defaultpriceperunit : null;
		$accountnum = isset($dataDecode->accountnum) ? $dataDecode->accountnum : null;

		//Required Inputs: Verify if inputs exist
		if ($sid == null) {
			//TODO: sid verification

			echo "Error: No sid Input! <Br/>";
			return http_response_code(400);
		}

		debugPrint("opMask: $opMask");

		//Optional Inputs
		if ($name) {
			debugPrint("name: " . $name);
			$opMask = $opMask | $opName;
		}
		if ($defaultpriceperunit) {
			debugPrint("defaultpriceperunit: " . $defaultpriceperunit);
			$opMask = $opMask | $opDefaultpriceperunit;
		}
		if ($accountnum) {
			debugPrint("accountnum: " . $accountnum);
			$opMask = $opMask | $opAccountnum;
		}

		//Compose the required inputs
		$setClause = "SET ";
		$whereClause = "WHERE sid=$sid";

		//Compose the optional inputs
		$isFirst = true;
		$ctr = 0;
		if ($opMask & $opName) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "name='$name'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opAccountnum) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "accountnum='$accountnum'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opDefaultpriceperunit) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "defaultpriceperunit='$defaultpriceperunit'";
			$isFirst = false;
			$ctr++;
		}

		if ($ctr == 0) {
			echo "Error: No Data Available for Update";
			return http_response_code(400);
		}

		$query = "UPDATE schools $setClause $whereClause";

		executeQuery($query);
		debugPrint("Updated school: $sid! <Br/>");
	}

	// $temp = '{"sid":1,"name":"University of the Philippines - Diliman",
	// 		"defaultpriceperunit":1500,"accountnum":"6521596358"}';
	// updateSchool($temp);

	//Update Student Information
	//Expects a JSON input for the data with the following info:
	// studid (required)
	// uid
	// firstname
	// middlename
	// lastname
	// birthdate
	function updateStudent ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
			return http_response_code(400);
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		//Optional Inputs Bit Mask
		$opMask = 0b0;
		$opUid = 0b00001;
		$opFirstname = 0b00010;
		$opMiddlename = 0b00100;
		$opLastname = 0b01000;
		$opBirthdate = 0b10000;

		$studid = isset($dataDecode->studid) ? $dataDecode->studid : null;
		$uid = isset($dataDecode->uid) ? $dataDecode->uid : null;
		$firstname = isset($dataDecode->firstname) ? $dataDecode->firstname : null;
		$middlename = isset($dataDecode->middlename) ? $dataDecode->middlename : null;
		$lastname = isset($dataDecode->lastname) ? $dataDecode->lastname : null;
		$birthdate = isset($dataDecode->birthdate) ? $dataDecode->birthdate : null;

		//Required Inputs: Verify if inputs exist
		if ($studid == null) {
			//TODO: sid verification

			echo "Error: No studid Input! <Br/>";
			return http_response_code(400);
		}

		debugPrint("opMask: $opMask");

		//Optional Inputs
		if ($uid) {
			debugPrint("uid: " . $uid);
			$opMask = $opMask | $opUid;
		}
		if ($firstname) {
			debugPrint("firstname: " . $firstname);
			$opMask = $opMask | $opFirstname;
		}
		if ($middlename) {
			debugPrint("middlename: " . $middlename);
			$opMask = $opMask | $opMiddlename;
		}
		if ($lastname) {
			debugPrint("lastname: " . $lastname);
			$opMask = $opMask | $opLastname;
		}
		if ($birthdate) {
			debugPrint("birthdate: " . $birthdate);
			$opMask = $opMask | $opBirthdate;
		}

		//Compose the required inputs
		$setClause = "SET ";
		$whereClause = "WHERE studid=$studid";

		//Compose the optional inputs
		$isFirst = true;
		$ctr = 0;
		if ($opMask & $opUid) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "uid='$uid'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opFirstname) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "firstname='$firstname'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opMiddlename) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "middlename='$middlename'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opLastname) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "lastname='$lastname'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opBirthdate) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "birthdate='$birthdate'";
			$isFirst = false;
			$ctr++;
		}

		if ($ctr == 0) {
			echo "Error: No Data Available for Update";
			return http_response_code(400);
		}

		$query = "UPDATE students $setClause $whereClause";

		executeQuery($query);
		debugPrint("Updated students: $studid! <Br/>");
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
	function updateSubject ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
			return http_response_code(400);
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		//Optional Inputs Bit Mask
		$opMask = 0b0;
		$opSid = 0b00001;
		$opSubname = 0b00010;
		$opSubdesc = 0b00100;
		$opUnits = 0b01000;
		$opPriceperunit = 0b10000;

		$subid = isset($dataDecode->subid) ? $dataDecode->subid : null;
		$sid = isset($dataDecode->sid) ? $dataDecode->sid : null;
		$subname = isset($dataDecode->subname) ? $dataDecode->subname : null;
		$subdesc = isset($dataDecode->subdesc) ? $dataDecode->subdesc : null;
		$units = isset($dataDecode->units) ? $dataDecode->units : null;
		$priceperunit = isset($dataDecode->priceperunit) ? $dataDecode->priceperunit : null;

		//Required Inputs: Verify if inputs exist
		if ($subid == null) {
			//TODO: sid verification

			echo "Error: No subid Input! <Br/>";
			return http_response_code(400);
		}

		debugPrint("opMask: $opMask");

		//Optional Inputs
		if ($sid) {
			debugPrint("sid: " . $sid);
			$opMask = $opMask | $opSid;
		}
		if ($subname) {
			debugPrint("subname: " . $subname);
			$opMask = $opMask | $opSubname;
		}
		if ($subdesc) {
			debugPrint("subdesc: " . $subdesc);
			$opMask = $opMask | $opSubdesc;
		}
		if ($units) {
			debugPrint("units: " . $units);
			$opMask = $opMask | $opUnits;
		}
		if ($priceperunit) {
			debugPrint("priceperunit: " . $priceperunit);
			$opMask = $opMask | $opPriceperunit;
		}

		//Compose the required inputs
		$setClause = "SET ";
		$whereClause = "WHERE subid=$subid";

		// $opMask = 0b0;
		// $opSid = 0b00001;
		// $opSubname = 0b00010;
		// $opSubdesc = 0b00100;
		// $opUnits = 0b01000;
		// $opPriceperunit = 0b10000;

		//Compose the optional inputs
		$isFirst = true;
		$ctr = 0;
		if ($opMask & $opSid) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "sid='$sid'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opSubname) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "subname='$subname'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opSubdesc) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "subdesc='$subdesc'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opUnits) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "units='$units'";
			$isFirst = false;
			$ctr++;
		}
		if ($opMask & $opPriceperunit) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "priceperunit='$priceperunit'";
			$isFirst = false;
			$ctr++;
		}

		if ($ctr == 0) {
			echo "Error: No Data Available for Update";
			return http_response_code(400);
		}

		$query = "UPDATE subjects $setClause $whereClause";

		executeQuery($query);
		debugPrint("Updated subject: $sid! <Br/>");
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
/*	function updatePayment ($data=null) {
		if ($data == null) {
			echo "Error: NO Data Found <Br/>";
			return http_response_code(400);
		}

		debugPrint($data);

		//Decode the JSON Data
		$dataDecode = json_decode($data);

		//Optional Inputs Bit Mask
		$opMask = 0b0;
		$opPid = 0b00001;
		$opstudid = 0b00010;
		$opSubdesc = 0b00100;
		$opUnits = 0b01000;
		$opPriceperunit = 0b10000;

		$pid = isset($dataDecode->pid) ? $dataDecode->pid : null;
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
		if ($pid == null) {
			//TODO: sid verification

			echo "Error: No pid Input! <Br/>";
			return http_response_code(400);
		}

		debugPrint("opMask: $opMask");

		//Optional Inputs
		if ($name) {
			debugPrint("name: " . $name);
			$opMask = $opMask | $opName;
		}

		//Compose the required inputs
		$setClause = "SET ";
		$whereClause = "WHERE sid=$sid";

		//Compose the optional inputs
		$isFirst = true;
		$ctr = 0;
		if ($opMask & $opName) {
			if (!$isFirst) {
				$setClause = $setClause . ",";
			}
			$setClause = $setClause . "name='$name'";
			$isFirst = false;
			$ctr++;
		}

		if ($ctr == 0) {
			echo "Error: No Data Available for Update";
			return http_response_code(400);
		}

		$query = "UPDATE schools $setClause $whereClause";

		executeQuery($query);
		debugPrint("Updated school: $sid! <Br/>");
	}*/

/*****************************************************************************/

?>