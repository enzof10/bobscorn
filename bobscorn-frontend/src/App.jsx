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
	const { toast } = useToast();

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

	// Purchase corn
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
				title: `${randomEmoji()} Something went wrong`,
				description:
					"There was a problem processing your purchase. Bob's working on it!",
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

	// Fetch initial data
	useEffect(() => {
		if (!name) {
			setDialog({ open: true, tempName: "" });
		} else {
			fetchData(name);
		}
	}, [name]);

	return (
		<div className="h-screen w-screen flex flex-col mx-auto">
			<Toaster />
			<h1 className="text-4xl font-bold text-center text-yellow-600 mb-8 mt-10">
				🌽 Welcome to Bob's Corn Store! 🌽
			</h1>
			<div className="mt-40 container mx-auto">
				<CustomerCard
					name={name}
					data={data}
					onEdit={() => setDialog({ open: true, tempName: name })}
					onBuyCorn={buyCorn}
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
