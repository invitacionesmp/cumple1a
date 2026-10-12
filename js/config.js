/* ============================================================
   CONFIGURACIÓN DE LA INVITACIÓN
   Edita solo este archivo para lo básico. El resto de los
   textos se cambian directamente en index.html.
   ============================================================ */
window.INVITACION = {

  // Fecha y hora del evento (para la cuenta regresiva).
  // Formato: AAAA-MM-DDTHH:MM:SS  (hora local del visitante)
  fechaEvento: "2026-11-14T17:00:00",

  // Música: pon tu archivo en assets/ y escribe su nombre aquí.
  musica: "assets/musica.mp3",

  // Botón "CONFIRMAR PRESENCIA".
  // WhatsApp: "https://wa.me/54XXXXXXXXXX?text=Confirmo%20mi%20asistencia"
  // Correo:   "mailto:tucorreo@gmail.com?subject=Confirmación"
  rsvpLink: "https://wa.me/",

  // Fotos del carrusel de "Galería de fotos" (se deslizan dentro del mismo recuadro).
  // Van en el orden en que las escribas; la primera es la portada.
  // Si una foto no existe en la carpeta assets/img/, simplemente se omite.
  galeria: [
    "assets/img/galeria-portada.jpg",
    "assets/img/galeria1.jpg",
    "assets/img/galeria2.jpg",
    "assets/img/galeria3.jpg",
    "assets/img/galeria4.jpg",
    "assets/img/galeria5.jpg",
    "assets/img/galeria6.jpg"
  ],

  // Avance automático del carrusel, en milisegundos (4500 = cada 4,5 segundos).
  // Pon 0 para desactivarlo. Se detiene solo cuando alguien desliza.
  carruselAuto: 4500
};
