# 🦕 JURASSIC FAN STORE — Guía de Afiliados

## Cómo añadir/editar productos de afiliados

### Paso 1: Obtener tu enlace de Amazon Associates
1. Ve a [Amazon Associates](https://affiliate-program.amazon.es/)
2. Inicia sesión con tu cuenta
3. Busca el producto que quieres promocionar
4. Copia el enlace de afiliado (incluye tu tag, ej: `?tag=tu-tag-21`)

### Paso 2: Editar el archivo index.html
1. Abre `index.html` en un editor de código (VS Code, Sublime, etc.)
2. Busca la sección `<!-- AFILIADO N -->` (están numerados)
3. Cambia:
   - **Icono**: El emoji del producto
   - **Nombre**: Título del producto
   - **Descripción**: Texto atractivo
   - **Precio**: Precio actual
   - **URL**: Tu enlace de afiliado de Amazon

### Paso 3: Subir cambios
```bash
cd C:\Users\aleja\Desktop\jurassic-park-store
git add -A
git commit -m "Actualizado producto afiliado: [nombre]"
git push
```

## Estructura de una tarjeta de afiliado

```html
<div class="affiliate-card reveal">
    <div class="affiliate-card-header">
        <div class="affiliate-icon">🦖</div>  <!-- Emoji del producto -->
        <div>
            <h3>Nombre del Producto</h3>       <!-- Título -->
            <span>Subtítulo / Marca</span>      <!-- Marca o categoría -->
        </div>
    </div>
    <p>Descripción atractiva del producto...</p>  <!-- Descripción -->
    <div class="affiliate-meta">
        <span class="affiliate-price">XX,XX€</span>  <!-- Precio -->
        <span class="affiliate-commission">~X% comisión</span>  <!-- Comisión estimada -->
    </div>
    <!-- 🔗 ENLACE DE AFILIADO: Cambia esta URL -->
    <a href="https://www.amazon.es/dp/ASIN?tag=TU-TAG-21" 
       target="_blank" rel="nofollow noopener" class="btn btn-primary">
        <i class="fab fa-amazon"></i> Comprar en Amazon
    </a>
</div>
```

## Comisiones Amazon Associates (España)

| Categoría | Comisión |
|-----------|----------|
| Electrónica | 3% |
| Juguetes y Juegos | 3% |
| Ropa y Accesorios | 7% |
| Libros | 5% |
| Películas (Blu-ray/DVD) | 3% |
| Videojuegos | 2% |

## Productos recomendados para promocionar

### Figuras de Acción
- Mattel Jurassic World — Buscar ASINs en Amazon
- Schleich Dinosaurios
- Hasbro Jurassic World
- Hammond Collection

### Ropa
- Camisetas con logo de Jurassic Park
- Sudaderas Jurassic World
- Gorras y complementos

### Juegos
- LEGO Jurassic World
- Juegos de mesa
- Puzzles

### Coleccionismo
- Réplicas de huevos
- Figuras de edición limitada
- Miniaturas

## Notas importantes

- **Declaración de afiliados**: La web ya incluye un aviso en la zona de ofertas
- **nofollow**: Todos los enlaces de afiliados tienen `rel="nofollow noopener"`
- **Precios**: Actualiza los precios regularmente (los de Amazon cambian)
- **Imágenes**: Actualmente usamos emojis. Puedes añadir imágenes reales de productos si quieres
- **Tag actual**: `jurassicfan-21` (cambia cuando tengas tu propia cuenta)

## URLs de búsqueda útiles

- Amazon España: https://www.amazon.es/s?k=jurassic+world
- Amazon Associates: https://affiliate-program.amazon.es/
- Herramienta de enlaces Amazon: https://affiliate-program.amazon.es/home
