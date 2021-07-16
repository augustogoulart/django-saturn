import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
  appName?: string;
}

export function InstalledApps(
  props: RouteComponentProps<MatchParams>
): JSX.Element {
  const appName = props.match.params.appName;
  return <div>{appName}</div>;
}
