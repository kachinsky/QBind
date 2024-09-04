$(document).ready(function () {
  $('#contact-form').submit(function (e) {
    e.preventDefault();
    const form = $('#contact-form');
    form.addClass('sending');
    $('.response').remove();
    $('div[class*=default-]').each(function () {
      this.classList.remove('error');
    });

    $.ajax({
      type: 'POST',
      url: 'form.php',
      data: form.serialize(),
      success: function (response) {
        const data = JSON.parse(response);

        if (data.success) {
          document.getElementById('modal-contact').style.display='flex';
        } else {
          data.errors.forEach((element) => {
            $(`#input-${element}`)
              .closest('div[class*=default-]')
              .addClass('error');
          });
        }
      },
      complete: () => {
        form.removeClass('sending');
      },
    });
  });
});
