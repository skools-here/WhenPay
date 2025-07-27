import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage(){
    const session =await getServerSession()

    if(!session){redirect("/")}

    return (
        <div>
            <PaymentsTable/>
        </div>
    )
}