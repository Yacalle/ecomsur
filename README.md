## Requerimientos mínimos

Node 14.15.0

## Instalar y Correr la aplicación

Instalar API (backend) y la aplicacion React (front):

1. En la carpeta `root` de la aplicacion correr:
   `npm install`
2. Navegar al directorio `front` y volver a correr el comando:
   `npm install`
3. Regresa al directorio root `cd ..`.

La aplicación está compuesta de un servidor Express y una instalación básica de Create-React-App (CRA). Todo está configurado para correr con un solo comando. En la carpeta `root` ejecutamos el comando `npm run dev`

Esto correrá ambas aplicaciones (Express y CRA) al mismo tiempo.

- CRA se encuentra en:
  `http://localhost:3000/`

- El servidor se encuentra en:
  `http://localhost:5000/`

- La lista de productos se encuentra:
  `http://localhost:5000/api/products`

- Puedes encontrar cada producto por su ID:
  `http://localhost:5000/api/products/1`

- Las imágenes se encuentran en:|
  `http://localhost:5000/images/{{nombre-de-la-imagen}}`

### Resolución de la prueba técnica.

## Eliminar el create-react-app que viene por defecto e instalarlo de nuevo
Como en los archivos de la prueba viene una CRA básico, lo eliminamos y lo creamos de nuevo con el siguiente comanddo `npx create-react-app front --template redux-typescript`.
-Con el comando anterior creamos una CRA configurada para usar react redux y typescript.

#### Instalar librerias
Estando en el directorio front, instalamos las siguientes librerias:

- React router dom: nos permite manejar las rutas de la aplicacióon. Ejecutamos el comando `npm install --save react-router-dom`.

- React icons: la usamos para agregar iconos a nuestra app. `npm install react-icons --save`

- Material ui y Material ui lab: con estas librerias añadimos las estrellitas de rating a cada producto.  `npm install @material-ui/core` y `npm install @material-ui/lab`

- Axios: la usaremos para hacer peticiones a la API.  `npm install axios`.

## Crear los slices

- El siguiente paso es volver al directorio src y en la carpeta llamada features crearemos nuestros slices. En este caso serán 2. `productsSlice.tsx` (este maneja la lista de productos de la PLP) y `productsCartSlice.tsx`(este será para manejar los productos del carrito de compras). Estos se los pasamos al `store.tsx`.

### Crear infraestructura para usar React router dom
- Para esto nos vamos al archivo `App.tsx`  e importamos el BrouserRouter  (le damos un alias `{BrouserRouter as Router}`), el Switch y el Route. 

- Seguido creamos las rutas, para este proyecto solo neceitamos 3:  `/cart`, `/:productname` (esta es una ruta con paso de parámetros) y `/` (que es el home).

### Crear y estructurar la carpeta de components

- Para esto, nos movemos al directorio src y creamos la carpeta `components`. Dentro de esta, creamos 2 subcarpetas: `common` (en esta se crearan todos los componentes 'reutilizables') y `pages` (aquí van los componentes que se comportaran como páginas o views).

### Crear carpeta styles

Esta carpeta almacenará todos los archivos css de los componentes que crearemos.  Como serán pocas hojas de estilos, en este caso no haremos subdivisiones para los archivos css.

- Nos movemos al directorio src y allí la creamos.

### Crear y estilizar componente  Navbar
- En la carpeta `styles` creamos una hoja de estilos llamada `navbar.css` y la enlazams con el componente `Navbar.tsx`

- Nos movemos a la carpeta common y creamos el `Navbar.tsx`.

- Como este componente va a contener el contador del carrito de compras, es necesario utilizar el `useSeelector` para traer la información del número de productos que hay en el carro de compras y mostrarla en la UI.

### Crear y estilizar componente  Button 

Este será el boton para agregar al carrito. Tendrá el texto: `Add item to cart`

- En la carpeta `styles` creamos una hoja de estilos llamada `button.css` y la enlazamos con el componente `Button.tsx`.

- Movernos a la carpeta common y crear `Button.tsx`.

- En este commponente se crea la función `sendProductToCart`, la cual se encargará de hacer toda la validación pertinente para enviar y actualizar el estado de productos en el carro de compras.

- Esta función, con el fin de preservar el estado global también actualiza el `localStorage` con el objto `productsInCart`. Este objeto será consultado posteriormente.

- La propiedad `disable` del boton la creamos de forma condicionada. Si la popiedad `countInStock` del producto que lo contendrá es mayor a 0, quedará: `disable = true`, caso contrario: `disable=false`.

- El texto ue contendrá el botón, también está condicionado a la propiedad `countInStock`. Si `countInStock` del producto que lo contendrá es mayor a 0, quedará: `Add item to cart`, caso contrario: `No in Stock`.

