<?php
	include ($пп = '../../../../') . 'функции.php';
	рекурсия_каталога (
		$пп . 'товары/',
		'',
		$_GET ['путь'],
		'',
	);
	$б = [];
	foreach (explode ('^__^', $каталог) as $v)
		{
			$б [] = explode ('^_^', $v) [3];
		}
	foreach (array_unique ($б) as $k => $v)
		{
			echo $v . PHP_EOL;
		}
?>