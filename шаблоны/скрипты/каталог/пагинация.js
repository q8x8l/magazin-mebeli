function взять_юрл () {
  url        = new URLSearchParams (window.location.search);
  путь       = url.get ('путь');
  Страница   = url.get ('страница');
  фильтр     = url.get ('фильтр');
  сортировка = url.get ('сортировка');
}
function пагинация (
  количество_элементов,
  Страница,
  путь,
  фильтр
) {
  $.get (домен + 'блоки/каталог/пагинация.php', {
    путь                 : путь                ,
    страница             : Страница            ,
    количество_элементов : количество_элементов,
    фильтр               : фильтр              ,
  }, (D) => {
    $('.паг').html (D);
  })
}
$('body').on ('click', '.Пагинация .p1', function () {
  console.log ('странная ошибка:');
  взять_юрл ();
  фильтр_в_запрос = [0, 0, 0, 0];
  статус_фильтра = 0;
  if (url.get ('фильтр') != null)
    {
      статус_фильтра = 1;
      фильтр_из_юрл = url.get ('фильтр').split (';');
        фильтр_в_запрос [0] = фильтр_из_юрл [0].slice (1, -1).split (',');
        фильтр_в_запрос [1] = фильтр_из_юрл [1].slice (1, -1).split (',');
        фильтр_в_запрос [2] = фильтр_из_юрл [2].slice (1, -1).split (',');
        фильтр_в_запрос [3] = фильтр_из_юрл [3].slice (1, -1).split (',');
    }
  i0 = '';
  i1 = '';
  if (фильтр != null)
    {
      i0 = '&фильтр=' + фильтр;
    }
  if (сортировка != null)
    {
      i1 = '&сортировка=' + сортировка;
    }
  if (путь)
    {
      w = 'путь=' + путь;
    }
  else if (Бренд)
    {
      w = 'бренд=' + Бренд;
    }
  history.pushState ('object or string', 'Title', домен + 'каталог.php?' + w + '&страница=' + ++Страница + i0 + i1);
  u = домен + 'блоки/каталог/'    ;
  e = u     + 'пагинация.php'     ;
  r = u     + 'лента_каталога.php';
  y = $(this).parent ().attr ('количество_страниц');
  if (путь) {
    пагинация (путь, Страница, y, фильтр);
    $.get (r, {
      путь       : путь,
      страница   : Страница,
      флаги      : фильтр_в_запрос [0],
      вилка_цен  : фильтр_в_запрос [1],
      бренды     : фильтр_в_запрос [2],
      дерево     : фильтр_в_запрос [3],
      // сортировка : url.get ('сортировка'),
      фильтр     : статус_фильтра,
    }, (ответ_от_сервера) => {
      функция_ленты_каталога   (ответ_от_сервера.split (';;')[0].split (', '), дозагрузка = 1);
      проверка_товаров_на_куки ();
      разряд                   ();
    })
  }
  if (url.get ('Бренд') != null) {
    $.get (e, {
      бренд              : Бренд   ,
      страница           : Страница,
      количество_страниц : y       ,
      фильтр             : фильтр  ,
    }, (D) => {
      q.html (D)
    })
    $.get (r, {
      аякс          : 1         ,
      фильтр        : фильтр    ,
      бренд         : Бренд     ,
      страница      : Страница  ,
      полное_дерево : дерево    ,
      сортировка    : сортировка,
    }, (D) => {
      t.append                 (D);
      проверка_товаров_на_куки ( );
      функция_ленты_каталога   ( );
      разряд                   ( );
    })
  }
})
