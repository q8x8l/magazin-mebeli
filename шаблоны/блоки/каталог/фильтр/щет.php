<?php
  // Непонятный фикс для непонятной ошибки
    if ($_GET ['путь'] != '') die ();
  $путь_домой = '../../../../';
  include $путь_домой . 'функции.php';
  // Пофиксим для каталога по брендам
    // $бренд   = $_GET['5'];
  рекурсия_каталога ($путь_домой . 'товары/', $один_из_типов_главной = '', $путь = $_GET ['путь'], $бренд = '');
  //
    $щет_отфильтрованый = 0;
    $щет_общий          = 0;
    $микро_запросы_к_меткам_товара =
      [
        [
          'Да',
          'Нет',
        ],
        [
          'Новинка',
          'Акция',
        ],
      ]
    ;
  foreach (explode ('^__^', $каталог) as $строка) {
    if ($строка == '') continue;
    $щет_общий++;
    $ячейка = explode ('^_^', $строка);
      if ($_GET ['вилка_цен'] [0] > $ячейка [4]) 																																                                          continue;
      if ($_GET ['вилка_цен'] [1] < $ячейка [4]) 																																                                          continue;
      if (!in_array ($ячейка [3], $_GET ['бренды']))                              	 				 											                                        continue;
      if ($_GET ['флаги_с_запроса'] [0] == $микро_запросы_к_меткам_товара [0][0]) if (!str_contains ($ячейка [1], $микро_запросы_к_меткам_товара [1][0])) continue;
      if ($_GET ['флаги_с_запроса'] [0] == $микро_запросы_к_меткам_товара [0][1]) if ( str_contains ($ячейка [1], $микро_запросы_к_меткам_товара [1][0])) continue;
      if ($_GET ['флаги_с_запроса'] [1] == $микро_запросы_к_меткам_товара [0][0]) if (!str_contains ($ячейка [1], $микро_запросы_к_меткам_товара [1][1])) continue;
      if ($_GET ['флаги_с_запроса'] [1] == $микро_запросы_к_меткам_товара [0][1]) if ( str_contains ($ячейка [1], $микро_запросы_к_меткам_товара [1][1])) continue;
    if (($дерево = $_GET ['дерево']) != '') {
      if (!in_array (implode ('/', $папка = array_slice (explode ('/', explode ('^_^', $строка) [0]), count (explode ('/', $путь_домой)), -2)), $дерево)) {
        continue;
      }
    }
    $щет_отфильтрованый++;
  }
  echo $щет_отфильтрованый . ',' . $щет_общий;
?>
