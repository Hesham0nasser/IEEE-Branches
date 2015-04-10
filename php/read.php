<?php

$region_1 = array(
	'name' => 'region 1',
	'branches' => array(
		// branch 1
		array(
			'name' => 'Cairo 1',
			'lat' => '30.044420',
			'lng' => '31.235712',
			'events' => array(
			 		"IAC Conference", 
			 		"University To Work Program Seminar by ECG | IEEE CUSB", 
			 		"Intel Cairo University Hackathon",
					"Mentor Graphics Verilog Course | IEEE CUSB", "IEEEXtreme 8.0 | IEEE CUSB",
			),
		),
		// branch 2
		array(
			'name' => 'Cairo 2',
			'lat' => '30.044420',
			'lng' => '31.235712',
			'events' => array(
			 		"IAC Conference", 
			 		"University To Work Program Seminar by ECG | IEEE CUSB", 
			 		"Intel Cairo University Hackathon",
					"Mentor Graphics Verilog Course | IEEE CUSB", "IEEEXtreme 8.0 | IEEE CUSB",
			),
		),
	),
);


$region_2 = array(
	'name' => 'region 2',
	'branches' => array(
		// branch 1
		array(
			'name' => 'Cairo 1',
			'lat' => '30.044420',
			'lng' => '31.235712',
			'events' => array(
			 		"IAC Conference", 
			 		"University To Work Program Seminar by ECG | IEEE CUSB", 
			 		"Intel Cairo University Hackathon",
					"Mentor Graphics Verilog Course | IEEE CUSB", "IEEEXtreme 8.0 | IEEE CUSB",
			),
		),
		// branch 2
		array(
			'name' => 'Cairo 2',
			'lat' => '30.044420',
			'lng' => '31.235712',
			'events' => array(
			 		"IAC Conference", 
			 		"University To Work Program Seminar by ECG | IEEE CUSB", 
			 		"Intel Cairo University Hackathon",
					"Mentor Graphics Verilog Course | IEEE CUSB", "IEEEXtreme 8.0 | IEEE CUSB",
			),
		),
		// branch 3
		array(
			'name' => 'Cairo 3',
			'lat' => '30.044420',
			'lng' => '31.235712',
			'events' => array(
			 		"IAC Conference", 
			 		"University To Work Program Seminar by ECG | IEEE CUSB", 
			 		"Intel Cairo University Hackathon",
					"Mentor Graphics Verilog Course | IEEE CUSB", "IEEEXtreme 8.0 | IEEE CUSB",
			),
		),
		// branch 4
		array(
			'name' => 'Cairo 4',
			'lat' => '30.044420',
			'lng' => '31.235712',
			'events' => array(
			 		"IAC Conference", 
			 		"University To Work Program Seminar by ECG | IEEE CUSB", 
			 		"Intel Cairo University Hackathon",
					"Mentor Graphics Verilog Course | IEEE CUSB", "IEEEXtreme 8.0 | IEEE CUSB",
			),
		),
	), 
);


$arr['data'] = array( $region_1, $region_2 );

echo json_encode($arr); 

?>