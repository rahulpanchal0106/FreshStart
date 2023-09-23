/**
 * Created by prabhat on 10/22/15.
 */

var initial_data = [
    {
        text : 'likes your photo',
        name : 'Abhijeet',
        image : 'https://scontent.fdel1-2.fna.fbcdn.net/hprofile-xft1/v/t1.0-1/p148x148/10670210_10204845408278746_7227305120661803700_n.jpg?oh=fcab4d3a74351b7120f67ffd870b3ede&oe=568E2712',
        read : false
    },
    {
        text : 'commented on your post',
        name : 'Abhimanyu',
        image : 'https://scontent.fdel1-2.fna.fbcdn.net/hprofile-xpt1/v/t1.0-1/p148x148/12141640_10206592866093196_6981936416314778117_n.jpg?oh=5e4e8357612a7629ee09601084bb7e64&oe=56C2E97C',
        read : false
    },
    {
        text : 'posted something on your wall',
        name : 'Geet',
        image : 'https://scontent.fdel1-2.fna.fbcdn.net/hprofile-xap1/v/t1.0-1/p148x148/11855626_10207606572787008_5241155885096485589_n.jpg?oh=7dfe8db39e883cff379da166a4ed7594&oe=5687A0E7',
        read : false
    }
]

var notifications = [
    {
        text : 'commented on an item you liked',
        name : 'Akhil Varma',
        image : 'https://scontent.fdel1-2.fna.fbcdn.net/hprofile-xpf1/v/t1.0-1/c37.0.148.148/p148x148/12065771_10207311993455299_3991813075154734857_n.jpg?oh=06be1d21cb52f4e0edafc8c2c7730334&oe=56899CB5'
    },
    {
        text : 'shared a post',
        name : 'Abhijit',
        image : 'https://scontent.fdel1-2.fna.fbcdn.net/hprofile-xpf1/v/t1.0-1/p148x148/1976930_10203739966439862_769227532601458423_n.jpg?oh=5c5a15c674b82a02dba8f79529fb25ee&oe=5689855A'
    },
    {
        text : 'liked your post',
        name : 'Dhruv Srivastav',
        image : 'https://scontent.fdel1-2.fna.fbcdn.net/hprofile-xaf1/v/t1.0-1/p148x148/10612713_312244522304144_8280921939613613590_n.jpg?oh=ee7b001ed77ce685657c10063f6d45be&oe=56889109'
    }
]

$(document).ready(function(){

    // this is a self-invoked function called initially to render the notification data, checks if any data present in the local storage, otherwise renders the new data from array "initial_data"
    (function(){

        if(localStorage['notification']){
            var data = JSON.parse(localStorage['notification'])
        }else{
            data = initial_data
        }

        var count = 0

        for(var a=0;a<data.length;a++) {
            var item = data[a]
            var html = $('<div class="list-item noti">\
                            <div class="image fl">\
                                <img src="' + item['image'] + '">\
                            </div>\
                            <div class="text fl"><b class="name fl">' + item['name'] + '</b>' + item['text'] + '</div>\
                        </div>');
            $(html).data('notification', item)
//            console.log(item['read'])
            if(!item['read']){
                count = count + 1
            }else{
                $(html).addClass('background-white')
            }
            $(document).find('.notification-dropdown .items').append(html)
        }
//        $(document).find('.notify-count .value').text(count)
//        $(document).find('.notify-count').attr('count',count)
        set_notification(count)                                         // sets the notification counter
        save_localdata()                                                // updates local storage

    })();

    // click on notification bell
    $('.notification').click(function(){
        if(!$(document).find('.notification-dropdown').hasClass('dd')){
            hide_dropdown()
        }else{
            $('.notification-dropdown').removeClass('dd').addClass('dropdown-transition')
//            $(document).find('.notify-count .value').text(0)
//            $(document).find('.notify-count').attr('count',0)
            set_notification(0)
            save_localdata()
        }
    })


    // handler to close dropdown on clicking outside of it
    $(document).on('click',function(e){
        var target = $(e.target)
        if(!target.closest('.notification').length && !target.closest('.dropdown-transition').length){
            if(!$(document).find('.notification-dropdown').hasClass('dd')){
                hide_dropdown()
            }
        }
    })

    // function to close dropdown and setting notification count to 0
    function hide_dropdown(){
        $(document).find('.notification-dropdown').removeClass('dropdown-transition').addClass('dd')
        $(document).find('.notification-dropdown').find('.list-item').addClass('background-white')
//        $(document).find('.notify-count .value').text(0)
//        $(document).find('.notify-count').attr('count',0)
        set_notification(0)
        save_localdata()
    }


    // timer function toh trigger push notification in every 5 second
    setTimeout(function(){
        var push_notifications = setInterval(function(){
            if(notifications.length){
                var item = notifications[0]
                var html = $('<div class="list-item noti">\
                            <div class="image fl">\
                                <img src="'+item['image']+'">\
                            </div>\
                            <div class="text fl"><b class="name fl">'+item['name']+'</b>'+item['text']+'</div>\
                        </div>');
                $(html).data('notification',item)
                if(!$(document).find('.notification-dropdown').hasClass('dd')){
                    $(html).addClass('new-item')                                                // to change background color of new pushed notification when the dropdown is openedx to distinguish the new addition
                }
                $(document).find('.notification-dropdown .items').prepend(html)
                setInterval(function(){
                    $(html).removeClass('new-item')                                             // background color is made normal after 2 seconds
                },2000)
                var count = parseInt($(document).find('.notify-count').attr('count')) + 1
                set_notification(count)
//                $(document).find('.notify-count').attr('count',count)
//                $(document).find('.notify-count .value').text(count)
                notifications.shift()
                notifications.push(item)
                save_localdata()
            }else{
                clearInterval(push_notifications)
            }
        },5000)
    },5000)


    // function to update local storage
    function save_localdata(){
        var list = []

        $(document).find('.notification-dropdown .items .list-item').each(function(i,e){
            var data = $(this).data('notification')
            var new_data = {
                text : data['text'],
                name : data['name'],
                image : data['image']
            }
            if($(this).hasClass('background-white') || !$(document).find('.notification-dropdown').hasClass('dd')){
                new_data['read'] = true
            }else{
                new_data['read'] = false
            }
//            console.log(new_data['read'])
            list.push(new_data)
        })
        localStorage.removeItem('notification')
        localStorage.setItem("notification", JSON.stringify(list))

    }


    //function to update notification counter
    function set_notification(count){
        $(document).find('.notify-count').attr('count',count)
        $(document).find('.notify-count .value').text(count)

        if(count > 0){
            document.title = '('+count+') - Wingify notification center'                // adding notification count in window title, incase the user is on some other tab.
        }else{
            document.title = 'Wingify notification center'
        }
    }

})
