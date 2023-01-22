Welcome to the barcodeApp wiki!

# Goal
This apps purpose is to help populating product database that I will need in my master thesis.
The app will allow me to scan supermarket products and upload the products to database. 

## Used APIs:
1. Barcode scanner API: https://www.npmjs.com/package/quagga-scanner
2. Openfood facts API to find product details
3. My own backend API for storing the products to DB
   - Swagger API: https://app.swaggerhub.com/apis-docs/LINDAJAN_1/barcode_scanner/1.0.0

## Functionality
Using MediaDevices browser API together with Quagga Scanner library  
the user can scan barcodes using camera on his device. Based on the scanned barcode he can 
load product with matching barcode from public Open Food Facts database if it exists,
load product from my custom database or just use the barcode to add a new product.

Product can also be loaded from my database by typing its name into 'Produkt' field, autocompletion is implemented so if the product exists and you click on an autocompleted option it automatically loads all the information about the product stored in the database.  
When adding a product it has to be added to some category and subcategory, again autocompletion is available for existing categories in the database, if no such category exists, it gets automatically created if the user filled a custom category.
Optionally user can specify product subsubcategory or a list of superior product groups, again with autocompletion guidance.
Furthermore the user can specify prices in supported shops and products barcode.

When done editing or creating new product, it can be uploaded to the database using save button or aborted using abort button.

