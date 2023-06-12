export function Button({
	handleClick,
	children,
}: {
	handleClick: () => void
	children: React.ReactNode
}) {
	return (
		<button
			type="button"
			className="flex items-center focus:outline-none text-white bg-[#F59764] hover:bg-[#cf7f54] focus:ring-4 focus:ring-[#ffa06d] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
			onClick={handleClick}
		>
			{children}
		</button>
	)
}
