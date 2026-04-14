"use client"

import { useState } from "react"
import { Pagination } from "../../../../packages/ui/src/registry/versions/0.3.0/components/pagination"
import type { VariantPreview } from "../types"

function PaginationDemo() {
	const [page, setPage] = useState(3)
	return (
		<div className="flex flex-col items-center gap-2">
			<Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
			<p className="text-sm text-typography-muted">Current page: {page}</p>
		</div>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Interactive pagination with page navigation",
		code: `const [page, setPage] = useState(1)

<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>`,
		render: () => <PaginationDemo />,
	},
]
