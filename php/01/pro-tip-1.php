<?php

// Destructure arrays

$dataSet = [
  [1, 'Hassan Raza', 'hassan@spiderdev007.com'],
  [2, 'Himanshu Jain', 'himanshu@spiderdev007.com'],
  [3, 'Shazim Dar', 'shazim@spiderdev007.com'],
];

// method -1 (TEST CASE SUCCESSFUL for all PHP Versions)
list($id, $name, $email) = $dataSet[1];

// method - 2 Result for PHP (8.2.9, 7.4.33, 7.3.33, 7.1.33):
// Test Case Failed For 5.6
[$id, $name, $email] = $dataSet[0];


// loop individually without declare extra variables
foreach ($dataSet as list($id, $name, $email)){
    echo "Id: ". $id . "\t Name: ". $name . "\tEmail: ". $email . "\n";
}