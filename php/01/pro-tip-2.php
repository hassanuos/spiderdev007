<?php

// TODO
 //Result for PHP => 8.2.9, 7.4.33, 7.3.33, 7.1.33, 5.6.0

// isset for each variable
$post['email'] = 'atc@apider.com';
$post['passwor'] = 'dfasdfSDFDSF';

//if (isset($post['email']) && isset($post['password'])){
//   die('valid values');
//}
//
//die("missing data");

// Best Practice

if (isset($post['email'], $post['password'])){
    die('valid values');
}

die("missing data");