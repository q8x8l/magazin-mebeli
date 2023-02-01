if ($(панель = '.панель_сортировки_и_фильтра ').length == 1)
	{
	  // Выпадение подкатегорий
	    $ (панель + '.чекбоксы.дерево p') . each (function () {
	      if ($(this).attr ('метка').split (', ').length == 2)
	        {
	          $(this).prepend ('<i>+</i>');
	        }
	      длина = ($ (this).attr ('путь').split ('/').length - 2) * 20 - 20 + 'px';
	      $(this).css (
	        {
	          'margin-left' : длина,
	          'width'       : 'calc(100% - ' + длина + ')',
	        }
	      );
	    });
	    $ ('body').on ('click', панель + '.чекбоксы.дерево p:not(.a)', function ()
	      {
	        парент = $ (this).parent ().toggleClass ('выпал');
	        метка = парент.attr ('метка').split (', ');
	        путь  = парент.attr ('путь');
	        if (!парент.hasClass ('выпал'))
	          {
	            $ (this) . text ('+');
	          }
	        else
	          {
	            $ (this) . text ('-');
	          }
	        $(панель + '.чекбоксы.дерево p').each (function () {
	          if (путь == $(this).attr ('путь'))          return;
	          if (!$(this).attr ('путь').includes (путь)) return;
	          if (!парент.hasClass ('выпал'))
	            {
	              $ (this) . css ('display', 'none');
	            }
	          else if ((парент . attr ('путь') . split ('/').length + 1) == $ (this) . attr ('путь') . split ('/') . length)
	            {
	              $ (this) . css ('display', 'block');
	            }
	        });
	        return false;
	      });
	}