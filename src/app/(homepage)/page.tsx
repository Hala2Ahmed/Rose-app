import { ModeToggle } from "@/components/layout/app/mode-toggle";
import Notifications from "../../components/layout/app/notifications";

export default function Home() {
  return <>
  <Notifications notificationCount={5}/>
  <ModeToggle/>
  </>;
}
