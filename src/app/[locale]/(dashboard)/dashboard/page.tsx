import { getServerSession } from "next-auth";
import Forbidden from "../../forbidden";


export default async function Page() {
    const session = await getServerSession();
    if (!session) {
        return Forbidden();
    }

    return (
        <div>dashboard</div>
    )
}