// Author: TR
// 2022-08-25
const Settings = {
    'Ticknes': 10,
    'ButtonBorderWidth': '0',
    'ButtonBorderColor': 'red',
    'ButtonDiameter': '70px',
    'ButtonSelectedBgColor': 'yellow',
    'ButtonSelectedTextColor': '#000000',
    'ButtonTopOffset': '15px',
    'ButtonFontFamily': 'Verdana, Geneva, Tahoma, sans-serif',
    'ButtonFontSize': '1.2em',
    'Buttons': [{
            'color': '#000000',
            'bgcolor': '#CA3127'
        },
        {
            'color': '#000000',
            'bgcolor': '#F7921F'
        },
        {
            'color': '#000000',
            'bgcolor': '#FED151'
        },
        {
            'color': '#000000',
            'bgcolor': '#37AF4C'
        },
        {
            'color': '#000000',
            'bgcolor': '#3082C4'
        },
        {
            'color': '#FFFFFF',
            'bgcolor': '#343F4B'
        }
    ]
}

const sene_nav = () => {
    const html = {
        'NavContainer': document.getElementsByClassName('sene-nav')[0],
        'NavTip': document.getElementsByClassName('sene-nav-tip')[0],
        'Buttons': document.getElementsByClassName('sene-button')
    }
    sene_reset(html);

    for (const button of html.Buttons) {

        button.addEventListener('mouseenter', event => {
            sene_reset(html);
            event.target.style.transform = `translateY(-${Settings.ButtonTopOffset})`;
            event.target.style.zIndex = '1';
            html.NavTip.innerText = event.target.dataset.label;
            html.NavTip.style.transform = `translateX(${event.target.getBoundingClientRect().left}px)`;
        });

        button.addEventListener('mouseout', () => {
            html.NavTip.innerText = '';
            html.NavTip.style.transform = `translateX(0)`;
            sene_reset(html);
        });

        button.addEventListener('click', event => {
            for (const btn of Settings.Buttons) {
                if (btn.text == event.target.innerText) {
                    btn.selected = true;
                    html.NavContainer.style.setProperty('--nav-label-color', `${btn.bgcolor}`)
                    html.NavContainer.style.setProperty('--nav-label-transition', 'color 1s');
                } else btn.selected = false
            }
            event.target.style.backgroundColor = Settings.ButtonSelectedBgColor;
            event.target.style.color = Settings.ButtonSelectedTextColor;
            html.NavContainer.style.setProperty('--nav-label', `'${event.target.dataset.label}'`)
            sene_reset(html);
        });
    }
}

const sene_reset = (html) => {
    html.NavContainer.style.marginLeft = `${Settings.Ticknes}px`;
    html.NavContainer.style.marginTop = Settings.ButtonTopOffset;
    html.NavContainer.style.fontFamily = Settings.ButtonFontFamily;
    html.NavContainer.style.fontSize = Settings.ButtonFontSize;
    html.NavContainer.style.lineHeight = Settings.ButtonDiameter;
    for (let i = 0; i < html.Buttons.length; i++) {
        const button = html.Buttons[i];
        const style = Settings.Buttons[i];
        if (style.selected) continue;
        style.text = button.innerText;
        button.style.backgroundColor = style.bgcolor;
        button.style.color = style.color;
        button.style.zIndex = 'initial';
        button.style.marginLeft = `${0 - Settings.Ticknes}px`;
        button.style.width = Settings.ButtonDiameter;
        button.style.height = Settings.ButtonDiameter;
        button.style.lineHeight = Settings.ButtonDiameter;
        button.style.border = `${Settings.ButtonBorderWidth} solid ${Settings.ButtonBorderColor}`;
        button.style.transform = 'translateY(0)';
    }
}

window.addEventListener('DOMContentLoaded', sene_nav);