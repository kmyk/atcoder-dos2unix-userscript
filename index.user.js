// ==UserScript==
// @name         AtCoder dos2unix UserScript
// @namespace    https://github.com/kmyk
// @version      1.3
// @description  submit code using LF instead of CRLF
// @author       Kimiyuki Onaka
// @match        *://beta.atcoder.jp/contests/*/submit*
// @match        *://beta.atcoder.jp/contests/*/tasks/*
// @match        *://*.contest.atcoder.jp/submit*
// ==/UserScript==
function post(path, payload, expectedURL) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", path, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(payload);
    console.log(xhr);
    if (xhr.responseURL == expectedURL) {
        location.href = xhr.responseURL;
    }
    else {
        alert("AtCoder dos2unix UserScript: something wrong / なんか変だよ ソースコードが空だったり連投制限に引っ掛かってたりしませんか");
    }
}
function beta() {
    const taskScreenName = document.getElementsByName("data.TaskScreenName")[0];
    const sourceCode = document.getElementsByName("sourceCode")[0];
    const csrfToken = document.getElementsByName("csrf_token")[0];
    const submit = document.getElementById("submit");
    submit.innerText += " (dos2unix)";
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        // NOTE: I didn't know why, but the "data.LanguageId" must be gotten here. see https://github.com/kmyk/atcoder-dos2unix-userscript/issues/2
        const languageId = document.getElementsByName("data.LanguageId")[0];
        const contestId = location.pathname.split('/')[2];
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
        const path = "/contests/" + contestId + "/submit";
        const expectedURL = location.origin + "/contests/" + contestId + "/submissions/me";
        post(path, payload, expectedURL);
    });
}
function alpha() {
    const session = document.getElementsByName("__session")[0];
    const taskId = document.getElementsByName("task_id")[0];
    const languageId207 = document.getElementsByName("language_id_207")[0];
    const languageId2520 = document.getElementsByName("language_id_2520")[0];
    const sourceCode = document.getElementsByName("source_code")[0];
    const submit = document.getElementsByTagName("button")[0];
    submit.innerText += " (dos2unix)";
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        const data = [];
        for (const tag of [session, taskId, languageId207, languageId2520, sourceCode]) {
            data.push(tag.name + '=' + encodeURIComponent(tag.value));
            console.log([tag.name, tag.value]);
        }
        const payload = data.join('&');
        console.log(payload);
        const path = "/submit?task_id=" + taskId.value;
        const expectedURL = location.origin + "/submissions/me";
        post(path, payload, expectedURL);
    });
}
function main() {
    if (location.hostname == "beta.atcoder.jp") {
        beta();
    }
    else {
        alpha();
    }
}
main();
