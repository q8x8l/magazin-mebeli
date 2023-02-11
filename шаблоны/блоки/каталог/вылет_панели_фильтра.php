<?php
  $svg00 = '<svg><use xlink:href="' . $домен . 'стили/svg/sprite6.svg#icon_shop_sort_';
  $svg01 = '"></use></svg>';
  $svg1 = $svg00 . 'desc' . $svg01;
  $svg2 = $svg00 . 'asc'  . $svg01;
  echo "<form>";
    $условия_сортировки = [
      [$svg1, 'Цена - убывание'],
      [$svg2, 'Цена - возрастание'],
      [$svg1, 'Название - Я-А'],
      [$svg2, 'Название - А-Я'],
    ];
    foreach ($условия_сортировки as $e) {
      echo '<i>' . $e[0] . $e[1] . '</i>';
    }
  echo "</form>";
?>
