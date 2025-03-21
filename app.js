(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // ToBuyController
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;
    toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyCtrl.buyItem = function(item) {
      ShoppingListCheckOffService.buyItem(item);
    };
  }

  // AlreadyBoughtController
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtCtrl = this;
    alreadyBoughtCtrl.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }

  // ShoppingListCheckOffService
  function ShoppingListCheckOffService() {
    var service = this;

    // Initial shopping list (to buy)
    var toBuyItems = [
      { name: "cookies", quantity: 10 },
      { name: "chips", quantity: 5 },
      { name: "apples", quantity: 8 },
      { name: "milk", quantity: 2 },
      { name: "bread", quantity: 3 }
    ];

    // Array for bought items
    var alreadyBoughtItems = [];

    // Get the "to buy" items
    service.getToBuyItems = function() {
      return toBuyItems;
    };

    // Get the "already bought" items
    service.getAlreadyBoughtItems = function() {
      return alreadyBoughtItems;
    };

    // Move item from "to buy" to "already bought"
    service.buyItem = function(item) {
      var index = toBuyItems.indexOf(item);
      if (index !== -1) {
        toBuyItems.splice(index, 1);  // Remove from "to buy"
        alreadyBoughtItems.push(item); // Add to "already bought"
      }
    };
  }
})();
