// ==UserScript==
// @name         AtCoder dos2unix UserScript
// @namespace    https://github.com/kmyk
// @version      1.0
// @description  submit code using LF instead of CRLF
// @author       Kimiyuki Onaka
// @match        *://beta.atcoder.jp/contests/*/submit
// ==/UserScript==

declare const $ : any;

function main(): void {
    const taskScreenName = <HTMLInputElement>document.getElementsByName("data.TaskScreenName")[0];
    const languageId     = <HTMLInputElement>document.getElementsByName("data.LanguageId")[0];
    const sourceCode     = <HTMLInputElement>document.getElementsByName("sourceCode")[0];
    const csrfToken      = <HTMLInputElement>document.getElementsByName("csrf_token")[0];

    const submit = document.getElementById("submit");
    submit.addEventListener("click", function (e) {
        e.preventDefault();

        const data = [];
        for (const tag of [ taskScreenName, languageId, sourceCode, csrfToken ]) {
            var value = tag.value;
            if (tag === sourceCode) {
                value = $(sourceCode).data('editor').getValue();
            }
            data.push(tag.name + '=' + encodeURIComponent(value));
            console.log([ tag.name, value ]);
        }
        const payload = data.join('&');
        console.log(payload);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", location.pathname, false);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(payload);
        console.log(xhr);

        location.href = xhr.responseURL;
    });
}

main();
