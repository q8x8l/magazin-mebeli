<div class="slider верхний_слайдер_главной">
    <div class="slider__wrapper">
        <div class="slider__items">
            <?php
                $q = scandir ($e = 'блоки/верхний_слайдер_главной/');
                unset ($q[0], $q[1]);
                foreach ($q as $w) {
                    $y = $e . $w;
                    echo '<div class="slider__item">';
                        echo '<img src="' . $домен . $y . '/к.jpg">';
                        echo '<div class="текст"';
                        if (file_exists ($y . '/правый_слайд')) {
                            echo ' style="right: 0;"';
                        }
                        echo '>';
                            $r = scandir ($y . '/текст');
                            unset ($r[0], $r[1]);
                            foreach ($r as $t) {
                                echo '<p class="' . $t . '">' . file_get_contents ($y . '/текст/' . $t) . '</p>';
                            }
                        echo '</div>';
                    echo '</div>';
                }
            ?>
        </div>
    </div>
    <a class="slider__control slider__control_prev" data-slide="prev"></a>
    <a class="slider__control slider__control_next" data-slide="next"></a>
</div>
<link rel="stylesheet" href="<?php echo $домен; ?>стили/simple-adaptive-slider.min.css">
<script src="<?php echo $домен; ?>скрипты/simple-adaptive-slider.min.js"></script>