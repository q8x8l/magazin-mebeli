<?php
  include 'блоки/шапка.php';
  if ($r = $_GET['путь']) {
    $h2 = explode('/', $r);
    $h1 = $h2[count($h2) - 1];
  }
  if ($_GET['бренд']) {
    $h1 = $_GET['бренд'];
    $h0 = 1;
  }
  echo '<p class="h1">' . $h1 . '</p>';
  $путь = 'блоки/каталог/';
  include          $путь . 'панель_сортировки_и_фильтра.php';
  if ($h0) include $путь . 'категории_для_бренда.php';
  echo                     '<ul class="лента_каталога"></ul>';
  echo                     '<div class="паг"></div>';
  echo                     '<link rel="stylesheet" href="' . $домен . 'стили/каталог/пагинация.css">';
  if ($r)  include $путь . 'соседние_категории.php';
  include                  'блоки/ноги.php';
?>
