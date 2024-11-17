// * Generate a Message
function notificacion_simple(obj) {
  Swal.fire({
    title: obj["title"],
    text: obj["text"],
    icon: obj["icon"],
    timer: 2000,
  });
}

// * Confirm Dialog
function alert_action(title, content, callback, cancel) {
  $.confirm({
    theme: "material",
    title: title,
    icon: "fas fa-exclamation-triangle",
    content: content,
    columnclass: "small",
    typeAnimated: true,
    cancelButtonClass: "btn-primary",
    draggable: true,
    dragWindowBorder: false,
    buttons: {
      info: {
        text: "Si",
        btnClass: "btn-primary",
        action: function () {
          this.close();
          callback();
        },
      },
      danger: {
        text: "No",
        btnClass: "btn-red",
        action: function () {
          this.close();
          cancel();
        },
      },
    },
  });
}
