<?php
  $путь_домой = '../../../../';
  include $путь_домой . 'функции.php';
  рекурсия_каталога_для_категорий ($путь_домой . 'товары/');
  вывод_категорий (
    $каталог_для_меню,
    $клас = 'категории_фильтра_каталога',
    $_GET ['путь'],
    $внутренний_запрос = 1,
    $ветка_дерева      = 0,
  );
  рекурсия_каталога               ($путь_домой . 'товары/', $один_из_типов_главной = '', $путь = $_GET['путь'], $бренд = '');
  $доступная_вилка_цен       = [];
  $доступные_бренды_на_вывод = [];
  $доступные_папки_на_вывод  = [];
  $тригеры = [0, 0, 0, 0];
  foreach (explode ('^__^', chop ($каталог, '^__^')) as $позиция_каталога) {
    $ячейка = explode ('^_^', $позиция_каталога);
    $папка  = implode ('/', array_slice (explode ('/', $ячейка [0]), 5, -2));
    // Отфильтруем массив
      if ($_GET ['индекс_фильтра'] == 0) {
        if ($_GET ['вилка_цен'][0] > (int) $ячейка[4]) continue;
        if ($_GET ['вилка_цен'][1] < (int) $ячейка[4]) continue;
      }
      if ($_GET ['индекс_фильтра'] == 1) {
        if ($_GET ['бренды'] != '') if (!in_array ($ячейка [3], $_GET ['бренды'])) continue;
      }
      if ($_GET ['индекс_фильтра'] == 2) {
        if ($_GET ['флаги'] [0] == 1) if (!str_contains ($ячейка [1], 'Новинка')) continue;
        if ($_GET ['флаги'] [0] == 0) if ( str_contains ($ячейка [1], 'Новинка')) continue;
        if ($_GET ['флаги'] [1] == 1) if (!str_contains ($ячейка [1], 'Акция'  )) continue;
        if ($_GET ['флаги'] [1] == 0) if ( str_contains ($ячейка [1], 'Акция'  )) continue;
      }
      if ($_GET ['индекс_фильтра'] == 3) {
        // Костыль
          if ($_GET ['категории'] != '') if (!in_array ($папка, $_GET ['категории'])) continue;
      }
    // Сформируем вывод
      if ($_GET ['индекс_фильтра'] != 0) $доступная_вилка_цен []       = $ячейка [4];
      if ($_GET ['индекс_фильтра'] != 1) $доступные_бренды_на_вывод [] = $ячейка [3];
      if ($_GET ['индекс_фильтра'] != 3) $доступные_папки_на_вывод []  = $папка;
    // Установим статус флагов на каждый тип
      if   (str_contains ($ячейка [1], 'Новинка')) $тригеры [0] = 1;
      else $тригеры [1] = 1;
      if   (str_contains ($ячейка [1], 'Акция'  )) $тригеры [2] = 1;
      else $тригеры [3] = 1;
  }
  if ($_GET ['индекс_фильтра'] != 0) {
    $доступная_вилка_цен = array_unique ($доступная_вилка_цен);
      echo min ($доступная_вилка_цен) . ',' . max ($доступная_вилка_цен);
    echo ';';
  }
  if ($_GET ['индекс_фильтра'] != 1) {
    echo implode (',', array_unique ($доступные_бренды_на_вывод));
    echo ';';
  }
  if ($_GET ['индекс_фильтра'] != 3) {
    $цифры_категории = [];
    foreach (array_unique ($доступные_папки_на_вывод) as $значение_цикла_0) {
      foreach ($массив_для_внутреннего_запроса as $ключ => $значение_цикла_1) {
        if (str_contains ($значение_цикла_0, $значение_цикла_1))
          {
            $цифры_категории [] = $ключ;
          }
      }
    }
    echo implode (',', array_unique ($цифры_категории));
    echo ';';
  }
  // Выведем статус на селекты
    $ответы = ['Нет', 'Да', 'Все'];
      if (($тригеры [0] == 0) and ($тригеры [1] == 1)) echo 0;
      if (($тригеры [0] == 1) and ($тригеры [1] == 0)) echo 1;
      if (($тригеры [0] == 1) and ($тригеры [1] == 1)) echo 2;
    echo ',';
      if (($тригеры [2] == 0) and ($тригеры [3] == 1)) echo 0;
      if (($тригеры [2] == 1) and ($тригеры [3] == 0)) echo 1;
      if (($тригеры [2] == 1) and ($тригеры [3] == 1)) echo 2;
  //
  echo ';';
?>
