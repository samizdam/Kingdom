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
        * Основные методы
        * @type {{}}
        */
        var action = {
            /**
             * Получение элемента инвентаря по id
             * @param id
             * @returns {*}
             */
            getItemById: function(id) {
                var item = window.inventory.filter(function(i) {
                    return i.itemId==id;
                });

                return item[0];
            }
        }

        /**
         * Отображение всего, что касается инвентаря
         * @type {{allItems: allItems}}
         */
        var views = {

            allItems: function() {

                var html = '';
                window.inventory.forEach(function (item) {
                    html += '<div class="item" data-id="'+item.itemId+'"><img src="/img/items/' + item.pic + '.png"></div>';
                });

                $inventory.children('.items-list').html(html)
                    .on('mouseover','.item',function() {
                        var item = action.getItemById($(this).attr('data-id'));

                        /**
                         * выделение слотов, куда можно одеть предмет
                         */
                        item.allowedSlots.forEach(function(as) {
                            $('.'+as).css({'box-shadow':'0 0 4px 2px rgba(255,255,255,0.8)'});
                        });

                    })
                    .on('mouseout','.item',function() {
                         $('.slot').css({'box-shadow':'0 0 0 0'});
                    });

                console.log(window.inventory);
            }

        };

        return {
            init: function () {
                $('.open-inventory-button').on('click', function () {
                    openInventory();
                });


                $inventory.find('.close-button').on('click', function () { // кажется children работает быстрее fined, но не увере, надо почитать
                    $room.show();
                    $userInfo.hide();
                    $inventory.hide();
                });
            },

            setInventory: function(obj) {
                window.inventory = obj;
                views.allItems();
            }

        }
    })();

return Inventory;
});