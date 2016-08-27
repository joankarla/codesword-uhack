##handleData.php

/*****************************************************************************/

There are 3 user types:
* Administrators 	-	(admin)
* Schools		-	(school)
* Users/Payors	-	(user)

/*****************************************************************************/

There are 6 data types:
* Users
* Students
* Payments
* Schools
* Subjects
* Dependents

/*****************************************************************************/

Read Usage ("id" is not needed for utype = admin):
* http://localhost/data/handleData.php?utype=[user type]&dtype=[data type]&id=[school id or user id]

Ex.1. View the dependents of the user/payor with uid = 1
* http://localhost/data/handleData.php?utype=user&dtype=dependents&id=1

Ex.2. View the payments received by school with sid = 3
* http://localhost/data/handleData.php?utype=school&dtype=payments&id=3

Ex.3. View ALL subjects available
* http://localhost/data/handleData.php?utype=admin&dtype=subjects
