<?php

$dataSetOne = [1, 2, 3, 4];
$dataSetTwo = [5, 6];

# Normal Approach For all versions

//$resultOne = array_merge($dataSetOne, $dataSetTwo);
//
//print_r($resultOne);

# Another Approach and this will work only for the  >= PHP 7.4
#
#Result for 8.2.9, 7.4.33, 8.2.1:
$resultTwo = [...$dataSetOne, ...$dataSetTwo];


print_r($resultTwo);