// Функция пробега по дереву и чека по потомкам автоматически в зависимости от родительской ветки
	function пробег_по_дереву_и_чека_по_потомкам (парент, тег)
		{
			(ветки = $(панель + '.чекбоксы.дерево p')).each (function ()
				{

					if (парент == (зис = $(this))) 											  											return;
					if ((парент_путь = парент.attr ('путь')) == (зис_путь = зис.attr ('путь'))) return;
					if (!зис_путь.includes (парент_путь)) 																			return;
					
					tag_v = зис.children ().eq (1);
					парент_класс = парент.children ().eq (1).attr ('class');
					if (тег == 'плюс_минус')
						{
							switch (парент_класс)
								{
									case 'v a':
										tag_v.addClass 	  ('a');
										break;
									case 'v':
										tag_v.removeClass ('a');
										break;
								}
						}
					if (тег == 'ви')
						{
							switch (парент_класс)
								{
									case 'v a':
										tag_v.removeClass ('a');
										break;
									case 'v':
										tag_v.addClass 		('a');
										break;
								}
						}
				}
			);
		}
// Завершили функции
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
// Вылет потомков
	$('body').on ('click', панель + '.чекбоксы.дерево i:not(.v)', function ()
		{
      парент = (первоначальный_клик = $(this)).parent ().toggleClass ('выпал');
      путь   = парент.attr ('путь');
			$(панель + '.чекбоксы.дерево p').each (function ()
				{
					if (путь == (зис = $(this)).attr ('путь')) return;
					if (!зис.attr ('путь').includes (путь)) 	 return;
					зис.toggleClass ('дисплей_нет');
				}
			);
			switch (парент.attr ('class'))
				{
					case 'выпал':
					case 'есть_ветка выпал':
						первоначальный_клик.text ('-');
						пробег_по_дереву_и_чека_по_потомкам (парент, тег = 'плюс_минус');
						// Запрет на вылет
							if (парент.hasClass ('есть_ветка')) return false;
				    $.get (домен + 'блоки/каталог/фильтр/вылет_ветки.php',
					    {
					    	путь 				 : путь,
					    	ветка_дерева : путь.split ('/').length - 1,
					    }, (трафик) => {
					    	первоначальный_клик.parent ().after (трафик);
					    	Выравнивание_дерева ();
					    	пробег_по_дереву_и_чека_по_потомкам (парент, тег = 'плюс_минус');
					    }
					  );
				    парент.addClass ('есть_ветка');
						break;
					case 'есть_ветка':
						первоначальный_клик.text ('+');
						break;
				}
		}
	);
// Выполнил вылет потомков
// Событие чека по элементам дерева
	console.log (
		`
			клик по ви на дереве:
				Выполню анчек парента при нулевом чеке веток потомков
		`
	);
	$('body').on ('click', панель + (дерево = '.чекбоксы.дерево') + ' p i.v', function ()
		{
			пробег_по_дереву_и_чека_по_потомкам ($(this).parent (), тег = 'ви');
			(исходный_клик = $(this)).toggleClass ('a');
			console.log ();
			console.log (`Функция клик по ви..`);
			console.log (исходный_клик);
			console.log (исходный_клик.parent ().attr ('путь'));
			console.log (исходный_клик.parent ().parent ());
			console.log (`Всё дерево`);
			console.log (исходный_клик.parent ().parent ().children ());
			console.log ();
			console.log (`Ветки по условию "${исходный_клик.parent ().attr ('путь').split ('/').slice (0, -2)}" нужно искать через див исходного блока`);

			исходный_клик.parent ().parent ().children ().each (function ()
				{
					ветка_дерева = $(this);
					console.log (ветка_дерева.attr ('путь'));
					console.log (ветка_дерева);
				}
			);


			// условие 			 = исходный_клик.parent ().attr ('путь');
			// длинна_условия = условие.split ('/').length;
			// if (исходный_клик.hasClass ('a'))
			// 	{
				  // $(панель + дерево + ' p').each (function (i) {
				    // if ($(this).attr ('путь').includes (условие)) $(this).addClass ('a');
				  // })
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
		// }
	);
// Конец События Чека по элементам дерева
console.log (`- Выполнить аякс на дерево на ветки первого уровня тоесть не нагружать трафик без надобности`);
console.log (`- А, файл динамики php переделать сравнение цифрами (по порядковым номерам папок`);
console.log (`- Попробовать фильтр переделать именно динамику цифровой`);
console.log (`- Первоначальные вылеты трафика остануться прежними буквами`);
console.log (`- Проявление пагинации выполнить с задержкой после появления всех квадратиков мазайки витрины`);
console.log (`- Сделать так же бренды аяксом при открытии вкладки брендов`);
console.log (`- После открытии страницы каталога не буду загражуть форму фильтра статично, а подгружу её аяксом`);