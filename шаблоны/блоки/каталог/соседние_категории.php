<p class="соседние_категории">
  <?php
    $путь00 = explode ('/', trim($_GET['путь'], '/'));
    $путь0 = $путь00;
    $п0c = count($путь0);
    unset($путь0[$п0c - 1]);
    $q = scandir ('../товары/' . implode ('/', $путь0));
    unset ($q[0], $q[1]);
    foreach ($q as $k => $v) {
      if (($v != $путь00[$п0c - 1]) or ($v == 'svg')) continue;
      $so1 = $q[$k - 1];
      $so2 = $q[$k + 1];
    }
    if (($s00 = $путь00[$п0c - 2]) != '') $s00 .= '/';
    if (($so1 != 'svg') and ($so1 != '')) echo '<a href="' . $домен . 'каталог.php?путь=' . $s00 . $so1 . '&страница=1" style="float: left;">< ' . $so1 .   '</a>';
    if ($so2 != '')                       echo '<a href="' . $домен . 'каталог.php?путь=' . $s00 . $so2 . '&страница=1" style="float: right;">'  . $so2 . ' ></a>';
  ?>
</p>
<style>
  .соседние_категории {
    font-size: 16px;
    max-width: var(--max-width);
    overflow: hidden;
    padding: 0 20px;
    margin: 20px auto;
  }
  .соседние_категории * {
    padding: 5px 10px;
    color: #000;
    border-radius: 5px;
    border: 1px solid;
    transition: all .3s;
  }
  .соседние_категории :hover {
    color: #a5cccc;
  }
</style>
