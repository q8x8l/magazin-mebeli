<?php
    include 'блоки/шапка.php';
    echo '<p class="h1">Новости</p>';
    echo '<ul class="новости">';
    $w = scandir ($e = '../новости/');
    unset($w[0], $w[1]);
    foreach ($w as $v) {
        echo '<li>';
            echo '<p class="p1">';
                $r = explode (PHP_EOL, file_get_contents(glob ($e . $v . '/*')[1]));
                echo '<i>' . $r[0] . '</i> <i>' . $r[1] . '</i>';
            echo '</p>';
            echo '<a href="' . $домен . 'страницаНовости.php?новость=' . $v . '">' . file_get_contents(glob ($e . $v . '/*')[2]) . '</a>';
            echo '<img src="' . $домен . '../новости/' . $v . '/0">';
            echo explode (PHP_EOL, file_get_contents(glob ($e . $v . '/*')[3]))[0];
        echo '</li>';
    }
    echo '</ul>';
    include 'блоки/ноги.php';
?>
<link rel="stylesheet" href="<?php echo $домен; ?>стили/новости.css">
