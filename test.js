import { Octokit, App } from "https://esm.sh/octokit?dts"
const auth_file = await Deno.readTextFile("./gh_personal_access.txt")
const okit = new Octokit ({
    auth: auth_file
})

console.log(auth_file)
