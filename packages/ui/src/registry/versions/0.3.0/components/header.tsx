import { Popover } from "@base-ui/react/popover"
import clsx from "clsx"
import { ChevronDown, LogOut, Menu, Settings, X } from "lucide-react"
import type * as React from "react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Avatar } from "./avatar"
import type { SidebarNavItem, SidebarUser } from "./sidebar"

export interface HeaderProps {
	navItems: SidebarNavItem[]
	user?: SidebarUser
	logo?: React.ReactNode
	title?: string
	onNavItemClick?: (item: SidebarNavItem) => void
	onSettings?: () => void
	onLogout?: () => void
	className?: string
	classNames?: {
		root?: string
		bar?: string
		nav?: string
		navItem?: string
		mobileMenu?: string
		userSection?: string
	}
}

export function Header({
	navItems,
	user,
	logo,
	title,
	onNavItemClick,
	onSettings,
	onLogout,
	className,
	classNames,
}: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)
	const [userExpanded, setUserExpanded] = useState(false)

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 10)
		window.addEventListener("scroll", handleScroll)
		handleScroll()
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const navLinkClass = (isActive?: boolean) =>
		clsx(
			"flex items-center gap-3 rounded-radius-md px-3 py-2.5 text-text-base text-typography-primary transition-all duration-200",
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
			isActive ? "bg-surface-2 font-medium" : "hover:bg-surface-2/50",
		)

	return (
		<div
			className={twMerge(
				"fixed top-0 z-50 w-full lg:sticky",
				classNames?.root,
				className,
			)}
		>
			<div className="px-4 pt-4">
				<div
					className={twMerge(
						clsx(
							"overflow-hidden rounded-radius-lg transition-all duration-300",
							mobileOpen || isScrolled
								? "bg-surface-3 shadow-shadow-sm"
								: "bg-transparent",
						),
						classNames?.bar,
					)}
				>
					{/* Main bar */}
					<div className="flex h-14 w-full items-center justify-between px-4 py-2">
						{/* Logo + title */}
						<div className="flex select-none items-center gap-3">
							{logo && <div className="flex items-center">{logo}</div>}
							{title && (
								<>
									{logo && (
										<span className="text-typography-muted" aria-hidden="true">
											•
										</span>
									)}
									<h3 className="font-semibold text-text-base text-typography-primary">
										{title}
									</h3>
								</>
							)}
						</div>

						{/* Desktop nav */}
						<nav
							className={twMerge(
								"hidden items-center gap-1 lg:flex",
								classNames?.nav,
							)}
						>
							{navItems.map((item) => (
								<a
									key={item.href}
									href={item.href}
									onClick={(e) => {
										if (onNavItemClick) {
											e.preventDefault()
											onNavItemClick(item)
										}
									}}
									className={twMerge(
										clsx(
											"relative flex items-center gap-2 px-3 py-2 text-text-sm transition-colors",
											"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
											item.isActive
												? "font-semibold text-primary after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-primary"
												: "text-typography-secondary hover:text-typography-primary",
										),
										classNames?.navItem,
									)}
									aria-current={item.isActive ? "page" : undefined}
								>
									<item.icon className="h-4 w-4 shrink-0" />
									<span>{item.label}</span>
								</a>
							))}
						</nav>

						{/* Desktop user + mobile toggle */}
						<div className="flex items-center gap-2">
							{/* Desktop user popover */}
							{user && (
								<div
									className={twMerge(
										"hidden lg:block",
										classNames?.userSection,
									)}
								>
									<Popover.Root>
										<Popover.Trigger
											className={clsx(
												"flex cursor-pointer items-center gap-2 rounded-radius-md px-2 py-1.5 text-typography-primary outline-none transition-all duration-200",
												"hover:bg-surface-2",
												"focus-visible:ring-2 focus-visible:ring-primary-focus",
											)}
										>
											<Avatar
												src={user.avatarSrc}
												alt={user.name}
												size="sm"
												className="shrink-0"
											/>
											<span className="font-medium text-text-sm">
												{user.name}
											</span>
											<ChevronDown className="h-3.5 w-3.5 text-typography-muted" />
										</Popover.Trigger>
										<Popover.Portal>
											<Popover.Positioner
												side="bottom"
												align="end"
												sideOffset={8}
											>
												<Popover.Popup
													className={clsx(
														"z-50 w-60 rounded-radius-lg border border-border bg-surface-1 p-1 shadow-shadow-md outline-none",
														"data-[state=open]:animate-animate-fade-in",
														"data-[state=closed]:animate-animate-fade-out",
													)}
												>
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

							{/* Mobile hamburger */}
							<button
								type="button"
								onClick={() => setMobileOpen((o) => !o)}
								className={clsx(
									"flex items-center justify-center rounded-radius-md p-2 text-typography-primary transition-colors lg:hidden",
									"hover:bg-surface-2",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
								)}
								aria-label={mobileOpen ? "Close menu" : "Open menu"}
								aria-expanded={mobileOpen}
							>
								{mobileOpen ? (
									<X className="h-5 w-5" aria-hidden="true" />
								) : (
									<Menu className="h-5 w-5" aria-hidden="true" />
								)}
							</button>
						</div>
					</div>

					{/* Mobile menu */}
					{mobileOpen && (
						<div
							className={twMerge(
								"max-h-[70vh] overflow-y-auto border-divider border-t px-4 py-4 lg:hidden",
								classNames?.mobileMenu,
							)}
						>
							<div className="flex flex-col gap-1">
								{navItems.map((item) => (
									<a
										key={item.href}
										href={item.href}
										onClick={(e) => {
											if (onNavItemClick) {
												e.preventDefault()
												onNavItemClick(item)
											}
											setMobileOpen(false)
										}}
										className={twMerge(
											navLinkClass(item.isActive),
											classNames?.navItem,
										)}
										aria-current={item.isActive ? "page" : undefined}
									>
										<item.icon className="h-5 w-5 shrink-0" />
										<span>{item.label}</span>
									</a>
								))}

								{/* Mobile user section */}
								{user && (
									<>
										<div className="my-3 border-divider border-t" />
										<button
											type="button"
											onClick={() => setUserExpanded((e) => !e)}
											className={clsx(
												"flex w-full items-center justify-between rounded-radius-md px-3 py-2.5 text-typography-primary transition-all duration-200",
												"hover:bg-surface-2/50",
												"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
											)}
										>
											<div className="flex items-center gap-3">
												<Avatar
													src={user.avatarSrc}
													alt={user.name}
													size="sm"
													className="shrink-0"
												/>
												<span className="font-medium text-text-base">
													{user.name}
												</span>
											</div>
											<ChevronDown
												className={clsx(
													"h-4 w-4 text-typography-muted transition-transform duration-200",
													userExpanded ? "rotate-180" : "",
												)}
											/>
										</button>

										{userExpanded && (
											<div className="ml-6 flex flex-col gap-1 pt-1">
												{onSettings && (
													<button
														type="button"
														onClick={() => {
															onSettings()
															setMobileOpen(false)
														}}
														className={clsx(
															"flex w-full items-center gap-2 rounded-radius-md px-3 py-2 text-text-sm text-typography-primary transition-colors",
															"hover:bg-surface-2/50",
															"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
														)}
													>
														<Settings className="h-4 w-4" />
														<span>Settings</span>
													</button>
												)}
												{onLogout && (
													<button
														type="button"
														onClick={() => {
															onLogout()
															setMobileOpen(false)
														}}
														className={clsx(
															"flex w-full items-center gap-2 rounded-radius-md px-3 py-2 text-text-sm text-typography-primary transition-colors",
															"hover:bg-error-muted hover:text-error",
															"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
														)}
													>
														<LogOut className="h-4 w-4" />
														<span>Log out</span>
													</button>
												)}
											</div>
										)}
									</>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
