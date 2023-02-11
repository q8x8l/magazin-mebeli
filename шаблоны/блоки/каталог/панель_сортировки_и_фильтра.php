<?php
  $svg00 = '<svg><use xlink:href="' . $домен . 'стили/svg/sprite6.svg#icon_shop_sort_';
  $svg01 = '"></use></svg>';
  $svg1 = $svg00 . 'desc' . $svg01;
  $svg2 = $svg00 . 'asc'  . $svg01;
?>
<hr class="hr0">
<ul class="панель_сортировки_и_фильтра">
  <li>
    <i class="toggle шоу_Фильтр">
      Фильтр
      <svg><use xlink:href="<?php echo $домен; ?>стили/svg/sprite4.svg#icon_shop_filter"></use></svg>
    </i>
  </li>
  <li>
    <i class="toggle кнопка_для_сортировки">
      Сортировка
      <svg><use xlink:href="<?php echo $домен; ?>стили/svg/sprite4.svg#icon_shop_sort"></use></svg>
    </i>
    <span>
      <?php
        switch ($q0 = $_GET['сортировка'])
          {
            case 'Цена - убывание':
              echo $svg1;
              break;
            case 'Цена - возрастание':
              echo $svg2;
              break;
            case 'Название - Я-А':
              echo $svg1;
              break;
            case 'Название - А-Я':
              echo $svg2;
              break;
          }
        echo $q0;
      ?>
    </span>
  </li>
</ul>
<link rel="stylesheet" href="<?php echo $домен; ?>стили/каталог/панель_сортировки_и_фильтра.css">
