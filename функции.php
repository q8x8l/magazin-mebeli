<?php
  $m = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] . urldecode($_SERVER['REQUEST_URI']);
  foreach ($m = explode ('/', explode('?', $m)[0]) as $k => $v) if ($k != count($m) - 1) $домен .= $v . '/';

  foreach ($m as $k => $v) if ($v == 'шаблоны') $тайтл = trim ($m [$k + 1], '.php');
  foreach (explode (PHP_EOL, file_get_contents ('тайтлы')) as $v) if (($r = explode (':', $v))[0] == $тайтл) $тайтл = $r[1];

  function рекурсия_каталога ($target, $один_из_типов_главной, $путь, $бренд) {
    global $каталог;
    if (is_dir ($target)) {
      foreach (glob ($target . '*', GLOB_MARK) as $file) {
        if (str_contains($file, $путь . '/')) {
          if (glob ($атрибуты = $file . 'атрибуты')) {
            $f = explode (PHP_EOL, file_get_contents ($атрибуты));
            if ($f[0] != 'Отображать в выдаче') continue;
            if ($_GET['бренд'] == '') {
              $u = $бренд;
            } else {
              $u = $_GET['бренд'];
            }
            if (!str_contains ($f[1], $u)) continue;
            if ($один_из_типов_главной) if (!str_contains ($f[5], $один_из_типов_главной)) continue;
            $w1 = '';
            foreach ([5, 6, 1, 7] as $v) $w1 .= explode (':', $f[$v])[1] . '^_^';
            if (($l = explode (':', $f[3])[1]) != 0) {$w1 .= 'В наличии ' . $l;} else {$w1 .= 'Нет в наличии';}
            $каталог .= $file . '^_^' . $w1 . '^__^';
          }
        }
        рекурсия_каталога ($file, $один_из_типов_главной, $путь, $бренд);
      }
    }
  }

  function рекурсия_каталога_для_категорий ($target, $глубина = '') {
    global $каталог_для_меню;
    if (is_dir ($target)) {
      $массив_папок = glob ($target . '*', GLOB_MARK);
      foreach ($массив_папок as $k => $вложенная_папка) {
        if (!is_dir ($вложенная_папка)) continue;
        if (str_contains ($вложенная_папка, '/i/')) continue;
        $папка = explode ('товары/', trim($массив_папок[$k], '/'))[1];
        if ($глубина != '') if (count (explode ('/', $папка)) > $глубина + 1) continue;
        $каталог_для_меню [] = $папка;
        рекурсия_каталога_для_категорий ($вложенная_папка, $глубина);
      }
    }
  }
  function вывод_категорий ($каталог_для_меню, $клас, $путь, $внутренний_запрос = 0) {
    // удалим из меню товары
      $m0 = [];
      sort ($каталог_для_меню);
      foreach ($каталог_для_меню as $key => $value) {
        $папка = explode ('/', $value);
        $каталогk0c = count (explode ('/', $value));
        $каталогk1c = count (explode ('/', $каталог_для_меню [$key + 1]));
        if
          (
            ($каталогk0c == $каталогk1c)
              or
            ($каталогk0c >  $каталогk1c)
          )
            {
              unset ($папка [count ($папка) - 1]);
            }
        $папка = implode ('/', $папка);
        if ($путь != '') if (!str_contains ($папка, $путь)) continue;
        $m0 [] = $папка;
      }
      $m1 = array_values (array_unique ($m0));
    //
    // $массив_индексов = [];
    global $массив_для_внутреннего_запроса;
    foreach ($m1 as $key => $путь) {
      $длина_элемена       = count (explode ('/', $путь));
      $длина_элемена_след  = count (explode ('/', $m1 [$key + 1]));
      $последняя_папка     = array_slice (explode ('/', $путь), -1)[0];
      switch ($клас) {
        case 'меню_шапки':
          if ($длина_элемена < $длина_элемена_след) {
            echo '<div>';
          }
            echo '<a href="' . $домен . 'каталог.php?путь=' . $путь . '&страница=1">' . file_get_contents ('../товары/' . $путь . '/svg') . $последняя_папка . '</a>';
          if ($длина_элемена < $длина_элемена_след) {
            echo '<div>';
          }
          if ($длина_элемена > $длина_элемена_след) {
            for ($i = 0; $i < ($длина_элемена - $длина_элемена_след); $i++) {
              echo '</div></div>';
            }
          }
        break;
        case 'категории_фильтра_каталога':
          if ($внутренний_запрос == 0)
            {
              if ($длина_элемена == 1) continue;
              $метка = [0, $длина_элемена - 1];
                if ($длина_элемена <  $длина_элемена_след) $метка [0] = 1;
              $потомок = '';
              if ($метка [0] != 0)
                {
                  $потомок = ', ' . $метка [1] + 1;
                }
              echo '<p индекс="' . $key . '" метка="' . $метка [1] . $потомок . '" путь="' . $путь . '/">';
                echo $последняя_папка;
                // echo '<a href="' . $домен . 'каталог.php?путь=' . $путь . '&страница=1">>></a>';
              echo '</p>';
            }
          if ($внутренний_запрос == 1)
            {
              $массив_для_внутреннего_запроса [] = $путь;
            }
        break;
      }
    }
  }
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
?>
