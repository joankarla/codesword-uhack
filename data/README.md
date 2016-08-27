##handleData.php

/*****************************************************************************/

There are 3 user types:
* Administrators 	-	(admin)
* Schools		-	(school)
* Users/Payors	-	(user)

/*****************************************************************************/

There are 7 data types:
* Users
* Students
* Payments
* Schools
* Subjects
* Dependents
* Accounts

/*****************************************************************************/

There are 5 actions:
* login
* read (default)
* add
* update
* delete

/*****************************************************************************/

Login Usage:
* http://localhost/data/handleData.php?action=login&email=[email address]&pwd=[password]

Ex.
http://localhost/data/handleData.php?action=login&email=test@gmail.com&pwd=asdfjkl

/*****************************************************************************/

Read Usage ("id" is not needed for utype = admin):
* http://localhost/data/handleData.php?utype=[user type]&dtype=[data type]&id=[school id or user id]

Ex.1. View the dependents of the user/payor with uid = 1
* http://localhost/data/handleData.php?utype=user&dtype=dependents&id=1

Ex.2. View the payments received by school with sid = 3
* http://localhost/data/handleData.php?utype=school&dtype=payments&id=3

Ex.3. View ALL subjects available
* http://localhost/data/handleData.php?utype=admin&dtype=subjects

Ex.4. View ALL accounts available
* http://localhost/data/handleData.php?utype=admin&dtype=accounts

Ex.5. View accounts of the user/payor with uid = 2
* http://localhost/data/handleData.php?utype=user&dtype=accounts&id=2

/*****************************************************************************/

Add Usage ("utype" is not needed to call "add" functions)
* http://localhost/data/handleData.php?dtype=[data type]&action=[action type]&data=[json input]

Ex.1. Add User
* http://localhost/data/handleData.php?dtype=users&action=add&data={%22password%22:%22asdfjkl;%22,%20%22firstname%22:%22prado%22,%20%22middlename%22:%22navarro%22,%20%22lastname%22:%22bognot%22,%20%22address%22:%22Katipunan%20Ave,%20Quezon%20City%22,%20%22mobile%22:%2209163677476%22,%20%22landline%22:%226963708%22,%20%22email%22:%22updews.prado@gmail.com%22,%20%22usertype%22:%22admin%22,%20%22sid%22:null}

Ex.2. Add Student
* http://localhost/data/handleData.php?dtype=students&action=add&data={"uid":2,"firstname":"Prado","middlename":"Navarro","lastname":"Bognot","birthdate":"1990-01-01"}

Ex.3. Add School
* http://localhost/data/handleData.php?dtype=schools&action=add&data={"name":"Codesword University","accountnum":"6549205896","defaultpriceperunit":2500}

Ex.4. Add Subject
* http://localhost/data/handleData.php?dtype=subjects&action=add&data={"sid":3,"subname":"Journ 25","subdesc":"Advanced Journalism","units":3,"priceperunit":3500}

Ex.5. Add Payment
* http://localhost/data/handleData.php?dtype=payments&action=add&data={"studid":6,
			"sid":3,
			"timestamp":"2016-08-29 16:00:00",
			"schoolperiod":"AY 2016-2017 Sem 1",
			"educlevel":"undergraduate",
			"subids":"14,16,18",
			"totalunits":9,
			"fee":29488.95,
			"pstatus":"paid"}

/*****************************************************************************/

Update Usage ("utype" is not needed to call "Update" functions)
* http://localhost/data/handleData.php?dtype=[data type]&action=[action type]&data=[json input]

Ex.1. Update User
* http://localhost/data/handleData.php?dtype=users&action=update&data={"uid":1,"mobile":"09165845628"}

Ex.2. Update Student
* http://localhost/data/handleData.php?dtype=students&action=update&data={"studid":2,"firstname":"Prado","middlename":"Navarro","lastname":"Bognot"}

Ex.3. Update School
* http://localhost/data/handleData.php?dtype=schools&action=update&data={"sid":3,"name":"Codesword University","accountnum":"6549205896"}

Ex.4. Update Subject
* http://localhost/data/handleData.php?dtype=subjects&action=update&data={"subid":4,"units":5}

Ex.5. Update Payment
* http://localhost/data/handleData.php?dtype=payments&action=update&data={"pid":6,"pstatus":"paid"}

/*****************************************************************************/

Delete Usage ("utype" is not needed to call "Update" functions)
* http://localhost/data/handleData.php?dtype=[data type]&action=[action type]&data=[json input]

Ex.1. Delete User
* http://localhost/data/handleData.php?dtype=users&action=delete&data={"uid":1}

Ex.2. Delete Student
* http://localhost/data/handleData.php?dtype=students&action=delete&data={"studid":2}

Ex.3. Delete School
* http://localhost/data/handleData.php?dtype=schools&action=delete&data={"sid":3}

Ex.4. Delete Subject
* http://localhost/data/handleData.php?dtype=subjects&action=delete&data={"subid":4}

Ex.5. Delete Payment
* http://localhost/data/handleData.php?dtype=payments&action=delete&data={"pid":6}

/*****************************************************************************/