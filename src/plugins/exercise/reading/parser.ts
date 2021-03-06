export function parseReading(dom: Document) {
    let realAnswers = [];

    let answers = dom.querySelectorAll("correctResponse value");
    console.log(answers);
    let index = 1;
    for (const element of answers) {
        const answer = parseAnswer(element as HTMLElement, dom) as any; //todo as Answer
        if (answer) {
            answer.index = index;
            console.log(answer);
            realAnswers.push(answer);
        }
        index++;
    }
    return realAnswers;
}

function parseAnswer(element: HTMLElement, dom: Document) {
    let answerText = element.textContent as string;
    let answerType = "";

    if (answerText.length == 36) {
        answerType = "choice"; //选择题

        let selector = `[identifier="${answerText}"]`;
        element = dom.querySelector(selector) as HTMLElement;
        answerText = /CDATA\[(.*)\]\]/.exec(element.innerHTML)![1].trim(); //从注释中提取答案
    } else if (answerText.length == 73) {
        //todo 找不到在哪里见到的了
        answerType = "matching"; //连线题

        // let leftMatching = document
        //     .querySelector(`[id="${identifier.split("|")[0]}"]`)
        //     .getAttribute("leftorder");
        // let rightMatching = document
        //     .querySelector(`[id="${identifier.split("|")[1]}"]`)
        //     .getAttribute("rightorder");
        // answerText = `${leftMatching}-${rightMatching}`;
    } else {
        answerType = "blank"; //填空题
    }

    return {
        text: answerText,
        type: answerType,
        element: element,
    };
}
