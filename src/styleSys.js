let theme = (localStorage.getItem('theme'))? localStorage.getItem('theme') : 'primary'

let themes = {
    black: {
        bodyColor: '#000',
        textColor: '#dfdfdf'
    },
    primary: {
        bodyColor: '#dfdfdf',
        textColor: '#303030'
    }
}

const trimThemeKey = ()=>{
    const new_themes = {}
    for (key_theme in themes) {
        new_themes[key_theme] = {}
        for(const [key, val] of Object.entries(themes[key_theme])){
            const new_key = key.split(/(?=[A-Z])/).join('-').toLowerCase();
            new_themes[key_theme][`--${new_key}`] = val
        }
    }
    themes = new_themes
}
trimThemeKey()

const styleElement = document.createElement('style')
document.head.append(styleElement)

const styleStroke = (theme)=>{
    let stroke = ''
    for(const [key, val] of Object.entries(themes[theme])){
        stroke += `${key}:${val};`
    }
    return stroke
}

const set_theme = ()=>{
    styleElement.innerHTML = `
        body{
            ${styleStroke(theme)}
        }
    `
    localStorage.setItem('theme', theme);
}

const change_theme = ()=>{
    theme = (theme == 'primary')? 'black': 'primary'
    set_theme()
}

set_theme()

document.addEventListener('DOMContentLoaded',()=>{
    const change_theme_botton = document.getElementById('change-theme')
    change_theme_botton.onclick = ()=>{
        change_theme()
    }
})