<?php
  include '../../../../функции.php';
  $путь    = $_GET['путь'];
  $цены    = $_GET['вилка_цен'];
  $бренды  = $_GET['бренды'];
  $новинка = $_GET['флаги'][0];
  $акция   = $_GET['флаги'][1];
  // Пофиксим для каталога по брендам
  // $бренд   = $_GET['5'];
  рекурсия_каталога ('../../../../товары/', '', $путь, $бренд, '');
  $щет0 = 0;
  $щет1 = 0;
  foreach (explode ('^__^', $каталог) as $v0) {
    if ($v0 == '') continue;
    $щет1++;
    // Если элемент рекурсии есть в полном дереве
      if (($дерево = $_GET ['дерево']) != '') {
        if (!in_array (implode ('/', $папка = array_slice (explode ('/', explode ('^_^', $v0)[0]), 5, -2)), $дерево)) {
          continue;
        }
      }
    $i1 = explode ('^_^', $v0);
      if (($цены[0] > ($i2 = $i1[4])) or ($цены[1] < $i2))          continue;
      if (!in_array ($i1[3], $бренды))                              continue;
      if ($новинка == 'Да')  if (!str_contains ($i1[1], 'Новинка')) continue;
      if ($новинка == 'Нет') if (str_contains  ($i1[1], 'Новинка')) continue;
      if ($акция   == 'Да')  if (!str_contains ($i1[1], 'Акция'))   continue;
      if ($акция   == 'Нет') if (str_contains  ($i1[1], 'Акция'))   continue;
    $щет0++;
  }
  echo $щет0 . ',' . $щет1;
?>
