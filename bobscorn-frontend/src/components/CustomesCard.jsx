import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerCard({
	name,
	data,
	onEdit,
	onBuyCorn,
	purchaseCooldown,
	loading,
}) {
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		const interval = setInterval(() => {
			if (data?.purchase_time && purchaseCooldown) {
				const lastPurchaseTime = new Date(data.purchase_time).getTime();
				const cooldownMs = purchaseCooldown * 60 * 1000;
				const elapsedTime = Date.now() - lastPurchaseTime;

				const newProgress = Math.min(
					(elapsedTime / cooldownMs) * 100,
					100
				);
				setProgress(newProgress);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [data?.purchase_time, purchaseCooldown]);

	return (
		<>
			{loading ? (
				<div className="flex justify-center">
					{/* Skeleton loader */}
					<Skeleton className="h-48 w-full max-w-md rounded-lg" />
				</div>
			) : (
				<Card className="max-w-lg mx-auto shadow-lg">
					<CardHeader>
						<CardTitle className="text-center">
							Customer: {name || "N/A"}
							<Button
								className="ml-4"
								onClick={onEdit}
								variant="outline"
							>
								<Pencil size={18} />
							</Button>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-lg font-medium mb-4">
							Total Purchases: {data?.quantity || 0}
						</p>
						<div className="flex justify-center relative">
							<Button
								onClick={onBuyCorn}
								className="relative text-white font-bold"
								style={{
									background: `linear-gradient(to right, #fbbf24 ${progress}%, #d1d5db ${progress}%)`,
									transition: "background 0.5s ease-in-out",
								}}
							>
								Buy Corn 🌽
							</Button>
						</div>
					</CardContent>
				</Card>
			)}
		</>
	);
}
