if ($(x1 = '.панель_сортировки_и_фильтра ').length == 1) {
  i2 = 'блоки/каталог/'
  // Инициализация фильтра
    x = new URLSearchParams (window.location.search)
    if ((фильтр = x.get('фильтр')) != null)
      {
        фильтр = фильтр.split(';')
          $(x1 + '.чекбоксы:eq(0) *').each(function () { if (!фильтр[2].includes($(this).text())) $(this).addClass ('a') })
          флаги = фильтр[0].split(',')
          $('.панель_сортировки_и_фильтра .toggleText.tT0 > p:nth-child(1)').text(флаги[0])
          $('.панель_сортировки_и_фильтра .toggleText.tT1 > p:nth-child(1)').text(флаги[1])
          // Прочекаем дерево категорий в фильтре
            $(x1 + '.чекбоксы:eq(1) span').each (function () {
              if (!x.get ('фильтр').split (';')[3].includes ($(this).index ())) $(this).addClass ('a')
            })
      }
  // Конец инициализации фильтра
  function возьмем_категории_из_тегов_фильтра () {
    полное_дерево = []
    полное_дерево_для_фильтра_фильтров = []
    $('.панель_сортировки_и_фильтра .чекбоксы_категорий *:not(.a)').each (function () {
      полное_дерево.push ($(this).attr ('путь').slice (0, -1))
    })
    $('.панель_сортировки_и_фильтра .чекбоксы_категорий *').each (function () {
      полное_дерево_для_фильтра_фильтров.push ($(this).attr ('путь').slice (0, -1))
    })
    // Удалим корни
      полное_дерево.forEach((item, i) => {
        следующий = полное_дерево [i + 1]
        if (следующий != undefined) {
          if (item.split('/').length < следующий.split('/').length) {
              delete item
          }
        }
      })
    // Удалим корни
      полное_дерево_для_фильтра_фильтров.forEach((item, i) => {
        следующий = полное_дерево_для_фильтра_фильтров [i + 1]
        if (следующий != undefined) {
          if (item.split('/').length < следующий.split('/').length) {
            delete item
          }
        }
      })
  }
  параметры_фильтра ()
  возьмем_категории_из_тегов_фильтра ()
  щет (0, полное_дерево)
  function щет (аякс = 0, полное_дерево) {
    $.get(домен + i2 + 'фильтр/щет.php', {
      e0: путь,
      e1: цены,
      e2: бренды,
      e3: флаги,
      e5: x.get('бренд'),
      полное_дерево: полное_дерево,
    }, (D) => {
      d0 = D.split(',')
      $(x1 + 'button:eq(0)').attr('class', 'дефолт').html('Показано <i>' + d0[0] + '</i> из <i>' + d0[1] + '</i>')
      x4 = Math.ceil((+$(x1 + 'button:eq(0)').children().eq(0).text()) / 8)
      if (аякс == 1) {
        $.get(домен + i2 + 'пагинация.php', {
          путь:               путь,
          страница:           1,
          количество_страниц: x4,
          бренд:              x.get('бренд'),
        }, (D) => {
          $('.Пагинация').html(D)
          $('.Пагинация a').each(function() {$(this).attr('href', $(this).attr('href') + '&фильтр=' + фильтр + сортировка)})
        })
      }
    })
  }
  function параметры_фильтра () {
    x = new URLSearchParams (window.location.search)
    $(x1 = '.панель_сортировки_и_фильтра ')
    бренд  = x.get('бренд')
    if (бренд == null) бренд1 = ''
    путь   = x.get('путь')
    флаги  = [$(x1 + '.tT0 p').eq(0).text(), $(x1 + '.tT1 p').eq(0).text()]
    бренды = ''
    $(x1 + '.чекбоксы:eq(0) *').each(function () {
      if (!$(this).hasClass('a')) бренды += $(this).text() + ','
    })
    inp0 = $(x1 + '.keyup').eq(0)
    inp1 = $(x1 + '.keyup').eq(1)
      if ((iv0 = inp0.val()) == '') {inp0v = inp0.attr('placeholder').substring(4)} else {inp0v = iv0}
      if ((iv1 = inp1.val()) == '') {inp1v = inp1.attr('placeholder').substring(4)} else {inp1v = iv1}
    цены = [inp0v, inp1v]
    if (бренд == null) {путь0 = 'путь=' + путь} else {путь0 = 'бренд=' + бренд}
    фильтр = флаги[0] + ',' + флаги[1] + ';' + цены[0] + ',' + цены[1] + ';' + бренды
    if ((сортировка = x.get('сортировка')) != null) {
      сортировка = '&сортировка=' + сортировка
    } else {
      сортировка = ''
    }
    цифровое_дерево = []
    $(x1 + '.чекбоксы_категорий *').each (function () {
      if (!$(this).hasClass ('a')) цифровое_дерево.push ($(this).index())
    })
    цифровое_дерево = '[' + цифровое_дерево.toString () + ']'
  }
  $('body').on('click', x1 + '.toggle,' + x1 + '.чекбоксы *', function () {
    $(this).toggleClass('a')
  })
  $('body').on('keyup', x1 + '.keyup', function (event) {
    event = event || window.event
    if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, '')
    }
    $get1 (0)
  })
  $('body').on('click', x1 + '.чекбоксы_брендов *', function () {
    $get1 (1)
  })
  $('body').on('click', x1 + '.toggleText span', function () {
    (q = $(this)).parent().prev().toggleClass('a').text(q.text())
    $get1 (2)
  })
  $('body').on('click', x1 + '.чекбоксы_категорий *', function () {
    условие  = $(this).attr('путь')
    длинна_условия = условие.split('/').length
    if ($(this).hasClass('a')) {
      $(x1 + '.чекбоксы_категорий *').each (function () {
        if ($(this).attr ('путь').includes (условие)) $(this).addClass ('a')
      })
      for (i = длинна_условия; i > 1; i--) {
        условие_для_строчки = условие.split('/').slice(1, i - 1).join('/') + '/'
        if (условие_для_строчки != '') {
          условие_для_строчки = условие.split('/')[0] + '/' + условие_для_строчки
          щет_категорий = 0
          $(x1 + '.чекбоксы_категорий *').each (function (){
            if ($(this).attr ('путь').includes (условие_для_строчки)) {
              if (!$(this).hasClass ('a')) {
                щет_категорий++
              }
            }
          })
          if (щет_категорий == 1) $(x1 + '.чекбоксы_категорий *[путь="' + условие_для_строчки + '"]').addClass ('a')
        }
      }
    }
    if (!$(this).hasClass('a')) {
      $(x1 + '.чекбоксы_категорий *').each (function () {
        if ($(this).attr ('путь').includes (условие)) $(this).removeClass ('a')
      })
      for (i = 0; i < длинна_условия; i++) {
        $(x1 + '.чекбоксы_категорий *[путь="' + условие.split ('/').slice(0, i) + '"]').removeClass ('a')
        $(x1 + '.чекбоксы_категорий *').each (function () {
          item = $(this)
          if (item.attr ('путь') == условие.split ('/').slice(0, i).join ('/') + '/') {
            item.removeClass ('a')
          }
        })
      }
    }
    возьмем_категории_из_тегов_фильтра ()
    $get1 (3)
  })
  function $get1 (i1, сброс = 0) {
    параметры_фильтра ()
    возьмем_категории_из_тегов_фильтра ()
    url = new URLSearchParams (window.location.search)
      if ((фильтр = url.get ('фильтр')) != null) {
        if (бренды == '') {
          $('.лента_каталога').html ('')
          $(x1 + 'button:eq(0) *:eq(0)').text (0)
          history.pushState ('object or string', 'Title', домен + 'каталог.php?' + путь0 + '&страница=1')
          $(x1 + '.чекбоксы_категорий *').addClass ('a')
          return false
        }
      }
    $.get(домен + i2 + 'фильтр/фильтр_фильтра.php', {
      e0: путь,
      e1: цены,
      e2: бренды,
      e3: флаги,
      e4: i1,
      полное_дерево: полное_дерево,
    }, (D) => {
      if (i1 != 9) {
        d = D.split(';;')
        if (i1 != 0) {
          цены = d[0].split(',')
          inp0.val(цены[0])
          inp1.val(цены[1])
        }
        if (i1 != 1) {
          бренды = ''
          $(x1 + '.чекбоксы:eq(0) *').each(function () {
            бренд = $(this).addClass('a')
            if (d[1].includes(бренд.text())) {
              бренды += бренд.text() + ','
              бренд.removeClass('a')
            }
          })
        }
        if (i1 != 2) {
          $('.панель_сортировки_и_фильтра .toggleText.tT0 > p:nth-child(1),.панель_сортировки_и_фильтра .toggleText.tT1 > p:nth-child(1)').text('Все')
        }
        if (i1 != 3) {
          теги_чекбоксов = $(x1 + '.чекбоксы_категорий *')
          d[2].split (',').forEach((условие) => {
            длинна_условия = условие.split('/').length
            for (i = длинна_условия; i > 1; i--) {
              условие_для_строчки = условие.split ('/').slice (0, i - 1).join ('/')
              if (условие_для_строчки == '') continue
                условие_для_строчки = условие_для_строчки + '/'
                теги_чекбоксов.each (function (){
                  if ($(this).attr ('путь') == условие_для_строчки) $(this).removeClass ('a')
                })
            }
          })
          // Сформируем цифровой массив категорий
            цифровое_дерево = []
            $(x1 + '.чекбоксы_категорий *').each (function () {
              if (!$(this).hasClass ('a')) цифровое_дерево.push ($(this).index())
            })
            цифровое_дерево = '[' + цифровое_дерево.toString () + ']'
          // Заменим цифровое поле в url
        }
      }
      if (сброс == 0) {
        фильтр    = флаги[0] + ',' + флаги[1] + ';' + цены[0] + ',' + цены[1] + ';' + бренды + ';' + цифровое_дерево
        параметры = '&фильтр=' + фильтр + сортировка
      }
      if (сброс == 1) {
        полное_дерево = []
        параметры = ''
      }
      history.pushState ('object or string', 'Title', домен + 'каталог.php?' + путь0 + '&страница=1' + параметры)
      if (i1 == 3) {
        url = new URLSearchParams (window.location.search)
          if ((фильтр = url.get ('фильтр')) != null) {
            категории = url.get('фильтр').split (';')[3]
            if (категории == '[]') {
              $('.лента_каталога').html ('')
              $(x1 + 'button:eq(0) *:eq(0)').text (0)
              history.pushState ('object or string', 'Title', домен + 'каталог.php?' + путь0 + '&страница=1')
              $(x1 + '.чекбоксы_брендов *').addClass ('a')
              return false
            }
          }
      }
      $.get (домен + i2 + 'лента_каталога.php', {
        аякс:          1,
        страница:      1,
        фильтр:        фильтр,
        полное_дерево: полное_дерево,
        сортировка:    сортировка,
        бренд:         бренд1,
        путь:          путь,
      }, (D) => {
        $('.лента_каталога').html(D)
        функция_ленты_каталога ()
        проверка_товаров_на_куки ()
        щет (аякс = 1, полное_дерево)
        разряд ()
      })
    })
  }
  $('body').on('click', x1 + 'button:eq(0)', function() {return false})
  $('body').on('click', x1 + 'button:eq(1)', function() {
    $(x1 + '> :nth-child(2) > span').html('')
    $(x1 + '.keyup').eq(0).val('')
    $(x1 + '.keyup').eq(1).val('')
    p0 = $(x1 + '.tT0 *')
    p0.eq(0).text(p0.last().text())
    p1 = $(x1 + '.tT1 *')
    p1.eq(0).text(p1.last().text())
    $(x1 + '.чекбоксы:eq(0) *').each(function () {$(this).attr('class', '')})
    $(x1 + 'button:eq(0)').children().eq(0).text($(x1 + 'button:eq(0)').children().eq(1).text())
    $(".панель_сортировки_и_фильтра .toggleText").each(function() {
      $(this).children().eq(0).removeClass('a')
    })
    $(x1 + '.чекбоксы_категорий *').each(function() {
      $(this).removeClass('a')
    })
    x4 = Math.ceil((+$(x1 + 'button:eq(0)').children().eq(0).text()) / 8)
    $get1 (9, 1)
    return false
  })
}
