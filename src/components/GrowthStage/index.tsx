import { useState } from "react"
import { Line } from "react-chartjs-2"
import { Button } from "../Button"

export function GrowthStage({
	days,
}: {
	days: {
		degree_days: number
		time: number
		precipitation: number
		ndvi: number
	}[]
}) {
	const initialState = {
		datasets: [
			{
				data: days.map((day) => day.ndvi),
				backgroundColor: "#58D6CC",
				borderColor: "#58D6CC",
				label: "NDVI",
			},
			{
				data: days.map((day) => day.degree_days),
				backgroundColor: "#F67459",
				borderColor: "#F67459",
				label: "Degree days",
			},
			{
				data: days.map((day) => day.precipitation),
				backgroundColor: "#53A6CC",
				borderColor: "#53A6CC",
				label: "Precipitation",
			},
		],
		labels: days.map((day) => {
			const date = `${new Date(day.time * 1000).toString().split(" ")[1]} ${
				new Date(day.time * 1000).toString().split(" ")[2]
			}`

			return date
		}),
	}

	const [chartData, setChartData] = useState(initialState)

	return (
		<div className="flex flex-col sm:p-24 w-full md:w-4/6 p-4 gap-16 bg-white rounded-3xl">
			<Line
				data={chartData}
				options={{
					responsive: true,
					plugins: {
						legend: {
							position: "top",
						},
						title: {
							display: true,
							text: "Talhão 1",
						},
					},
				}}
			/>
			<div className="flex flex-wrap justify-between">
				<Button handleClick={() => setChartData(initialState)}>
					All graphics
				</Button>
				<Button
					handleClick={() =>
						setChartData({
							...chartData,
							datasets: [
								{
									data: days.map((day) => day.ndvi),
									backgroundColor: "#58D6CC",
									borderColor: "#58D6CC",
									label: "NDVI",
								},
							],
						})
					}
				>
					NDVI graphic
				</Button>
				<Button
					handleClick={() =>
						setChartData({
							...chartData,
							datasets: [
								{
									data: days.map((day) => day.degree_days),
									backgroundColor: "#F67459",
									borderColor: "#F67459",
									label: "Degree days",
								},
							],
						})
					}
				>
					Degree Days graphic
				</Button>
				<Button
					handleClick={() =>
						setChartData({
							...chartData,
							datasets: [
								{
									data: days.map((day) => day.precipitation),
									backgroundColor: "#53A6CC",
									borderColor: "#53A6CC",
									label: "Precipitation",
								},
							],
						})
					}
				>
					Precipitation graphic
				</Button>
			</div>
		</div>
	)
}
