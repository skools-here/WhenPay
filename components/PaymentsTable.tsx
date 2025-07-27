import { useEffect, useState } from 'react'
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface Payment {
id: string
paymentName: string
amount: number
category: string
deadline: string
status: string
}

export default function PaymentTable() {
const [payments, setPayments] = useState<Payment[]>([])

useEffect(() => {
fetch('/api/payments')
.then(res => res.json())
.then(data => setPayments(data.payments))
}, [])

const updateStatus = async (id: string, status: string) => {
await fetch(`/api/payments/${id}/status`, {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ status }),
})
setPayments(p =>
p.map(pay =>
pay.id === id ? { ...pay, status } : pay
)
)
}

const deletePayment = async (id: string) => {
await fetch(`/api/payments/${id}`, { method: 'DELETE' })
setPayments(p => p.filter(pay => pay.id !== id))
}

return (
<div className="rounded-lg border p-4 shadow-sm">
<h2 className="text-xl font-semibold mb-4">Your Payments</h2>
<Table>
<TableHeader>
<TableRow>
<TableHead>Name</TableHead>
<TableHead>Amount</TableHead>
<TableHead>Category</TableHead>
<TableHead>Deadline</TableHead>
<TableHead>Status</TableHead>
<TableHead>Action</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{payments.map((p) => (
<TableRow key={p.id}>
<TableCell>{p.paymentName}</TableCell>
<TableCell>₹{p.amount}</TableCell>
<TableCell>{p.category}</TableCell>
<TableCell>{new Date(p.deadline).toLocaleDateString()}</TableCell>
<TableCell>
<Badge variant={
p.status === 'pending' ? 'secondary' :
p.status === 'paid' ? 'default' :
p.status === 'overdue' ? 'destructive' : 'outline'
}>
{p.status}
</Badge>
</TableCell>
<TableCell className="flex gap-2">
<Select value={p.status} onValueChange={(value) => updateStatus(p.id, value)}>
<SelectTrigger className="w-[100px]">
<SelectValue placeholder="Change Status" />
</SelectTrigger>
<SelectContent>
<SelectItem value="pending">Pending</SelectItem>
<SelectItem value="paid">Paid</SelectItem>
<SelectItem value="overdue">Overdue</SelectItem>
<SelectItem value="cancelled">Cancelled</SelectItem>
</SelectContent>
</Select>
<Button variant="destructive" size="sm" onClick={() => deletePayment(p.id)}>Delete</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
{payments.length === 0 && (
<p className="text-sm text-gray-500 mt-4">No payments yet.</p>
)}
</div>
)
}

