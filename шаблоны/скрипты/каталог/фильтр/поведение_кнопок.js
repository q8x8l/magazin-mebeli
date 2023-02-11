// Функция пробега по дереву и чека по потомкам автоматически в зависимости от родительской ветки
	function пробег_по_дереву_и_чека_по_потомкам (парент, тег)
		{
			(ветки = $(панель + '.чекбоксы.дерево p')).each (function ()
				{
					if (парент == (зис = $(this))) 											  	return;
					if ((парент_путь = парент.attr ('путь')) == (зис_путь = зис.attr ('путь'))) return;
					if (!зис_путь.includes (парент_путь)) 										return;
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
										tag_v.addClass 	  ('a');
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
			      if  ($(this).prepend ('<i class="v">v</i>').attr ('метка').split (', ').length == 2) $(this).prepend ('<i>+</i>');
			      else $(this).prepend ('<i class="b"></i>');
	    		}
	      $(this).css (
	        {
	          'margin-left' : (длина = ($(this).attr ('путь').split ('/').length - 2) * 20 - 20 + 'px'),
	          'width'       : 'calc(100% - ' + длина + ')',
	        }
	      );
	    });
		};
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
						  	трафик.split ('\n').forEach (function (e)
						  		{
						  			if (e == '') return;
						  			первоначальный_клик.parent ().after (`<p метка="${e.split ('.')[0]}" путь="${e.split ('.')[1]}/"><a href="">${e.split ('.')[1].split ('/').slice (-1)}</a></p>`);
						  		}
						  	);
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
	$('body').on ('click', панель + (дерево = '.чекбоксы.дерево') + ' p i.v', function ()
		{
			(исходный_клик = $(this)).toggleClass ('a');
			условие 			 = исходный_клик.parent ().attr ('путь');
			длинна_условия = условие.split ('/').length - 1;
			if (исходный_клик.hasClass ('a'))
				{
				  $(панель + дерево + ' p').each (function () {
				  	if ((зис = $(this)).attr ('путь').includes (условие)) зис.children (1).addClass ('a');
				  })
				  for (i = длинна_условия; i > 2; i--)
					  {
					    условие_для_строчки = условие.split ('/').slice (0, i - 1).join ('/') + '/';
				      щет_категорий = 0;
				      $(панель + '.чекбоксы.дерево p').each (function ()
					      {
					        if (!(зис = $(this)).attr ('путь').includes (условие_для_строчки)) return;
			            if (!зис.children (1).hasClass ('a')) щет_категорий++;
					      }
				      );
				      if (щет_категорий == 1) $(панель + `.чекбоксы.дерево p[путь="${условие_для_строчки}"]`).children (1).addClass ('a');
					  }
				}
			if (!исходный_клик.hasClass ('a'))
			  {
			    $(панель + '.чекбоксы.дерево p').each (function () {
			      if ($(this).attr ('путь').includes (условие)) $(this).children (1).removeClass ('a');
			    })
			    for (i = 0; i < длинна_условия; i++)
				    {
				      $(панель + `.чекбоксы.дерево p[путь="${условие.split ('/').slice (0, i)}"]`).children (1).removeClass ('a');
				      $(панель + '.чекбоксы.дерево p').each (function () {
				        зис = $(this);
				        if (зис.attr ('путь') == условие.split ('/').slice (0, i).join ('/') + '/') зис.children (1).removeClass ('a');
				      })
			    	}
			
		  	}
	// запрос_фильтра (3);
		}
	);
// Конец События Чека по элементам дерева
console.log (`- Попробовать фильтр переделать именно динамику цифровой`);
console.log (`- А, файл динамики php переделать сравнение цифрами (по порядковым номерам папок`);
console.log (`- Первоначальные вылеты трафика остануться прежними буквами`);
console.log (`- Проявление пагинации выполнить с задержкой после появления всех квадратиков мазайки витрины`);
console.log (`- Сделать так же бренды аяксом при открытии вкладки брендов`);
console.log (`- После открытии страницы каталога не буду загражуть форму фильтра статично, а подгружу её аяксом`);