- Como se está usando el localStorage en la función `sendProductToCart`, es necesario encerrar el código de la misma en un `try catch` porque hay ocasiones en que el usuario no permite ingresar a su localStorage y esto devolerá un error. Con el try catch capturamos el error en el catch para que la aplicación no se caiga.

### Crear y estilizar componente ProductCard

- En la carpeta `styles` creamos una hoja de estilos llamada `product-card.css` y la enlazamos con el componente `ProductCard.tsx`.

- Movernos a la carpeta common y crear `ProductCard.tsx`.

-En este componente se crea la función `redirectToDetailsProductPage`, la cual se va a encargar de enviar la informción de un determinado producto al `localStorage` y hacer un `history.push(removeSpacesToTexts(product.name))` para llevar al usuario a la página de detalles del producto.

- Al hacer el `history.push()` se utiliza lo que retorne la función `removeSpacesToTexts` (la cual elimina los espacios de un texto (que recibe como parámetro) y pone en su lugar un `-` para hacer la url amigable) como parámetro del método `push`.

- La función `removeSpacesToTexts` se ejecutará cuando se haga click sobre la imagen de la tarjeta de producto.

### Crear y estilizar componente ProductCardInCart

- En la carpeta `styles` creamos una hoja de estilos llamada `product-card-in-cart.css` y la enlazamos con el componente `ProductCardInCart.tsx`.

- Movernos a la carpeta common y crear `ProductCardInCart.tsx`.

- Este componenente recibe un producto como prop para pintarlo en pantalla.

- En este componente se crea la función `addQuantity` , la cual se va a encargar de  aumentar la propiedad `quantity` del producto en cuestion de 1 en 1 y de actualizar el estado de productos en carro y así mismo de actualizar el objeto `productsInCart` que está en el `localStorage`.

- Se crea las función`substractQuantity` , la cual disminuye de 1 en 1 la propiedad `quantity` del producto en cuestion y actualiza tanto el estado de productos en carro como el objeto `productsInCart` del `localStorage`.

- Tambien se crea la función `deleteProduct`, la cual elimina un producto del carro de compras.

### Crear y estilizar componente ProductDetailCard

- En la carpeta `styles` creamos una hoja de estilos llamada `product-detail-card.css` y la enlazamos con el componente `ProductDetailCard.tsx`.

- Movernos a la carpeta common y crear `ProductDetailCard.tsx`.

### Crear y estilizar componente ProductListPage

- En la carpeta `styles` creamos una hoja de estilos llamada `product-list-page.css` y la enlazamos con el componente `ProductListPage.tsx`.

- Movernos a la carpeta pages y crear `ProductListPage.tsx`.

- En este componente se usa un `useEffect` para hacer la petición a la API y actualizar una variable de estado local llamada: `data` cada vez que la página sea cargada. Utilizamos la librería  axios para hacer la petición.

- En este componente se crea la función `checkDataLocalStorageAndUpdateState` la cual se ejecuta en un `useEffect` . Esta función cumple  la tarea de consultar el `localStorage`  y ver si existe el objeto `productsInCart`. En caso que exista, se le aplica un `JSON.parse()` para convetirlo en un objeto válido de JS y luego se envía al estado globlal de productos en carro. Esto permitirá que los productos en el carrito de compras sean cargados al estado global al recargar la página.

- Se ejecuta un `map` para renderizar un componente `ProductCard` por cada producto que haya en la variabla `data`.

### Crear y estilizar componente ProductDisplayPage

- En la carpeta `styles` creamos una hoja de estilos llamada `product-display-page.css` y la enlazamos con el componente `ProductDisplayPage.tsx`.

- Movernos a la carpeta pages y crear `ProductDisplayPage.tsx`.

- En este componente también se utiliza la función `checkDataLocalStorageAndUpdateState`

- Se utiliza un `useEffect` para que cada que esta p´gina se renderice se traiga el producto almacenado prviamente en el `localStorage` por la función `redirectToDetailsProductPage` creada y ejecutada en el componente `ProductCard.tsx`

### Crear y estilizar componente CardPage

- En la carpeta `styles` creamos una hoja de estilos llamada `card-page.css` y la enlazamos con el componente `CardPage.tsx`.

- Movernos a la carpeta pages y crear `CardPage.tsx`.

- En este componente se crea la función `valueTotal`, la cual se encargará de calcular el valor total de productos en el carro de compras.

- Se hace un renderizado condicional. Si la longitud de la variale `products` (que contiene los productos en el carro de compras) es diferente de 0, se renderiza el componente `ProductCardInCart` y si es igual a 0, se renderiza un `span` que dice `[No products in cart]`.

- También se hace un renderizado condicional para saber si se debe renderizar o no el div con la clase `cart-page__total-compra`. ste renderizado también depende de la variable `products` .

- En este componente también se utiliza la función `checkDataLocalStorageAndUpdateState`.








