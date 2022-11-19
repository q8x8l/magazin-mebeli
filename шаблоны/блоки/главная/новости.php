<center class="новости_в_главной">Это интересно</center>
<div>
  <ul>
    <?php
        $q = scandir ($w = '../новости/');
        unset ($q[0], $q[1]);
        foreach ($q as $k => $v) {
            if ($k > 5) continue;
            echo '<li>';
                echo '<img src="' . $домен . $w . $v . '/0">';
                echo '<p>' . file_get_contents ($w . $v . '/1') . '</p>';
                echo '<a href="">' . file_get_contents ($w . $v . '/2') . '</a>';
            echo '</li>';
        }
    ?>
  </ul>
</div>
<a href="<?php echo $домен; ?>новости.php">Читать все новости</a>
<link rel="stylesheet" href="<?php echo $домен; ?>стили/главная/новости.css">
