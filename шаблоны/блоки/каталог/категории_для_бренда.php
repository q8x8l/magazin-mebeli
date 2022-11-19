<div class="категории_с_этим_брендом">
  <p>Категории с этим брендом:</p>
  <?php
    $q0 = scandir ($e0 = '../товары/');
    unset ($q0[0], $q0[1]);
    $m0 = [];
    foreach ($q0 as $v0) {
      $q1 = scandir ($e1 = $e0 . '/' . $v0);
      unset ($q1[0], $q1[1], $q1[2]);
      foreach ($q1 as $v1) {
        $q2 = scandir ($e2 = $e1 . '/' . $v1);
        unset ($q2[0], $q2[1]);
        foreach ($q2 as $v2) {
          $q3 = scandir ($e3 = $e2 . '/' . $v2);
          foreach ($q3 as $v3) {
            $t = explode (PHP_EOL, file_get_contents ($e3 . '/' . $v3 . '/атрибуты'));
            if ($t[0] == 'Не отображать в выдаче') continue;
            if (explode (':', $t[1])[1] == $_GET['бренд']) {
              $m0[] = $v0 . ':' . $v1;
            }
          }
        }
      }
    }
    $m1 = [];
    foreach ($m0 as $v0) {
      $m1 [] = explode(':', $v0)[0];
      $m2 [] = $v0;
    }
    foreach (array_unique($m1) as $v1) {
      echo '<a href="' . $домен . 'каталог.php?категория=' . $v1 . '&подкатегория=Все&страница=1">' . $v1 . '</a><br>';
      echo '<span>';
        foreach (array_unique($m2) as $v2) {
          $v0 = explode(':', $v2);
          if ($v0[0] == $v1) echo '<a href="' . $домен . 'каталог.php?категория=' . $v1 . '&подкатегория=' . $v0[1] . '&страница=1">' . $v0[1] . '</a>';
        }
      echo '</span>';
    }
  ?>
</div>
<style>
  .категории_с_этим_брендом {
    max-width: var(--max-width);
    margin: 25px auto;
  }
  .категории_с_этим_брендом p {
    font-size: 22px;
    margin: 0 0 10px;
  }
  .категории_с_этим_брендом span {
    margin: 0 0 0 10px;
    display: block;
  }
  .категории_с_этим_брендом a {
    font-size: 14px;
    padding: 5px 10px;
    border: 1px solid #e0e0e0;
    color: #acacac;
    display: inline-flex;
    margin: 5px;
    border-radius: 5px;
  }
</style>
