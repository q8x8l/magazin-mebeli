<script>
  $(() => {
    домен = '<?php echo $домен; ?>'
    <?php
      $q = ['шапка/', 'каталог/'];
      foreach (
        [
          'куки.js',
          $q[0] . 'адаптив.js',
          $q[0] . 'блок_маленькой_корзины.js',
          $q[1] . 'лента_каталога.js',
          $q[1] . 'нулевой_тест_фильтра.js',
          $q[1] . 'сортировка.js',
          $q[1] . 'маленькая_карточка_товара.js',
          $q[1] . 'пагинация.js',
        ]
      as $v) {
        include 'скрипты/' . $v;
      }
    ?>
    разряд ()
    $('body').on('click', '.подписка input:nth-child(2)', function() {
      $.get(домен + 'блоки/подписка_отправить_подписчика_на_почту.php', {email: $(this).prev().val()}, () => {$(this).parent().parent().parent().html('<center>Спасибо</center>')})
    })
    function разряд () {
      function numberWithSpaces(x) {
        p = x.toString().split(".");
        p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return p.join(".");
      }
      $('.разряд').each(function(){
        $(this).text(numberWithSpaces($(this).text()))
      })
    }
    $(document).click(function (e) {
      if (!$(e.target).closest(".панель_сортировки_и_фильтра form,.панель_сортировки_и_фильтра i").length) {
        $(".панель_сортировки_и_фильтра i,.панель_сортировки_и_фильтра").removeClass('a')
        $(".панель_сортировки_и_фильтра .toggleText").each(function() {
          $(this).children().eq(0).removeClass('a')
        })
      }
    })
    $('body').on ('click', панель + '.toggle,' + панель + '.чекбоксы > *', function () {
      $(this).toggleClass ('a');
    })
  })
</script>
