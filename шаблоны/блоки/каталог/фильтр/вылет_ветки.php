<?php
	include ($путь_домой = '../../../../') . 'функции.php';
	рекурсия_каталога_для_категорий ($путь_домой . 'товары/');
	вывод_категорий (
		$каталог_для_меню,
		$клас 			   = 'категории_фильтра_каталога',
		$путь 			   = $_GET ['путь'],
		$внутренний_запрос = 0,
		$ветка_дерева      = $_GET ['ветка_дерева'],
	);
?>