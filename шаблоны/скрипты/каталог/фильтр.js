if ($(панель = '.панель_сортировки_и_фильтра ').length == 1) {
  локальный_путь_к_файлу = 'блоки/каталог/';
  // Инициализация фильтра
    url = new URLSearchParams (window.location.search);
    if ((фильтр = url.get ('фильтр')) != null)
      {
        фильтр = фильтр.split (';');
          флаги = фильтр [0].slice (1, -1).split (',')
            $('.панель_сортировки_и_фильтра .toggleText.tT0 > p:nth-child(1)').text (флаги [0]);
            $('.панель_сортировки_и_фильтра .toggleText.tT1 > p:nth-child(1)').text (флаги [1]);
          $(панель + '.чекбоксы *').addClass ('a');
          фильтр[2].slice (1, -1).split (',').forEach ((индекс) => {
            $(панель + '.чекбоксы:eq(0) *').eq (индекс).removeClass ('a');
          })
          фильтр[3].slice (1, -1).split (',').forEach ((индекс) => {
            $(панель + '.чекбоксы:eq(1) *').eq (индекс).removeClass ('a');
          })
      }
  // Конец инициализации фильтра
  function возьмем_массив_из_чекеров () {
    // Сделаем автоматический массив по заданному запросу
      массив_для_запроса = ['бренды', 'категории'];
      массив = [];
      массив_для_запроса.forEach ((запрос) => {
        массив [запрос] = [];
        $(панель + '.чекбоксы.' + запрос + ' *:not(.a').each (function () {
          if ($(this).attr ('путь') != undefined) {
            массив [запрос].push ($(this).attr ('путь').slice (0, -1));
          } else {
            массив [запрос].push ($(this).text ());
          }
        })
      })
    // К массиву категорий применим функцию удаление корней
      function удалим_корни (обрабатываемый_массив) {
        обрабатываемый_массив.forEach((item, i) => {
          if ((следующий = обрабатываемый_массив [i + 1]) != undefined) {
            if (item.split ('/').length < следующий.split ('/').length) {
              delete массив ['категории'][i];
            }
          }
        })
      }
      удалим_корни (массив ['категории']);
      массив ['категории'] = массив ['категории'].filter (() => true);
    теги_брендов   = $(панель + '.чекбоксы:eq(0) *');
    теги_категорий = $(панель + '.чекбоксы:eq(1) *');
  }
  function аякс_в_ленту_каталога (страница = 1) {
    url = new URLSearchParams (window.location.search);
    возьмем_массив_из_чекеров ();
    $.get (домен + локальный_путь_к_файлу + 'лента_каталога.php', {
      страница:   url.get ('страница'  ),
      путь:       url.get ('путь'      ),
      фильтр:     url.get ('фильтр'    ),
      дерево:     массив  ['категории' ],
      бренды:     массив  ['бренды'    ],
      сортировка: url.get ('сортировка'),
    }, (D) => {
      функция_ленты_каталога (D.split (';;') [0].slice (0, -2).split (', '), дозагрузка = 0);
      поставим_блок_пагинации
        (
          количество_элементов = D.split (';;') [1]  ,
          страница             = url.get ('страница'),
          путь                 = url.get ('путь'    ),
          фильтр               = url.get ('фильтр'  ),
        );
      щет (0);
    })
  }
  // Запрограммируем на вывод в главной
  аякс_в_ленту_каталога ();
  function установим_параметры_фильтра () {
    url    = new URLSearchParams (window.location.search);
    панель = '.панель_сортировки_и_фильтра ';
    путь   = url.get('путь');
    флаги  = [$(панель + '.tT0 p').eq(0).text(), $(панель + '.tT1 p').eq(0).text()];
    inp0   =  $(панель + '.keyup').eq(0);
    inp1   =  $(панель + '.keyup').eq(1);
      if ((iv0 = inp0.val ()) == '') {inp0v = inp0.attr ('placeholder').substring (4)} else {inp0v = iv0};
      if ((iv1 = inp1.val ()) == '') {inp1v = inp1.attr ('placeholder').substring (4)} else {inp1v = iv1};
    вилка_цен = [inp0v, inp1v];
    бренд     = url.get ('бренд');
    if (бренд == null) {
      путь0  = 'путь=' + путь;
      бренд1 = '';
    } else {
      путь0 = 'бренд=' + бренд;
    }
    фильтр = '[' + флаги[0] + ',' + флаги[1] + ']' + ';' + вилка_цен[0] + ',' + вилка_цен[1] + ';' + массив ['бренды'];
    if ((сортировка = url.get('сортировка')) != null) {
      сортировка = '&сортировка=' + сортировка;
    } else {
      сортировка = '';
    }
  }
  установим_параметры_фильтра ();
  function щет (аякс = 0) {
    $.get (домен + локальный_путь_к_файлу + 'фильтр/щет.php', {
      путь      : путь                ,
      вилка_цен : вилка_цен           ,
      бренды    : массив ['бренды']   ,
      флаги     : флаги               ,
      дерево    : массив ['категории'],
    }, (D) => {
      d0 = D.split(',');
      $(панель + 'button:eq(0)').attr ('class', 'дефолт').html ('Показано <i>' + d0[0] + '</i> из <i>' + d0[1] + '</i>');
      x4 = Math.ceil ((+$(панель + 'button:eq(0)').children().eq (0).text ()) / 8);
      url    = new URLSearchParams (window.location.search);
      $.get (домен + локальный_путь_к_файлу + 'пагинация.php', {
        путь               : путь                ,
        страница           : url.get ('страница'),
        количество_страниц : x4                  ,
        бренд              : url.get ('бренд')   ,
      }, (D) => {
        $('.Пагинация a').each (function ()
          {
            фильтр = '';
            if (url.get ('фильтр'))
              {
                фильтр += 'фильтр=' + url.get ('фильтр');
              }
            сортировка = '';
            if (url.get ('сортировка'));
              {
                сортировка += '&сортировка=' + url.get ('сортировка')
              }
            $(this).attr ('href', $(this).attr ('href') + '&' + фильтр + сортировка);
          }
        );
      });
    });
  }
  $('body').on('click', панель + '.toggle,' + панель + '.чекбоксы *', function () {
    $(this).toggleClass ('a');
  })
  $('body').on('keyup', панель + '.keyup', function (event) {
    event = event || window.event;
    if (this.value.match (/[^0-9]/g)) {
      this.value = this.value.replace (/[^0-9]/g, '');
    }
    запрос_фильтра (0, 0);
  })
  $('body').on ('click', панель + '.чекбоксы.бренды *', function () {
    запрос_фильтра (1, 0);
  })
  $('body').on ('click', панель + '.toggleText span', function () {
    (q = $(this)).parent ().prev ().toggleClass ('a').text (q.text ());
    запрос_фильтра (2, 0);
  })
  $('body').on ('click', панель + '.чекбоксы.категории *', function () {
    условие = $(this).attr('путь');
    длинна_условия = условие.split('/').length;
    if ($(this).hasClass('a')) {
      $(панель + '.чекбоксы.категории *').each (function () {
        if ($(this).attr ('путь').includes (условие)) $(this).addClass ('a');
      })
      for (i = длинна_условия; i > 1; i--) {
        условие_для_строчки = условие.split ('/').slice (1, i - 1).join ('/') + '/';
        if (условие_для_строчки != '') {
          условие_для_строчки = условие.split ('/')[0] + '/' + условие_для_строчки;
          щет_категорий = 0;
          $(панель + '.чекбоксы.категории *').each (function () {
            if ($(this).attr ('путь').includes (условие_для_строчки)) {
              if (!$(this).hasClass ('a')) {
                щет_категорий++;
              }
            }
          })
          if (щет_категорий == 1) $(панель + '.чекбоксы.категории *[путь="' + условие_для_строчки + '"]').addClass ('a');
        }
      }
    }
    if (!$(this).hasClass('a')) {
      $(панель + '.чекбоксы.категории *').each (function () {
        if ($(this).attr ('путь').includes (условие)) $(this).removeClass ('a');
      })
      for (i = 0; i < длинна_условия; i++) {
        $(панель + '.чекбоксы.категории *[путь="' + условие.split ('/').slice(0, i) + '"]').removeClass ('a');
        $(панель + '.чекбоксы.категории *').each (function () {
          item = $(this);
          if (item.attr ('путь') == условие.split ('/').slice (0, i).join ('/') + '/') {
            item.removeClass ('a');
          }
        })
      }
    }
    запрос_фильтра (3, 0);
  })
  function запрос_данных_в_фильтр_из_панели (индекс_фильтра) {
    установим_параметры_фильтра ();
    возьмем_массив_из_чекеров   ();
  }
  function запрос_фильтра (индекс_фильтра, сброс) {
    запрос_данных_в_фильтр_из_панели (индекс_фильтра);
    $.get (домен + локальный_путь_к_файлу + 'фильтр/динамика.php', {
      индекс_фильтра: индекс_фильтра      ,
      бренды:         массив ['бренды'   ],
      флаги:          флаги               ,
      дерево:         массив ['категории'],
      вилка_цен:      вилка_цен           ,
    }, (ответ_от_сервера) => {
      if (индекс_фильтра != 9) {
        массив_ответов_от_сервера = ответ_от_сервера.split(';');
        if (индекс_фильтра == 0)
          {
            бренды_на_вывод = 0;
            папки_на_вывод  = 1;
          }
        if (индекс_фильтра == 1)
          {
            вилка_цен      = 0;
            папки_на_вывод = 1;
          }
        if (индекс_фильтра == 2)
          {
            вилка_цен       = 0;
            бренды_на_вывод = 1;
            папки_на_вывод  = 2;
          }
        if (индекс_фильтра == 3)
          {
            вилка_цен       = 0;
            бренды_на_вывод = 1;
          }
        if (индекс_фильтра != 0)
          {
            вилка_цен = массив_ответов_от_сервера [вилка_цен].split (',');
            inp0.val (вилка_цен [0]);
            inp1.val (вилка_цен [1]);
          }
        бренды = массив ['бренды'];
        if (индекс_фильтра != 1) {
          бренды = [];
          $(панель + '.чекбоксы:eq(0) *').each (function () {
            if (массив_ответов_от_сервера [бренды_на_вывод].includes ((бренд = $(this).addClass ('a')).text ())) {
              бренды.push (бренд.text ());
              бренд.removeClass ('a');
            }
          })
        }
        if (индекс_фильтра != 2) {
          $('.панель_сортировки_и_фильтра .toggleText.tT0 > p:nth-child(1),.панель_сортировки_и_фильтра .toggleText.tT1 > p:nth-child(1)').text ('Все');
        }
        if (индекс_фильтра != 3) {
          теги_категорий.addClass ('a');
          массив_ответов_от_сервера [папки_на_вывод].split (',').forEach ((условие) => {
            длинна_условия = условие.split('/').length;
            for (i = длинна_условия; i > 1; i--) {
              условие_для_строчки = условие.split ('/').slice (0, i).join ('/');
              if (условие_для_строчки == '') continue;
              условие_для_строчки = условие_для_строчки + '/';
              теги_категорий.each (function () {
                if ($(this).attr ('путь') == условие_для_строчки) $(this).removeClass ('a');
              })
            }
          })
        }
        // Сформируем цифровой массив
          // бренды
            цифрвы_брендов = [];
            теги_брендов.each (function () {
              if (!$(this).hasClass ('a')) цифрвы_брендов  .push ($(this).index ());
            })
          // категории
            цифрвы_категорий = [];
            теги_категорий.each (function () {
              if (!$(this).hasClass ('a')) цифрвы_категорий.push ($(this).index ());
            })
        параметры =
          '&фильтр=' +
            '[' +
              флаги [0] +
              ',' +
              флаги [1] +
            ']' +
          ';' +
            '[' +
              вилка_цен [0] +
              ','+
              вилка_цен [1] +
            ']' +
          ';' +
            (бренды = '[' + цифрвы_брендов + ']') +
          ';' +
            (цифрвы_категорий = '[' + цифрвы_категорий + ']') +
          ';' +
            сортировка;
        // Если бренды или категории пустые прервем программу
          обнуление_юрл = false;
          if (бренды == '[]') {
            $(панель + '.чекбоксы:eq(1) *').addClass ('a');
            обнуление_юрл = true;
          }
          if (цифрвы_категорий == '[]') {
            $(панель + '.чекбоксы:eq(0) *').addClass ('a');
            обнуление_юрл = true;
          }
          if (обнуление_юрл == true) {
            $(панель + 'button:eq(0) *:eq(0)').text (0);
            $('.лента_каталога').html ('');
            параметры = '';
          }
        history.pushState ('object or string', 'Title', домен + 'каталог.php?' + путь0 + '&страница=1' + параметры)
        if (обнуление_юрл == true) {
          return false;
        }
      }
      аякс_в_ленту_каталога
        (
          страница = 1,
        );
    });
  }
  $('body').on ('click', панель + 'button:eq(0)', function () { return false; });
  $('body').on ('click', панель + 'button:eq(1)', function () {
    $(панель + '> :nth-child(2) > span').html ('');
    $(панель + '.keyup').eq(0).val ('');
    $(панель + '.keyup').eq(1).val ('');
    p0 = $(панель + '.tT0 *');
    p0.eq (0).text(p0.last ().text ());
    p1 = $(панель + '.tT1 *');
    p1.eq (0).text(p1.last ().text ());
    $(панель + '.чекбоксы *').each(function () {$(this).attr ('class', '')});
    $(панель + 'button:eq(0)').children().eq(0).text($(панель + 'button:eq(0)').children ().eq (1).text ());
    $(".панель_сортировки_и_фильтра .toggleText").each (function () {
      $(this).children ().eq (0).removeClass ('a');
    })
    $(панель + '.чекбоксы_категорий *').each(function () {
      $(this).removeClass ('a');
    })
    запрос_фильтра (9, 1);
    history.pushState ('object or string', 'Title', домен + 'каталог.php?' + путь0 + '&страница=1');
    return false;
  })
}
