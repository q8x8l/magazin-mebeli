// Выравнивание дерева
    $((панель = '.панель_сортировки_и_фильтра ') + '.чекбоксы.дерево p').each (function () {
      if ($(this).attr ('метка').split (', ').length == 2)
        {
          $(this).prepend ('<i>+</i>');
        }
      $(this).prepend ('<i class="v">v</i>');
      $(this).css (
        {
          'margin-left' : (длина = ($ (this).attr ('путь').split ('/').length - 2) * 20 - 20 + 'px'),
          'width'       : 'calc(100% - ' + длина + ')',
        }
      );
    });
// Завершил выравнивание дерева
// Выпадение потомков
	console.log (
		`
			Создам функцию на плюсик и ви вылетающих веток
		`
	);
	$('body').on ('click', панель + '.чекбоксы.дерево i:not(.v)', function ()
		{
      парент = $(this).parent ().toggleClass ('выпал');
      метка  = парент.attr ('метка').split (', ');
      путь   = парент.attr ('путь');
      if (!парент.hasClass ('выпал'))
				{
					$(this).text ('+');
				}
		      else
				{
					$(this).text ('-');
				}
		    $(панель + '.чекбоксы.дерево p').each (
		    	function ()
			        {
								if (путь == $(this).attr ('путь'))          return;
								if (!$(this).attr ('путь').includes (путь)) return;
								if (!парент.hasClass ('выпал'))
									{
									  $(this).css ('display', 'none');
									}
								else if ((парент.attr ('путь').split ('/').length + 1) == $ (this).attr ('путь').split ('/').length)
									{
										$(this).css ('display', 'block');
									}
			        }
		    	)
		    ;
		    $.get (домен + 'блоки/каталог/фильтр/вылет_ветки.php', {
		    	путь : $(this).parent ().attr ('путь'),
		    }, (трафик) => {
		    	// console.log (трафик);
		    	console.log ($(this).parent ().after (трафик));
		    });
	      return false;
		})
	;
// Закрыл выпадение потомков

// Событие Чека по элементам дерева
	// $('body').on ('click', панель + '.чекбоксы.дерево .v', function () {
	// условие = $(this).parent ().attr ('путь');
	// длинна_условия = условие.split ('/').length;
	// if ($(this).hasClass ('a')) {
	//   $(панель + '.чекбоксы.дерево p').each (function () {
	//     if ($(this).attr ('путь').includes (условие)) $(this).addClass ('a');
	//   })
	//   for (i = длинна_условия; i > 1; i--) {
	//     условие_для_строчки = условие.split ('/').slice (1, i - 1).join ('/');
	//     if (условие_для_строчки != '') {
	//       условие_для_строчки = условие.split ('/')[0] + '/' + условие_для_строчки;
	//       щет_категорий = 0;
	//       $(панель + '.чекбоксы.дерево p').each (function () {
	//         if ($(this).attr ('путь').includes (условие_для_строчки))
	//           {
	//             if (!$(this).hasClass ('a'))
	//               {
	//                 щет_категорий++;
	//               }
	//           }
	//       })
	//       if (щет_категорий == 1) $(панель + '.чекбоксы.дерево p[путь="' + условие_для_строчки + '"]').addClass ('a');
	//     }
	//   }
	// }
	// if (!$(this).hasClass ('a'))
	//   {
	//     $(панель + '.чекбоксы.дерево p').each (function () {
	//       if ($(this).attr ('путь').includes (условие)) $(this).removeClass ('a');
	//     })
	//     for (i = 0; i < длинна_условия; i++) {
	//       $(панель + '.чекбоксы.дерево p[путь="' + условие.split ('/').slice (0, i) + '"]').removeClass ('a');
	//       $(панель + '.чекбоксы.дерево p').each (function () {
	//         item = $(this);
	//         if (item.attr ('путь') == условие.split ('/').slice (0, i).join ('/') + '/') {
	//           item.removeClass ('a');
	//         }
	//       })
	//     }
	//   }
	// запрос_фильтра (3);
	// })
// Конец События Чека по элементам дерева