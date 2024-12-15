import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { getTimeAgo } from "../utils/utils";
import { useEffect, useState } from "react";

export default function CustomerCard({ name, data, onEdit, onBuyCorn }) {
    
	const [timeAgo, setTimeAgo] = useState(
		data?.purchase_time
			? getTimeAgo(new Date(data.purchase_time).getTime())
			: "No purchases yet."
	);

	useEffect(() => {
		const interval = setInterval(() => {
			if (data?.purchase_time) {
				setTimeAgo(getTimeAgo(new Date(data.purchase_time).getTime()));
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [data?.purchase_time]);

	return (
		<Card className="max-w-lg mx-auto shadow-lg">
			<CardHeader>
				<CardTitle className="text-center">
					Customer: {name || "N/A"}
					<Button className="ml-4" onClick={onEdit} variant="outline">
						<Pencil size={18} />
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-lg font-medium mb-2">
					Last Purchase: {timeAgo}
				</p>
				<p className="text-lg font-medium mb-4">
					Total Purchases: {data?.quantity || 0}
				</p>
				<div className="flex justify-center">
					<Button
						onClick={onBuyCorn}
						className="bg-yellow-500 hover:bg-yellow-600"
					>
						Buy Corn 🌽
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
