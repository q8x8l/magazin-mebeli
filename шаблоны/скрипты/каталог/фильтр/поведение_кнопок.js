// Выравнивание дерева
	function Выравнивание_дерева ()
		{
	    $((панель = '.панель_сортировки_и_фильтра ') + '.чекбоксы.дерево p').each (function () {
	    	if (!$(this).find ('i').length)
	    		{
			      if ($(this).prepend ('<i class="v">v</i>').attr ('метка').split (', ').length == 2)
			        {
			          $(this).prepend ('<i>+</i>');
			        }
			      else
				    	{
				    		$(this).prepend ('<i class="b"></i>');
				      }
	    		}
	      $(this).css (
	        {
	          'margin-left' : (длина = ($ (this).attr ('путь').split ('/').length - 2) * 20 - 20 + 'px'),
	          'width'       : 'calc(100% - ' + длина + ')',
	        }
	      );
	    });
		};
	Выравнивание_дерева ();
// Завершил выравнивание дерева
// Выпадение потомков
	function миг_потомков ()
		{
			$(панель + '.чекбоксы.дерево p').each (
				function ()
					{
						if (путь == $(this).attr ('путь'))          return;
						if (!$(this).attr ('путь').includes (путь)) return;
						if (парент.hasClass ('выпал'))
							{
								$(this).removeClass ('дисплей_нет');
							}
						else
							{
								$(this).addClass    ('дисплей_нет');
							}
					}
				)
			;
		};
	$('body').on ('click', панель + '.чекбоксы.дерево i:not(.v)', function ()
		{
      парент = $(this).parent ().toggleClass ('выпал');
      путь   = парент.attr ('путь');
      if (!парент.hasClass ('выпал'))
				{
					$(this).text ('+');
					миг_потомков ();
				}
		  else
				{
					$(this).text ('-');
					миг_потомков ();
					// Запрет на вылет
						if (парент.hasClass ('есть_ветка')) return false;
			    $.get (домен + 'блоки/каталог/фильтр/вылет_ветки.php',
				    {
				    	путь 				 : путь,
				    	ветка_дерева : путь.split ('/').length - 1,
				    }, (трафик) => {
				    	$(this).parent ().after (трафик);
				    	Выравнивание_дерева ();
				    }
				  );
			    парент.addClass ('есть_ветка');
				}
		}
	);
// Закрыл выпадение потомков
console.log (
	`
		Сделаю клик по ви на дереве:
			сделаю копию функции перебора дерева (миг_потомков ())
	`
);
// Событие чека по элементам дерева
	$('body').on ('click', панель + (дерево = '.чекбоксы.дерево') + ' p i.v', function ()
		{
			(исходный_клик = $(this)).toggleClass ('a');
			условие 			 = исходный_клик.parent ().attr ('путь');
			длинна_условия = условие.split ('/').length;
			if (исходный_клик.hasClass ('a'))
				{
				  $(панель + дерево + ' p').each (function (i) {
				  	console.log ($(this));
				    // if ($(this).attr ('путь').includes (условие)) $(this).addClass ('a');
				  })
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
	  		}
	// запрос_фильтра (3);
		}
	);
// Конец События Чека по элементам дерева
console.log (`- А, файл динамики php переделать сравнение цифрами (по порядковым номерам папок`);
console.log (`- Попробовать фильтр переделать именно динамику цифровой`);
console.log (`- Первоначальные вылеты трафика остануться прежними буквами`);
console.log (`- Проявление пагинации выполнить с задержкой после появления всех квадратиков мазайки витрины`);
console.log (`- Сделать так же бренды аяксом при открытии вкладки брендов`);
console.log (`- После открытии страницы каталога не буду загражуть форму фильтра статично, а подгружу её аяксом`);