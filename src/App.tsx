import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query"
import { CategoryScale } from "chart.js"
import Chart from "chart.js/auto"
import { GrowthStage } from "./components/GrowthStage"

const queryClient = new QueryClient()

Chart.register(CategoryScale)

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MainContent />
		</QueryClientProvider>
	)
}

function MainContent() {
	// API call
	const {
		isLoading,
		error,
		data: days,
	} = useQuery({
		queryKey: ["daysData"],
		queryFn: (): Promise<
			{
				degree_days: number
				time: number
				precipitation: number
				ndvi: number
			}[]
		> =>
			fetch(
				"https://raw.githubusercontent.com/alexanderboliva/test/main/api_example.json"
			).then((res) => res.json()),
	})

	if (isLoading || !days) return "Loading..."

	if (error) return "An error has occurred: " + error

	return (
		<div className="flex h-full w-full">
			<div className="flex flex-col justify-center items-center w-full">
				<header className="flex gap-4 py-8 items-center">
					<svg
						className="w-6 h-6 lg:w-9 lg:h-9"
						fill="none"
						stroke="black"
						strokeWidth={1.5}
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
						/>
					</svg>
					<p className="md:text-4xl text-2xl text-black">Growth Stage</p>
				</header>
				<GrowthStage days={days} />
			</div>
		</div>
	)
}
