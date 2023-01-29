<?php
  $svg0 = '
    <svg><use xlink:href="' . $домен . 'стили/svg/sprite5.svg#icon_shop_filter_plus"></use></svg>
    <svg><use xlink:href="' . $домен . 'стили/svg/sprite5.svg#icon_shop_filter_minus"></use></svg>
  ';
  $svg00 = '<svg><use xlink:href="' . $домен . 'стили/svg/sprite6.svg#icon_shop_sort_';
  $svg01 = '"></use></svg>';
  $svg1 = $svg00 . 'desc' . $svg01;
  $svg2 = $svg00 . 'asc' . $svg01;
  $k30 = 0;
  $k31 = 0;
  $k4 = 0;
  $vp = '<div class="toggleText"><p class="toggle">Все</p><p><span>Да</span><span>Нет</span><span>Все</span></p></div>';
  $m0 = [];
  $m1 = [];
  рекурсия_каталога ('../товары/', '', $путь = $_GET['путь'], $фильтр, '', '');
  foreach (explode ('^__^', $каталог) as $value) {
    if ($value == '') continue;
    $v = explode ('^_^', $value);
    if ($k3 = $_GET['бренд']) if ($k3 != $v[3]) continue;
    $m0[] = $v[3];
    $m1[] = $v[4];
    if (str_contains ($v[1], 'Новинка')) $k30++;
    if (str_contains ($v[1], 'Акция'))   $k31++;
    $k4++;
  }
  $каталог = [];
?>
<hr class="hr0">
<ul class="панель_сортировки_и_фильтра">
  <li>
    <i class="toggle">
      Фильтр
      <svg><use xlink:href="<?php echo $домен; ?>стили/svg/sprite4.svg#icon_shop_filter"></use></svg>
    </i>
    <form>
      <p class="toggle">
        Цена
        <?php echo $svg0; ?>
      </p>
      <div>
        <?php
          echo '<input class="keyup" type="text" placeholder="От: ' . min ($m1) . '">';
          echo '<input class="keyup" type="text" placeholder="До: ' . max ($m1) . '">';
        ?>
      </div>
      <?php
        if ($_GET['путь']) {
          echo '<p class="toggle">Бренд' . $svg0 . '</p>';
          echo '<div class="чекбоксы бренды">';
            foreach (array_values (array_unique ($m0)) as $key => $v)
              {
                echo '<p индекс="' . $key . '"><img src="' . $домен . '../бренды/' . $v . '" alt=" " />' . $v . '</p>';
              }
          echo '</div>';
        }
      ?>
      <p class="toggle">
        Новинка
        <?php echo $svg0; ?>
      </p>
      <div class="toggleText tT0">
        <?php
          echo '<p class="toggle">Все</p>';
          echo '<p>';
            echo '<span>Нет</span>';
            echo '<span>Да</span>';
            echo '<span>Все</span>';
          echo '</p>';
        ?>
      </div>
      <p class="toggle">
        Акция
        <?php echo $svg0; ?>
      </p>
      <div class="toggleText tT1">
        <?php
          echo '<p class="toggle">Все</p>';
          echo '<p>';
            echo '<span>Нет</span>';
            echo '<span>Да</span>';
            echo '<span>Все</span>';
          echo '</p>';
        ?>
      </div>
      <p class="toggle">
        Дерево категорий
        <?php echo $svg0; ?>
      </p>
      <div class="чекбоксы категории">
        <?php
          рекурсия_каталога_для_категорий ('../товары/');
          вывод_категорий                 ($каталог_для_меню, $клас = 'категории_фильтра_каталога', $_GET ['путь']);
        ?>
      </div>
      <button></button>
      <button>
        Сбросить фильтр
        <svg class="gr-svg-icon"><use xlink:href="#icon_shop_refresh"><symbol viewBox="0 0 30 30" id="icon_shop_refresh" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 6.5a8.5 8.5 0 00-7.43 12.634l.652-2.428a.75.75 0 111.449.388l-1.099 4.098a.75.75 0 01-.919.53l-4.097-1.098a.75.75 0 11.388-1.448l2.273.609A9.958 9.958 0 015 15C5 9.477 9.477 5 15 5c1.548 0 3.015.352 4.325.981a.75.75 0 01-.65 1.352A8.463 8.463 0 0015 6.5zm8.783 3.714l2.269.609a.75.75 0 00.388-1.45l-4.097-1.097a.75.75 0 00-.919.53l-1.098 4.098a.75.75 0 101.448.389l.652-2.432A8.5 8.5 0 0115 23.5c-1.318 0-2.564-.3-3.675-.833a.75.75 0 00-.65 1.352A9.965 9.965 0 0015 25c5.523 0 10-4.477 10-10a9.958 9.958 0 00-1.217-4.786z"></path></symbol></use></svg>
      </button>
    </form>
  </li>
  <li>
    <i class="toggle">
      Сортировка
      <svg><use xlink:href="<?php echo $домен; ?>стили/svg/sprite4.svg#icon_shop_sort"></use></svg>
    </i>
    <form>
      <?php
        $условия_сортировки = [
          [$svg1, 'Цена - убывание'],
          [$svg2, 'Цена - возрастание'],
          [$svg1, 'Название - Я-А'],
          [$svg2, 'Название - А-Я'],
        ];
        foreach ($условия_сортировки as $e) {
          echo '<i>' . $e[0] . $e[1] . '</i>';
        }
      ?>
    </form>
    <span>
      <?php
        switch ($q0 = $_GET['сортировка']) {
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
