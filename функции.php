<?php
  $m = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['SERVER_NAME'] . urldecode($_SERVER['REQUEST_URI']);
  foreach ($m = explode ('/', explode('?', $m)[0]) as $k => $v) if ($k != count($m) - 1) $домен .= $v . '/';

  foreach ($m as $k => $v) if ($v == 'шаблоны') $тайтл = trim ($m[$k + 1], '.php');
  foreach (explode (PHP_EOL, file_get_contents ('тайтлы')) as $v) if (($r = explode (':', $v))[0] == $тайтл) $тайтл = $r[1];

  function рекурсия_каталога ($target, $один_из_типов_главной, $путь, $бренд, $полное_дерево) {
    global $каталог;
    if (is_dir ($target)) {
      foreach (glob ($target . '*', GLOB_MARK) as $file) {
        if (str_contains($file, $путь . '/')) {
          if (glob ($атрибуты = $file . 'атрибуты')) {
            // Если элемент рекурсии есть в полном дереве
              if ($полное_дерево != '') {
                $папка = explode('/', $file);
                $папка = array_slice ($папка, 4, -2);
                $папка = implode('/', $папка);
                if (!in_array ($папка, $полное_дерево)) {
                  continue;
                }
              }
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
        рекурсия_каталога ($file, $один_из_типов_главной, $путь, $бренд, $полное_дерево);
      }
    }
  }

  function рекурсия_каталога_для_категорий ($target, $глубина) {
    global $каталог_для_меню;
    if (is_dir ($target)) {
      $массив_папок = glob ($target . '*', GLOB_MARK);
      foreach ($массив_папок as $k => $вложенная_папка) {
        if (!is_dir ($вложенная_папка)) continue;
        if (str_contains ($вложенная_папка, '/i/')) continue;
        $папка = explode ('товары/', trim($массив_папок[$k], '/'))[1];
        if ($глубина != '') if (count (explode ('/', $папка)) > $глубина + 1) continue;
        $каталог_для_меню [] = $папка;
        рекурсия_каталога_для_категорий ($вложенная_папка, $глубина, $путь);
      }
    }
  }
  function вывод_категорий ($каталог_для_меню, $клас, $путь) {
    // удалим из меню товары
      $m0 = [];
      sort ($каталог_для_меню);
      foreach ($каталог_для_меню as $key => $value) {
        $папка = explode('/', $value);
        $каталогk0c = count (explode('/', $value));
        $каталогk1c = count (explode('/', $каталог_для_меню[$key + 1]));
        if (
          ($каталогk0c == $каталогk1c)
            or
          ($каталогk0c >  $каталогk1c)
        ) {
          unset ($папка[count($папка) - 1]);
        }
        $папка = implode('/', $папка);
        if ($путь != '') if (!str_contains ($папка, $путь)) continue;
        $m0 [] = $папка;
      }
      $m1 = array_values (array_unique ($m0));
    //
    $mass = '';
    foreach ($m1 as $key => $value) {
      $count_value = count (explode ('/', $value));
      $m1k0c  = count (explode ('/', $value));
      $m1k1c  = count (explode ('/', $m1[$key + 1]));
      $value0 = explode ('/', $value);
      $slice  = array_slice ($value0, -1)[0];
      array_pop ($value0);
      switch ($клас) {
        case 'меню_шапки':
          if ($m1k0c < $m1k1c) {
            echo '<div>';
          }
          echo '<a href="' . $домен . 'каталог.php?путь=' . $value . '&страница=1">' . file_get_contents ('../товары/' . $value . '/svg') . $slice . '</a>';
          if ($m1k0c < $m1k1c) {
            echo '<div>';
          }
          if ($m1k0c > $m1k1c) {
            for ($i = 0; $i < ($m1k0c - $m1k1c); $i++) {
              echo '</div></div>';
            }
          }
          break;
        case 'категории_фильтра_каталога':
          if ($count_value == 1) continue;
          if ($m1k0c < $m1k1c) {
            $mass .= '{';
          }
          $mass .= '"' . $value . ':' . $slice . ':' . '"';
          if ($m1k0c == $m1k1c) {
            $mass .= ', ';
          }
          if ($m1k0c < $m1k1c) {
            $mass .= ': [';
          }
          if ($m1k0c > $m1k1c) {
            for ($i = 0; $i < ($m1k0c - $m1k1c); $i++) {
              if ($m1k1c != 0) {
                $mass .= ']}';
              }
            }
            if ($m1k1c != 0) {
              $mass .= ', ';
            }
          }
          break;
      }
    }
    if ($клас == 'категории_фильтра_каталога') {
      echo '<script> массив_для_категорий_фильтра = [' . substr ($mass, 0, -3) . '</script>';
    }
  }
?>
