"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowUpRight, Check } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	PROGRAM_MENU,
	INFORMASI_MENU,
	isNavItemActive,
	isParentMenuActive,
} from "@/data/navigation";
import { cn } from "@/lib/utils";

export function NavDesktopMenu({ pathname }) {
	const router = useRouter();
	const [isProgramOpen, setIsProgramOpen] = useState(false);
	const [isInformasiOpen, setIsInformasiOpen] = useState(false);

	const programTimerRef = useRef(null);
	const informasiTimerRef = useRef(null);

	const isProgramActive = isParentMenuActive(
		PROGRAM_MENU,
		pathname,
	);
	const isArtikelActive = isNavItemActive(
		"/artikel",
		pathname,
	);
	const isInformasiActive = isParentMenuActive(
		INFORMASI_MENU,
		pathname,
	);

	const [prevPathname, setPrevPathname] = useState(pathname);
	if (prevPathname !== pathname) {
		setPrevPathname(pathname);
		setIsProgramOpen(false);
		setIsInformasiOpen(false);
	}

	useEffect(() => {
		return () => {
			if (programTimerRef.current) clearTimeout(programTimerRef.current);
			if (informasiTimerRef.current) clearTimeout(informasiTimerRef.current);
		};
	}, []);

	const closeAllMenus = () => {
		if (programTimerRef.current) clearTimeout(programTimerRef.current);
		if (informasiTimerRef.current) clearTimeout(informasiTimerRef.current);
		setIsProgramOpen(false);
		setIsInformasiOpen(false);
	};

	const handleProgramEnter = () => {
		if (programTimerRef.current) clearTimeout(programTimerRef.current);
		if (informasiTimerRef.current) clearTimeout(informasiTimerRef.current);
		setIsInformasiOpen(false);
		setIsProgramOpen(true);
	};

	const handleProgramLeave = () => {
		if (programTimerRef.current) clearTimeout(programTimerRef.current);
		programTimerRef.current = setTimeout(() => {
			setIsProgramOpen(false);
		}, 150);
	};

	const handleInformasiEnter = () => {
		if (informasiTimerRef.current) clearTimeout(informasiTimerRef.current);
		if (programTimerRef.current) clearTimeout(programTimerRef.current);
		setIsProgramOpen(false);
		setIsInformasiOpen(true);
	};

	const handleInformasiLeave = () => {
		if (informasiTimerRef.current) clearTimeout(informasiTimerRef.current);
		informasiTimerRef.current = setTimeout(() => {
			setIsInformasiOpen(false);
		}, 150);
	};

	const handleProgramItemClick = (href) => {
		if (programTimerRef.current) clearTimeout(programTimerRef.current);
		setIsProgramOpen(false);
		router.push(href);
	};

	const handleInformasiItemClick = (href) => {
		if (informasiTimerRef.current) clearTimeout(informasiTimerRef.current);
		setIsInformasiOpen(false);
		router.push(href);
	};

	return (
		<nav className="hidden lg:flex items-stretch h-full gap-1 xl:gap-2">
			{/* 1. Home */}
			<Link
				href="/"
				onMouseEnter={closeAllMenus}
				className={cn(
					"inline-flex items-center px-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer h-full",
					isNavItemActive(
						"/",
						pathname,
					)
						? "text-primary border-primary -mb-px"
						: "text-slate-700 hover:text-slate-950 border-transparent hover:border-slate-300 -mb-px",
				)}
			>
				Beranda
			</Link>

			{/* 2. Tentang Kami */}
			<Link
				href="/tentang-kami"
				onMouseEnter={closeAllMenus}
				className={cn(
					"inline-flex items-center px-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer h-full",
					isNavItemActive(
						"/tentang-kami",
						pathname,
					)
						? "text-primary border-primary -mb-px"
						: "text-slate-700 hover:text-slate-950 border-transparent hover:border-slate-300 -mb-px",
				)}
			>
				Tentang
				Kami
			</Link>

			{/* 3. Program Dropdown (2 items) */}
			<DropdownMenu open={isProgramOpen} onOpenChange={setIsProgramOpen}>
				<DropdownMenuTrigger
					asChild
				>
					<button
						type="button"
						onMouseEnter={handleProgramEnter}
						onMouseLeave={handleProgramLeave}
						onPointerDown={(e) => {
							e.preventDefault();
							handleProgramEnter();
						}}
						onClick={(e) => {
							e.preventDefault();
							handleProgramEnter();
						}}
						className={cn(
							"inline-flex items-center gap-1.5 px-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer h-full",
							isProgramActive
								? "text-primary border-primary -mb-px"
								: "text-slate-700 hover:text-slate-950 border-transparent hover:border-slate-300 -mb-px",
						)}
					>
						<span>
							Program
						</span>
						<ChevronDown className="w-4 h-4 opacity-70" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					className="w-60 p-1.5 shadow-md"
					onMouseEnter={handleProgramEnter}
					onMouseLeave={handleProgramLeave}
					onOpenAutoFocus={(e) => e.preventDefault()}
				>
					{PROGRAM_MENU.map(
						(
							item,
						) => {
							const isActive =
								isNavItemActive(
									item.href,
									pathname,
								);
							return (
								<DropdownMenuItem
									key={
										item.label
									}
									asChild
									onSelect={() => handleProgramItemClick(item.href)}
								>
									<Link
										href={
											item.href
										}
										onClick={(e) => {
											e.preventDefault();
											handleProgramItemClick(item.href);
										}}
										className={cn(
											"group flex items-center justify-between px-3 py-2.5 text-sm rounded-md transition-colors",
											isActive
												? "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xs hover:bg-gradient-to-r hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:text-white focus:bg-blue-700 focus:text-white cursor-default select-none pointer-events-none"
												: "text-slate-800 hover:bg-slate-100 hover:text-slate-950 focus:bg-slate-100 focus:text-slate-950 font-medium cursor-pointer",
										)}
									>
										<span>
											{
												item.label
											}
										</span>
										{isActive ? (
											<Check
												className="w-4 h-4 text-white shrink-0"
												strokeWidth={
													2.5
												}
											/>
										) : (
											<ArrowUpRight
												className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
												strokeWidth={
													2.5
												}
											/>
										)}
									</Link>
								</DropdownMenuItem>
							);
						},
					)}
				</DropdownMenuContent>
			</DropdownMenu>

			{/* 4. Artikel (Direct Link) */}
			<Link
				href="/artikel"
				onMouseEnter={closeAllMenus}
				className={cn(
					"inline-flex items-center px-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer h-full",
					isArtikelActive
						? "text-primary border-primary -mb-px"
						: "text-slate-700 hover:text-slate-950 border-transparent hover:border-slate-300 -mb-px",
				)}
			>
				Artikel
			</Link>

			{/* 5. Informasi Dropdown */}
			<DropdownMenu open={isInformasiOpen} onOpenChange={setIsInformasiOpen}>
				<DropdownMenuTrigger
					asChild
				>
					<button
						type="button"
						onMouseEnter={handleInformasiEnter}
						onMouseLeave={handleInformasiLeave}
						onPointerDown={(e) => {
							e.preventDefault();
							handleInformasiEnter();
						}}
						onClick={(e) => {
							e.preventDefault();
							handleInformasiEnter();
						}}
						className={cn(
							"inline-flex items-center gap-1.5 px-3.5 text-sm font-medium border-b-2 transition-all cursor-pointer h-full",
							isInformasiActive
								? "text-primary border-primary -mb-px"
								: "text-slate-700 hover:text-slate-950 border-transparent hover:border-slate-300 -mb-px",
						)}
					>
						<span>
							Informasi
						</span>
						<ChevronDown className="w-4 h-4 opacity-70" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					className="w-64 p-1.5 shadow-md"
					onMouseEnter={handleInformasiEnter}
					onMouseLeave={handleInformasiLeave}
					onOpenAutoFocus={(e) => e.preventDefault()}
				>
					{INFORMASI_MENU.map(
						(
							item,
						) => {
							const isActive =
								isNavItemActive(
									item.href,
									pathname,
								);
							return (
								<DropdownMenuItem
									key={
										item.label
									}
									asChild
									onSelect={() => handleInformasiItemClick(item.href)}
								>
									<Link
										href={
											item.href
										}
										onClick={(e) => {
											e.preventDefault();
											handleInformasiItemClick(item.href);
										}}
										className={cn(
											"group flex items-center justify-between px-3 py-2.5 text-sm rounded-md transition-colors",
											isActive
												? "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xs hover:bg-gradient-to-r hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:text-white focus:bg-blue-700 focus:text-white cursor-default select-none pointer-events-none"
												: "text-slate-800 hover:bg-slate-100 hover:text-slate-950 focus:bg-slate-100 focus:text-slate-950 font-medium cursor-pointer",
										)}
									>
										<span>
											{
												item.label
											}
										</span>
										{isActive ? (
											<Check
												className="w-4 h-4 text-white shrink-0"
												strokeWidth={
													2.5
												}
											/>
										) : (
											<ArrowUpRight
												className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
												strokeWidth={
													2.5
												}
											/>
										)}
									</Link>
								</DropdownMenuItem>
							);
						},
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	);
}
