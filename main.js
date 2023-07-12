import { Octokit, App } from "https://esm.sh/octokit?dts"

const okit = new Octokit ({
    auth: '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'
})

const {
    data: { login },
} = await okit.rest.users.getAuthenticated();
console.log(`Hello user ${login}`)

/* await okit.request('GET /user', {
    headers: {
        'X-Github-Api-version': '2022-11-28'
    }
}) */
const repouser = prompt("Enter Github user: ")
const reponame = prompt("Enter the repo of the user: ")

const printrepo = await okit.request(`GET /repos/{owner}/{repo}/commits`, {
    owner: repouser,
    repo: reponame,
    headers: {
        'X-Github-Api-version': '2022-11-28'
    }
})

var data = printrepo['data']
let i = 0

    console.log(`\nDate: ${d3}\nCommitter: ${d2}\nCommit: ${d1}\n------------------------------------------------------`)
while (i < data.length) {
    var d1 = data[i]['commit']['message']
    var d2 = data[i]['commit']['committer']['name']
    var d3 = data[i]['commit']['committer']['date']
    i++
}
// console.log(printrepo['data']['0']['commit']['message'])
