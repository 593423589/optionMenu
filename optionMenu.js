function _init(height) {
    let nod = document.createElement('style');
    nod.textContent = `
    @keyframes menu_in {
        from{
          bottom: 0;
        }
        to{
           bottom : ${height}px;
        }
    }
    @keyframes menu_out {
        form{
           bottom : ${height}px
        }
        to{
          bottom: 0
        }
    }
`;
    document.head.appendChild(nod);
}

function createMenu(options, height, menuStyle, maskStyle, rootDom) {
    let createMenu = () => {
        let menuList = document.createElement('div');
        let attr = document.createAttribute("style")
        let optionHeight = parseInt(height / options.length)
        attr.value = menuStyle || `
        position: fixed;
        bottom:${-height}px;
        height:${height}px;
        width :100%;
        background: #fff;
        transition: bottom 100ms linear;
        `
        menuList.setAttributeNode(attr)

        options.map((value) => {
            let option = document.createElement('div');
            let optionAttr = document.createAttribute("style")
            optionAttr.value = `
        height:${optionHeight}px;
        width :100%;
        text-align: center;
        font-weight: 500;
        font-size: 15px;
        color:#666;
        line-height: ${optionHeight}px;
        border-bottom:1px solid #aaa;
        `
            option.addEventListener('click', () => {
                value.callback()
                hideBox()
            })
            option.setAttributeNode(optionAttr)
            option.append(value.content)
            menuList.appendChild(option)
        })
        return menuList
    }
    let createBox = () => {
        let mask = document.createElement('div');
        let attr = document.createAttribute("style")
        let menu = createMenu()
        attr.value = maskStyle || `
        position: fixed;
        top:0;
        height:100%;
        width :100%;
        z-index: 10000;
        background: #0008;
        visibility: hidden;
        animation: menu_in 1000ms;
`
        mask.setAttributeNode(attr)
        mask.addEventListener('click', hideBox)
        mask.appendChild(menu)
        return {
            box: mask,
            list: menu
        }
    }
    let {box, list} = createBox()
    if (!rootDom) {
        let rootBox = document.createElement('div');
        document.querySelector('body').appendChild(rootBox)
        rootDom = rootBox
    }
    rootDom.appendChild(box)

    function showBox() {
        box.style.visibility = 'visible';
        list.style.bottom = 0
    }

    function hideBox() {
        box.style.visibility = 'hidden';
        list.style.bottom = `${-height}px`
    }

    return {
        showBox, hideBox
    }
}

class omInit {
    static om = null;

    constructor(option, height = 100, menuStyle, maskStyle, rootDom) {
        _init(height)
        if (Object.prototype.toString.call(option).slice(8, -1) === 'Array') {
            omInit.om = createMenu(option, height, menuStyle, maskStyle, rootDom)
        } else {
            throw new Error(`option must be Array type `)
        }
    }

    show() {
        omInit.om.showBox()
    }

    hide() {
        omInit.om.hideBox()
    }
}

export default omInit
