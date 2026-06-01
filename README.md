# 🦕 Jurassic Hub

**El portal de referencia en español sobre dinosaurios, Jurassic Park y Jurassic World.**

Portal de contenido SEO con tienda de afiliados. Desplegado en GitHub Pages.

---

## 🚀 Configuración inicial

### 1. Activar GitHub Pages

1. Ve a **Settings → Pages** en tu repositorio
2. En **Source**, selecciona **GitHub Actions**
3. El workflow de `deploy.yml` se encargará del resto automáticamente

### 2. Dominio personalizado (opcional)

1. En **Settings → Pages → Custom domain**, introduce tu dominio (ej: `jurassichub.es`)
2. Crea un fichero `CNAME` en la raíz con tu dominio:
   ```
   jurassichub.es
   ```
3. Configura los DNS de tu dominio con registros A:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

### 3. Configurar Amazon Associates

**IMPORTANTE:** Antes de publicar, reemplaza todos los enlaces de afiliado:

Busca en todos los archivos HTML las cadenas `amzn.to/TUCODIGO` y reemplázalas con tus enlaces reales de Amazon Associates.

**Cómo obtener tus enlaces de afiliado:**
1. Regístrate en [Amazon Associates](https://afiliados.amazon.es/)
2. Busca cada producto y genera tu enlace de afiliado
3. Reemplaza los placeholders en el código

### 4. Configurar Google Analytics (recomendado)

Añade este código antes del `</head>` en todos los archivos HTML:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 5. Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Añade tu propiedad (dominio o URL prefix)
3. Verifica la propiedad
4. Envía el sitemap: `https://tusitioweb.com/sitemap.xml`

---

## 📅 Calendario editorial (artículos programados)

Los artículos se publican automáticamente según su `data-publish-date` en el HTML. El sistema JavaScript los muestra/oculta basándose en la fecha actual.

| Fecha | Artículo | Tipo |
|-------|----------|------|
| 1 Mayo 2025 | Los dinosaurios más grandes | Contenido |
| 28 Abril 2025 | Legado de Jurassic Park | Cine |
| 12 Mayo 2025 | T-Rex vs Spinosaurus | Ciencia |
| 15 Jun 2025 | ADN de dinosaurio | Ciencia |
| 1 Jul 2025 | Velociraptor: mitos | Dinosaurios |
| 15 Jul 2025 | Mejores figuras 2025 | **Tienda ⭐** |
| 1 Ago 2025 | Jurassic World Dominion | Cine |
| 15 Ago 2025 | ¿Eran inteligentes? | Ciencia |
| 1 Sep 2025 | Mejores libros 2025 | **Tienda ⭐** |
| 15 Sep 2025 | El Spinosaurus acuático | Paleontología |
| 1 Oct 2025 | Mejores LEGO 2025 | **Tienda ⭐** |
| 15 Oct 2025 | Los 10 dinosaurios más rápidos | Ciencia |

---

## 📁 Estructura del proyecto

```
jurassic-hub/
├── index.html              # Homepage
├── articulos.html          # Listado de artículos
├── tienda.html             # Tienda de afiliados
├── sobre-nosotros.html     # Sobre el sitio
├── politica-privacidad.html
├── aviso-legal.html
├── css/
│   └── style.css           # Hoja de estilos global
├── js/
│   └── main.js             # JavaScript principal
├── articles/
│   ├── dinosaurios-mas-grandes.html
│   ├── trex-vs-spinosaurus.html
│   ├── jurassic-park-legado.html
│   └── ... (artículos programados)
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions CI/CD
```

---

## 🛠 Añadir un nuevo artículo

1. Copia `articles/dinosaurios-mas-grandes.html` como plantilla
2. Actualiza: título, meta description, contenido, fecha, tiempo de lectura
3. Añade `data-publish-date="YYYY-MM-DD"` si quieres programarlo
4. Añade el enlace en `articulos.html`
5. Añade el enlace en `index.html` si es destacado
6. Haz commit y push — el deploy es automático

---

## 💰 Estrategia de afiliados

**Artículos de contenido** (70%): Paleontología, ciencia, cine → traen tráfico orgánico
**Artículos de guía** (30%): "Mejores X", "Guía de compra" → convierten a ventas

Cada artículo de contenido incluye:
- Un "article-cta" inline que lleva naturalmente a la tienda
- Sidebar con 2-3 productos relacionados
- Sin ser intrusivos: el contenido es siempre lo primero

---

## 📊 SEO Tips

- Cada página tiene title único, meta description y canonical URL
- Schema.org markup en artículos (Article) y en la homepage (WebSite)
- Breadcrumbs en páginas de artículos
- Heading hierarchy correcta (h1 > h2 > h3)
- Alt text en todas las imágenes cuando las añadas
- Internal linking entre artículos relacionados

---

## 📬 Contacto

Para sugerencias, errores o colaboraciones, abre un issue en este repositorio.

---

*Jurassic Hub © 2025 · Participante en Amazon Associates España*
