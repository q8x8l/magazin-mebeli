﻿<?php
  include '../../../функции.php';
  if ($индекс = $_GET ['количество_элементов'])
    {
      $количество_страниц = ceil ($_GET ['количество_элементов'] / 8);
    }
  else
    {
      $домен              = str_replace ('блоки/каталог/', '', $домен);
      $количество_страниц = $_GET ['количество_страниц'];
    }
  if ($путь = $_GET ['путь'])
    {
      $q = str_replace ('блоки/каталог/', '', $домен) . 'каталог.php?путь=' . $путь . '&';
    }
  if ($бренд = $_GET ['бренд'])
    {
      $q = $домен . 'каталог.php?бренд=' . $бренд . '&';
    }
  $клик_по_фильтру = $_GET ['клик_по_фильтру'];
  echo '<div class="Пагинация" количество_страниц="' . $количество_страниц . '">';
    if ($фильтр     = $_GET ['фильтр']) $фильтр = '&фильтр=' . $_GET ['фильтр'];
    if ($сортировка = $_GET['сортировка']) $сортировка = '&сортировка=' . $_GET['сортировка'];
    if ($количество_страниц > 1) {
      if (($Страница = $_GET ['страница']) != $количество_страниц) echo '<p class="p1"><span>Показать ещё</span><span>+</span></p>';
      echo '<p class="p2">';
      if ($Страница > 1) {
        echo '<i></i>';
        echo '<a href="' . $q . 'страница=1' . $фильтр . $сортировка . '"><<</a>';
        echo '<span class="s1">...</span>';
      }
      if ($Страница != 1) echo '<a class="a2" href="' . $q . 'страница=' . ($w = $Страница - 1) . $фильтр . $сортировка . '">' . $w . '</a>';
      echo '<span class="s3">' . $Страница . '</span>';
      if ($Страница != $количество_страниц) {
        echo '<a class="a3" href="' . $q . 'страница=' . ($w = $Страница + 1) . $фильтр . $сортировка . '">' . $w . '</a>';
        echo '<span class="s2">...</span>';
        echo '<i></i>';
        echo '<a href="' . $q . 'страница=' . $количество_страниц . $фильтр . $сортировка . '">>></a>';
      }
      echo '</p>';
    }
  echo '</div>';
?>
