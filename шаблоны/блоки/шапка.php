<?php include '../функции.php'; ?>
<!DOCTYPE html>
<html lang="ru">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo $тайтл; ?></title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<?php include 'скрипты/скрипт.js.php'; ?>
<body>
<bd>
<header>
    <li class="блок_1">
      <div>
        <ul>
            <li>
                <a>О компании</a>
                <p>
                    <a href="<?php echo $домен; ?>отзывы.php">Отзывы</a>
                    <a href="#">Новости</a>
                </p>
            </li>
            <li><a href="#">Оплата</a></li>
            <li><a href="#">Доставка</a></li>
            <li><a href="#">Акции</a></li>
            <li><a href="#">Контакты</a></li>
        </ul>
        <div class="d1">
            <p>
              <svg><use xlink:href="<?php echo $домен; ?>/стили/svg/sprite1.svg#icon_shop_compare"></use></svg>
              <span>Сравнение</span>
            </p>
            <p class="щет V_sravnenii">0</p>
            <p>
              <svg><use xlink:href="<?php echo $домен; ?>/стили/svg/sprite1.svg#icon_shop_favorite"></use></svg>
              <span>Избранное</span>
            </p>
            <p class="щет V_izbrannom">0</p>
            <p href="окно_4" class="кнопка_показать_окно показать_окно_4">
              <svg><use xlink:href="<?php echo $домен; ?>/стили/svg/sprite1.svg#icon_shop_cart"></use></svg>
              <span>Корзина</span>
            </p>
            <p class="щет V_korzine">0</p>
            <p>
              <svg><use xlink:href="<?php echo $домен; ?>/стили/svg/sprite1.svg#icon_shop_cabinet"></use></svg>
              <span>Кабинет</span>
            </p>
          </div>
        </div>
    </li>
    <li class="блок_2">
      <p class="логотип_и_описание">
        <?php
          if ($тайтл == 'Главная') {echo '<i>Название компании</i>';} else {echo '<a href="' . $домен . 'главная.php">Название компании</a>';}
        ?><br>
        Магазин мебели
      </p>
      <div class="адрес">
        <p>г. Санкт-Петербург</p>
        <p>Ленинский проспект, дом, строение</p>
      </div>
      <div class="звонки">
        <p>Бесплатно по России</p>
        <a href="#">
          <img src="<?php echo $домен; ?>стили/картинки/Telegram–dark.svg" width="28">
        </a>
        <a href="tel:8 (000) 111-11-11">8 (000) 111-11-11</a>
        <span href="окно_1" class="кнопка_показать_окно">
          <svg><use xlink:href="#icon_site_bottom_mini"><symbol viewBox="20" id="icon_site_bottom_mini" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.47 8.47a.75.75 0 011.06 0L10 11.94l3.47-3.47a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"></path></symbol></use></svg>
        </span>
      </div>
      <a href="окно_2" class="кнопка_обратный_звонок кнопка_показать_окно">Обратный звонок</a>
    </div>
    <li class="блок_3">
      <div>
        <div class="меню">
          <?php
            рекурсия_каталога_для_категорий ('../товары/', $глубина = 2);
            вывод_категорий ($каталог_для_меню, $клас = 'меню_шапки', $путь = '');
          ?>
        </div>
        <a href="#" class="кнопка">
          <svg><use xlink:href="#icon_shop_search"><symbol viewBox="30" id="icon_shop_search" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M14.334 5.5a8.834 8.834 0 100 17.669 8.834 8.834 0 000-17.669zM4 14.334C4 8.627 8.627 4 14.334 4 20.042 4 24.67 8.627 24.67 14.334c0 2.61-.967 4.992-2.562 6.811l3.666 3.57a.75.75 0 01-1.047 1.074l-3.687-3.59a10.293 10.293 0 01-6.705 2.47C8.627 24.669 4 20.042 4 14.334zm9.495-5.12a.75.75 0 01-.475.948 4.527 4.527 0 00-2.858 2.858.75.75 0 01-1.423-.473 6.027 6.027 0 013.808-3.808.75.75 0 01.948.475z"></path></symbol></use></svg>
          Найти товар
        </a>
      </div>
    </li>
</header>
