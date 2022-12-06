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
  $h2 = 'блоки/каталог/';
  include          $h2 . 'панель_сортировки_и_фильтра.php';
  if ($h0) include $h2 . 'категории_для_бренда.php';
  echo                   '<ul class="лента_каталога"></ul>';
  // include          $h2 . 'тест_аякса_в_ленту_каталога.php';
  include          $h2 . 'пагинация.php';
  if ($r)  include $h2 . 'соседние_категории.php';
  include                'блоки/ноги.php';
?>
