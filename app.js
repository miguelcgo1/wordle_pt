const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');

function getRandomIndex(wordArray) {
    const arrayLength = wordArray.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    return randomIndex;
}

const wordsList = [
    'SAGAZ', 'AMAGO', 'NEGRO', 'ÊXITO', 'MEXER', 'TERMO', 'NOBRE', 'SENSO',
    'AFETO', 'ALGOZ', 'ÉTICA', 'PLENA', 'MÚTUA', 'TÊNUE', 'FAZER', 'SUTIL',
    'ASSIM', 'VIGOR', 'AQUÉM', 'PORÉM', 'SEÇÃO', 'AUDAZ', 'SANAR', 'FOSSE',
    'CERNE', 'IDEIA', 'INATO', 'PODER', 'MORAL', 'DESDE', 'SOBRE', 'JUSTO',
    'MUITO', 'TORPE', 'HONRA', 'QUIÇÁ', 'FÚTIL', 'SONHO', 'RAZÃO', 'ETNIA',
    'ANEXO', 'ÍCONE', 'ÉGIDE', 'AMIGO', 'TANGE', 'LAPSO', 'EXPOR', 'MÚTUO',
    'HAVER', 'DENGO', 'CASAL', 'TEMPO', 'HÁBIL', 'SEARA', 'ENTÃO', 'BOÇAL',
    'ÁVIDO', 'PESAR', 'ARDIL', 'GENRO', 'CAUSA', 'POSSE', 'SABER', 'DIZER',
    'COSER', 'PÁRIA', 'GRAÇA', 'ÓBICE', 'DEVER', 'PROLE', 'TENAZ', 'CORJA',
    'BRADO', 'CRIVO', 'DETÉM', 'COMUM', 'ÂNIMO', 'SENDO', 'ÁPICE', 'TEMOR',
    'ÂNSIA', 'DIGNO', 'CEDER', 'AINDA', 'CULTO', 'ASSAZ', 'PAUTA', 'ATROZ',
    'MUNDO', 'ESTAR', 'GLEBA', 'CENSO', 'FUGAZ', 'FORTE', 'VÍCIO', 'VALHA',
    'VULGO', 'COZER', 'NENÉM', 'DENSO', 'XIBIU', 'REVÉS', 'PUDOR', 'REGRA',
    'DOGMA', 'LOUCO', 'CRIAR', 'SAÚDE', 'JEITO', 'BANAL', 'ROUND', 'ATRÁS',
    'ORDEM', 'IMPOR', 'CLAVA', 'MERCÊ', 'PEDIR', 'MESMO', 'HOMEM', 'FELIZ',
    'APRAZ', 'TENRO', 'DESSE', 'PÍFIO', 'USURA', 'SERVO', 'COISA', 'SÁBIO',
    'JUÍZO', 'PROSA', 'REAÇA', 'PRESA', 'VIRIL', 'FORMA', 'LIMBO', 'ONTEM',
    'CUNHO', 'FALAR', 'MANSO', 'TODOS', 'DEVIR', 'MEIGA', 'POSSO', 'VENDO',
    'FLUIR', 'ÉBRIO', 'AFAGO', 'MÁGOA', 'SÉRIO', 'PLATÔ', 'HERÓI', 'GUISA',
    'PUDER', 'CERTO', 'VISAR', 'VALOR', 'ACASO'
];
  
const filterWords = wordsList.filter(word => {
    return !(/[´,Ç,^,~]/.test(word));
});



let num = getRandomIndex(filterWords);
const wordle = filterWords[num];


const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<-',
]

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

const handleCLick = (key) => {
    console.log(key);
    if (key === '<-') {
        deleteLetter();
        return;
    }

    if (key === 'ENTER') {
        checkRow();
        return;
    }
    addLetter(key);
}


keys.forEach((key) => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleCLick(key));
    keyboard.append(buttonElement);
})
    
const guessRows = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
]

guessRows.forEach((guessRow,guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
    guessRow.forEach((_guess,guessIndex) => {
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileElement.setAttribute('class', 'tile');
        rowElement.append(tileElement);
    })
    tileDisplay.append(rowElement);
})

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter);
        currentTile++;
    }
}


const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('');
    if(currentTile > 4) {
        flipTile();
        if(guess == wordle) { 
            showMessage('Parabéns!');
            isGameOver = true;
            return;
        } else {
            if(currentRow >= 5) {
                showMessage('Game Over!');
                isGameOver = false;
                return;
            }
            if(currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement),2000);
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter);
    key.classList.add(color);
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
    const guess = [];
    let checkWordle = wordle;

    rowTiles.forEach(tile => {
        guess.push({letter : tile.getAttribute('data'), color: 'grey-overlay'});
    })

    guess.forEach((guess, index) => {
        if(guess.letter == wordle[index]) {
            guess.color = 'green-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    });

    guess.forEach((guess) => {
        if(checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay';
            checkWordle = checkWordle.replace(guess.letter, '');
        }
    });

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add(guess[index].color);
            addColorToKey(guess[index].letter, guess[index].color);
        }, 500 * index)
    });

}
