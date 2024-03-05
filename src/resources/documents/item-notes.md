# Investigación de la información del artículo.


## Léxico.

- El *«artículo»* es la página principal que muestra los productos que vende.
- Los *«productos»* son los productos finales que se venden en la página del artículo. Estos pueden ser el mismo producto pero cambiando el color; inclusive modelos diferentes o productos muy diferentes entre sí.

## Introduccion.
Estos son los hallazgos de explorar el JavaScript de la página principal del artículo. Toda la información se encuentra en la variable de JavaScript: `window.runParams` > `data`.

### Propiedades.

- `tradeComponent`: cantidad de productos vendidos.
- `redirectComponent`: pendiente de revisar qué información describe, ya que actualmente viene vacío para el artículo  1005005424987520.
- `sellerComponent`: viene información de del comprador, algunos datos interesantes son que describe si es un minorista, o tiene plazas en España o Rusia.
- `productPropComponent`: tiene los atributos del producto. Los que se muestran casi al final de la página.
- `skuComponent`: lista las variantes de los productos. Puede ser color, modelo, tipo de enchufe eléctrico u otros.
- `packageComponent`: contiene el tamaño y peso del paquete. En medida americana e inglesa.
- `productTagComponent`: pendiente de revisar. Se ve que tiene informacion como `topItem`, `invalidBuyNow`, `"deliveryMigrate": true`, entre otros.
- `blacklistComponent`: tiene una sub-propiedad verdadero/falso `inBlackList`. Revisar si es una preferencia del usuario o del sistema.
- `priceComponent`: muestra toda la información de los productos con respecto de sus precios.
  - `skuJson`: contiene un JSON con el resumen de los SKUs. Es una variable de texto en JavaScript que contiene un JSON con escape de caracteres por obvias razones.
  - `skuPriceList`: una lista de productos con sus precios.
    - `skuVal`: información de los precios.
    - `skuPropIds`: configuración del producto de acuerdo con sus propiedades.
    - `skuId | str`: el ID del SKU.
    - `freightExt`: precio original en dólares y otra información que no logré descifrar.
  - `discountPrice`: contiene el precio mínimo y máximo con descuento de todos los productos.
  - `origPrice`: contiene el precio mínimo y máximo original de todos los productos.
  - `priceLocalConfig`: propiedades para visualizar el precio en la página.
- `webCouponInfoComponent`: almacena información referente a los cupones disponibles.
- `categoryComponent`: contiene información de la categoría principal y secundaria.
- `buriedLogComponent`: hay una propiedad que dice `choice3:false`, la cual no logro descifrar.
- `productInfoComponent`: información de la página del artículo.
- `storeHeaderComponent`: contiene información de la tienda.
- `promotionComponent`: muestra las promociones que aplican para todos los productos.
  - `purchaseLimitNumMax`: indica el límite de artículos a comprar. 
- `sellerPromiseComponent`: almacena información de las promesas de garantía.
- `storeFeedbackComponent`: puntaje y nivel de la tienda.
- `webGeneralFreightCalculateComponent`: información del flete.
  - `originalLayoutResultList` > 0 > `bizData`: contiene mucha información del envío y modificaciones.
  - `deliveryExtraInfoMap`: contiene información del envío y promociones.
- `imageComponent` contiene las URLs de imágenes de los productos.
- `userComponent`: información básica del país del usuario.
- `currencyComponent`: muestra la moneda base, la moneda del usuario y el tipo de cambio.
- `feedbackComponent`: almacena las estadísticas generales de la página principal del artículo.


## Examples.

I used some URLs to do some testing. I'm trying to get different types of item pages to cover all the possibilities.

- https://es.aliexpress.com/item/1005005424987520.html
- https://es.aliexpress.com/item/1005005913925017.html
- https://es.aliexpress.com/item/1005006016288213.html
- https://es.aliexpress.com/item/1005006427599086.html
- https://es.aliexpress.com/item/1005006113315011.html
- https://es.aliexpress.com/item/1005006485810735.html
- https://es.aliexpress.com/item/1005006296391749.html
- https://es.aliexpress.com/item/1005002724686123.html
- https://es.aliexpress.com/item/1005005714394639.html
- https://es.aliexpress.com/item/1005004787627817.html
- https://es.aliexpress.com/item/1005005709028962.html
