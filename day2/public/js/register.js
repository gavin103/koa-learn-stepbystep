$(document).ready(function () {
  $('#submitBtn').on('click', function (e) {
    e.preventDefault();
    var email = $('#email').val()
    var password = $('#password').val()
    var repeatPassword = $('#repeatPassword').val()
    if (repeatPassword !== password) {
      alert('请确认密码一致')
      return
    }
    $.post(
      '/users/signup',
      { email, password },
      function (res) {
        alert(res.msg)
      }
    )
  })
});