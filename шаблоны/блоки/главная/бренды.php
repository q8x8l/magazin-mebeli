<center class="бренды_в_главной">Производители</center>
<div>
  <p>
      <?php
          $q = scandir ('../бренды/');
          unset ($q[0], $q[1]);
          foreach ($q as $v) {
              if ($v == 'таблица') continue;
              echo '<a href="' . $домен . 'каталог.php?бренд=' . $v . '&страница=1"><img src="' . $домен . '../бренды/' . $v . '">' . $v . '</a>';
          }
      ?>
  </p>
</div>
<link rel="stylesheet" href="<?php echo $домен; ?>стили/главная/бренды.css">
