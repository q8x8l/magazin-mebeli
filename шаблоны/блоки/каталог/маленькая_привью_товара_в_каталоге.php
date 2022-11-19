<?php
  $w = $_GET['путь'];
  $w0 = explode('/', $w);
  $r0 = '../../../';
  include $r0 . 'функции.php';
  $r1 = 'товары' . $w;
  $r = $r0 . $r1 . '/*';
  $f = explode (PHP_EOL, file_get_contents ($r0 . $r1 . '/атрибуты'));
  echo '<p class="p1">' . explode (':', $f[6])[1] . '</p>';
  foreach (glob ($r . 'i/i*') as $v) $a [] = $v;
  if (count ($a) > 4) $u = ' class="видим"';
?>
<ul class="привью_товара" путь="<?php echo $w; ?>">
  <li>
    <p class="сдвиг_картинки"><img src="<?php echo $домен . $a[0]; ?>"></p>
    <ul class="маленькие_картинки">
      <?php
        echo '<li' . $u . ' дизаблед="1"></li>';
        foreach ($a as $k => $v) {
          if ($k == 0) {
            $y = ' class="видимый a"';
          } else if (($k > 0) & ($k < 4)) {
            $y = ' class="видимый"';
          } else {
            $y = '';
          }
          echo '<li' . $y . '><img src="' . $домен . $v . '"></li>';
        }
        echo '<li' . $u . '></li>';
      ?>
    </ul>
    <div class="флаги">
      <?php
        foreach (explode (';', explode (':', $f[5])[1]) as $v) {
          if ($v == 'Новинка') echo '<p class="новинка">Новинка</p>';
          if ($v == 'Акция')   echo '<p class="акция">Акция</p>';
          if (str_contains ($v, 'Скидка')) echo '<p class="скидка">-' . explode ('Скидка.', $v)[1] . '%</p>';
        }
      ?>
    </div>
  </li>
  <li>
    <p class="p1">Артикул:
      <?php
        echo $w1 = $w0 [count($w0) - 2];
      ?>
    </p>
    <p class="звезды"><span style="width: 0; "></span></p>
    <p class="p2">
      <?php
        echo '<a href="' . trim ($домен, 'блоки/каталог/') . '/каталог.php?бренд=' . ($y = explode (':', $f[1])[1]) . '&страница=1">' . $y . '</a>';
      ?>
    </p>
    <table width="100%">
      <?php
        $d = explode (':', $f[4])[1];
        if ($d != '') {
          echo '<tr>';
            echo '<td>Цвет</td>';
            echo '<td class="квадраты_цвета">';
              foreach (explode(';', $d) as $v) {
                $s = explode('-', explode (':', explode (PHP_EOL, file_get_contents ($r0 . ($путь = str_replace ('/' . $w1, '', $r1) . $v) . '/атрибуты'))[2])[1]);
                echo '<p';
                  if (str_contains ($w, $v)) echo ' class="a"';
                echo '>';
                  echo '<span>' . $s[1] . '</span>';
                  $путь = str_replace ('товары', '', $путь);
                  echo '<a href="#" style="background: ' . $s[0] . ';" путь="' . $путь . '/"></a>';
                echo '</p>';
              }
            echo '</td>';
          echo '</tr>';
        }
        foreach (explode(';', file_get_contents (glob ($r . 'таблица')[0])) as $v) {
          if ($v == '') {continue;}
          echo '<tr>';
            foreach (explode(':', $v) as $k => $g) {
              $i = '';
              if ($k == 1) $i = ' class="определения"';
              echo '<td' . $i . '>' . $g . '</td>';
            }
          echo '</tr>';
        }
      ?>
    </table>
    <div class="цена_и_наличие">
      <?php
        echo '<p class="цена_исходник">' . ($f71 = explode (':', $f[7])[1]) . '</p>';
        echo '<p class="цена_новая"><span class="разряд">' . $f71 . '</span> р. / шт.</p>';
        if (($o = explode (':', $f[3])[1]) != 0) {
          echo '<p class="наличие">В наличии ' . $o . '</p>';
      ?>
    </div>
    <div class="щет_и_кнопка_корзины">
      <form>
        <input type="button" value="-" дизаблед="1">
        <input type="text" value="1" onkeypress="banText (event);">
        <input type="button" value="+">
      </form>
      <p onClick="кука(this)" c="V_korzine">
        В корзину
        <svg><use xlink:href="#icon_shop_cart_add"><symbol viewBox="30" id="icon_shop_cart_add" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.018 4.587a.75.75 0 01.895-.569l1.992.443c.45.1.796.458.88.91l.494 2.63h16.934a2.75 2.75 0 012.674 3.39L23.94 19.51A3.25 3.25 0 0120.78 22H10.075a3.25 3.25 0 01-3.194-2.65L4.354 5.874l-1.767-.393a.75.75 0 01-.57-.895zM6.56 9.5l1.795 9.573a1.75 1.75 0 001.72 1.427h10.704a1.75 1.75 0 001.702-1.341l1.948-8.117A1.25 1.25 0 0023.213 9.5H6.56zM9.5 24a1.5 1.5 0 10.001 3 1.5 1.5 0 00-.001-3zM21 24a1.501 1.501 0 10.002 3.002A1.501 1.501 0 0021 24zm-2-12.25a.75.75 0 100 1.5h2.5a.75.75 0 100-1.5H19z"></path></symbol></use></svg>
      </p>
    </div>
    <?php
      } else {echo '<p class="наличие">Нет в наличии</p></div>';}
    ?>
    <a href="#" class="подробней_о_товаре">Подробней о товаре</a>
    <div class="кнопки_к_сравнение_и_в_избранное" артикул="<?php echo $w; ?>">
      <p c="V_sravnenii" onClick="кука(this)">
        <svg><use xlink:href="<?php echo $домен; ?>../../стили/svg/sprite2.svg#icon_shop_compare_add"></use></svg>
        <svg><use xlink:href="<?php echo $домен; ?>../../стили/svg/sprite2.svg#icon_shop_compare_added"></use></svg>
        <span>К сравнению</span>
        <span>В сравнении</span>
      </p>
      <p c="V_izbrannom" onClick="кука(this)">
        <svg><use xlink:href="<?php echo $домен; ?>../../стили/svg/sprite2.svg#icon_shop_favorite_add"></use></svg>
        <svg><use xlink:href="<?php echo $домен; ?>../../стили/svg/sprite2.svg#icon_shop_favorite_added"></use></svg>
        <span>В избранное</span>
        <span>В избранном</span>
      </p>
    </div>
  </li>
<ul>
