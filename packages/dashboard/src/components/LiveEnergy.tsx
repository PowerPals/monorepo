import { useEffect, useState } from "react"
import { fetchClient, useUserId } from "../data/api"
import BigStat from "./BigStat"
import Loading from "./Loading"
import { PowerLog } from "../data/types"

export default function LiveEnergy() {
  const userId = useUserId()

  const [loading, setLoading] = useState(true)
  const [lastLog, setLastLog] = useState<PowerLog>()
  useEffect(() => {
    const fn = async () => {
      const resp = await fetchClient.GET("/users/{user_id}/power_logs/latest", {
        params: { path: { user_id: userId } },
      })

      setLoading(false)
      setLastLog(resp.data)
    }

    fn()
    const interval = setInterval(fn, 2000)

    return () => clearInterval(interval)
  }, [userId])

  if (loading || !lastLog) {
    return <Loading />
  }

  return <BigStat stat={lastLog.power_watts} title="Watts" className="mt-6" />
}
