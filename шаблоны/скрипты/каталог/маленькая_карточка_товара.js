$('body').on('click', '.лента_каталога .кнопка_показать_окно', function ()
  {
      q = $(this).parent ();
      q.addClass ('выделенный_товар');
      w = $('.окно_3 > div');
      p0 = w.find ('p').eq (0);
      p1 = w.find ('p').eq (1);
      if (q.prev ().attr ('путь'))
        {
          p0.css ('display', 'block');
        }
      else
        {
          p0.css ('display', 'none');
        }
      if (q.next ().attr ('путь'))
        {
          p1.css ('display', 'block');
        }
      else
        {
          p1.css ('display', 'none');
        }
      аякс_на_привью_товара_в_каталоге (q.attr('путь'));
      if (q.index () == $('.лента_каталога > *').length - 1)
        {
          p1.css('display', 'none');
        }
      if (q.index () == 0)
        {
          p0.css('display', 'none');
        }
  }
);
$('body').on('click', '.щет_и_кнопка_корзины [type=button]', function ()
  {
    q = $(this)
    if (q.index() == 0) {
      w = q.next().attr('value')
      if (--w != 0) q.next().attr('value', w)
      if (w == 1) q.attr('дизаблед', 1)
    }
    if (q.index() == 2) {
      q.prev().prev().attr('дизаблед', 0)
      w = q.prev().attr('value')
      q.prev().attr('value', ++w)
    }
  }
);
$('body').on('click', '.квадраты_цвета a', function () {аякс_на_привью_товара_в_каталоге ($(this).attr('путь'))})
function аякс_на_привью_товара_в_каталоге (путь) {
  $.get(домен + 'блоки/каталог/маленькая_привью_товара_в_каталоге.php', {
    путь: путь
  }, (D) => {
    $('.окно_3 > div > div').html(D)
    проверка_товара_на_куки (путь)
    о = $('.окно_3')
    щ = о.find('.цена_новая')
    г = +щ.find('*').text()
    к = 0
    if ((с = о.find('.скидка')).length > 0) {
      с = +с.text().slice(1, -1)
      к = г / 100 * с
      щ.after('<p class="цена_старая"><span class="разряд">' + г + '</span> р.</p>')
    }
    щ.find('*').text(г - к)
    разряд ()
  })
}
z = 'выделенный_товар'
$('body').on ('click', '.окно_3 .лево,.окно_3 .право', function ()
  {
    e = $(this)
    q = $('.' + z).removeClass(z)
    if (e.hasClass('лево')) {
      q = q.prev('li').addClass(z)
      if (q.index() == 0) {e.css('display', 'none')}
      e.next().css('display', 'block')
    } else {
      q = q.next().addClass(z)
      if (q.index() == q.parent().children().length - 1) {e.css('display', 'none')}
      e.prev().css('display', 'block')
    }
    аякс_на_привью_товара_в_каталоге (q.attr('путь'))
  }
)
$('body').on ('click', '.маленькие_картинки > :eq(0),.маленькие_картинки > :last-child', function () {
  q = $(this).parent()
  w = q.find('.видимый')
  if ($(this).index() == 0) {
    t = w.last()
    r = w.first().index() - 1;
  } else {
    t = w.first()
    r = w.last().index() + 1
  }
  y = q.find('li')
  if ((y.eq(r).index() != 0) & (y.length - 1 != r)) {
    t.removeClass('видимый')
    y.eq(r).addClass('видимый')
    if (y.eq(1).hasClass('видимый')) {u = 1} else {u = 0}
    y.eq(0).attr('дизаблед', u)
    if (y.length - 2 == r) {u = 1} else {u = 0}
    y.last().attr('дизаблед', u)
  }
})
$('body').on ('click', '.маленькие_картинки img', function ()
  {
    (q = $(this).parent()).parent().find('li').each(function()
      {
        $(this).removeClass('a')
      }
    );
    q.addClass ('a')
    q.parent ().prev ().children ().attr ('src', $(this).attr('src'));
  }
);
console.log
  (
    `
    файл (маленькая_карточка_товара.js)
      - проапать отображение товара;
      - клавиша Esc закрывает окно всплывающее;
    `
  );
