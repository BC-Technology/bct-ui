import { Popover } from "@base-ui/react/popover"
import clsx from "clsx"
import { LogOut, Settings } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"
import { Avatar } from "./avatar"

export interface SidebarNavItem {
	label: string
	href: string
	icon: React.ComponentType<{ className?: string }>
	isActive?: boolean
}

export interface SidebarUser {
	name: string
	email?: string
	avatarSrc?: string
}

export interface SidebarProps {
	navItems: SidebarNavItem[]
	user?: SidebarUser
	logo?: React.ReactNode
	onNavItemClick?: (item: SidebarNavItem) => void
	onSettings?: () => void
	onLogout?: () => void
	className?: string
	classNames?: {
		root?: string
		logoArea?: string
		nav?: string
		navItem?: string
		navItemActive?: string
		userSection?: string
	}
}

export function Sidebar({
	navItems,
	user,
	logo,
	onNavItemClick,
	onSettings,
	onLogout,
	className,
	classNames,
}: SidebarProps) {
	return (
		<div
			className={twMerge(
				clsx(
					"flex h-full w-full flex-col overflow-x-hidden rounded-radius-lg bg-surface-3 shadow-shadow-sm",
				),
				classNames?.root,
				className,
			)}
		>
			{/* Logo area */}
			{logo && (
				<div
					className={twMerge(
						"flex items-center justify-center px-6 py-6",
						classNames?.logoArea,
					)}
				>
					{logo}
				</div>
			)}

			{/* Navigation */}
			<nav
				className={twMerge(
					"flex flex-1 items-center px-3 py-4",
					classNames?.nav,
				)}
			>
				<ul className="flex h-full w-full flex-col justify-center gap-1">
					{navItems.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								onClick={(e) => {
									if (onNavItemClick) {
										e.preventDefault()
										onNavItemClick(item)
									}
								}}
								className={twMerge(
									clsx(
										"flex items-center gap-3 rounded-radius-md px-3 py-2.5 text-text-base text-typography-primary transition-all duration-200",
										"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
										item.isActive
											? "bg-surface-1 font-medium"
											: "hover:bg-surface-1/50",
									),
									item.isActive ? classNames?.navItemActive : "",
									classNames?.navItem,
								)}
								aria-current={item.isActive ? "page" : undefined}
							>
								<item.icon className="h-5 w-5 shrink-0" />
								<span>{item.label}</span>
							</a>
						</li>
					))}
				</ul>
			</nav>

			{/* User section */}
			{user && (
				<div
					className={twMerge(
						"flex flex-col justify-end px-3 py-4",
						classNames?.userSection,
					)}
				>
					<Popover.Root>
						<Popover.Trigger
							className={clsx(
								"flex w-full cursor-pointer items-center gap-3 rounded-radius-md bg-surface-1/50 px-3 py-2.5 text-typography-primary outline-none transition-all duration-200",
								"hover:bg-surface-1",
								"focus-visible:ring-2 focus-visible:ring-primary-focus",
							)}
						>
							<Avatar
								src={user.avatarSrc}
								alt={user.name}
								size="sm"
								className="shrink-0"
							/>
							<span className="truncate font-medium text-text-sm">
								{user.name}
							</span>
						</Popover.Trigger>
						<Popover.Portal>
							<Popover.Positioner side="top" sideOffset={8}>
								<Popover.Popup
									className={clsx(
										"z-50 w-60 rounded-radius-lg border border-border bg-surface-1 p-1 shadow-shadow-md outline-none",
										"data-[state=open]:animate-animate-fade-in",
										"data-[state=closed]:animate-animate-fade-out",
									)}
								>
									{/* User info */}
									<div className="px-3 py-2">
										<div className="flex items-center gap-3">
											<Avatar
												src={user.avatarSrc}
												alt={user.name}
												size="md"
												className="shrink-0"
											/>
											<div className="flex min-w-0 flex-1 flex-col">
												<p className="truncate font-medium text-text-sm text-typography-primary">
													{user.name}
												</p>
												{user.email && (
													<p className="truncate text-text-xs text-typography-muted">
														{user.email}
													</p>
												)}
											</div>
										</div>
									</div>

									{/* Actions */}
									{(onSettings || onLogout) && (
										<>
											<div className="my-1 h-px bg-divider" />
											<div className="flex flex-col py-1">
												{onSettings && (
													<button
														type="button"
														onClick={onSettings}
														className={clsx(
															"flex w-full items-center gap-2 rounded-radius-sm px-3 py-2 text-text-sm text-typography-primary transition-colors",
															"hover:bg-surface-2",
															"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
														)}
													>
														<Settings className="h-4 w-4" />
														<span>Settings</span>
													</button>
												)}
												{onLogout && (
													<>
														{onSettings && (
															<div className="my-1 h-px bg-divider" />
														)}
														<button
															type="button"
															onClick={onLogout}
															className={clsx(
																"flex w-full items-center gap-2 rounded-radius-sm px-3 py-2 text-text-sm text-typography-primary transition-colors",
																"hover:bg-error-muted hover:text-error",
																"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
															)}
														>
															<LogOut className="h-4 w-4" />
															<span>Log out</span>
														</button>
													</>
												)}
											</div>
										</>
									)}
								</Popover.Popup>
							</Popover.Positioner>
						</Popover.Portal>
					</Popover.Root>
				</div>
			)}
		</div>
	)
}
