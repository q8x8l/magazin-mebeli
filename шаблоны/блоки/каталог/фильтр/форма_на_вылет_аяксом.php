<?php
  $svg0 = '
    <svg><use xlink:href="' . $домен . 'стили/svg/sprite5.svg#icon_shop_filter_plus"></use></svg>
    <svg><use xlink:href="' . $домен . 'стили/svg/sprite5.svg#icon_shop_filter_minus"></use></svg>
  ';
  $селект = "<div class='toggleText tT0'><p class='toggle'>Все</p><p><span>Нет</span><span>Да</span><span>Все</span></p></div>";
?>
<form>
  <p class="toggle">
    Цены
    <?php echo $svg0; ?>
  </p>
  <div>
    <?php
      echo "<input class='keyup' type='text'>";
      echo "<input class='keyup' type='text'>";
    ?>
  </div>
  <?php
    if ($_GET ['путь']) {
      echo "<p class='toggle бренды'>Бренды${svg0}</p>";
      echo "<div class='чекбоксы бренды'></div>";
    }
  ?>
  <p class="toggle">
    Новинка
    <?php echo $svg0; ?>
  </p>
  <?php echo $селект; ?>
  <p class="toggle">
    Акция
    <?php echo $svg0; ?>
  </p>
  <?php echo $селект; ?>
  <p class="toggle дерево">
    Дерево категорий
    <?php echo $svg0; ?>
  </p>
  <div class="чекбоксы дерево"></div>
  <button></button>
  <button>
    Сбросить фильтр
    <svg class="gr-svg-icon"><use xlink:href="#icon_shop_refresh"><symbol viewBox="0 0 30 30" id="icon_shop_refresh" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 6.5a8.5 8.5 0 00-7.43 12.634l.652-2.428a.75.75 0 111.449.388l-1.099 4.098a.75.75 0 01-.919.53l-4.097-1.098a.75.75 0 11.388-1.448l2.273.609A9.958 9.958 0 015 15C5 9.477 9.477 5 15 5c1.548 0 3.015.352 4.325.981a.75.75 0 01-.65 1.352A8.463 8.463 0 0015 6.5zm8.783 3.714l2.269.609a.75.75 0 00.388-1.45l-4.097-1.097a.75.75 0 00-.919.53l-1.098 4.098a.75.75 0 101.448.389l.652-2.432A8.5 8.5 0 0115 23.5c-1.318 0-2.564-.3-3.675-.833a.75.75 0 00-.65 1.352A9.965 9.965 0 0015 25c5.523 0 10-4.477 10-10a9.958 9.958 0 00-1.217-4.786z"></path></symbol></use></svg>
  </button>
</form>