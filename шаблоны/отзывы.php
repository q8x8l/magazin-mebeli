<?php include 'блоки/шапка.php'; ?>
<h1 class="лента_отзывов">Отзывы о нас</h1>
<ul>
  <?php
    $q = scandir ($w = '../отзывы/');
    unset ($q[0], $q[1]);
    foreach ($q as $v) {
      echo '<li>';
        echo '<p>' . file_get_contents ($w . $v . '/0') . '</p>';
        echo '<p>' . file_get_contents ($w . $v . '/1') . '</p>';
      echo '</li>';
    }
  ?>
</ul>
<link rel="stylesheet" href="<?php echo $домен; ?>стили/отзывы.css">
<?php include 'блоки/ноги.php'; ?>
