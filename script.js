var loremIpsum; // full lorem ipsum text file
var loremDiv; // div showing rendered lorem ipsum
var charactersInput = document.getElementById("characters"); // input defining counter of letters
var fixedLength = document.getElementById("fixedlength"); // checkbox whether to set length of line
var lineLength = document.getElementById("linechars") // lenght of line in characters
var labelLineLength = document.getElementById("labellinechars") // label for this input "lenght of line in characters"
var loremIpsumStyled; // styled lorem ipsum returned into div
var loremIpsumStyledTemp;

function readLorem() {
  var rawFile = new XMLHttpRequest();
  var url = "https://simpel.cc/lorem/loremipsum.txt";
  rawFile.open("GET", url, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        loremIpsum = rawFile.responseText;
        loremIpsum = decodeURIComponent(loremIpsum);
        loremDiv = document.getElementById("loremipsum");
        loremDiv.innerText = loremIpsum.substr(0, charactersInput.value);
      }
    }
  }
  rawFile.send(null);
}
readLorem();

function trimLorem(characters) {
  if (characters < 0) {
    characters = 0;
    charactersInput.value = characters;
  }
  if (characters > 49015) {
    characters = 49015;
    charactersInput.value = characters;
  }
  loremIpsumStyled = loremIpsum.substr(0, characters);
  loremDiv.innerText = loremIpsumStyled;
  paraLorem();
}

function paraLorem(paras) {
  loremIpsumStyledTemp = "";
  let paragraphsSelect = document.getElementById("paragraphs");
  let paragraphs = paragraphsSelect.value;
  let characters = charactersInput.value;
  let minValue, maxValue;
  switch (paragraphs) {
    case "none":
      minValue = characters;
      maxValue = characters;
      break;
    case "small":
      minValue = 150;
      maxValue = 450;
      break;
    case "middle":
      minValue = 450;
      maxValue = 750;
      break;
    case "big":
      minValue = 750;
      maxValue = 1050;
  }

  let paraLength = getRndInteger(minValue, maxValue);
  const regexp = new RegExp('(.{' + paraLength + ',}?[.?!])\s*|(.+\\.)$','gm');
  const str = loremIpsum
  const matches = str.matchAll(regexp);

  for (const match of matches) {
    loremIpsumStyledTemp = loremIpsumStyledTemp + '\n\n' + capitalize(match[0]);
    // console.log(`start=${match.index} end=${match.index + match[0].length} ${match[0]}`);
    if (loremIpsumStyledTemp.length >= characters) {
      break;
    }
  }

  loremIpsumStyledTemp = loremIpsumStyledTemp.trim();
  loremIpsumStyled = loremIpsumStyledTemp.substr(0, characters - 1) + '.';
  loremDiv.innerText = loremIpsumStyled;
}

// Capitalize first letter of a string
const capitalize = (str) => {
  if (typeof str === 'string') {
    // Remove leading spaces
    str = str.replace(/^\s+/, "");
    // Capitalize first letter
    str = str.replace(/^\w/, c => c.toUpperCase());
    return str;
  } else {
    return '';
  }
};

// returns a random number between min and max (both included)
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fixLine() {
  let fixSet = fixedLength.checked;
  let chars = lineLength.value;
  switch (fixSet) {
    case true:
      loremDiv.style.width = chars + "ch";
      loremDiv.style.fontFamily = "monospace";
      lineLength.disabled =! fixSet;
      labelLineLength.classList.remove("disablelabel");
      break;
    case false:
      loremDiv.style.width = "inherit";
      loremDiv.style.fontFamily = "inherit";
      lineLength.disabled =! fixSet;
      labelLineLength.classList.add("disablelabel");
  }

}

function fixChars() {
  let chars = lineLength.value;
  loremDiv.style.width = chars + "ch";
}

function copyLorem() {
  loremDiv = document.getElementById("loremipsum");
  let allText = loremDiv.innerText;

  if (fixedLength.checked == true) {
    let chars = lineLength.value;
    const regexp = new RegExp('(.{1,' + chars + '}) ', 'gm');
    const subst = '$1\n';
    allText = allText.replace(regexp, subst);
    allText = allText.replace(new RegExp('\\n(.+)$', 'g'), ' $1');
  }
  console.log(allText);
  navigator.clipboard.writeText(allText)
}
