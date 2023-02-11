панель = '.панель_сортировки_и_фильтра ';
// Вылет ленты брендов
	$('body').on ('click', панель + '.toggle.бренды', function ()
		{
			зис = $(this);
			if (зис.hasClass (`Есть_вылет`)) return false;
			$.get (домен + 'блоки/каталог/фильтр/вылет_брендов.php',
			  {
			  	путь : new URLSearchParams (window.location.search).get ('путь'),
			  	''   : '',
			  }, (трафик) => {
			  	трафик.split ('\n').forEach (function (e)
			  		{
			  			if (e == '') return;
						зис.next ().append (`<p><i>v</i><img src="${домен}../../../../бренды/${e}" /><a href="">${e}</a></p>`);
			  		}
			  	);
			  }
			);
			зис.addClass (`Есть_вылет`);
		}
	);
// 
// Вылет ствола дерева
	$('body').on ('click', панель + '.toggle.дерево', function ()
		{
			// Запрет на вылет
				if ($(this).hasClass ('есть_ветка')) return false;
			$.get (домен + 'блоки/каталог/фильтр/вылет_ветки.php',
			  {
			  	путь 		 : new URLSearchParams (window.location.search).get ('путь'),
			  	ветка_дерева : 1,
			  }, (трафик) => {
			  	$('.чекбоксы.дерево').html (трафик);
			  	Выравнивание_дерева ();
			  }
			);
			$(this).addClass (`есть_ветка`);
		}
	);
// Есть вылет ствола