// js/mi_script.js

// Esto es para asegurarme de que toda la página HTML se haya cargado antes de que mi script intente hacer algo.
document.addEventListener("DOMContentLoaded", function () {
  // Aquí busco mi formulario en el HTML usando su ID.
  // El '#' antes de 'mi-formulario-de-contacto' significa que estoy buscando un ID.
  const miFormulario = document.getElementById("mi-formulario-de-contacto");

  // Reviso si encontré el formulario, para no tener errores si no existe.
  if (miFormulario) {
    // Le digo al formulario que cuando alguien intente "enviarlo" (haga clic en el botón de submit),
    // ejecute una función que yo voy a definir.
    miFormulario.addEventListener("submit", function (evento) {
      // Esto es importante: evita que el formulario se envíe de la forma normal (recargando la página).
      // Yo quiero controlar qué pasa, por eso lo prevengo.
      evento.preventDefault();
      console.log("Se intentó enviar el formulario, ¡pero yo lo detuve!"); // Para ver en la consola que funciona

      // Ahora voy a agarrar los valores que la persona escribió en cada campo.
      // Uso .value para obtener lo que está escrito, y .trim() para quitar espacios de más al inicio o al final.
      const nombreIngresado = document
        .getElementById("nombre-form")
        .value.trim();
      const apellidoIngresado = document
        .getElementById("apellido-form")
        .value.trim();
      const emailIngresado = document.getElementById("email-form").value.trim();
      const mensajeIngresado = document
        .getElementById("mensaje-form")
        .value.trim();

      // Voy a suponer que todo está bien al principio.
      let todoCorrecto = true;
      // Y preparo un mensaje por si hay errores.
      let textoDeError = "Faltaron algunos datos\n";

      // ----- Verificación del Nombre -----
      if (nombreIngresado === "") {
        // Si el campo nombre está vacío...
        textoDeError = textoDeError + "Introduzca  el nombre\n"; // Añado esto al mensaje de error.
        todoCorrecto = false; // Marco que algo no está bien.
        document.getElementById("nombre-form").classList.add("campo-con-error"); // Le pongo una clase para que se vea rojo en la página.
      } else {
        document
          .getElementById("nombre-form")
          .classList.remove("campo-con-error"); // Si está bien, le quito la clase roja (si la tenía).
      }

      // ----- Verificación del Apellido -----
      if (apellidoIngresado === "") {
        textoDeError += "introduzca su apellido\n"; // Usé += que es lo mismo que textoDeError = textoDeError + ...
        todoCorrecto = false;
        document
          .getElementById("apellido-form")
          .classList.add("campo-con-error");
      } else {
        document
          .getElementById("apellido-form")
          .classList.remove("campo-con-error");
      }

      // ----- Verificación del Email -----
      if (emailIngresado === "") {
        textoDeError += "- El Email no puede faltar.\n";
        todoCorrecto = false;
        document.getElementById("email-form").classList.add("campo-con-error");
      } else if (!esUnEmailValido(emailIngresado)) {
        // Si no está vacío, reviso si parece un email de verdad.
        textoDeError += "- El formato del Email no parece correcto.\n";
        todoCorrecto = false;
        document.getElementById("email-form").classList.add("campo-con-error");
      } else {
        document
          .getElementById("email-form")
          .classList.remove("campo-con-error");
      }

      // ----- Verificación del Mensaje -----
      if (mensajeIngresado === "") {
        textoDeError += "- No te olvides de escribir un Mensaje.\n";
        todoCorrecto = false;
        document
          .getElementById("mensaje-form")
          .classList.add("campo-con-error");
      } else {
        document
          .getElementById("mensaje-form")
          .classList.remove("campo-con-error");
      }

      // ----- ¿Qué hago después de verificar todo? -----
      if (todoCorrecto) {
        // Si todo está bien, ¡genial! Muestro un mensaje de éxito.
        alert(
          "¡Mensaje enviado!\n\n" +
            "Nombre: " +
            nombreIngresado +
            "\n" +
            "Apellido: " +
            apellidoIngresado +
            "\n" +
            "Email: " +
            emailIngresado +
            "\n" +
            'Mensaje: "' +
            mensajeIngresado +
            '"'
        );

        // Y dejo el formulario limpio para que se pueda usar otra vez.
        miFormulario.reset();
        // También quito las clases de error de todos los campos, por si acaso.
        document.querySelectorAll(".campo-con-error").forEach(function (campo) {
          campo.classList.remove("campo-con-error");
        });
      } else {
        // Si algo no estaba bien, muestro el mensaje con los errores.
        alert(textoDeError);
      }
    });
  } // Fin del if (miFormulario)

  // Esta es una función  me ayuda a ver si un email tiene un formato que parece válido.
  // Usa algo llamado "expresión regular", que es como un patrón para buscar texto.
  function esUnEmailValido(email) {
    const patronDelEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Un patrón simple para un email.
    return patronDelEmail.test(email); // Devuelve true (verdadero) si coincide, o false (falso) si no.
  }

  // ----- Extra: Quitar el borde rojo cuando empiezo a escribir -----//
  // Busco todos los input y textarea del formulario
  const camposDelFormulario = miFormulario.querySelectorAll("input, textarea");
  // Para cada uno de ellos...
  camposDelFormulario.forEach(function (campo) {
    // Cuando empiezo a escribir algo en el campo ('input' event)...
    campo.addEventListener("input", function () {
      // Si este campo tiene la clase 'campo-con-error'...
      if (this.classList.contains("campo-con-error")) {
        // Se la quito. Así el borde rojo desaparece mientras escribo.
        this.classList.remove("campo-con-error");
      }
    });
  });
}); 
