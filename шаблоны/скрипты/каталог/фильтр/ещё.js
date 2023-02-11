панель = '.панель_сортировки_и_фильтра ';
// Вылет ленты брендов
	$('body').on ('click', панель + '.toggle.бренды', function ()
		{
			зис = $(this);
			// Запрет на вылет
				if (зис.hasClass (`Есть_вылет`)) return false;
			$.get (домен + 'блоки/каталог/фильтр/вылет_брендов.php',
			  {
			  	путь : new URLSearchParams (window.location.search).get ('путь'),
			  	''   : '',
			  }, (трафик) => {
			  	зис.after (`<div class="чекбоксы бренды"></div>`);
			  	трафик.split ('\n').forEach (function (e)
			  		{
			  			if (e == '') return;
						зис.next ().append (`<p><i>v</i><img src="${домен}../бренды/${e}" alt=' ' title='' /><a href="">${e}</a></p>`);
			  		}
			  	);
			  }
			);
			зис.addClass (`Есть_вылет`);
		}
	);
// Есть вылет ленты брендов
// Вылет ствола дерева
	$('body').on ('click', панель + '.toggle.дерево', function ()
		{
			зис = $(this);
			// Запрет на вылет
				if (зис.hasClass ('есть_ветка')) return false;
			$.get (домен + 'блоки/каталог/фильтр/вылет_ветки.php',
			  {
			  	путь 		 : new URLSearchParams (window.location.search).get ('путь'),
			  	ветка_дерева : 1,
			  }, (трафик) => {
			  	зис.after (`<div class="чекбоксы дерево"></div>`);
			  	трафик.split ('\n').forEach (function (e)
			  		{
			  			if (e == '') return;
			  			зис.next ().append (`<p метка="${e.split ('.')[0]}" путь="${e.split ('.')[1]}/"><a href="">${e.split ('.')[1].split ('/').slice (-1)}</a></p>`);
			  		}
			  	);
			  	Выравнивание_дерева ();
			  }
			);
			зис.addClass (`есть_ветка`);
		}
	);
// Есть вылет ствола
// Вылет сортировки
	$('body').on ('click', панель + '.кнопка_для_сортировки', function ()
		{
			зис = $(this);
			// Запрет на вылет
				if (зис.hasClass ('Есть_вылет')) return false;
			$.get (домен + 'блоки/каталог/вылет_панели_фильтра.php',
				{
					'' : '',
				}, (трафик) => {
					// console.log (трафик);
					зис.after (трафик);
				}
			);
			зис.addClass (`Есть_вылет`);
		}
	);
// Выполнил вылет формы