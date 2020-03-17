# optionMenu
一个从屏幕底部弹出的选项卡&amp;菜单栏

# optionMenu原理
optionMenu.js是一个原生js组件，它暴露了一个omInit类，使用时需要实例一个omInit对象，在实例化之前传入一个包含多个对象的数组，每个对象都必须具有content、callback键及其两个键值，分别代表选项卡的文本内容和回调函数。  omInit对象具有两个方法show() 、hide()供显示、隐藏optionMenu。

# optionMenu使用
    import optionMenu from '../assets/optionMenu/optionMenu'

    const option = [
      {
        content: 'say 1',
        callback(){
            console.log('1');
        }
      },
      {
        content: 'say 2',
        callback(){
            console.log('2');
        }
      }
     ]
     
    const optionMenus = new optionMenu(option)

    export default {
        methods: {
            dispalyOptionMenus() {
                optionMenus.show()
            },
            hideOptionMenus(){
                optionMenus.hide()
            }
        }
    }
