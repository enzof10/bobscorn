import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "./hooks/use-local-storage";
import { randomEmoji } from "./utils/utils";
import NameDialog from "./components/NameDialog";
import CustomerCard from "./components/CustomesCard";

function App() {
	const [name, setName] = useLocalStorage("username", ""); // Persistent name
	const [dialog, setDialog] = useState({ open: false, tempName: "" }); // Dialog state
	const [data, setData] = useState(null); // Centralized data
	const [salePolicy, setSalePolicy] = useState(null); // Sale policy state
	const { toast } = useToast();

	// Fetch Sale Policies
	const fetchSalePolicies = async () => {
		const url = `${
			import.meta.env.VITE_APP_BOBSCORN_API_URL
		}/farm/sale-policies`;
		const response = await fetch(url);

		if (response.ok) {
			const result = await response.json();
			const { limitRateQuantity, limitRateInterval } = result.data;

			const intervalInMinutes = Math.ceil(limitRateInterval / 60000);

			setSalePolicy({
				limitRateQuantity,
				intervalInMinutes,
			});
		}
	};

	// Fetch Corn Purchases
	const fetchData = async (currentName) => {
		if (!currentName) return;
		const url = `${
			import.meta.env.VITE_APP_BOBSCORN_API_URL
		}/farm/corn/purchases/${encodeURIComponent(currentName)}`;

		const response = await fetch(url);
		if (response.ok) {
			const newData = await response.json();
			setData(newData.data);
		} else {
			toast({
				title: `${randomEmoji()} Oops!`,
				description:
					"We couldn't retrieve your information. Please try again.",
				variant: "destructive",
			});
		}
	};

	// Purchase Corn
	const buyCorn = async () => {
		const postUrl = `${
			import.meta.env.VITE_APP_BOBSCORN_API_URL
		}/farm/corn/buy?clientid=${encodeURIComponent(name)}`;

		const response = await fetch(postUrl, { method: "POST" });

		if (response.ok) {
			const newData = await response.json();
			setData(newData.data);
			toast({
				title: "🌽 Success!",
				description: "You successfully bought 1 corn.",
			});
		} else {
			toast({
				title: `${randomEmoji()} Política de venta`,
				description: `Nuestra política solo nos permite vender ${salePolicy.limitRateQuantity} cantidad por ${salePolicy.intervalInMinutes} minuto(s).`,
				variant: "destructive",
			});
		}
	};

	// Save user name
	const saveName = () => {
		if (dialog.tempName.trim()) {
			setName(dialog.tempName);
			setDialog({ open: false, tempName: "" });
		}
	};

	// Fetch initial data and policies
	useEffect(() => {
		if (!name) {
			setDialog({ open: true, tempName: "" });
		} else {
			fetchData(name);
		}
	}, [name]);

	useEffect(() => {
		fetchSalePolicies();
	}, []);

	return (
		<div className="h-screen w-screen flex flex-col mx-auto">
			<Toaster />
			<h1 className="text-4xl font-bold text-center text-yellow-600 mb-8 mt-20">
				🌽 Welcome to Bob's Corn Store! 🌽
			</h1>
			{salePolicy && (
				<p className="text-center text-gray-700 mb-4">
					Remember, our policy only allows us to sell{" "}
					{salePolicy.limitRateQuantity} item(s) every{" "}
					{salePolicy.intervalInMinutes} minute(s).
				</p>
			)}
			<div className="mt-28 container mx-auto">
				<CustomerCard
					name={name}
					data={data}
					onEdit={() => setDialog({ open: true, tempName: name })}
					onBuyCorn={buyCorn}
					purchaseCooldown={salePolicy?.intervalInMinutes}
				/>
				<NameDialog
					open={dialog.open}
					tempName={dialog.tempName}
					onTempNameChange={(e) =>
						setDialog({
							...dialog,
							tempName: e.target.value,
						})
					}
					onSave={saveName}
					onClose={() => setDialog({ open: false, tempName: "" })}
					isUpdating={!!name}
				/>
			</div>
		</div>
	);
}

export default App;
