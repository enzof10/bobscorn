import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function NameDialog({
	open,
	tempName,
	onTempNameChange,
	onSave,
	onClose,
	isUpdating,
}) {
	return (
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isUpdating ? "Update Your Name" : "Hello there!"}
					</DialogTitle>
				</DialogHeader>
				<p>Please enter your name to get started:</p>
				<Input
					placeholder="Your name"
					value={tempName}
					onChange={onTempNameChange}
				/>
				<div className="flex justify-end gap-2 mt-4">
					<Button onClick={onClose} variant="outline">
						Cancel
					</Button>
					<Button onClick={onSave}>Save</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
