панель = '.панель_сортировки_и_фильтра ';
// Вылет ленты брендов
	console.log (`
		Вылет ленты брендов
		`);
	function лента_брендов_в_фильтре ()
		{
			console.log (`Вылет ленты брендов _`);
		}
// 
// Вылет ствола дерева
	$('body').on ('click', панель + '.toggle.дерево', function ()
		{
			// Запрет на вылет
				if ($(this).hasClass ('есть_ветка')) return false;
			$.get (домен + 'блоки/каталог/фильтр/вылет_ветки.php',
			  {
			  	путь 				 : new URLSearchParams (window.location.search).get ('путь'),
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