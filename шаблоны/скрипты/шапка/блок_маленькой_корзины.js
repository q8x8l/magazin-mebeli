$('body').on('click', '.показать_окно_4', function () {
  r = 0
  t = $('.лента_маленькой_корзины').empty()
  document.cookie.split('; ').forEach((item) => {
    if (item.includes('V_korzine')) {
      item.split('V_korzine=')[1].split(',').forEach((item) => {
        if (item != '') {
          item = item.split('.')
          u = ''
          j = '<i>' + (d4 = item[4]) + '</i><span></span><span><i class="разряд">' + d4 + '</i> p.</span>'
          if (item[3] != '') {
            Скидка = item[3]
            u =  '<p>Акция: Скидка ' + Скидка + '%</p>'
            j =  '<i>' + d4 + '</i>'
            j += '<span><i class="разряд">' + d4 + '</i> p.</span>'
            j += '<span><i class="разряд">' + (d4 - d4 / 100 * Скидка) + '</i> p.</span>'
          }
          дизаблед = 0
          if (item[1] == 1) дизаблед = 1
          t.append (
            '<li путь="' + item[0] + '">' +
              '<svg onclick="удалить_позицию (this)" class="gr-svg-icon"><use xlink:href="#icon_shop_del_cart"><symbol viewBox="0 0 30 30" id="icon_shop_del_cart" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.279 11.218a.75.75 0 10-1.06 1.06L13.938 15l-2.72 2.721a.75.75 0 101.06 1.06L15 16.062l2.721 2.72a.75.75 0 001.06-1.06l-2.72-2.72 2.721-2.722a.75.75 0 00-1.06-1.06L15 13.938l-2.721-2.72z"></path></symbol></use></svg>' +
              '<img src="' + домен + '../товары' + item[0] + 'i/i0">' +
              '<div>' +
                '<a href="">' + item[2] + '</a>' + u +
              '</div>' +
              '<form>' +
                '<input type="button" class="дикремент" onclick="инкремен_дикремент_товара (this)" value="-" дизаблед="' + дизаблед + '">' +
                '<input type="text" onkeypress="banText (event);" onkeyup="пересчет_товара_в_маленькой_корзине (this);" value="' + item[1] + '">' +
                '<input type="button" class="инкремент" onclick="инкремен_дикремент_товара (this)" value="+">' +
              '</form>' +
              '<p class="цена">' + j + '</p>' +
            '</li>'
          )
          $('.окно_4 .щет').text(r += +item[1])
        }
      })
    }
  })
  посчитаем_сумму_стоимости_товара (t[0])
})
удалить_позицию = (e) => {
  w = []
  for (i = 0; i < (c = document.cookie.split('; ')).length; i++) {
    if (!c[i].includes('V_korzine')) continue
    w.push(c[i].split('=')[1])
  }
  w0 = ''
  w.forEach(r => {
    for (i = 0; i < (c = r.split(',').slice(0, -1)).length; i++) {
      if (c[i].includes((y = e.parentElement.getAttribute('путь')))) continue
      w0 += c[i] + ','
    }
  })
  кука_в_корзине (w0)
  щет = 0
  w0.split(',').slice(0, -1).forEach(q => {
    щет += +(q.split('.')[1])
  })
  $('.окно_4 [путь="' + y + '"]').remove()
  $('.окно_4 .щет').text(щет)
  $('header .блок_1 .щет.V_korzine').text(щет)
  if (щет == 0) {
    $('.щет.V_korzine').css('display', 'none')
    $('.окно_4 .тень').animate({opacity: 0}, () => {$('.окно_4').hide()})
    $('.окно_4 > div').animate({opacity: 0})
  }
  посчитаем_сумму_стоимости_товара ($('.лента_маленькой_корзины')[0])
}
очистить_маленькую_корзину = (e) => {
  document.cookie = "V_korzine=";
  $('.щет.V_korzine').text('').css('display', 'none')
  $('.окно_4 .тень').animate({opacity: 0}, () => {$('.окно_4').hide()})
  $('.окно_4 > div').animate({opacity: 0})
}
инкремен_дикремент_товара = (e) => {
  if (e.getAttribute('дизаблед') == 1) return
  щет = $('.окно_4 .щет').text()
  if (e.classList.contains('дикремент')) {
    q = e.nextElementSibling
    щет = $('.окно_4 .щет').text()
    if (q.value != 1) {
      q.value = --q.value
      щет--
      g = e.nextElementSibling.value
    }
    if (q.value == 1) e.setAttribute('дизаблед', 1)
  }
  if (e.classList.contains('инкремент')) {
    q = e.previousElementSibling
    q.value = ++q.value
    q.previousElementSibling.setAttribute('дизаблед', 0)
    щет++
    g = +(e.previousElementSibling.value)
  }
  a = e.parentElement
  p = ''
  for (i = 0; i < (r = document.cookie.split('; ')).length; i++) {
    if (!r[i].includes('V_korzine')) continue
    for (t = 0; t < (u = r[i].split('=')[1].split(',').slice(0, -1)).length; t++) {
      ut = u[t].split('.')
      if (ut[0] == a.parentElement.getAttribute('путь')) {
        p += ut[0] + '.' + a.children[1].value + '.' + ut[2] + '.' + ut[3] + '.' + ut[4] + ','
      } else {
        p += u[t] + ','
      }
    }
  }
  кука_в_корзине (p)
  h = a.nextElementSibling
  j = h.children[0]
  $('.окно_4 .щет,header .блок_1 div .щет.V_korzine').text(щет)
  if (q = a.previousElementSibling.children[1]) {
    q = +(q.textContent.slice(0, -1).split('Акция: Скидка ')[1])
    h.children[1].children[0].textContent = (j.textContent * g).toFixed(2).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
    h.children[2].children[0].textContent = (j.textContent * g - (j.textContent * g / 100 * q)).toFixed(2).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
  } else h.children[2].children[0].textContent = (j.textContent * g).toFixed(2).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
  посчитаем_сумму_стоимости_товара (e.parentElement.parentElement.parentElement)
}
function посчитаем_сумму_стоимости_товара (tt) {
  mc = 0
  for (index = 0; index < tt.childNodes.length; index++) {
    qqq = tt.childNodes[index]
    qq = +(qqq.children[4].children[0].textContent)
    qqqq = qq * qqq.children[3].children[1].value
    ww = 0
    if (ee = qqq.children[2].children[1]) ww = +(ee.textContent.slice(0, -1).split('Акция: Скидка ')[1])
    if (ww != 0) {
      qqqq = qqqq - qqqq / 100 * ww
    }
    mc += qqqq
  }
  tt.nextElementSibling.children[1].innerHTML = 'Итого: <b class="разряд">' + mc + '</b> р.'
  разряд ()
}
пересчет_товара_в_маленькой_корзине = (e) => {
  q0 = e.value
  q1 = e.parentElement.nextElementSibling
  qpro = 0
  if (q0_1 = e.parentElement.previousElementSibling.children[1]) {
    qpro = q1.children[0].textContent * q0 / 100 * q0_1.textContent.slice(0, -1).split(' ')[2]
    q1.children[1].children[0].textContent = (q0 * q1.children[0].textContent).toFixed(2).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
  }
  q1.children[2].children[0].textContent = (q0 * q1.children[0].textContent - qpro).toFixed(2).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
  q2 = q1.parentElement.parentElement.children
  q6 = 0
  q7 = 0
  q9 = ''
  for (i = 0; i < q2.length; i++) {
    q4 = q2[i].children[2].children[1]
    q5 = 0
    q3 = q2[i].children[4].children[0].textContent
    if (q4) {
      q5 = q3 / 100 * q4.textContent.split(' ')[2].slice(0, -1)
    }
    q7 += +(q2[i].children[3].children[1].value)
    q6 += (q3 - q5) * (q10 = q2[i].children[3].children[1].value)
    q9 += q2[i].getAttribute('путь') + '.' + q10 + ','
  }
  q8 = e.parentElement.parentElement.parentElement
  q8.nextElementSibling.children[1].innerHTML = 'Итого: <b>' + q6.toFixed(2).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + ' p.</b>'
  q8.previousElementSibling.children[0].innerHTML = q7
  кука_в_корзине (q9)
}
кука_в_корзине = (e) => {document.cookie = 'V_korzine=' + e + ';max-age=31556926'}
banText = (e) => {if (isNaN(parseFloat(e.key))) {e.preventDefault()}}
