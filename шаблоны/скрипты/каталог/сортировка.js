if ($(x0 = '.панель_сортировки_и_фильтра ').length == 1) {
  $('body').on('click', x0 + '> *:eq(1) form > *', function ()
    {
      $get1 (9, 0)
      q0 = $(this)
      q0.parent().next().html(q0.html())
      сортировка = '&сортировка=' + q0.text()
    }
  );
}
