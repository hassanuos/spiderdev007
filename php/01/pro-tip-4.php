<?php

$dataSet = [
    [1, 'Hassan Raza', 'hassan@spiderdev007.com'],
    [2, 'Himanshu Jain', 'himanshu@spiderdev007.com'],
    [3, 'Shazim Dar', 'shazim@spiderdev007.com'],
];

// $dataSetClone = [];
foreach ($dataSet as $k => &$val){
    $val[2] = explode("@", $val[2])[0];
//    $dataSetClone[$k][0] = $val[0];
//    $dataSetClone[$k][1] = $val[1];
//    $dataSetClone[$k][2] = explode("@", $val[2])[0];
}

print_r($dataSet);