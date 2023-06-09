// Create a file (firebase.js) to configure and export the Firebase object. 
// Import the database object, and any required Firebase modules at the top of the main app file (app.js)

// Initialize the database and create a refernce to the database with getDatabase() and ref()

/* HTML/CSS FOR CART */
// Start with html and css to have a visual framwork to implement javascript with
// As a note, we realize that the items in the cart need to be added dynamically with JS so depsite some of the steps below seem like JS pseudocode, we're just putting it there for ease of understand.

/* Steps for the cart container:
    1. Make pop out cart section when cart a tag clicked ** consider adding a new page for the cart for easy of js coding
    2. Set background color to be the same as either color of background color for website
    3. Make it take up with of between 30-50% of page (in desktop mode)
    4. Take up entire screen in mobile and tablet view
    5. Make navbar sticky so user can access cart when scrolling
    6. Have cart container not visible (display: none)
    7. Need to make position aboslute so it can be moved at will
    8. Shift the container into view when cart icon is clicked - use top/left/right/bottom values
    9. Add transition effect to make it smooth
    10. Hide container when icon clicked

    Need to add 0 to cart icon in nav bar to show incrementation:
        1. Make a seperate div to hold the number
        2. Make cart icon relative
        3. Make the div number absolute (should be child of cart)
        4. Place in top right corner of cart icon*/

/* Steps for cart items:
    1. Create div and ul elements to hold cart containers
    2. Add place holder li elements to figure out styling for the items in cart
    3. Need to style image, price, item name, quantity, and an add/remove button
    4. Need to remove list styling on ul
    5. Need to add classnames/ids to items to know which item is which for database

    FOR DESKTOP SCRREN SIZE:
        1. have items list out horizontally or left to right (the '/' means items stacked vertically) - image-->name/price-->add/remove button-->quantity
        2. May need to separate some elements into their own containers (like the name and price so that they can stack veritcally)
        3. New list items should stack horizontally (already done with how list functions, but can add flexbox to help style more cleanly)
        4. If item list exceeds screen size, overflow option scroll shoudl be avaiable or add a 'view rest of cart' button to bring to a new page to see all contents in the cart

    FOR MOBILE SCREEN SIZE:
        1. Instead of having the add/remove button in line with each item, have it placed at the top of the cart container
        2. Make the list items have radio buttons instead to allow the add and remove functionality
        3. It may be better to have the 'view rest of cart' button here or entirely go to a new page for ease of styling an js code.
        */

/* JS FUNCTIONALITY FOR CART:
    CART POP OUT:
        1. Add event listener to cart Icon to listen for click
        2. When cart icon clicked, display needs to be set to visible
        3. When cart icone clicked again, display needs to be set to none
        
    ADDING ITEMS:
        1. Add event listeners to all cart icons for items
        2. Use queryselectAll with a for loop - can also display all items dynamically through firebase on the webpage as well
        3. First step is to get item number to increment as per MVP
        
        CART INCREMENT FUNCTIONALITY":
            1. When item is added to cart, number in top right corner should increase
            2. When eventlistener fires regardless of the item, need to change the value of the counter
            3. target counter -> use document.querySelector
            4. need to parseInt the text content of the counter
            5. Add 1 to the current amount and save it in a new variable.
            6. Make the counter.textContent = the the new variable number
            
        
        SHOW ITEMS IN CART:
            1. Need to access database and access values associated with items
            2. Make an array for the cartItems and webpage/store items
            3. Need to have value for quantity and inCart boolean for each item in database
            
            GET ITEMS IN DATABASE AND DISPLAY ITEMS ON WEBPAGE AND IN CART WHEN ADDED:
                1. Start simple - use onValue to access the database and values
                2. can create an array to hold all items which will be used to show all items on the main page and cart container
                3. check if data exists, save .items object in variable (payload)
                4. loop through objects using for in loop and push all items to the array
                5. Make sure the cart items container is totally empty by setting length to 0
                6. Call both display functions in onValue to display items and make necessary changes
                
                TO DISPLAY ITEMS ON PAGE DYNAMICALLY:
                    1. make a new function that takes two arguments, an array of items and node which acts as a plceholder for items being added
                    2. set node.innerHTML = '' to make sure it starts empty.
                    3. go through the array with a forEach and create all elements necessary for the items (img, name, price, price change, cart icon button and anything else) --> const '' = document.createElement('");
                    4. add values necessary by accessing database items (make img = database item.src or the whatever the img url's value is)
                    5. append items to li and then append that li to node
                    
                TO DISPLAY ITEMS IN CART
                    1. Need to make similar function to displaying items on page (steps 1-5)
                    2. Need to add an add and remove button to createElements
                    3. Need an updateCart function to track changes in the cart
                    4. need to target the button to add items to cart (anchor tag for cart icon in each item)
                    5. Make variable to hold the data base items like so --> ref(database, `/items/${itemId}`)
                    6. Use update(itemRef, updatedData) to update the boolean condition as well as the quantity
                    7. Set updatedData in a variable to track changes in the quantity and inCart boolean
                    8. Need to set variables to track quantity by doing somethign like itemQuantity + newQuantity
                    
        REMOVE ITEMS:
            1. Add event listner to remove button in cart
            2. When button is pressed, subtract quantity by 1
            3. Make sure that the quantity value in the database is set to a NUMBER and not a string*/

                
