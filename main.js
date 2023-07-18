import { Octokit, App } from "https://esm.sh/octokit?dts"
const auth_file = await Deno.readTextFile("./gh_personal_access.txt")
const okit = new Octokit ({
    auth: auth_file
})

const {
    data: { login },
} = await okit.rest.users.getAuthenticated();
console.log(`Hello user ${login}`)

await okit.request('GET /user', {
    headers: {
        'X-Github-Api-version': '2022-11-28'
    }
})
const repouser = prompt("Enter Github user: ")
const reponame = prompt("Enter the repo of the user: ")

const printrepo = await okit.request(`GET /repos/{owner}/{repo}/commits`, {
    owner: repouser,
    repo: reponame,
    headers: {
        'X-Github-Api-version': '2022-11-28'
    }
})

const pulls = await okit.request('GET /repos/{owner}/{repo}/pulls', {
    owner: repouser,
    repo: reponame,
    headers: {
        'X-Github-Api-version': '2022-11-28'
    }
})

var data = printrepo['data']
let i = 0
console.log("Commit Lists:")
while (i < data.length) {
    var d1 = data[i]['commit']['message']
    var d2 = data[i]['commit']['committer']['name']
    var d3 = data[i]['commit']['committer']['date']
    console.log(`\nDate: ${d3}\nCommitter: ${d2}\nCommit: ${d1}\n------------------------------------------------------`)
    i++
}
console.log("\n\n")
var pdata = pulls['data']
/*  
    console.log("Pull Requests: ")
    console.log(`URL: ${pdata['url']}`)
    console.log(`Request Title: ${pdata['title']}`)
    console.log(`User: ${pdata['user']['login']}`)
    console.log(`Commit Description: ${pdata['body']}`)
*/
let j = 0
console.log("Pull Requests:")
while (j < pdata.length) {
    var p1 = pdata[j]['user']['login']
    var p2 = pdata[j]['title']
    var p3 = pdata[j]['html_url']
    var p4 = pdata[j]['body']
    var p5 = pdata[j]['created_at']
    var p6 = pdata[j]['updated_at']
    var p7 = pdata[j]['merged_at']
    var p8 = pdata[j]['closed_at']
    var p9 = pdata[j]['commits_url']
    console.log(`\nName: ${p2}\nRequester: ${p1}\nURL: ${p3}\nDescription: ${p4}\nCreated At: ${p5}\nUpdated At: ${p6}\nMerged At: ${p7}\nClosed At: ${p8}\nCommit URL: ${p9}\n------------------------------------------------------`)
    j++
}
// console.log(printrepo['data']['0']['commit']['message'])
