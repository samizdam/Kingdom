define(['jquery'], function ($) {

var Inventory = (function() {

    var $room = $('#game-room');
    var $inventory = $('#game-inventory');
    var $userInfo = $('#game-user-info');

    var allHide = function() {
        $room.hide();
        $userInfo.hide();
    }

    var openInventory = function() {
        if (typeof (window.inventory) != 'undefined' && window.inventory!='') {
            allHide();
            $inventory.show();
        }
        else {
            console.log('Инвентарь еще не загружен!');
        }
    }

    /**
     * Отображение всего, что касается инвентаря
     * @type {{allItems: allItems}}
     */
    var views = {

        allItems: function() {
            var html = '';
            window.inventory.forEach(function(i) {
                html += '<div class="inventoryItem"><img src="/img/items/'+ i.pic+'.png"></div>';
            });
            $inventory.children('.container').html(html);
        }

    }

    return {

        init: function() {
            $('.open-inventory-button').click(function () {
                openInventory();
            });

            $inventory.find('.close-button').click(function () { // кажется children работает быстрее fined, но не увере, надо почитать
                $room.show();
                $userInfo.hide();
                $inventory.hide();
            });
        },

        setInventory: function(obj) {
            window.inventory = obj;
            views.allItems();
        },

        getInventory: function() {
            return window.inventory;
        }

    }
})();

return Inventory;
});