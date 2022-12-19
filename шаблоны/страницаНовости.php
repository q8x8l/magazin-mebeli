<?php
    include 'блоки/шапка.php';
    $w = scandir ($e = '../новости/');
    $r = $e . $_GET['новость'];
    echo '<p class="h1">' . file_get_contents (glob($r . '/*')[2]) . '</p>';
    echo '<div class="новость">';
        $p1 = explode(PHP_EOL, file_get_contents (glob($r . '/*')[1]));
        echo '<p class="p1">Дата публикации: ' . $p1[0] . ' ' . $p1[1] . '</p>';
        echo '<img src="' . $r . '/0">';
        echo file_get_contents (glob($r . '/*')[3]);
    echo '</div>';
    include 'блоки/ноги.php';
?>
<link rel="stylesheet" href="<?php echo $домен; ?>стили/новости.css">
