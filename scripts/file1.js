function shuffle(arrPtr) {
    for (let i = 0; i < 10; i++) {
        if (Math.floor(Math.random()))
            arrPtr = arrPtr.sort((num1, num2) => .6 - Math.random());
        else
            arrPtr = arrPtr.sort((num1, num2) => .4 - Math.random());
    }
    // passing boolean compare function in sort
    arrPtr = arrPtr.sort((num1, num2) => .5 - Math.random());
}

function generateNumber() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(numbers);

    let answer = String(numbers.pop());
    numbers.push(0);

    for (let i = 0; i < 3; i++) {
        shuffle(numbers);
        answer = answer + numbers.pop();
    }
    return answer;
}

function isValid(guess) {
    Nums = guess.split('');
    if (Nums.length != 4 || Nums[0] == '0')
        return false;

    for (let idx = 0; idx < Nums.length; idx++) {
        const num = Nums[idx];
        if (num < '0' || num > '9')
            return false;
        for (let i = 0; i < Nums.length; i++) {
            if (i != idx && Nums[i] == num)
                return false;
        }
    }
    return true;
}

function getDecision(answer, guess) {
    nums = answer.split('');
    let decision = [];

    guess.split('').forEach((num, index) => {
        if (nums.includes(num)) {
            if (nums[index] == num) decision.push('🟩');
            else decision.push('🟡');
        }
        else decision.push('🔴');
    });
    shuffle(decision);
    return decision.join(' ');
}


let attempt = 0;
const answer = generateNumber();
const previousRows = document.querySelector(".wrapper");
const inputSection = document.querySelector(".inputSection");
const textBox = document.querySelector("input");

textBox.addEventListener("keypress", (event) => {
    const guess = event.target.value;
    if (event.key == "Enter" && guess != '' && isValid(guess)) {
        event.target.value = '';
        const decision = getDecision(answer, guess);
        previousRows.innerHTML = String(`<section>
                <div class="row">
                    <div class="column"
                         align="right">
                        <h3>${guess.split('').join(' ')}</h3>
                    </div>
                    <div class="column"
                         align="left">
                        <h3>${decision}</h3>
                    </div>
                </div>
            </section>`) + previousRows.innerHTML;
        attempt++;
        if (attempt == 8 || guess == answer) {
            inputSection.remove();
        }
    }
});

// window.addEventListener("click", () => {
//     if (attempt == 8) alert('YOU LOSE');
//     if (guess == answer) alert('YOU WIN');
// });