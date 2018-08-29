// ==UserScript==
// @name         AtCoder dos2unix UserScript
// @namespace    https://github.com/kmyk
// @version      1.1
// @description  submit code using LF instead of CRLF
// @author       Kimiyuki Onaka
// @match        *://beta.atcoder.jp/contests/*/submit
// @match        *://beta.atcoder.jp/contests/*/tasks/*
// ==/UserScript==
function main() {
    const taskScreenName = document.getElementsByName("data.TaskScreenName")[0];
    const languageId = document.getElementsByName("data.LanguageId")[0];
    const sourceCode = document.getElementsByName("sourceCode")[0];
    const csrfToken = document.getElementsByName("csrf_token")[0];
    const submit = document.getElementById("submit");
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        const contestId = location.pathname.split('/')[2];
        const path = "/contests/" + contestId + "/submit";
        const data = [];
        for (const tag of [taskScreenName, languageId, sourceCode, csrfToken]) {
            var value = tag.value;
            if (tag === sourceCode) {
                value = $(sourceCode).data('editor').getValue();
            }
            data.push(tag.name + '=' + encodeURIComponent(value));
            console.log([tag.name, value]);
        }
        const payload = data.join('&');
        console.log(payload);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", path, false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(payload);
        console.log(xhr);
        location.href = xhr.responseURL;
    });
}
main();
