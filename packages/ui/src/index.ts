import { getUiVersionSync } from "./lib/ui-version.js"

export const BCT_UI_VERSION = getUiVersionSync()

export type { BctProjectConfig } from "./config"
export { BCT_CONFIG_FILENAME } from "./config"
export type { RegistryEntry } from "./registry/registry"
export { registry } from "./registry/registry"
