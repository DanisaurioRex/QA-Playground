@test
Feature: Shopping Site

  Scenario Outline: Add product to shopping car
    Given The product "<Product Name>" has already been created
    When I Navigate to product detail of "<Product Name>" product
    Then The product page loads properly
    And The title of product "<Product Name>" is displayed properly
    And The price of product "<Product Name>" is displayed properly
    When Increase the quantity number to <Quantity of Product>
    Then The quantity input shows <Quantity of Product> as the value
    When I Click Add to cart button
    Then Count of cart icon gets updated to <Quantity of Product>
    When Click on the Cart icon
    Then The user navigates to Cart page
    And The product "<Product Name>" shows in the list
    And The product "<Product Name>" appears with the right total amount and quantity <Quantity of Product>

    Examples:
      | Product Name          | Quantity of Product |
      | Automation_Product_01 | 7                   |
  
  Scenario Outline: Search for products and navigate to the detail page
    When I Navigate to the homepage
    Then The home page loads properly
    And The search box is present in the header of the page
    When I Fill the search input with "<Search Criteria>"
    Then Search input shows "<Search Criteria>"
    When I Press the Enter key within the search input
    Then The search results page shows up
    And <Number of Products> products are displayed
    When I Click on "<Product Name>" product
    Then The product page loads properly

    Examples:
      | Search Criteria | Product Name     | Number of Products |
      | Hoodie          | Hoodie           | 4                  |
      | Hoodie          | Testing Hoodie-C | 12                 |

