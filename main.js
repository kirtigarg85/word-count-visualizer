
$('#calc-btn').click(() => {
    let text = $('#text-input').val(); 
    let wordArray = getWords(text);
    let wordCounts = getWordCount(wordArray);
    let sortedArr = sortWordCount(wordCounts);
    let n = wordArray.length;
    let zipfArr = zipfLaw(sortedArr, n);
    printwordTable(sortedArr)
    generateChart(sortedArr, zipfArr);
    // console.log(sortedArr);
});

function getWords(inputWord){
    let chars = inputWord.split('');
    let newChars = [];
    chars.forEach(c => {
        switch(c){
            case `.`:
            case `-`:
            case `_`:
            case `+`:
            case `,`:
            case `?`:
            case `/`:
            case `!`:
            case `@`:
            case `%`:
            case `^`:
            case `&`:
            case `(`:
            case `)`:
            case `<`:
            case `>`:
            case `:`:
            case `;`:
            case `|`: 
            case `'`:    
            case `"`:
            case '`': return 
            case '  ': newChars.push(' '); break;
            case '   ': newChars.push(' '); break;
            default: 
                newChars.push(c.toLowerCase());
        }
    });
    let newText = newChars.join('');
    let words = newText.split(' ');
    return words;
}

function getWordCount(wordArr){
    let wordCountArr = [];
    wordArr.forEach((w)=>{
        if(wordCountArr[w]){
            wordCountArr[w]++;
        }else {
            wordCountArr[w] = 1;
        }
    });
    return wordCountArr;
}

function sortWordCount(wordCount){
    let wcArray = [];
    Object.keys(wordCount).forEach((w)=>{
        if(w == "") return
        wcArray.push({
            word: w,
            count: wordCount[w]
        });
    });

    return wcArray.sort((a,b)=> b.count - a.count ).slice(0, 50);
}

function printwordTable(Arr){
    let table = $('#count-table');
    table.empty();

    table.append(
        $('<tr>')
            .append($('<th>').text('Word'))
            .append($('<th>').text('Frequency'))
    )

    Arr.forEach((a)=>{
        table.append(
            $('<tr>')
                .append($('<td>').text(a.word))
                .append($('<td>').text(a.count))
        )
    })
}

function zipfLaw(arr, n){
    let Arr = [];
    arr.forEach((e)=>{
        Arr.push({
            word: e.word,
            count: Infinity
        });
    });
    for(let i=0; i<arr.length; i++){
        Arr[i].count = ((0.1*n)/ i);
    }
    return Arr;
}

function generateChart(wcArray, zipfArray){
    let ctx = document.getElementById('wc-canvas').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: wcArray.map((a)=> a.word),
            datasets: [{
                label: 'Word Frequency',
                borderColor: 'red',
                borderWidth: 2,
                data: wcArray.map((a)=>a.count)
            }, 
            {
                label: "ideal Zipf's Frequency",
                borderColor: 'blue',
                borderWidth: 2,
                data: zipfArray.map((a)=>a.count)
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Chart Graph',
                fontSize: 20
            }
        }
    });
}
