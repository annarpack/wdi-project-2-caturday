$(()=>{
  $('#next-cat').click(function(e) {
    window.location.replace('/cats');
  });

$('button#edit-fav').each(function(elm){
  $(this).click(function(e) {
    const id = $(this).attr('data-id');
      window.location.replace(`/cats/favs/edit/${id}`);
  });
});
$('#fav-button').click(function(event){
  const src = $('#img').attr('src');
  //console.log(`SRC: ${src}`);
  let series_id = $(this).attr('data-id');
  series_id++;
  const sendData = {url: src, series_id: series_id};
  //console.log(`sendData: ${sendData.url}`);
  $.ajax({
      method: 'POST',
      url: '/cats/new',
      data: sendData,
      success: response => {
        console.log(`responce: ${response}`);
        window.location.replace('/cats/favs');
      }, error: msg => {
        console.log(msg);
      }
    }); // ends ajax method
})

$('#edit-cat-form').on('submit', e => {
  e.preventDefault();

  const series = $('#edit-series-input').val(),
        oldValue = $('#edit-oldvalue-input').val(),
        url = $('#edit-url-input').val(),
        id = $('#edit-id-input').val();
  const editedCatData = {series: series, oldValue: oldValue, url: url, id: id};

  $.ajax({
    method: 'PUT',
    url: `/cats/favs/edit/${id}`,
    data: editedCatData,
    success: data => {
      location.href = '/cats/favs'
    },
    error: err => console.log(err)
  })
})
$('button#delete-fav').each(function(elm){
$(this).click(function(e) {
  const id = $(e.currentTarget).attr('data-id');
  $.ajax(`/cats/favs/${id}`, {
    method: 'DELETE',
    success: data => {
      location.href = '/cats/favs'
    },
    error: err => console.log(err)
  })
})
})

})
