﻿<?php
  $путь_домой = '../../../';
  include $путь_домой  . 'функции.php';
  if ($фильтр = $_GET ['фильтр'])
    {
      $флаги     = explode (',', substr (explode (';', $фильтр) [0], 1, -1));
      $вилка_цен = explode (',', substr (explode (';', $фильтр) [1], 1, -1));
    }
  рекурсия_каталога (
    $путь_домой . 'товары/',
    $один_из_типов_главной,
    $_GET ['путь'],
    $бренд = '',
    // $_GET ['дерево'],
  );
  $обработанный_массив = [];
  foreach (explode ('^__^', $каталог) as $сырая_строка) {
    if ($фильтр) {
      $ячейка = explode ('^_^', $сырая_строка);
        if ($вилка_цен [0] > $ячейка [4]) {
          continue;
        }
        if ($вилка_цен [1] < $ячейка [4]) {
          continue;
        }
        if (!in_array ($ячейка [3], $_GET ['бренды'])) {
          continue;
        }
        if ($флаги [0] == $микро_запросы_к_меткам_товара [0][0]) if (!str_contains ($ячейка [1], $микро_запросы_к_меткам_товара [1][0])) continue;
        if ($флаги [0] == $микро_запросы_к_меткам_товара [0][1]) if ( str_contains ($ячейка [1], $микро_запросы_к_меткам_товара [1][0])) continue;
        if ($флаги [1] == $микро_запросы_к_меткам_товара [0][0]) if (!str_contains ($ячейка [1], $микро_запросы_к_меткам_товара [1][1])) continue;
        if ($флаги [1] == $микро_запросы_к_меткам_товара [0][1]) if ( str_contains ($ячейка [1], $микро_запросы_к_меткам_товара [1][1])) continue;
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
  $индекс = 0;
  if ($_GET ['страница']) {
    $от = ($_GET ['страница'] - 1) * 8;
  }
  foreach ($обработанный_массив as $обработанная_строка) {
    if (in_array (implode ('/', array_slice (explode ('/', explode ('^_^', explode ('товары/', $обработанная_строка [1]) [1]) [0]), 0, -2)), $_GET ['дерево'])) {
      if ($_GET ['страница']) {
        if (++$индекс <= $от)     {
          continue;
        }
        if ($индекс   >  $от + 8) {
          continue;
        }
      }
      echo explode ('товары', $обработанная_строка [1]) [1] . ', ';
    }
  }
  echo ';;' . $индекс;
  // Обнуление ответа запроса каталога
    $каталог = '';
?>
