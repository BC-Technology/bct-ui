import { intro, outro } from "@clack/prompts"

export function cliIntro() {
	intro("BCT UI")
}

export function cliOutroOk(message = "Done.") {
	outro(message)
}
