r = document.cookie.split('; ')
o = ['V_sravnenii', 'V_izbrannom', 'V_korzine']
if (r.length == 1) {r.forEach(t => {o.forEach(e => {if (!t.includes(e)) {document.cookie = e + '=' }})})} else {инкремент_куков_в_шапке ()}
function инкремент_куков_в_шапке () {
  w = []
  r = document.cookie.split('; ')
  y = 'V_korzine'
  r.forEach(t => {
    q = t.split('=')[1]
    for (i = 0; i < o.length - 1; i++) {if (t.includes(o[i])) w.push(o[i] + ':' + q)}
    if (t.includes(y)) y += ':' + q
  })
  t = []
  w.forEach(e => {
    q = e.split(':')
    o.forEach(n => {
      if (q.includes(n)) {
        if (q[1] == '') { t.push(n + ':' + 0) } else  t.push(n + ':' + q[1].slice(0, -1).split(',').length)
      }
    })
  })
  v = $('header .блок_1').find('.щет')
  for (i = 0; i < v.length - 1; i++) {
    t.forEach(e => { if (v.eq([i]).hasClass(e.split(':')[0])) v.eq([i]).text(e.split(':')[1]) })
  }
  w = 0
  y.split(':')[1].slice(0, -1).split(',').forEach(e => {
    if (e != '') w += +(e.split('.')[1])
  })
  v.eq(2).text(w)
  v.each(function(){
    if ($(this).text() == 0) { $(this).css('display', 'none') } else $(this).css('display', 'inline-flex')
  })
}
function проверка_товара_на_куки (y) {
  w = []
  document.cookie.split('; ').forEach(t => {
    q = t.split('=')[1]
    o.forEach(e => {
      if (t.includes(e)) { w.push(e + ':' + q) }
    })
  })
  w.forEach(t => {
    q = t.split(':')
    o.forEach(e => {
      if (q[0] == e) {
        if (q[1].includes(y)) {
          $('.окно_3 [c=' + e + ']').addClass('a')
        }
      }
    })
  })
}
кука = (e) => {
  r = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
  if (r.classList.contains('окно_3')) {
    щет = +(r.querySelector('form').children[1].value)
    путь = r.querySelector('.привью_товара').getAttribute('путь')
    цена = r.querySelector('.цена_исходник').innerHTML
    if ((скидка = r.querySelector('.скидка')) != null) {
      скидка = скидка.innerHTML.replace('-', '').replace('%', '')
    }
    else {
      скидка = ''
    }
  }
  else {
    r = e.parentElement.parentElement
    щет = 1
    путь = r.querySelector('.кнопки_к_сравнение_и_в_избранное').parentElement.getAttribute('путь')
    цена = 0
    скидка = ''
  }
  y = [
    путь,
    r.querySelector('.p1').innerHTML,
    скидка,
    цена,
    щет,
  ]
  w = []
  document.cookie.split('; ').forEach(t => {o.forEach(e => {if (t.includes(e)) {w.push(e + ':' + t.split('=')[1])}})})
  w.forEach(t => {
    q = t.split(':')
    q0 = q[0]
    q1 = q[1]
    if (q0 == e.getAttribute('c')) {
      if (q0 == o[0]) {
        if (q1.includes(y[0])) {u = q1.replace(y[0] + ',', '')} else {u = q1 + y[0] + ','}
        document.cookie = q0 + '=' + u + ';max-age=31556926'
      }
      if (q0 == o[1]) {
        if (q1.includes(y[0])) {u = q1.replace(y[0] + ',', '')} else {u = q1 + y[0] + ','}
        document.cookie = q0 + '=' + u + ';max-age=31556926'
      }
      if (q0 == o[2]) {
        i = q1
        p = 0
        q1.split(',').forEach(t => {
          u = t.split('.')
          if (u[0] == y[0]) {
            i = i.replace(t + ',', '')
            p = +(u[1])
          }
        })
        i += y[0] + '.' + (p + y[4]) + '.' + y[1] + '.' + y[2] + '.' + y[3]
        document.cookie = q0 + '=' + i + ',' + ';max-age=31556926'
        $('body').append('<p class="тултип">Добавлено в корзину</p>')
        setInterval(() => {
          $('.тултип').animate({opacity: 0}, () => {$('.тултип').remove()})
        }, 1000);
      }
    }
  })
  e.classList.toggle('a')
  проверка_товаров_на_куки ()
  инкремент_куков_в_шапке ()
}
function проверка_товаров_на_куки () {
  w = []
  document.cookie.split('; ').forEach(t => {
    q = t.split('=')[1]
    o.forEach(e => {if (t.includes(e)) {w.push(e + ':' + q)}})
  })
  $('.лента_каталога').each(function(){
    $(this).find('li').each(function(){
      w.forEach(t => {
        q = t.split(':')
        for (i = 0; i < o.length; i++) {
          if (q[0] == o[i]) {
            x = $(this).find('[c=' + o[i] + ']')
            if (q[1].includes(x.parent().parent().attr('путь'))) {x.addClass('a')} else {x.removeClass('a')}
          }
        }
      })
    })
  })
}
