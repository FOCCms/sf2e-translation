import FeatsBrowser from "../FeatsBrowser"
import { QuartzComponentProps } from "../types"

export default function FeatsLayout(props: QuartzComponentProps) {
  return (
    <div>
      <h1>Фиты</h1>
      <FeatsBrowser {...props} />
    </div>
  )
}
