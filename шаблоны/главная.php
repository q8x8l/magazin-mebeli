﻿<?php
    include 'блоки/шапка.php';
    include 'блоки/главная/верхний_слайдер.php';
    echo '<h2>' . ($один_из_типов_главной = 'Лучшее предложение') . '</h2>';
    echo '<h3>Широкий ассортимент мебели</h3>';
    echo '<slick></slick>';
    echo '<ul class="лента_каталога"></ul>';
    echo '<h2>' . ($один_из_типов_главной = 'Новинка') . '</h2>';
    echo '<h3>Широкий ассортимент мебели</h3>';
    echo '<slick></slick>';
    echo '<ul class="лента_каталога"></ul>';
?>
<!-- Товар недели -->
  <div class="товар_недели">
    <ul>
        <li>
            <p class="p1">
                <svg class="gr-svg-icon"><use xlink:href="#icon_site_crown"><symbol viewBox="0 0 30 30" id="icon_site_crown" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.03 7.857a15.026 15.026 0 01-1.147 2.333c-.793 1.285-1.99 2.629-3.655 2.757-1.159.089-2.293-.44-3.2-1.038a11.15 11.15 0 01-.836-.612l2.173 7.07a1.25 1.25 0 001.195.883h10.95a1.25 1.25 0 001.197-.891l2.122-7.078c-.269.217-.555.43-.853.628-.91.602-2.05 1.134-3.214 1.037-1.656-.137-2.836-1.483-3.614-2.766a14.89 14.89 0 01-1.118-2.323zm.01-2.53c.322.002.788.178.941.685.258.852.741 2.222 1.45 3.39.734 1.212 1.57 1.976 2.455 2.05.657.054 1.443-.252 2.262-.794.8-.529 1.522-1.21 2.019-1.73.377-.395.89-.33 1.184-.165.295.166.624.58.464 1.116l-2.67 8.91a2.75 2.75 0 01-2.635 1.961H9.56a2.75 2.75 0 01-2.628-1.942l-2.74-8.912c-.165-.537.164-.954.459-1.121.293-.167.806-.235 1.186.16.5.52 1.22 1.196 2.017 1.722.817.539 1.602.845 2.259.794.896-.069 1.745-.835 2.494-2.049.723-1.17 1.221-2.545 1.488-3.398.158-.505.624-.678.946-.676zM8 23.25a.75.75 0 01.75-.75h12.5a.75.75 0 010 1.5H8.75a.75.75 0 01-.75-.75z"></path></symbol></use></svg>
                Товар недели
            </p>
            <p class="p2">Успейте купить с выгодой!</p>
            <p class="p3">При заказе кровати Элен скидка 35%!</p>
            <p class="p4"><i>8 421</i><i>руб.</i><i>12 955</i><i>руб.</i></p>
            <p class="p5"><a href="">Заказать сейчас.</a></p>
        </li>
        <img src="<?php echo $домен; ?>стили/картинки/i0">
    </ul>
  </div>
  <link rel="stylesheet" href="<?php echo $домен; ?>стили/главная/товар_недели.css">
<!-- Товар недели -->
<?php
    include 'блоки/главная/подписка.php';
    include 'блоки/главная/отзывы.php';
    include 'блоки/главная/бренды.php';
    include 'блоки/главная/новости.php';
?>
<script type="text/javascript" src="<?php echo $домен; ?>скрипты/slick.min.js"></script>
<link rel="stylesheet" href="<?php echo $домен; ?>стили/slick-theme.css">
<?php include 'блоки/ноги.php'; ?>
