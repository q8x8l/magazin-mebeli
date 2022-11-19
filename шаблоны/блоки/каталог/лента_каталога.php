<?php
  if (!($a = $_GET['аякс'])) {
    $e0 = '../товары/';
  } else {
    $путь = $_GET['путь'];
    $фильтр = $_GET['фильтр'];
    $e0 = '../../../товары/';
    include '../../../функции.php';
  }
  $от = (($Страница = $_GET['страница']) - 1) * 8;
  $индекс = 0;
  if (!$a) echo '<ul class="лента_каталога">';
    echo '<script class="товары">"';
      if ($фильтр = $_GET['фильтр']) {
        $флаги  = explode(';', $фильтр)[0];
        $флаги  = explode(',', $флаги);
        $цены   = explode(';', $фильтр)[1];
        $цены   = explode(',', $цены);
        $бренды = explode(';', $фильтр)[2];
      }
      рекурсия_каталога (
        $e0,
        $один_из_типов_главной,
        $путь,
        $бренд,
        $_GET ['полное_дерево'],
      );
      $w2 = [];
      foreach (explode ('^__^', $каталог) as $v0) {
        if ($фильтр) {
          $i1 = explode ('^_^', $v0);
            if (($цены[0] > ($i2 = $i1[4])) or ($цены[1] < $i2)) continue;
            if (!str_contains ($бренды, $i1[3])) continue;
            if ($флаги[0] == 'Да')  if (!str_contains ($i1[1], 'Новинка')) continue;
            if ($флаги[0] == 'Нет') if (str_contains  ($i1[1], 'Новинка')) continue;
            if ($флаги[1] == 'Да')  if (!str_contains ($i1[1], 'Акция'))   continue;
            if ($флаги[1] == 'Нет') if (str_contains  ($i1[1], 'Акция'))   continue;
        }
        if ($сортировка = $_GET['сортировка']) {
          if (str_contains ($сортировка, 'Цена')) $w2 [] = [(int) explode ('^_^', $v0)[4], $v0];
          if (str_contains ($сортировка, 'Название')) $w2 [] = [explode ('^_^', $v0)[2], $v0];
        } else {$w2 [] = [0, $v0];}
      }
      if (str_contains ($сортировка, 'А-Я')) asort ($w2);
      if (str_contains ($сортировка, 'Я-А')) rsort ($w2);
      if (str_contains ($сортировка, 'возрастание')) asort ($w2);
      if (str_contains ($сортировка, 'убывание')) rsort ($w2);
      foreach ($w2 as $v2) {
        if ($Страница) if ((++$индекс <= $от) or ($индекс > $от + 8)) continue;
        echo explode ('товары', $v2[1])[1] . '^__^';
      }
    echo '"</script>';
  if (!$a) echo '</ul>';
  $каталог = '';
?>
