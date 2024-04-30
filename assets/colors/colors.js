const colorsLight = {
    bgColor: '#FFFFFF',
    bgColorSec: '#373737',
    bgColorTer: '#f2f2f2',

    textColorPri: '#474747',
    textColorSec: '#ffffff',
    textColorTer: '#ffffff',

    white : '#FFFFFF',
    black : '#000000',
    gray : '#d6d6d6', 
    disabled: '#f2f2f2',

    border : '#474747',

    primary : '#ff1463', //red
    primaryLight : '#fff0f5', //light red

    gold: '#FFD700',

    transparentDark: 'rgba(0, 0, 0, 0.5)',

    success : '#20a840',
    danger : '#d43b24',
    warning : '#db913b',
    info : '#3b70db',

    successLight : '#6ac47f',
    dangerLight : '#ffe8e8',
    warningLight : '#fffae8',
    infoLight : '#e8f1ff',

    bgGold: '#fff9e2',
    bgSilver: '#cccccc',
    bgBronze: '#ffe6cc',

}

const colorsDark = {
  bgColor: '#373737',
  bgColorSec: '#FFFFFF',
  bgColorTer: '#f2f2f2',

  textColorPri: '#fff7fa',
  textColorSec: '#373737',
  textColorTer: '#373737',

  white : '#FFFFFF',
  black : '#000000',
  gray : '#d6d6d6', 
  disabled: '#f2f2f2',

  border : '#fff7fa',

  primary : '#E0115F', //pink
  primaryLight : '#f7faff', //light blue

  gold: '#FFD700',

  transparentDark: 'rgba(0, 0, 0, 0.5)',

  success : '#20a840',
  danger : '#d43b24',
  warning : '#db913b',
  info : '#3b70db',

  successLight : '#6ac47f',
  dangerLight : '#ffe8e8',
  warningLight : '#fffae8',
  infoLight : '#e8f1ff',

  bgGold: '#fff9e2',
  bgSilver: '#cccccc',
  bgBronze: '#ffe6cc',
}

const getThemeColors = () => {
  let theme = 'light'; // get from async storage

  if (theme === 'light') {
    return colorsLight;
  } else {
    return colorsDark;
  }
};

const colors = getThemeColors();

export { colors };