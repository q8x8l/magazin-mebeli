<pre>
  <p class="e">
    <?php
      echo json_encode (
        [
          '111111' => [1, 2, 3],
          '111112' => [1, 2, 3],
        ]
      )
    ?>
  </p>
  <p class="e2">
    <?php
      print_r ([['id' => [1, 2], 'id2' => 2], ['id' => [1, 2], 'id2' => 2]]);
    ?>
  </p>
</pre>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript">
  json = JSON.parse ($('.e').text())
  console.log(json)
</script>
