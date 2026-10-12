# Invitación · Aiza cumple un año

Es una sola página con scroll, responsive (PC y celular).

## Estructura

```
cumple1a/
├── assets/
│   ├── img/            ← fotos y decoraciones
│   └── musica.mp3      ← tu música
├── css/
│   └── style.css       ← colores y estilos
├── js/
│   ├── config.js       ← fecha, música, enlace RSVP, fotos del carrusel
│   └── script.js       ← lógica (cuenta regresiva, música, carrusel)
├── index.html          ← contenido y textos
└── LEEME.md
```

IMPORTANTE: no basta con `index.html`. La página necesita el resto de las
carpetas. Si copias solo `index.html` al celular, se ve sin diseño.
Sube o copia la carpeta completa.

## Tus fotos (carpeta `assets/img/`)

| Archivo | Dónde aparece |
|---|---|
| `foto1.jpg` | Polaroid grande de arriba |
| `foto2.jpg` | Polaroid chica de arriba |
| `galeria-portada.jpg`, `galeria1.jpg` … `galeria6.jpg` | Carrusel de "Galería de fotos" |

Mientras no estén las fotos, se ve un fondo rosado de relleno.

## Carrusel de la galería

- Es un solo recuadro de tamaño fijo: las fotos se ajustan a él (se recortan
  sin deformarse) y el recuadro nunca cambia de tamaño.
- Se desliza con el dedo en el celular y arrastrando con el mouse en la PC.
  También hay flechas (al pasar el mouse) y puntitos que indican la foto actual.
- Las fotos y su orden se definen en `js/config.js` (lista `galeria`).
  Si un archivo no existe, simplemente se omite.
- `carruselAuto` en `js/config.js` controla el avance automático
  (milisegundos; `0` lo desactiva). Se detiene solo cuando alguien desliza.

## Decoración (flores)

Todas las flores son imágenes de `assets/img/`:

- `arreglo3.png` y `arreglo4.png`: los arreglos grandes (esquinas, galería, nota, RSVP).
- `pink-flower-*.png` y `pink-rose-*.png`: flores sueltas (títulos y tarjetas).
- `acuarela-1.png` y `acuarela-2.png`: ramos de fondo que se ven solo en la PC.
  Son las dos acuarelas originales (`watercolor_...`) con el fondo blanco ya quitado.

Para cambiar una flor, cambia el nombre del archivo en el `src` correspondiente
de `index.html`. Las imágenes `pink-berry-*.png` y `pink-flower-7` a `-14`
son muy chicas (unos 30 px) y no se usan.

## Qué editar

- **`js/config.js`**: fecha de la cuenta regresiva, música, enlace del botón
  "Confirmar presencia", fotos del carrusel.
- **`index.html`**: todos los textos (nombre, fecha, lugar, horarios, mensaje).
- **`css/style.css`**: colores y tipografías en las variables de arriba (`:root`).

## Publicar en GitHub Pages

1. Sube TODA la carpeta (index.html, css/, js/, assets/).
2. En el repositorio: Settings → Pages → Branch `main` → carpeta `/ (root)`.
3. Abre el enlace que te da GitHub desde el celular.

## Notas

- La música empieza con el primer toque del visitante (los navegadores no
  permiten sonido automático). Hay un botón flotante para pausar.
- Las tipografías vienen de Google Fonts, por lo que se necesita internet.
- `assets/img/.gitkeep` solo sirve para que Git conserve la carpeta vacía;
  puedes borrarlo.
