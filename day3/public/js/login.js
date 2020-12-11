$(document).ready(function () {
  $('#submitBtn').on('click', function (e) {
    e.preventDefault();
    var email = $('#email').val()
    var password = $('#password').val()

    $.post(
      '/users/signin',
      { email, password },
      function (res) {
        alert(res.msg)
      }
    )
  })
});