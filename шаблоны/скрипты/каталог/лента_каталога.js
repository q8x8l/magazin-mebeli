функция_ленты_каталога ()
if ($('slick + *').length > 0) {
  лента.find('script').remove()
  $('slick + *').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true
  })
}
function функция_ленты_каталога () {
  sv0 = 'compare_'
  sv1 = 'favorite_'
  sv2 = 'add'
  sv3 = 'added'
  svg = []
  svgm = [sv0 + sv2, sv0 + sv3, sv1 + sv2, sv1 + sv3]
  svgm.forEach((e) => {svg.push('<svg><use xlink:href="' + домен + '/стили/svg/sprite2.svg#icon_shop_' + e + '"></use></svg>')})
  лента = $('.лента_каталога')
  if (лента.length > 0) {
    for (index = 0; index < лента.length; index++) {
      лента.eq(index).find('script.товары:last-child()').text().slice(0, -1).slice(1).split('^__^').forEach(element => {
        if (element != '') {
          e = element.split('^_^')
          лента.eq(index).append(
            '<li путь="' + e[0] + '">' +
              '<a href="#" class="сдвиг_картинки"><img src="' + домен + '../товары' + e[0] + '/i/i0"></a>' +
              '<p class="кнопка_быстрый_просмотр кнопка_показать_окно" href="окно_3"><svg class="gr-svg-icon"><use xlink:href="#icon_shop_preview"><symbol viewBox="0 0 30 30" id="icon_shop_preview" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15 6.5c-2.982 0-5.404 1.291-7.223 2.945-1.812 1.647-3.059 3.681-3.72 5.266a.748.748 0 000 .58 15.38 15.38 0 003.72 5.264C9.596 22.21 12.018 23.5 15 23.5s5.404-1.291 7.223-2.945a15.382 15.382 0 003.72-5.264.748.748 0 000-.58 15.378 15.378 0 00-3.72-5.266C20.404 7.791 17.982 6.5 15 6.5zM8.786 19.445c-1.517-1.379-2.602-3.075-3.219-4.444.617-1.37 1.702-3.067 3.219-4.446C10.404 9.084 12.482 8 15 8c2.518 0 4.596 1.084 6.214 2.555 1.518 1.38 2.602 3.075 3.219 4.446-.617 1.37-1.701 3.065-3.219 4.444C19.596 20.916 17.518 22 15 22c-2.518 0-4.596-1.084-6.214-2.555zm3.714-4.444a2.5 2.5 0 114.999-.003 2.5 2.5 0 01-4.999.003zM15 11a4 4 0 100 7.999A4 4 0 0015 11z"></path></symbol></use></svg><span>Быстрый просмотр</span></p>' +
              '<div class="флаги"></div>' +
              '<p class="p1"><a href="#">' + e[2] + '</a></p>' +
              '<p class="p2"><a href="' + домен + 'каталог.php?бренд=' + e[3] + '&страница=1">' + e[3] + '</a></p>' +
              '<p class="звезды"><span style="width: 0; "></span></p>' +
              '<div class="цена_и_наличие">' +
                '<p class="цена_новая"><span class="разряд">' + e[4] + '</span> р. / шт.</p>' +
                '<p class="наличие">' + e[5] + '</p>' +
              '</div>' +
              '<div class="кнопки_к_сравнение_и_в_избранное">' +
                '<p c="V_sravnenii" onClick="кука(this)">' +
                  svg[0] + svg[1] +
                  '<span>К сравнению</span><span>В сравнении</span>' +
                '</p>' +
                '<p c="V_izbrannom" onClick="кука(this)">' +
                  svg[2] + svg[3] +
                  '<span>В избранное</span><span>В избранном</span>' +
                '</p>' +
              '</div>' +
            '</li>'
          )
          t = ''
          r0 = 0
          e[1].split(';').forEach(r => {
            if (r.includes('Акция'))   {t += '<p class="акция">Акция</p>'}
            if (r.includes('Новинка')) {t += '<p class="новинка">Новинка</p>'}
            if (r.includes('Скидка'))  {t += '<p class="скидка">-' + (r0 = r.split('.')[1]) + '%</p>'}
          })
          mc0 = лента.eq(index).find('li[путь="' + e[0] + '"]')
          mc0.find('.флаги').html(t)
          if (r0 != 0) {
            e4 = e[4]
            mc0.find('.цена_новая').after('<p class="цена_старая"><span class="разряд">' + e4 + '</span> p.</p>')
            mc0.find('.цена_новая').html('<span class="разряд">' + (e4 - e4 / 100 * r0) + '</span> р. / шт.')
          }
        }
      })
      $('script.товары').eq(0).remove()
    }
  }
  проверка_товаров_на_куки ()
}
