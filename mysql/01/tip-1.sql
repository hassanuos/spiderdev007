

--------------
id | username
--------------
1  | Sanjit
--------------


-- The query below will return an empty result

select * from users where username = 'Sanjeeeet';

--------------
id | username
--------------
No record...
--------------


-- This function will match all usernames that sounds similar
# SOUNDEX()

-- The query below will return an empty result
select * from users where SOUNDEX(username) = SOUNDEX('Sanjeeeet');

--------------
id | username
--------------
1  | Sanjit
--------------


-- Ref
--  https://learn.microsoft.com/en-us/sql/t-sql/functions/soundex-transact-sql?view=sql-server-ver16