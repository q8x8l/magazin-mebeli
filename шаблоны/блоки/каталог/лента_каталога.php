﻿<?php
  $путь_домой = '../../../';
  include $путь_домой  . 'функции.php';
  рекурсия_каталога (
    $путь_домой . 'товары/',
    '',
    $_GET ['путь'],
    '',
  );
  $обработанный_массив     = [];
  $массив_брендов_в_выброс = [];
  foreach (explode ('^__^', chop ($каталог, '^__^')) as $k => $сырая_строка) {
    $ячейка = explode ('^_^', $сырая_строка);
    $массив_брендов_в_выброс [] = $ячейка [3];
    if ($флаги = $_GET ['флаги'])
      {
        if ($флаги [0] == 0) if ( str_contains ($ячейка [1], 'Новинка')) continue;
        if ($флаги [0] == 1) if (!str_contains ($ячейка [1], 'Новинка')) continue;
        if ($флаги [1] == 0) if ( str_contains ($ячейка [1], 'Акция'  )) continue;
        if ($флаги [1] == 1) if (!str_contains ($ячейка [1], 'Акция'  )) continue;
      }

    if ($_GET ['вилка_цен'])
      {
        if ($_GET ['вилка_цен'] [0] > $ячейка [4]) continue;
        if ($_GET ['вилка_цен'] [1] < $ячейка [4]) continue;
      }
    if ($сортировка = $_GET ['сортировка'])
      {
        // if (str_contains ($сортировка, 'Цена'    )) $обработанный_массив [] = [(int) explode ('^_^', $сырая_строка) [4], $сырая_строка];
        // if (str_contains ($сортировка, 'Название')) $обработанный_массив [] = [      explode ('^_^', $сырая_строка) [2], $сырая_строка];
      }
    else
      {
        $обработанный_массив [] = [0, $сырая_строка];
      }
  }
  // if (str_contains ($сортировка, 'А-Я'        )) asort ($обработанный_массив);
  // if (str_contains ($сортировка, 'Я-А'        )) rsort ($обработанный_массив);
  // if (str_contains ($сортировка, 'возрастание')) asort ($обработанный_массив);
  // if (str_contains ($сортировка, 'убывание'   )) rsort ($обработанный_массив);
  $выброс = [];
  рекурсия_каталога_для_категорий ($путь_домой . 'товары/');
  вывод_категорий (
    $каталог_для_меню,
    $клас = 'категории_фильтра_каталога',
    $_GET ['путь'],
    $внутренний_запрос = 1,
  );
  foreach ($обработанный_массив as $обработанная_строка)
    $выброс [] = explode ('товары/', $обработанная_строка [1]) [1];
    if ($_GET ['экс_дерево'] != 0)
      {
        $массив_категорий_в_выброс = [];
        foreach ($массив_для_внутреннего_запроса as $ключ => $значение_цикла_0)
          {
            if (in_array ($ключ, $_GET ['экс_дерево'])) $массив_категорий_в_выброс [] = $массив_для_внутреннего_запроса [$ключ];
          }
      }
    if ($_GET ['экс_бренды'] != 0)
      {
        $отфильтрованный_массив_брендов = [];
        foreach ($_GET ['экс_бренды'] as $цифра_бренда_в_трафике)
          {
            $отфильтрованный_массив_брендов [] = array_values (array_unique ($массив_брендов_в_выброс)) [$цифра_бренда_в_трафике];
          }
      }
    if ($_GET ['фильтр'] == 1)
      {
        $уникальный_массив_каталога_в_ответ = [];
        foreach ($выброс as $элемент_выброса)
          {
            if (!in_array (join ('/', array_slice (explode ('/', explode ('^_^', $элемент_выброса)[0]), 0, -2)), $массив_категорий_в_выброс)) continue;
            if (!in_array (explode ('^_^', $элемент_выброса) [3], $отфильтрованный_массив_брендов)) continue;
            $уникальный_массив_каталога_в_ответ [] = $элемент_выброса;
          }
      }
    if ($_GET ['фильтр'] == 0)
      {
        foreach ($выброс as $элемент_выброса)
          {
            $уникальный_массив_каталога_в_ответ [] = $элемент_выброса;
          }
      }
  $индекс = 0;
  if ($_GET ['страница']) {
    $от = ($_GET ['страница'] - 1) * 8;
  }
  // отдадим трафик
    foreach (array_unique ($уникальный_массив_каталога_в_ответ) as $k => $строка_в_ответ) {
      if ($_GET ['страница'])
        {
          if (++$индекс <= $от    ) continue;
          if (  $индекс >  $от + 8) continue;
        }
      $пункт_запятая = '';
        if ($k != 0) $пункт_запятая = ', ';
      echo $пункт_запятая . $строка_в_ответ;
    }
    echo ';;';
    echo $индекс;
  echo ';;';
  // Обнуление ответа запроса каталога
    $каталог = '';
?>
