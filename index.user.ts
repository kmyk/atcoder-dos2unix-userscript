// ==UserScript==
// @name         AtCoder dos2unix UserScript
// @namespace    https://github.com/kmyk
// @version      1.1
// @description  submit code using LF instead of CRLF
// @author       Kimiyuki Onaka
// @match        *://beta.atcoder.jp/contests/*/submit
// @match        *://beta.atcoder.jp/contests/*/tasks/*
// @match        *://*.contest.atcoder.jp/submit*
// ==/UserScript==

declare const $ : any;

function post(path: string, payload: string, expectedURL: string): void {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", path, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(payload);
    console.log(xhr);

    if (xhr.responseURL == expectedURL) {
        location.href = xhr.responseURL;
    } else {
        alert ("AtCoder dos2unix UserScript: something wrong");
    }
}

function beta(): void {
    const taskScreenName = <HTMLInputElement>document.getElementsByName("data.TaskScreenName")[0];
    const languageId     = <HTMLInputElement>document.getElementsByName("data.LanguageId")[0];
    const sourceCode     = <HTMLInputElement>document.getElementsByName("sourceCode")[0];
    const csrfToken      = <HTMLInputElement>document.getElementsByName("csrf_token")[0];

    const submit = document.getElementById("submit");
    submit.addEventListener("click", function (e) {
        e.preventDefault();

        const contestId = location.pathname.split('/')[2];
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

        const path = "/contests/" + contestId + "/submit";
        const expectedURL = location.origin + "/contests/" + contestId + "/submissions/me";
        post(path, payload, expectedURL);
    });
}

function alpha(): void {
    const session        = <HTMLInputElement>document.getElementsByName("__session")[0];
    const taskId         = <HTMLInputElement>document.getElementsByName("task_id")[0];
    const languageId207  = <HTMLInputElement>document.getElementsByName("language_id_207")[0];
    const languageId2520 = <HTMLInputElement>document.getElementsByName("language_id_2520")[0];
    const sourceCode     = <HTMLInputElement>document.getElementsByName("source_code")[0];

    const submit = document.getElementsByTagName("button")[0];
    submit.addEventListener("click", function (e) {
        e.preventDefault();

        const data = [];
        for (const tag of [ session, taskId, languageId207, languageId2520, sourceCode ]) {
            data.push(tag.name + '=' + encodeURIComponent(tag.value));
            console.log([ tag.name, tag.value ]);
        }
        const payload = data.join('&');
        console.log(payload);

        const path = "/submit?task_id=" + taskId.value;
        const expectedURL = location.origin + "/submissions/me";
        post(path, payload, expectedURL);
    });
}

function main(): void {
    if (location.hostname == "beta.atcoder.jp") {
        beta();
    } else {
        alpha();
    }
}

main();
