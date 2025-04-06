import { $api, useUserId } from "../data/api";
import BigStat from "./BigStat";
import Loading from "./Loading";

export default function LiveEnergy() {
	const userId = useUserId();

	const { data: totalEnergy, isLoading } = $api.useQuery(
		"get",
		"/users/{user_id}/power_logs/total",
		{ params: { path: { user_id: userId } } },
	);

	if (isLoading || !totalEnergy) {
		return <Loading />;
	}

	return <BigStat stat={totalEnergy} title="Watt Hours" className="mt-6" />;
}
