if ($(панель = '.панель_сортировки_и_фильтра ').length == 1) {
  локальный_путь_к_файлу = 'блоки/каталог/';
  // Инициализация фильтра
    url = new URLSearchParams (window.location.search);
    if ((фильтр = url.get ('фильтр')) != null)
      {
        фильтр = фильтр.split (';');
          флаги = фильтр [0].slice (1, -1).split (',')
            зарос = панель + '.toggleText';
              $(зарос + '.tT0 > p').eq (0).text ($(зарос + '.tT0 > p > *').eq (флаги [0]).text ());
              $(зарос + '.tT1 > p').eq (0).text ($(зарос + '.tT1 > p > *').eq (флаги [1]).text ());
          $(панель + '.чекбоксы > *').addClass ('a');
          фильтр[2].slice (1, -1).split (',').forEach ((индекс) => {
            $(панель + '.чекбоксы:eq(0) > *[индекс="' + индекс + '"]').removeClass ('a');
          })
          фильтр[3].slice (1, -1).split (',').forEach ((индекс) => {
            $(панель + '.чекбоксы:eq(1) > *[индекс="' + индекс + '"]').removeClass ('a');
          })
      }
  // Конец инициализации фильтра
  // Костыль
    function возьмем_массив_из_чекеров () {
      // Массиы в запрос
        массив_для_запрос = ['бренды', 'категории'];
        массив = [];
        массив_для_запрос.forEach ((запрос) => {
          массив [запрос] = [];
          $(панель + '.чекбоксы.' + запрос + ' > *:not(.a').each (function () {
            if ($(this).attr ('путь') != undefined) {
              строка = $(this).attr ('путь').slice (0, -1);
            } else {
              строка = $(this).text ();
            }
            массив [запрос].push (строка);
          })
          window ['теги_' + запрос] = $(панель + '.' + запрос + ' > *');
        });
    }
  function запрос_параметры_для_фильтрации () {
    фильтр_в_запрос = [0, 0, 0, 0];
    статус_фильтр_в_запрос = 0;
    url = new URLSearchParams (window.location.search);
      if (url.get ('фильтр') != null)
        {
          статус_фильтр_в_запрос = 1;
          фильтр_из_юрл = url.get ('фильтр').split (';');
          фильтр_из_юрл.forEach ((элемент_фильтра_из_юрл, i) => {
            if (элемент_фильтра_из_юрл != '') фильтр_в_запрос [i] = фильтр_из_юрл [i].slice (1, -1).split (',');
          });
        }
    [в_запрос_флаги, в_запрос_вилка_цен, в_запрос_бренды, в_запрос_дерево] = фильтр_в_запрос;
  }
    // Запрограммируем на вывод в главной
  // Костыль
    возьмем_массив_из_чекеров ();
  запрос_параметры_для_фильтрации ();
  аякс_в_ленту_каталога ();
  function установим_параметры_фильтра () {
    url    = new URLSearchParams (window.location.search);
    панель = '.панель_сортировки_и_фильтра ';
    путь   = url.get('путь');
    index_0 = 0;
    флаги = [];
    $(панель + '.toggleText').each (function (index) {
      полоска = $(this);
      полоска.find ('p').eq (1).find ('span').each (function () {
        if ($(this).text () == полоска.find ('p').eq (0).text ()) флаги.push ($(this).index ());
      });
    });
    inp0   =  $(панель + '.keyup').eq (0);
    inp1   =  $(панель + '.keyup').eq (1);
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
    фильтр = '[' + флаги [0] + ',' + флаги [1] + ']' + ';' + вилка_цен [0] + ',' + вилка_цен [1] + ';' + массив ['бренды'];
    if ((сортировка = url.get ('сортировка')) != null) {
      сортировка = '&сортировка=' + сортировка;
    } else {
      сортировка = '';
    }
  }
  установим_параметры_фильтра ();
  $('body').on ('click', панель + '.toggle,' + панель + '.чекбоксы > *', function () {
    $(this).toggleClass ('a');
  })
  $('body').on ('keyup', панель + '.keyup', function (event) {
    event = event || window.event;
    if (this.value.match (/[^0-9]/g)) {
      this.value = this.value.replace (/[^0-9]/g, '');
    }
    запрос_фильтра (0);
  })
  $('body').on ('click', панель + '.чекбоксы.бренды > *', function () {
    запрос_фильтра (1);
  })
  $('body').on ('click', панель + '.toggleText span', function () {
    (q = $(this)).parent ().prev ().toggleClass ('a').text (q.text ());
    запрос_фильтра (2);
  })
  $('body').on ('click', панель + '.чекбоксы.категории > *', function () {
    условие = $(this).attr ('путь');
    длинна_условия = условие.split ('/').length;
    if ($(this).hasClass ('a')) {
      $(панель + '.чекбоксы.категории > *').each (function () {
        if ($(this).attr ('путь').includes (условие)) $(this).addClass ('a');
      })
      for (i = длинна_условия; i > 1; i--) {
        условие_для_строчки = условие.split ('/').slice (1, i - 1).join ('/') + '/';
        if (условие_для_строчки != '') {
          условие_для_строчки = условие.split ('/')[0] + '/' + условие_для_строчки;
          щет_категорий = 0;
          $(панель + '.чекбоксы.категории > *').each (function () {
            if ($(this).attr ('путь').includes (условие_для_строчки)) {
              if (!$(this).hasClass ('a')) {
                щет_категорий++;
              }
            }
          })
          if (щет_категорий == 1) $(панель + '.чекбоксы.категории > *[путь="' + условие_для_строчки + '"]').addClass ('a');
        }
      }
    }
    if (!$(this).hasClass('a')) {
      $(панель + '.чекбоксы.категории > *').each (function () {
        if ($(this).attr ('путь').includes (условие)) $(this).removeClass ('a');
      })
      for (i = 0; i < длинна_условия; i++) {
        $(панель + '.чекбоксы.категории > *[путь="' + условие.split ('/').slice (0, i) + '"]').removeClass ('a');
        $(панель + '.чекбоксы.категории > *').each (function () {
          item = $(this);
          if (item.attr ('путь') == условие.split ('/').slice (0, i).join ('/') + '/') {
            item.removeClass ('a');
          }
        })
      }
    }
    запрос_фильтра (3);
  })
  function запрос_данных_в_фильтр_из_панели () {
    установим_параметры_фильтра ();
    возьмем_массив_из_чекеров   ();
  }
  // Мигрируем цифровую механику из ленты каталога в динамику
  function запрос_фильтра (индекс_фильтра) {
    // костыль буду принимать меры
      запрос_данных_в_фильтр_из_панели ();
    $.get (домен + локальный_путь_к_файлу + 'фильтр/динамика.php', {
      индекс_фильтра  : индекс_фильтра,
      бренды          : массив ['бренды'],
      флаги           : флаги,
      вилка_цен       : вилка_цен,
      путь            : путь,
      фильтр_в_запрос : фильтр_в_запрос,
    }, (трафик) => {
      // console.log (трафик.split (';')[3]);
      if (индекс_фильтра != 9) {
        массив_трафика = трафик.split (';');
        if (индекс_фильтра == 0)
          {
            ключ_бренды_на_вывод = 0;
            ключ_папки_на_вывод  = 1;
          }
        if (индекс_фильтра == 1)
          {
            ключ_вилка_цен      = 0;
            ключ_папки_на_вывод = 1;
          }
        if (индекс_фильтра == 2)
          {
            ключ_вилка_цен       = 0;
            ключ_бренды_на_вывод = 1;
            ключ_папки_на_вывод  = 2;
          }
        if (индекс_фильтра == 3)
          {
            ключ_вилка_цен       = 0;
            ключ_бренды_на_вывод = 1;
          }
        if (индекс_фильтра != 0)
          {
            вилка_цен = массив_трафика [ключ_вилка_цен].split (',');
              inp0.val (вилка_цен [0]);
              inp1.val (вилка_цен [1]);
          }
        бренды = массив ['бренды'];
        if (индекс_фильтра != 1) {
          бренды = [];
          $(панель + '.чекбоксы:eq(0) > *').each (function () {
            if (массив_трафика [ключ_бренды_на_вывод].includes ((бренд = $(this).addClass ('a')).text ())) {
              бренды.push (бренд.text ());
              бренд.removeClass ('a');
            }
          })
        }
        if (индекс_фильтра != 2) {
          флаги = трафик.split (';')[2].split (',');
            $(панель + '.toggleText.tT0 > p').eq (0).text ($(панель + '.toggleText.tT0 > p > *').eq (флаги [0]).text ());
            $(панель + '.toggleText.tT1 > p').eq (0).text ($(панель + '.toggleText.tT1 > p > *').eq (флаги [1]).text ());
        }
        if (индекс_фильтра != 3) {
          теги_категории.addClass ('a');
          массив_трафика [ключ_папки_на_вывод].split (',').forEach ((условие) => {
            теги_категории.each (function () {
              if ($(this).attr ('индекс') == условие) $(this).removeClass ('a');
            })
          })
        }
        // Костыль на цифры
          цифровой_массив = ['бренды', 'категории'];
          цифровой_массив.forEach((item, i) => {
            window ['цифры_' + item] = [];
            window ['теги_'  + item].each (function () {
              if (!$(this).hasClass ('a')) window ['цифры_' + item].push ($(this).attr ('индекс'));
            });
          });
        параметры =`&фильтр=[${флаги [0]},${флаги [1]}];[${вилка_цен [0]},${вилка_цен [0]}];[${цифры_бренды}];[${цифры_категории}];${сортировка}`;
        // Если бренды или категории пустые прервем программу
          бренды    = '[' + цифры_бренды    + ']';
          категории = '[' + цифры_категории + ']';
          обнуление_юрл = false;
          if (бренды    == '[]') {
            $(панель + '.чекбоксы:eq(1) > *').addClass ('a');
            обнуление_юрл = true;
          }
          if (категории == '[]') {
            $(панель + '.чекбоксы:eq(0) > *').addClass ('a');
            обнуление_юрл = true;
          }
          if (обнуление_юрл == true) {
            $(панель + 'button:eq(0) *:eq(0)').text (0);
            $('.лента_каталога').html ('');
            параметры = '';
          }
        history.pushState ('object or string', 'Title', домен + 'каталог.php?' + путь0 + '&страница=1' + параметры)
        if (обнуление_юрл == true) return false;
      }
      запрос_параметры_для_фильтрации ();
      аякс_в_ленту_каталога (страница = 1);
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
    $(панель + '.чекбоксы > *').each (function () {$(this).attr ('class', '')});
      $ (панель + '.чекбоксы.категории p').css ('display', 'none');
      $ (панель + '.чекбоксы.категории p[метка*="1, "],' + панель + '.чекбоксы.категории p[метка="1"]').css ('display', 'inline-flex');
    $ (панель + '.чекбоксы.категории p') . each (function () {
      if ($ (this) . attr ('метка') . split (', ') . length == 2) $ (this) . find(':first-child') . text ('+');
    });
    $ (панель + 'button:eq(0)').children().eq(0).text($(панель + 'button:eq(0)').children ().eq (1).text ());
    запрос_фильтра (9);
    history.pushState ('object or string', 'Title', домен + 'каталог.php?' + путь0 + '&страница=1');
    return false;
  })
  // Выпадение подкатегорий
    $ (панель + '.чекбоксы.категории p') . each (function () {
      if ($(this).attr ('метка').split (', ').length == 2)
        {
          $(this).prepend ('<i>+</i>');
        }
      длина = ($ (this) . attr ('путь') . split ('/') . length - 2) * 20 - 20 + 'px';
      $(this).css (
        {
          'margin-left' : длина,
          'width'       : 'calc(100% - ' + длина + ')',
        }
      );
    });
    $ ('body').on ('click', панель + '.чекбоксы.категории p i', function () {
      парент = $ (this).parent ().toggleClass ('выпал');
      метка = парент.attr ('метка').split (', ');
      путь  = парент.attr ('путь');
      if (!парент.hasClass ('выпал'))
        {
          $ (this) . text ('+');
        }
      else
        {
          $ (this) . text ('-');
        }
      $(панель + '.чекбоксы.категории p').each (function () {
        if (путь == $(this).attr ('путь'))          return;
        if (!$(this).attr ('путь').includes (путь)) return;
        if (!парент.hasClass ('выпал'))
          {
            $ (this) . css ('display', 'none');
          }
        else if ((парент . attr ('путь') . split ('/').length + 1) == $ (this) . attr ('путь') . split ('/') . length)
          {
            $ (this) . css ('display', 'block');
          }
      });
      return false;
    });
    console.log
      (
        `
        файл (фильтр.js)
          Фильтр:
            - Копируем цифровую механику из ленты каталога в динамику и пагинацию;
            - Добавлю стрелочку либо ссылки теги <a> в бренды на ссылку в каталог по бренду;
            - нужно попрробовать json;
            - И удалим функцию обработки тегов на категории и бренды;
            - Добавим функцию загрузки каталогов-потомков;
            - Добавим щетчик к брендам и категориям;
            - добавить плавающий как в вк щетчик в статус-кнопку фильтра
        `
      )
    ;
}
